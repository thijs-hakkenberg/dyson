<script lang="ts">
	import { explorer } from '../core/state.svelte';
	import { telemetryAt, formatPower, formatRate, formatPerHour, formatFlops, formatSci, formatDisplacement, L_SUN_W, type Sum } from '../core/metrics';
	import { formatCount, formatUSD } from '../core/units';
	import { PHASE_COLORS } from '../core/theme';
	import DeepTime from './DeepTime.svelte';
	import { PRICES, powerBalance, roiAt, type PriceId } from '../core/economics';
	import { plasmaFlowAt } from '../core/plasma';

	// Collapsed by default on phones so the scene stays visible
	let open = $state(typeof window === 'undefined' || window.innerWidth > 700);

	// Collapsible sections, remembered per viewer (convenience only)
	const KEY = 'explore:telemetry-collapsed';
	let collapsed = $state<Record<string, boolean>>(
		(() => {
			try {
				return JSON.parse(localStorage.getItem(KEY) ?? '') ?? { production: true };
			} catch {
				return { production: true };
			}
		})()
	);
	function toggle(id: string) {
		collapsed[id] = !collapsed[id];
		try {
			localStorage.setItem(KEY, JSON.stringify(collapsed));
		} catch {
			/* storage unavailable: state just isn't remembered */
		}
	}
	let expanded = $state<string | null>(null);

	// Hundredth-of-a-year resolution is plenty for the readouts
	const t = $derived(telemetryAt(Math.round(explorer.year * 100) / 100));
	const spentFrac = $derived(t.costTotal ? t.cost.base / t.costTotal : 0);
	const net = $derived(t.genW.base - t.useW.base);

	const spread = (s: Sum, fmt: (n: number) => string) =>
		s.max > s.min * 1.01 ? `${fmt(s.min)} – ${fmt(s.max)}` : '';

	function solarFraction(w: number): string {
		const f = w / L_SUN_W;
		if (f <= 0) return '';
		const e = Math.floor(Math.log10(f));
		if (e >= -2) return `${(f * 100).toPrecision(2)}% L☉`;
		return `${(f / 10 ** e).toFixed(1)}×10${sup(e)} L☉`;
	}
	// ── Power balance and return ─────────────────────────────────────────
	const pb = $derived(powerBalance(Math.round(explorer.year * 4) / 4));
	const plasma = $derived(plasmaFlowAt(Math.round(explorer.year * 4) / 4));
	// Saturation bar on a log scale: 10⁻¹⁶ (empty) … 1 (every watt of the Sun)
	const satPct = $derived(pb.saturation > 0 ? Math.max(1, ((Math.log10(pb.saturation) + 16) / 16) * 100) : 0);
	let priceId = $state<PriceId>('mid');
	try {
		const p = localStorage.getItem('explore:roi-price') as PriceId | null;
		if (p && PRICES.some((x) => x.id === p)) priceId = p;
	} catch {
		/* default price */
	}
	function setPrice(id: PriceId) {
		priceId = id;
		try {
			localStorage.setItem('explore:roi-price', id);
		} catch {
			/* not remembered */
		}
	}
	const price = $derived(PRICES.find((p) => p.id === priceId)!);
	const roi = $derived(roiAt(Math.round(explorer.year * 4) / 4, price.usdPerKWh));
	const money = (n: number) => {
		const a = Math.abs(n);
		const s = a >= 1e15 ? `$${formatSci(a, 2)}` : formatUSD(a);
		return n < 0 ? `−${s}` : s;
	};
	const energy = (kwh: number) => {
		const a = Math.abs(kwh);
		const s = a >= 1e12 ? `${formatSci(a / 1e9, 2)} TWh` : a >= 1e9 ? `${(a / 1e9).toPrecision(3)} TWh` : `${(a / 1e6).toPrecision(3)} GWh`;
		return kwh < 0 ? `−${s}` : s;
	};
	const multiple = (r: number) =>
		r >= 0 ? `${r >= 100 ? formatSci(r, 2) : r.toFixed(r < 10 ? 1 : 0)}×` : 'net loss';

	const SUP: Record<string, string> = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
	const sup = (n: number) => [...String(n)].map((c) => SUP[c] ?? c).join('');
</script>

