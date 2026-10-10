<script lang="ts">
	import { explorer } from '../core/state.svelte';
	import { getEntity, type Entity } from '../core/registry';
	import { planetElements, orbitalPeriodYears, type PlanetId } from '../core/ephemeris';
	import { phaseWindow } from '../core/timeline';
	import { itemProgress } from '../core/progress';
	import { metricsFor, formatPower, formatRate, type Range } from '../core/metrics';
	import { MODEL_COLORS, PHASE_COLORS, HUD } from '../core/theme';
	import { formatCount, formatDistance, formatLightTime, formatUSD, yearToJD } from '../core/units';
	import type { ModelName } from '../core/placements';
	import { getAssessmentsForBOM, RISK_LABELS } from '$lib/services/trl-assessment';
	import { getQuestion } from '$lib/services/critical-path';
	import { getDivergentViewsPath, parseDivergentViewsYAML } from '$lib/services/bom';
	import type { DivergentViewsData } from '$lib/types/divergent-views';

	const e = $derived(explorer.selected);
	const coarseYear = $derived(Math.round(explorer.year * 20) / 20);

	const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

	const bodyStats = $derived.by(() => {
		if (!e || (e.kind !== 'planet' && e.kind !== 'moon' && e.kind !== 'star')) return null;
		const p = e.position(coarseYear);
		const earth = getEntity('earth')!.position(coarseYear);
		const rows: [string, string][] = [
			['Heliocentric distance', formatDistance(Math.hypot(...p))],
			['Distance from Earth', e.id === 'earth' ? '—' : formatDistance(dist(p, earth))],
			['Light time from Earth', e.id === 'earth' ? '—' : formatLightTime(dist(p, earth))]
		];
		if (e.kind === 'planet') {
			const el = planetElements(e.id as PlanetId, yearToJD(coarseYear));
			rows.push(
				['Semi-major axis', `${el.a.toFixed(4)} AU`],
				['Eccentricity', el.e.toFixed(4)],
				['Inclination', `${el.i.toFixed(3)}°`],
				['Sidereal period', `${orbitalPeriodYears(el.a).toFixed(3)} yr`]
			);
		}
		if (e.radiusAU) rows.push(['Mean radius', formatDistance(e.radiusAU)]);
		return rows;
	});

	const trl = $derived(e?.kind === 'bom' ? getAssessmentsForBOM(e.id) : []);
	const questions = $derived(
		[...new Set(trl.flatMap((t) => t.relatedQuestionIds))].map((id) => getQuestion(id)).filter((q) => !!q)
	);

	let divergent = $state<DivergentViewsData | null>(null);
	let divergentFor = '';
	$effect(() => {
		const cur = e;
		if (!cur || cur.kind !== 'bom' || divergentFor === cur.id) return;
		divergentFor = cur.id;
		divergent = null;
		fetch(getDivergentViewsPath(cur.phaseId!, cur.bom?.slug ?? cur.placement?.slug ?? ""))
			.then((r) => (r.ok ? r.text() : null))
			.then((t) => {
				if (divergentFor === cur.id) divergent = t ? parseDivergentViewsYAML(t) : null;
			})
			.catch(() => {});
	});

	const modelColor = (m: string) => MODEL_COLORS[(m.split(' ')[0] as ModelName)] ?? HUD.ghost;
	const statusColor = { answered: 'var(--hud-ok)', investigating: 'var(--hud-warn)', open: 'var(--hud-dim)' } as const;

	function kindTag(x: Entity) {
		if (x.kind === 'bom') return x.placement?.unresolved ? 'Projected · location unresolved' : 'Projected · consensus';
		if (x.kind === 'phase') return 'Programme phase';
		return 'Observed · ephemeris';
	}
</script>

