<script lang="ts">
	import { explorer } from '../core/state.svelte';
	import { TIMELINE } from '../core/timeline';
	import { deploymentFraction } from '../core/timeline';
	import { formatYear } from '../core/units';
	import { PHASE_COLORS } from '../core/theme';
	import { getOverallStats } from '$lib/services/critical-path';
	import { getGateStats } from '$lib/services/decision-gates';

	const rq = getOverallStats();
	const gates = getGateStats();
	const today = new Date().toISOString().slice(0, 10);

	const LENSES = [
		{ id: 'physical', label: 'Physical', ready: true },
		{ id: 'logistics', label: 'Logistics', ready: false },
		{ id: 'knowledge', label: 'Knowledge', ready: false },
		{ id: 'consensus', label: 'Consensus', ready: false },
		{ id: 'risk', label: 'Risk', ready: false }
	];

	const active = $derived(
		TIMELINE.filter((w) => explorer.year >= w.start && explorer.year < w.end).map((w) => ({
			...w,
			pct: Math.round(deploymentFraction(w.id, explorer.year) * 100)
		}))
	);
</script>

<header class="top">
	<div class="brand panel">
		<div class="mark" aria-hidden="true">◈</div>
		<div>
			<div class="title">Project Dyson</div>
			<div class="eyebrow">System operations · {explorer.workbenchId ? 'BOM workbench' : 'Orrery'}</div>
		</div>
	</div>

	<nav class="lenses panel" aria-label="Lenses">
		{#each LENSES as l (l.id)}
			<button
				type="button"
				class="hud-btn"
				class:on={l.id === 'physical'}
				disabled={!l.ready}
				title={l.ready ? '' : 'Coming in a later milestone'}>{l.label}</button
			>
		{/each}
	</nav>

	<div class="clocks">
		<div class="clock panel">
			<div class="eyebrow">Construction T <span class="tag proj">Projected</span></div>
			<div class="time">{formatYear(explorer.year)}</div>
			<div class="detail">
				{#if active.length}
					{#each active as a (a.id)}
						<span style="color:{PHASE_COLORS[a.id]}">{a.label} {a.pct}%</span>
					{/each}
				{:else if explorer.year < TIMELINE[0].start}
					<span>Pre-deployment · research</span>
				{:else}
					<span>All phases nominally complete</span>
				{/if}
			</div>
		</div>
		<div class="clock panel">
			<div class="eyebrow">Knowledge T <span class="tag act">Actual</span></div>
			<div class="time">{today}</div>
			<div class="detail">
				<span title="Phase 0 research questions">
					RQ <b class="ok">{rq.answered}</b>✓ <b class="warn">{rq.investigating}</b>◐ <b>{rq.open}</b>○ / {rq.total}
				</span>
				<span title="Decision gate criteria met">Gates {gates.metCriteria}/{gates.totalCriteria}</span>
			</div>
		</div>
	</div>
</header>

<style>
	.top {
		position: absolute;
		top: 12px;
		left: 12px;
		right: 12px;
		display: flex;
		gap: 10px;
		align-items: flex-start;
		pointer-events: none;
	}
	.top > * {
		pointer-events: auto;
	}
	.brand {
		display: flex;
		gap: 10px;
		align-items: center;
		padding: 8px 14px 8px 10px;
	}
	.mark {
		font-size: 22px;
		color: var(--hud-accent);
		line-height: 1;
	}
	.title {
		font-family: var(--font-cond);
		font-size: 17px;
		font-weight: 600;
		letter-spacing: 0.22em;
		text-transform: uppercase;
	}
	.lenses {
		display: flex;
		gap: 4px;
		padding: 6px;
	}
	.clocks {
		margin-left: auto;
		display: flex;
		gap: 8px;
	}
	.clock {
		padding: 7px 12px;
		min-width: 190px;
	}
	.time {
		font-size: 20px;
		letter-spacing: 0.04em;
		font-variant-numeric: tabular-nums;
		color: #fff;
		margin: 2px 0;
	}
	.detail {
		display: flex;
		gap: 10px;
		font-size: 11px;
		color: var(--hud-dim);
	}
	.tag.proj {
		color: var(--hud-warn);
		margin-left: 4px;
	}
	.tag.act {
		color: var(--hud-ok);
		margin-left: 4px;
	}
	.ok {
		color: var(--hud-ok);
		font-weight: 500;
	}
	.warn {
		color: var(--hud-warn);
		font-weight: 500;
	}
	@media (max-width: 900px) {
		.lenses {
			display: none;
		}
		.top {
			flex-wrap: wrap;
		}
		.clocks {
			margin-left: 0;
			width: 100%;
		}
		.clock {
			flex: 1;
			min-width: 0;
		}
	}
</style>
