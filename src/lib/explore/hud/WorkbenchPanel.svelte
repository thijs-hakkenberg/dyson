<script lang="ts">
	import { explorer } from '../core/state.svelte';
	import { wb } from '../core/wbstore.svelte';
	import { getEntity } from '../core/registry';
	import { metricsFor, formatPower, formatPerHour, formatFlops, formatSci } from '../core/metrics';
	import { formatCount, formatUSD } from '../core/units';
	import { MODEL_COLORS, PHASE_COLORS, PRIORITY_COLORS, RQ_STATUS_COLORS } from '../core/theme';
	import { PRIORITY_ORDER } from '../core/workbench';
	import { phaseLabel } from '../core/timeline';
	import { elementModel, formatLength, NON_PHYSICAL } from '../core/models';

	const e = $derived(getEntity(explorer.workbenchId));
	const b = $derived(e?.bom);
	const m = $derived(e ? metricsFor(e.id) : undefined);
	const layout = $derived(wb.layout);

	const prioCounts = $derived(
		PRIORITY_ORDER.map((p) => ({ p, n: layout?.forks.filter((f) => f.priority === p).length ?? 0 })).filter(
			(x) => x.n > 0
		)
	);
	const rqCounts = $derived.by(() => {
		const c: Record<string, number> = {};
		for (const r of layout?.rqs ?? []) c[r.q.status] = (c[r.q.status] ?? 0) + 1;
		return c;
	});
	const em = $derived(elementModel(explorer.workbenchId));
	const nonPhysical = $derived(explorer.workbenchId ? NON_PHYSICAL[explorer.workbenchId] : undefined);
	const BASIS: Record<string, string> = {
		consensus: 'Consensus dimensions',
		model: 'Follows one model’s spec (no consensus size)',
		geomean: 'No consensus size — geometric mean of the proposals'
	};
	const proseOnly = $derived(!!layout?.forks.length && !wb.data?.spec?.divergentViewsData);
</script>

