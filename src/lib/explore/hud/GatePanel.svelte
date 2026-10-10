<script lang="ts">
	import { explorer, TODAY_YEAR } from '../core/state.svelte';
	import { layoutTunnel, phase0MonthToYear } from '../core/gates';
	import { getGateStats } from '$lib/services/decision-gates';
	import { RISK_LABELS } from '$lib/services/trl-assessment';

	const L = layoutTunnel(TODAY_YEAR);
	const stats = getGateStats();
	const lateTotal = L.gates.reduce((s, g) => s + g.late.length, 0);
	const STATUS: Record<string, string> = {
		'not-started': 'not started',
		'in-progress': 'in progress',
		'evidence-gathering': 'gathering evidence',
		'ready-for-review': 'ready for review'
	};
</script>

<section class="gp panel" aria-label="Decision gates">
	<div class="eyebrow">Gates lens</div>
	<h2>Gate Tunnel</h2>
	<p class="kv">
		{stats.passed}/{stats.totalGates} gates passed · {stats.metCriteria}/{stats.totalCriteria} criteria met
		{#if lateTotal}<br /><span class="bad">{lateTotal} technology dependencies projected to arrive after their gate</span>{/if}
	</p>

	<div class="eyebrow sec">Gates in decision order</div>
	<ul class="gates">
		{#each L.gates as g (g.gate.id)}
			<li>
				<button type="button" class:on={explorer.gateSel === g.gate.id} onclick={() => (explorer.gateSel = g.gate.id)}>
					<span class="m">M{g.gate.decisionMonth}</span>
					<span class="nm">
						{g.gate.name}
						<i>{STATUS[g.gate.status] ?? g.gate.status} · {Math.round(phase0MonthToYear(g.gate.decisionMonth))}{g.late.length ? ` · ${g.late.length} late` : ''}</i>
					</span>
					<span class="crit">
						{#each g.gate.criteria as c (c.id)}<b class:met={c.met} class:late={!c.met && g.late.length > 0}></b>{/each}
					</span>
				</button>
			</li>
		{/each}
	</ul>

	<div class="eyebrow sec">Legend</div>
	<ul class="legend">
		<li><span class="k ring"></span>Gate ring · one arc per criterion (lit = met)</li>
		<li><span class="k col"></span>Technology · solid = current TRL, outline = target</li>
		<li><span class="k ok"></span>Feeds gate in time · <span class="k lt"></span>arrives late</li>
		{#each Object.entries(RISK_LABELS) as [k, v] (k)}
			<li><span class="k risk" style="--c:{v.color}"></span>If it fails: {v.label}</li>
		{/each}
	</ul>
	<p class="foot">
		Axis = months from Phase 0 start (assumed 2030). Columns sit at today + years-to-target; the floor strip runs to the
		pessimistic estimate. Labels shown for project-ending technologies; select a gate to see its dependencies.
	</p>
</section>

<style>
	.gp {
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
	.kv {
		margin: 0;
		font-size: 11px;
		line-height: 1.5;
	}
	.bad {
		color: var(--hud-bad);
	}
	.sec {
		margin-top: 12px;
		font-size: 10px;
	}
	.gates {
		list-style: none;
		padding: 0;
		margin: 4px 0 0;
	}
	.gates button {
		display: grid;
		grid-template-columns: 30px 1fr auto;
		gap: 6px;
		align-items: center;
		width: 100%;
		background: none;
		border: 1px solid transparent;
		padding: 4px 4px;
		text-align: left;
		cursor: pointer;
		color: var(--hud-text);
		font-size: 11px;
	}
	.gates button:hover,
	.gates button.on {
		border-color: var(--hud-line-strong);
		background: rgba(125, 211, 252, 0.05);
	}
	.m {
		color: var(--hud-warn);
		font-variant-numeric: tabular-nums;
	}
	.nm {
		display: flex;
		flex-direction: column;
		line-height: 1.25;
	}
	.nm i {
		font-style: normal;
		font-size: 9.5px;
		color: var(--hud-dim);
	}
	.crit {
		display: flex;
		gap: 2px;
	}
	.crit b {
		width: 6px;
		height: 10px;
		background: #334155;
	}
	.crit b.met {
		background: #34d399;
	}
	.crit b.late {
		background: rgba(248, 113, 113, 0.6);
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
	.ring {
		border: 2px solid #64748b;
		border-top-color: #34d399;
		border-radius: 50%;
	}
	.col {
		background: linear-gradient(#94a3b8 50%, transparent 50%);
		border: 1px solid #94a3b8;
		width: 6px;
	}
	.ok {
		height: 2px;
		background: #34d399;
	}
	.lt {
		height: 2px;
		background: #f87171;
	}
	.risk {
		border: 1px dashed var(--c);
	}
	.foot {
		margin: 10px 0 0;
		font-size: 10px;
		color: var(--hud-faint);
		line-height: 1.45;
	}
</style>
