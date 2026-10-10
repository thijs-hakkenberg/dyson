<script lang="ts">
	import { explorer } from '../core/state.svelte';
	import { nebula } from '../core/nebulastore.svelte';
	import { getEntity } from '../core/registry';
	import { PHASE_COLORS, RQ_STATUS_COLORS } from '../core/theme';
	import { getThreadStats } from '$lib/services/critical-path';
	import { getGateStats } from '$lib/services/decision-gates';
	import { PHASES } from '$lib/services/content';
	import { phaseLabel } from '../core/timeline';

	const layout = $derived(nebula.layout);
	const threads = getThreadStats();
	const gates = getGateStats();
	const STATUSES = ['answered', 'investigating', 'open'] as const;

	const byPhase = $derived(
		PHASES.map((p) => {
			const qs = layout?.rqs.filter((q) => q.phaseId === p.id) ?? [];
			return {
				p,
				total: qs.length,
				counts: STATUSES.map((s) => ({ s, n: qs.filter((q) => q.status === s).length }))
			};
		}).filter((x) => x.total > 0)
	);
	const critical = $derived(layout?.rqs.filter((q) => q.criticalPath) ?? []);
	const focusBom = $derived.by(() => {
		const e = getEntity(explorer.selectedId);
		return e?.kind === 'bom' ? e : null;
	});
</script>

<section class="nbp panel" aria-label="Research nebula summary">
	<div class="eyebrow">Knowledge lens</div>
	<h2>Research Nebula</h2>

	{#if focusBom}
		<div class="focus">
			<span>Upstream of <b>{focusBom.name}</b></span>
			<button type="button" class="hud-btn" onclick={() => (explorer.selectedId = null)}>clear</button>
		</div>
	{/if}

	{#if !layout}
		<p class="dim">{nebula.loading ? 'Loading questions…' : ''}</p>
	{:else}
		<div class="eyebrow sec">Questions by phase · {layout.rqs.length}</div>
		<ul class="bars">
			{#each byPhase as row (row.p.id)}
				<li>
					<span class="ph" style="color:{PHASE_COLORS[row.p.id]}">{phaseLabel(row.p)}</span>
					<span class="bar">
						{#each row.counts as c (c.s)}
							{#if c.n}<i style="flex:{c.n};background:{RQ_STATUS_COLORS[c.s]}" title="{c.n} {c.s}"></i>{/if}
						{/each}
					</span>
					<span class="n">{row.total}</span>
				</li>
			{/each}
		</ul>

		<div class="eyebrow sec">Phase 0 threads</div>
		<ul class="bars">
			{#each threads as th (th.thread.id)}
				<li title={th.thread.description}>
					<span class="th" style="color:{th.thread.color}">{th.thread.name}</span>
					<span class="bar thin"><i style="flex:{th.answered};background:{th.thread.color}"></i><i style="flex:{th.total - th.answered};background:rgba(148,163,184,.15)"></i></span>
					<span class="n">{th.answered}/{th.total}</span>
				</li>
			{/each}
		</ul>

		<div class="eyebrow sec">Critical path</div>
		<p class="kv">
			{critical.filter((q) => q.status === 'answered').length} of {critical.length} answered ·
			gates {gates.passed}/{gates.totalGates} passed · {gates.metCriteria}/{gates.totalCriteria} criteria met
		</p>
	{/if}

	<div class="eyebrow sec">Legend</div>
	<ul class="legend">
		<li><span class="k crystal"></span>Answered · crystal</li>
		<li><span class="k live"></span>Investigating · live core</li>
		<li><span class="k haze"></span>Open · haze</li>
		<li><span class="k artery"></span>Critical-path dependency (flows to dependent)</li>
		<li><span class="k dep"></span>Dependency · <span class="k rel"></span>related</li>
		<li><span class="k gate"></span>Decision gate · fill = criteria met</li>
	</ul>
	<p class="foot">Clusters orbit the BOM item that raised them. Click a BOM label to trace its upstream questions.</p>
</section>

<style>
	.nbp {
		padding: 10px 12px 12px;
		flex: none;
	}
	h2 {
		margin: 2px 0 6px;
		font-family: var(--font-cond);
		font-size: 20px;
		font-weight: 600;
		color: #fff;
	}
	.focus {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		padding: 6px 8px;
		border: 1px solid var(--hud-line-strong);
		margin: 6px 0;
	}
	.focus b {
		color: #fff;
		font-weight: 500;
	}
	.sec {
		margin-top: 12px;
		font-size: 10px;
	}
	.bars {
		list-style: none;
		padding: 0;
		margin: 4px 0 0;
	}
	.bars li {
		display: grid;
		grid-template-columns: 46px 1fr 34px;
		align-items: center;
		gap: 8px;
		font-size: 10.5px;
		margin: 3px 0;
	}
	.bars li:has(.th) {
		grid-template-columns: 120px 1fr 34px;
	}
	.th {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.bar {
		display: flex;
		height: 6px;
		gap: 1px;
	}
	.bar.thin {
		height: 4px;
	}
	.bar i {
		display: block;
	}
	.n {
		text-align: right;
		color: var(--hud-dim);
		font-variant-numeric: tabular-nums;
	}
	.kv {
		margin: 4px 0 0;
		font-size: 11px;
	}
	.dim {
		color: var(--hud-dim);
		font-size: 11px;
	}
	.legend {
		list-style: none;
		padding: 0;
		margin: 4px 0 0;
		font-size: 10.5px;
		color: #b9c7d6;
	}
	.legend li {
		display: flex;
		align-items: center;
		gap: 7px;
		margin: 3px 0;
	}
	.k {
		width: 10px;
		height: 10px;
		flex: none;
		display: inline-block;
	}
	.crystal {
		background: #34d399;
		clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
	}
	.live {
		background: #fbbf24;
		transform: rotate(45deg) scale(0.75);
		box-shadow: 0 0 6px #fbbf24;
	}
	.haze {
		background: radial-gradient(circle, rgba(100, 116, 139, 0.9), transparent 70%);
	}
	.artery {
		height: 3px;
		background: #f87171;
		box-shadow: 0 0 4px #f87171;
	}
	.dep {
		height: 1px;
		background: #7dd3fc;
	}
	.rel {
		height: 1px;
		background: #64748b;
	}
	.gate {
		border: 2px solid #34d399;
		border-left-color: #475569;
		border-radius: 50%;
	}
	.foot {
		margin: 10px 0 0;
		font-size: 10px;
		color: var(--hud-faint);
		line-height: 1.45;
	}
</style>