<section class="wbp panel" aria-label="Workbench summary">
	<button type="button" class="back hud-btn" onclick={() => explorer.closeWorkbench()}>← Orrery <kbd>W</kbd></button>
	{#if e && b}
		<div class="eyebrow crumb" style="color:{PHASE_COLORS[e.phaseId!]}">
			{e.phase ? phaseLabel(e.phase) : ''} · {b.category} · {e.id}
		</div>
		<h2>{b.name}</h2>

		<div class="views" role="group" aria-label="Workbench view">
			<button type="button" class="hud-btn" class:on={explorer.wbView === 'consensus'} onclick={() => (explorer.wbView = 'consensus')}>
				Consensus
			</button>
			<button type="button" class="hud-btn" class:on={explorer.wbView === 'model'} onclick={() => (explorer.wbView = 'model')}>
				3D model <kbd>M</kbd>
			</button>
		</div>

		<dl>
			<dt>Quantity</dt><dd>{formatCount(b.quantity)} {b.unit}</dd>
			<dt>Unit cost</dt><dd>{formatUSD(b.unitCost)}</dd>
			<dt>Total</dt>
			<dd>
				{formatUSD(b.totalCost)}
				{#if b.costMin && b.costMax}<span class="dim">{formatUSD(b.costMin)}–{formatUSD(b.costMax)}</span>{/if}
			</dd>
			{#if b.costConfidence}<dt>Confidence</dt><dd>{b.costConfidence}</dd>{/if}
			{#if m?.genW}<dt>Output / unit</dt><dd>{formatPower(m.genW.base)}</dd>{/if}
			{#if m?.useW}<dt>Draw / unit</dt><dd>{formatPower(m.useW.base)}</dd>{/if}
			{#if m?.throughput}<dt>Throughput</dt><dd>{formatPerHour(m.throughput.perHour.base)} <span class="dim">{m.throughput.unit}</span></dd>{/if}
			{#if m?.computeFlops}<dt>Compute / unit</dt><dd>{formatFlops(m.computeFlops.base)}</dd>{/if}
			{#if m?.thrustN}<dt>Thrust / unit</dt><dd>{formatSci(m.thrustN.base)} N</dd>{/if}
		</dl>

		{#if explorer.wbView === 'model'}
			{#if em}
				<div class="eyebrow sec">Element model</div>
				<dl>
					<dt>Size</dt><dd>{formatLength(em.params.size)}</dd>
					<dt>Mass</dt><dd class="wrap">{em.mass}</dd>
				</dl>
				<p class="dims">{em.dims}</p>
				<p class="basis" class:flag={em.sizeBasis !== 'consensus'}>
					{BASIS[em.sizeBasis]}{em.after ? ` · shape after ${em.after}` : ''}
				</p>
				{#if em.variants.length}
					<div class="eyebrow sec">Divergent sizes · ghosts</div>
					<ul class="variants">
						{#each em.variants as v (v.label + v.model)}
							<li>
								<i style="--c:{v.model ? MODEL_COLORS[v.model] : '#94a3b8'}">{v.model ?? 'range'}</i>
								<span>{v.label}</span>
								<b>{formatLength(v.size)}</b>
							</li>
						{/each}
					</ul>
				{/if}
				<p class="foot">
					Procedural model: proportions from the specs, fine detail representative. Ghosts stand at true scale to the main
					model, shown smaller or larger only when flagged. Source: {em.source}.
				</p>
			{:else}
				<p class="dim nm">{nonPhysical ?? 'No physical model for this item yet.'}</p>
			{/if}
		{:else if wb.loading}
			<p class="dim">Loading specs…</p>
		{:else if layout}
			<div class="eyebrow sec">Consensus</div>
			<ul class="counts">
				<li><span class="k core"></span>{layout.specs.length} agreed key specs</li>
				<li><span class="k open"></span>{layout.open.length} open questions</li>
				<li>
					<span class="k model"></span>{layout.satellites.length} model specs
					<span class="chips">
						{#each [...new Set(layout.satellites.map((s) => s.family))] as f (f)}<i style="--c:{MODEL_COLORS[f]}">{f}</i>{/each}
					</span>
				</li>
			</ul>

			<div class="eyebrow sec">Divergences · {layout.forks.length}</div>
			<ul class="counts">
				{#each prioCounts as x (x.p)}
					<li><span class="k fork" style="--c:{PRIORITY_COLORS[x.p]}"></span>{x.n} {x.p}</li>
				{/each}
			</ul>
			{#if proseOnly}<p class="warn">No structured divergent-views.yaml; forks parsed from consensus prose (CI-12).</p>{/if}

			{#if layout.rqs.length}
				<div class="eyebrow sec">Research questions · {layout.rqs.length}</div>
				<ul class="counts">
					{#each Object.entries(rqCounts) as [s, n] (s)}
						<li><span class="k rq" style="--c:{RQ_STATUS_COLORS[s]}"></span>{n} {s}</li>
					{/each}
				</ul>
			{/if}
		{/if}

		{#if explorer.wbView === 'consensus'}<p class="foot">
			Core = consensus (translucent). Forks = divergent views (dashed), branches lean toward the models holding each
			position, stem length and colour by priority. Click any node.
		</p>{/if}
	{/if}
</section>

<style>
	.wbp {
		padding: 10px 12px 12px;
		flex: none;
	}
	.back {
		width: 100%;
		text-align: left;
		display: flex;
		justify-content: space-between;
	}
	kbd {
		font-family: inherit;
		font-size: 9px;
		color: var(--hud-faint);
		border: 1px solid var(--hud-line);
		padding: 0 4px;
	}
	.crumb {
		margin-top: 10px;
		font-size: 10px;
	}
	h2 {
		margin: 2px 0 8px;
		font-family: var(--font-cond);
		font-size: 20px;
		font-weight: 600;
		line-height: 1.1;
		color: #fff;
	}
	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 2px 10px;
		margin: 0;
		font-size: 11px;
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
		font-size: 10px;
		display: block;
	}
	.sec {
		margin-top: 12px;
		font-size: 10px;
	}
	.counts {
		list-style: none;
		padding: 0;
		margin: 4px 0 0;
		font-size: 11px;
	}
	.counts li {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 2px 0;
	}
	.k {
		width: 9px;
		height: 9px;
		flex: none;
	}
	.k.core {
		background: rgba(34, 211, 238, 0.35);
		border: 1px solid #22d3ee;
		border-radius: 50%;
	}
	.k.open {
		border: 1px dashed #fbbf24;
		transform: rotate(45deg) scale(0.8);
	}
	.k.model {
		background: #94a3b8;
		border-radius: 50%;
	}
	.k.fork {
		height: 0;
		border-top: 2px dashed var(--c);
	}
	.k.rq {
		background: var(--c);
		transform: rotate(45deg) scale(0.8);
	}
	.chips {
		display: inline-flex;
		gap: 4px;
	}
	.chips i {
		font-style: normal;
		font-size: 9px;
		color: var(--c);
		border: 1px solid var(--c);
		padding: 0 4px;
	}
	.views {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4px;
		margin-bottom: 8px;
	}
	.views .hud-btn {
		font-size: 10.5px;
		display: flex;
		justify-content: center;
		gap: 6px;
	}
	dd.wrap {
		text-align: right;
		font-size: 10.5px;
	}
	.dims {
		margin: 6px 0 0;
		font-size: 11px;
		line-height: 1.4;
	}
	.basis {
		margin: 4px 0 0;
		font-size: 10px;
		color: var(--hud-dim);
	}
	.basis.flag {
		color: var(--hud-warn);
	}
	.variants {
		list-style: none;
		padding: 0;
		margin: 4px 0 0;
		font-size: 10.5px;
	}
	.variants li {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 6px;
		align-items: baseline;
		margin: 3px 0;
	}
	.variants i {
		font-style: normal;
		font-size: 9px;
		color: var(--c);
		border: 1px dashed var(--c);
		padding: 0 4px;
	}
	.variants b {
		font-weight: 500;
		font-variant-numeric: tabular-nums;
	}
	.nm {
		margin-top: 10px;
		line-height: 1.4;
	}
	.warn {
		margin: 6px 0 0;
		font-size: 10px;
		color: var(--hud-warn);
		line-height: 1.4;
	}
	.foot {
		margin: 12px 0 0;
		font-size: 10px;
		color: var(--hud-faint);
		line-height: 1.45;
	}
</style>
