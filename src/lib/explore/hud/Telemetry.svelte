<script lang="ts">
	import { explorer } from '../core/state.svelte';
	import { telemetryAt, formatPower, formatRate, formatPerHour, formatFlops, formatSci, formatDisplacement, L_SUN_W, type Sum } from '../core/metrics';
	import { formatCount, formatUSD } from '../core/units';
	import { PHASE_COLORS } from '../core/theme';
	import DeepTime from './DeepTime.svelte';

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