{#if e}
	<aside class="inspector panel" aria-label="Inspector">
		<header>
			<div class="eyebrow" style="color:{e.phaseId ? PHASE_COLORS[e.phaseId] : e.kind === 'phase' ? PHASE_COLORS[e.id] : 'var(--hud-dim)'}">
				{kindTag(e)}
			</div>
			<h2>{e.name}</h2>
			<div class="sub">{e.subtitle}</div>
			<div class="actions">
				{#if e.kind !== 'phase'}
					<button type="button" class="hud-btn" onclick={() => explorer.select(e.id)}>Focus</button>
				{/if}
				<button type="button" class="hud-btn" onclick={() => (explorer.selectedId = null)} aria-label="Close inspector">✕</button>
			</div>
		</header>

		<div class="body">
			{#if bodyStats}
				<dl>
					{#each bodyStats as [k, v] (k)}<dt>{k}</dt><dd>{v}</dd>{/each}
				</dl>
				<p class="src">
					{e.kind === 'moon'
						? 'Simplified circular lunar orbit (mean motion, regressing node).'
						: 'Positions from JPL approximate Keplerian elements (Standish, 3000 BC–3000 AD). Sizes are true scale.'}
				</p>
			{/if}

			{#if e.kind === 'phase' && e.phase}
				{@const w = phaseWindow(e.id)!}
				<p>{e.phase.description}</p>
				<dl>
					<dt>Nominal window</dt><dd>{Math.round(w.start)}–{Math.round(w.end)}</dd>
					<dt>Envelope</dt><dd>{Math.round(w.startMin)}–{Math.round(w.endMax)}</dd>
					<dt>Planned duration</dt><dd>{e.phase.estimatedDuration}</dd>
					<dt>Total cost</dt><dd>{formatUSD(e.phase.totalCost)}</dd>
				</dl>
				<h3>Bill of materials</h3>
				<ul class="links">
					{#each e.phase.bom as b (b.id)}
						<li><button type="button" onclick={() => explorer.select(b.id)}>{b.name}</button> <span>{formatUSD(b.totalCost)}</span></li>
					{/each}
				</ul>
				<a href="/plan/{e.id}">Open phase plan →</a>
			{/if}

			{#if e.kind === 'bom' && e.bom}
				{@const b = e.bom}
				{@const prog = itemProgress(e.id, e.phaseId!, explorer.year)}
				{@const m = metricsFor(e.id)}
				<p>{b.description}</p>
				<dl>
					<dt>Quantity</dt><dd>{formatCount(b.quantity)} {b.unit}</dd>
					<dt>Unit cost</dt><dd>{formatUSD(b.unitCost)}</dd>
					<dt>Total cost</dt>
					<dd>
						{formatUSD(b.totalCost)}
						{#if b.costMin && b.costMax}<span class="dim">({formatUSD(b.costMin)}–{formatUSD(b.costMax)})</span>{/if}
					</dd>
					{#if b.costConfidence}<dt>Cost confidence</dt><dd>{b.costConfidence}</dd>{/if}
					<dt>Deployed at T</dt>
					<dd>
						<div class="bar"><i style="width:{prog * 100}%;background:{PHASE_COLORS[e.phaseId!]}"></i></div>
						{Math.round(prog * 100)}% <span class="dim">(projection)</span>
					</dd>
				</dl>

				{#if m && (m.genW || m.useW || m.throughput || m.unresolved)}
					<h3>Operations · per unit</h3>
					<dl>
						{#if m.genW}<dt>Output</dt><dd>{@render rng(m.genW, formatPower)}</dd>{/if}
						{#if m.useW}<dt>Consumption</dt><dd>{@render rng(m.useW, formatPower)}</dd>{/if}
						{#if m.throughput}
							<dt>Throughput</dt>
							<dd>{@render rng(m.throughput.perHour, formatRate)} <span class="dim">{m.throughput.unit} /h</span></dd>
							{#if prog > 0}
								<dt>Fleet at T</dt>
								<dd>{formatRate(m.throughput.perHour.base * b.quantity * prog)} <span class="dim">{m.throughput.unit} /h</span></dd>
							{/if}
						{/if}
					</dl>
					{#if m.unresolved}<p class="src warn">Unresolved: {m.unresolved}</p>{/if}
					<p class="src">{m.source}</p>
				{/if}

				{#if e.placement}
					<h3>Placement</h3>
					<p>
						{#each e.placement.baselineModels as m (m)}<span class="chip" style="--c:{MODEL_COLORS[m]}">{m}</span>{/each}
						{e.placement.note}
					</p>
					{#if e.placement.alternatives.length}
						<ul class="alts">
							{#each e.placement.alternatives as alt, k (k)}
								<li>
									{#each alt.models as m (m)}<span class="chip ghost" style="--c:{MODEL_COLORS[m]}">{m}</span>{/each}
									{#if !alt.models.length}<span class="chip ghost" style="--c:{HUD.ghost}">Alt</span>{/if}
									{alt.note}
								</li>
							{/each}
						</ul>
					{/if}
				{/if}

				{#if divergent?.topics?.length}
					<h3>Divergent views <span class="dim">({divergent.topics.length})</span></h3>
					{#each divergent.topics as t (t.id)}
						<details>
							<summary>
								{#if t.priority}<span class="prio {t.priority}">{t.priority}</span>{/if}
								{t.topic}
							</summary>
							<ul class="alts">
								{#each t.positions as pos, k (k)}
									<li>
										{#each pos.models as m (m)}<span class="chip" style="--c:{modelColor(m)}">{m}</span>{/each}
										{pos.statement}
									</li>
								{/each}
							</ul>
							{#if t.impact}<p class="dim">{t.impact}</p>{/if}
						</details>
					{/each}
				{/if}

				{#if trl.length}
					<h3>Technology readiness</h3>
					{#each trl as a (a.id)}
						<div class="trl">
							<div class="trl-head"><span>{a.technology}</span><span style="color:{RISK_LABELS[a.riskIfFail]?.color ?? 'inherit'}">{RISK_LABELS[a.riskIfFail]?.label ?? a.riskIfFail}</span></div>
							<div class="trl-scale" aria-label="TRL {a.currentTRL} of target {a.targetTRL}">
								{#each Array(9) as _, k (k)}
									<i class:cur={k < a.currentTRL} class:target={k + 1 === a.targetTRL}></i>
								{/each}
								<span>TRL {a.currentTRL}{a.currentTRLMax ? `–${a.currentTRLMax}` : ''} → {a.targetTRL}</span>
							</div>
						</div>
					{/each}
				{/if}

				{#if questions.length}
					<h3>Research questions</h3>
					<ul class="links">
						{#each questions as q (q.questionId)}
							<li>
								<span class="dot" style="background:{statusColor[q.status]}" title={q.status}></span>
								<a href="/questions/{q.slug}">{q.questionId.toUpperCase()} {q.title}</a>
							</li>
						{/each}
					</ul>
				{/if}

				<p><a href="/plan/{e.phaseId}/bom/{b.slug}">Full specs, consensus &amp; blueprint →</a></p>
			{/if}
		</div>
	</aside>
{/if}

{#snippet rng(r: Range, fmt: (n: number) => string)}
	{fmt(r.base)}{#if r.derived}<span class="dim" title="Geometric mean of divergent model values; no consensus baseline">*</span>{/if}
	{#if r.max > r.min * 1.01}<br /><span class="dim">{fmt(r.min)} – {fmt(r.max)}</span>{/if}
{/snippet}

<style>
	.inspector {
		position: absolute;
		top: 92px;
		right: 12px;
		bottom: 150px;
		width: 380px;
		display: flex;
		flex-direction: column;
	}
	header {
		padding: 12px 14px 10px;
		border-bottom: 1px solid var(--hud-line);
		position: relative;
	}
	h2 {
		font-family: var(--font-cond);
		font-size: 22px;
		font-weight: 600;
		letter-spacing: 0.06em;
		margin: 2px 0 0;
		padding-right: 90px;
		line-height: 1.1;
	}
	.sub {
		color: var(--hud-dim);
		font-size: 11px;
		margin-top: 2px;
	}
	.actions {
		position: absolute;
		top: 10px;
		right: 12px;
		display: flex;
		gap: 4px;
	}
	.body {
		overflow-y: auto;
		padding: 10px 14px 14px;
		line-height: 1.5;
		scrollbar-width: thin;
	}
	p {
		margin: 0 0 10px;
		color: #c3d1e0;
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 12.5px;
	}
	h3 {
		font-family: var(--font-cond);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--hud-accent);
		margin: 14px 0 6px;
		border-bottom: 1px solid var(--hud-line);
		padding-bottom: 3px;
	}
	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 3px 12px;
		margin: 0 0 10px;
	}
	dt {
		color: var(--hud-dim);
	}
	dd {
		margin: 0;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
	.dim {
		color: var(--hud-dim);
	}
	.src {
		color: var(--hud-faint);
		font-size: 11px;
	}
	.warn {
		color: var(--hud-warn);
	}
	.bar {
		height: 4px;
		background: var(--hud-line);
		margin: 5px 0 2px;
	}
	.bar i {
		display: block;
		height: 100%;
	}
	.chip {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 10px;
		padding: 0 5px;
		margin-right: 4px;
		border: 1px solid var(--c);
		color: var(--c);
		background: color-mix(in srgb, var(--c) 14%, transparent);
	}
	.chip.ghost {
		border-style: dashed;
		background: none;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0 0 8px;
	}
	.alts li {
		margin-bottom: 6px;
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 12px;
		color: #c3d1e0;
	}
	.links li {
		display: flex;
		gap: 6px;
		align-items: baseline;
		margin-bottom: 4px;
	}
	.links li > span:last-child {
		margin-left: auto;
		color: var(--hud-dim);
	}
	.links button {
		background: none;
		border: 0;
		padding: 0;
		color: var(--hud-accent);
		cursor: pointer;
		text-align: left;
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex: none;
	}
	details {
		border-left: 1px solid var(--hud-line);
		padding-left: 8px;
		margin-bottom: 6px;
	}
	summary {
		cursor: pointer;
		font-size: 12px;
	}
	.prio {
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0 4px;
		margin-right: 4px;
		border: 1px solid currentColor;
	}
	.prio.critical {
		color: var(--hud-bad);
	}
	.prio.high {
		color: var(--hud-warn);
	}
	.prio.medium,
	.prio.low {
		color: var(--hud-dim);
	}
	.trl {
		margin-bottom: 8px;
	}
	.trl-head {
		display: flex;
		justify-content: space-between;
		gap: 8px;
		font-size: 11px;
	}
	.trl-scale {
		display: flex;
		gap: 2px;
		align-items: center;
		margin-top: 3px;
	}
	.trl-scale i {
		width: 16px;
		height: 6px;
		background: var(--hud-line);
	}
	.trl-scale i.cur {
		background: var(--hud-accent);
	}
	.trl-scale i.target {
		outline: 1px solid var(--hud-warn);
	}
	.trl-scale span {
		margin-left: 6px;
		color: var(--hud-dim);
		font-size: 10.5px;
	}
	@media (max-width: 900px) {
		.inspector {
			top: auto;
			left: 12px;
			right: 12px;
			width: auto;
			bottom: 140px;
			max-height: 45vh;
		}
	}
</style>