<section class="telemetry panel" class:closed={!open} aria-label="Programme telemetry">
	<button type="button" class="toggle eyebrow" onclick={() => (open = !open)} aria-expanded={open}>
		Programme telemetry {open ? '−' : '+'}
	</button>

	{#if open}
		<div class="block">
			<div class="lbl">Committed spend</div>
			<div class="big">{formatUSD(t.cost.base)}</div>
			<div class="bar"><span style="width:{(spentFrac * 100).toFixed(2)}%"></span></div>
			<div class="sub">
				{(spentFrac * 100).toFixed(spentFrac < 0.01 ? 2 : 1)}% of {formatUSD(t.costTotal)} BOM
				{#if spread(t.cost, formatUSD)}<br /><span class="rng">range {spread(t.cost, formatUSD)}</span>{/if}
			</div>
		</div>

		<div class="block grid2">
			<div>
				<div class="lbl">Output</div>
				<div class="mid out">{formatPower(t.genW.base)}</div>
				{#if spread(t.genW, formatPower)}<div class="rng">{spread(t.genW, formatPower)}</div>{/if}
				{#if t.genW.base > 0}<div class="rng">{solarFraction(t.genW.base)}</div>{/if}
			</div>
			<div>
				<div class="lbl">Consumption</div>
				<div class="mid use">{formatPower(t.useW.base)}</div>
				{#if spread(t.useW, formatPower)}<div class="rng">{spread(t.useW, formatPower)}</div>{/if}
				{#if t.genW.base > 0 || t.useW.base > 0}
					<div class="rng" class:neg={net < 0}>net {net < 0 ? '−' : '+'}{formatPower(Math.abs(net))}</div>
				{/if}
			</div>
		</div>

		{#if pb.genW > 0 || pb.useW > 0}
			<div class="block">
				<div class="lbl">Swarm saturation <span class="hint">share of the Sun’s output</span></div>
				<div class="bar sat" title="Log scale: 10⁻¹⁶ to 100% of L☉"><span style="width:{satPct.toFixed(1)}%"></span></div>
				<div class="sub">{solarFraction(pb.genW) || '0 L☉'} · a full swarm is 1 L☉</div>
				{#if pb.netW < 0}
					<p class="deficit">
						<b>Power deficit −{formatPower(-pb.netW)}.</b> Consumption exceeds generation{pb.deficitFrom ? ` from ~${Math.round(pb.deficitFrom)}` : ''} and no BOM item supplies the gap (CI-24). Largest net loads:
						{#each pb.topLoads as l, i (l.bomId)}<button type="button" onclick={() => explorer.select(l.bomId)}>{l.name}</button> {formatPower(l.w)}{i < pb.topLoads.length - 1 ? ' · ' : ''}{/each}
					</p>
				{/if}
			</div>
		{/if}

		{#if t.flops.base > 0}
			<div class="block">
				<div class="lbl">Matrioshka compute <span class="hint">FP16-eq</span></div>
				<div class="mid cmp">{formatFlops(t.flops.base)}</div>
				{#if spread(t.flops, formatFlops)}<div class="rng">{spread(t.flops, formatFlops)}</div>{/if}
			</div>
		{/if}

		{#if t.thrust.base > 0}
			<div class="block">
				<button type="button" class="lbl sect" onclick={() => toggle('thrust')} aria-expanded={!collapsed.thrust}>
					Stellar engine thrust <span class="chev">{collapsed.thrust ? '+' : '−'}</span>
				</button>
				<div class="mid thr">{formatSci(t.thrust.base)} N</div>
				{#if !collapsed.thrust}
				{#if spread(t.thrust, (n) => formatSci(n, 1))}
					<div class="rng">{spread(t.thrust, (n) => formatSci(n, 1))} N</div>
				{/if}
				<ul class="rows">
					{#each t.thrustBy as r (r.bomId)}
						<li><span class="v">{formatSci(r.n, 1)} N</span><span class="u">{r.name}</span></li>
					{/each}
				</ul>
				<dl class="kv">
					<dt>Solar accel.</dt><dd>{formatSci(t.solarAccel)} m/s²</dd>
					<dt>Sun Δv so far</dt><dd>{formatSci(t.sunDeltaV)} m/s</dd>
					<dt>Sun displaced</dt><dd>{formatDisplacement(t.sunDisplacement)}</dd>
				</dl>
				{#if plasma.fraction > 0}
					<div class="lbl sub2">Plasma loop <span class="hint">{Math.round(plasma.fraction * 100)}% of design{plasma.bottleneck ? ` · limited by ${plasma.bottleneck.toLowerCase()}` : ''}</span></div>
					<dl class="kv">
						<dt>Lifted</dt><dd>{formatSci(plasma.liftKgS, 1)} kg/s</dd>
						<dt>He exhaust, 0.01c</dt><dd>{formatSci(plasma.heKgS, 1)} kg/s</dd>
						<dt>H back to Sun</dt><dd>{formatSci(plasma.hKgS, 1)} kg/s</dd>
						<dt>Net push (He only)</dt><dd>{formatSci(plasma.thrustN, 1)} N</dd>
						<dt>Beam power</dt><dd>{formatPower(plasma.hePowerW + plasma.hPowerW)}</dd>
					</dl>
					<p class="note">Returned hydrogen carries no momentum out of the system, so the net push is the helium jet alone, below the summed jet figure above (CI-26). The beams’ power is not in the BOM (CI-24).</p>
				{/if}
				{/if}
			</div>
		{/if}

		{#if t.throughput.length}
			<div class="block">
				<button type="button" class="lbl sect" onclick={() => toggle('production')} aria-expanded={!collapsed.production}>
					Production rate · {t.throughput.length} streams <span class="chev">{collapsed.production ? '+' : '−'}</span>
				</button>
				{#if !collapsed.production}
				<ul class="rows">
					{#each t.throughput as r (r.unit)}
						<li title={spread(r.perHour, formatRate) ? `model range ${spread(r.perHour, formatRate)} per hour` : ''}>
							<span class="v">{formatPerHour(r.perHour.base)}</span>
							<span class="u">{r.unit}</span>
						</li>
					{/each}
				</ul>
				{/if}
			</div>
		{/if}

		<div class="block">
			<button type="button" class="lbl sect" onclick={() => toggle('fleet')} aria-expanded={!collapsed.fleet}>
				Fleet · units by type <span class="chev">{collapsed.fleet ? '+' : '−'}</span><span class="hint">build rate</span>
			</button>
			{#if t.groups.length === 0}
				<div class="sub">No hardware deployed yet. Scrub the timeline forward.</div>
			{/if}
			{#if !collapsed.fleet}
			<ul class="rows groups">
				{#each t.groups as g (g.group)}
					<li>
						<button
							type="button"
							class="grp"
							onclick={() => (expanded = expanded === g.group ? null : g.group)}
							aria-expanded={expanded === g.group}
						>
							<span class="v">{formatCount(g.units)}</span>
							<span class="u">{g.group}</span>
							<span class="r">{g.buildPerHour > 0 ? `+${formatPerHour(g.buildPerHour)}` : '—'}</span>
						</button>
						{#if expanded === g.group}
							<ul class="items">
								{#each g.items as it (it.bomId)}
									<li>
										<button type="button" onclick={() => explorer.select(it.bomId)} title="{it.unit} · {formatCount(it.deployed)} of {formatCount(it.quantity)}">
											<span class="sw" style="--c:{PHASE_COLORS[it.phaseId]}"></span>
											<span class="nm">{it.name}</span>
											<span class="n">{formatCount(it.deployed)}</span>
											<span class="r">{it.buildPerHour > 0 ? `+${formatPerHour(it.buildPerHour)}` : ''}</span>
										</button>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
			{/if}
		</div>

		{#if roi.spend > 0}
			<div class="block">
				<button type="button" class="lbl sect" onclick={() => toggle('roi')} aria-expanded={!collapsed.roi}>
					Return on investment <span class="chev">{collapsed.roi ? '+' : '−'}</span><span class="hint">illustrative</span>
				</button>
				<div class="mid" class:neg={roi.roi < 0} class:pos={roi.roi >= 1}>{multiple(roi.roi)}</div>
				<div class="sub">net energy value ÷ spend to date at {price.label}/kWh</div>
				{#if !collapsed.roi}
					<div class="prices" role="group" aria-label="Assumed electricity price">
						{#each PRICES as p (p.id)}
							<button type="button" class="hud-btn" class:on={p.id === priceId} onclick={() => setPrice(p.id)}>{p.label}/kWh</button>
						{/each}
					</div>
					<dl class="kv">
						<dt>Spend to date</dt><dd>{money(roi.spend)}</dd>
						<dt>Energy generated</dt><dd>{energy(roi.grossKWh)}</dd>
						<dt>Gross value</dt><dd>{money(roi.grossValue)}</dd>
						<dt>Net surplus</dt><dd class:negv={roi.netKWh < 0}>{energy(roi.netKWh)}</dd>
						<dt>Net value</dt><dd class:negv={roi.netValue < 0}>{money(roi.netValue)}</dd>
						<dt>Payback</dt><dd>{roi.paybackYear ? `~${Math.round(roi.paybackYear)}` : 'not within the plan'}</dd>
						<dt>Best return</dt><dd>{multiple(roi.bestRoi)} in ~{Math.round(roi.bestYear)}</dd>
					</dl>
					<p class="note">
						Net = generation minus the project’s own consumption, i.e. what could leave the project. Every kWh valued at
						one assumed price; no buyer, market or transmission loss is modelled, and none of this is in the consensus
						specs. Compute and thrust are not valued.
					</p>
				{/if}
			</div>
		{/if}

		<DeepTime />

		{#if t.unresolved.length}
			<p class="warn">
				Not summed: {t.unresolved.map((u) => u.bomId).join(', ')}. Models disagree on whether it produces or consumes power.
			</p>
		{/if}
		<p class="foot">
			Projected. Spend assumed to track deployment. Per-unit power, compute, thrust and throughput from each item's consensus;
			ranges span the model proposals. Sun motion integrates nominal thrust.
		</p>
	{/if}
</section>

<style>
	.telemetry {
		padding: 8px 12px 10px;
		flex: none;
	}
	.toggle {
		background: none;
		border: 0;
		padding: 0;
		cursor: pointer;
		width: 100%;
		text-align: left;
	}
	.block {
		margin-top: 10px;
		padding-top: 8px;
		border-top: 1px solid var(--hud-line);
	}
	.grid2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}
	.sect {
		display: block;
		width: 100%;
		background: none;
		border: 0;
		padding: 0;
		text-align: left;
		cursor: pointer;
	}
	.sect:hover {
		color: var(--hud-text);
	}
	.chev {
		color: var(--hud-faint);
		margin-left: 4px;
	}
	.lbl {
		font-family: var(--font-cond);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--hud-dim);
		margin-bottom: 2px;
	}
	.hint {
		float: right;
		letter-spacing: 0.06em;
		text-transform: none;
		color: var(--hud-faint);
	}
	.big {
		font-family: var(--font-cond);
		font-size: 24px;
		font-weight: 600;
		line-height: 1.1;
		color: #fff;
	}
	.mid {
		font-family: var(--font-cond);
		font-size: 18px;
		font-weight: 600;
		line-height: 1.15;
	}
	.out {
		color: var(--hud-warn);
	}
	.use {
		color: var(--hud-accent);
	}
	.cmp {
		color: #c4b5fd;
	}
	.thr {
		color: #fb7185;
	}
	.kv {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1px 8px;
		margin: 4px 0 0;
		font-size: 10px;
	}
	.kv dt {
		color: var(--hud-dim);
	}
	.kv dd {
		margin: 0;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
	.bar {
		height: 3px;
		background: rgba(125, 211, 252, 0.12);
		margin: 5px 0 4px;
	}
	.bar span {
		display: block;
		height: 100%;
		background: var(--hud-accent);
	}
	.sub,
	.rng {
		font-size: 10px;
		color: var(--hud-dim);
		line-height: 1.45;
	}
	.rng {
		color: var(--hud-faint);
	}
	.bar.sat span {
		background: linear-gradient(90deg, #f59e0b, #fde68a);
	}
	.deficit {
		margin: 6px 0 0;
		font-size: 10.5px;
		line-height: 1.45;
		color: var(--hud-warn);
	}
	.deficit button {
		background: none;
		border: 0;
		padding: 0;
		color: #fff;
		cursor: pointer;
		font: inherit;
		text-decoration: underline dotted;
	}
	.mid.neg,
	.negv {
		color: var(--hud-warn);
	}
	.mid.pos {
		color: var(--hud-ok);
	}
	.sub2 {
		margin-top: 8px;
	}
	.prices {
		display: flex;
		gap: 4px;
		margin: 6px 0;
	}
	.prices .hud-btn {
		font-size: 10px;
		padding: 2px 6px;
	}
	.note {
		margin: 6px 0 0;
		font-size: 9.5px;
		line-height: 1.4;
		color: var(--hud-faint);
	}
	.rng.neg {
		color: var(--hud-bad);
	}
	.rows {
		list-style: none;
		padding: 0;
		margin: 2px 0 0;
	}
	.rows li {
		display: flex;
		gap: 8px;
		font-size: 11px;
		margin: 2px 0;
	}
	.rows .v {
		min-width: 72px;
		text-align: right;
		color: #fff;
		font-variant-numeric: tabular-nums;
	}
	.rows .u {
		color: #b9c7d6;
		flex: 1;
	}
	.groups li {
		display: block;
	}
	.grp,
	.items button {
		display: flex;
		gap: 8px;
		width: 100%;
		background: none;
		border: 0;
		padding: 1px 0;
		font-size: 11px;
		cursor: pointer;
		text-align: left;
		align-items: center;
	}
	.grp:hover .u,
	.items button:hover .nm {
		color: #fff;
	}
	.r {
		color: var(--hud-ok);
		font-size: 10px;
		min-width: 58px;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
	.items {
		list-style: none;
		padding: 2px 0 4px 10px;
		margin: 0;
		border-left: 1px solid var(--hud-line);
	}
	.items button {
		font-size: 10px;
	}
	.sw {
		width: 6px;
		height: 6px;
		flex: none;
		background: var(--c);
	}
	.nm {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: var(--hud-dim);
	}
	.n {
		color: #dbe7f3;
		font-variant-numeric: tabular-nums;
	}
	.warn {
		margin: 8px 0 0;
		font-size: 10px;
		color: var(--hud-warn);
		line-height: 1.45;
	}
	.foot {
		margin: 8px 0 0;
		font-size: 10px;
		color: var(--hud-faint);
		line-height: 1.45;
	}
</style>
