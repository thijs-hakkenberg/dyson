<script lang="ts">
	import { explorer } from '../core/state.svelte';
	import { ENTITIES } from '../core/registry';
	import { riskStore } from '../core/riskstore.svelte';
	import { RISK_LABELS } from '$lib/services/trl-assessment';
	import { VALIDATION_COLORS, W, claimConfidence, riskColor, riskFor } from '../core/risk';
	import { PHASE_COLORS } from '../core/theme';

	const ranked = ENTITIES.filter((e) => e.kind === 'bom' && e.bom)
		.map((e) => ({ e, r: riskFor(e.bom!) }))
		.sort((a, b) => b.r.score - a.r.score);
	const unassessed = ranked.filter((x) => !x.r.assessed).length;
	let showAll = $state(false);
	const shown = $derived(showAll ? ranked : ranked.slice(0, 10));

	const byStatus = $derived(
		Object.keys(VALIDATION_COLORS)
			.map((s) => ({ s, n: riskStore.claims.filter((c) => c.status === s).length }))
			.filter((x) => x.n > 0)
	);
	let open = $state<string | null>(null);
</script>

<section class="rp panel" aria-label="Risk and validation">
	<div class="eyebrow">Risk lens</div>
	<h2>Risk &amp; validation</h2>

	<div class="eyebrow sec">Highest risk items <span class="hint">heuristic</span></div>
	<ul class="rank">
		{#each shown as { e, r } (e.id)}
			<li>
				<button
					type="button"
					class:on={explorer.selectedId === e.id}
					onclick={() => {
						explorer.select(e.id);
						open = open === e.id ? null : e.id;
					}}
				>
					<span class="sc" style="background:{r.assessed ? riskColor(r.score) : '#475569'}">{Math.round(r.score * 100)}</span>
					<span class="nm"><i style="color:{PHASE_COLORS[e.phaseId!]}">{e.id.replace('bom-', '')}</i> {e.name}</span>
				</button>
				{#if open === e.id}
					<dl>
						<dt>Technology</dt>
						<dd>
							{r.technology === null ? 'unassessed' : `${Math.round(r.technology * 100)} × ${W.technology}`}
							{#if r.driver}<span>{r.driver.technology} · TRL {r.driver.currentTRL}→{r.driver.targetTRL} · <b style="color:{RISK_LABELS[r.driver.riskIfFail]?.color}">{RISK_LABELS[r.driver.riskIfFail]?.label}</b></span>{/if}
						</dd>
						<dt>Cost confidence</dt><dd>{Math.round(r.cost * 100)} × {W.cost} <span>{e.bom?.costConfidence ?? 'not stated'}</span></dd>
						<dt>Cost spread</dt><dd>{Math.round(r.spread * 100)} × {W.spread}</dd>
					</dl>
				{/if}
			</li>
		{/each}
	</ul>
	<button type="button" class="hud-btn more" onclick={() => (showAll = !showAll)}>{showAll ? 'Top 10' : `All ${ranked.length}`}</button>
	{#if unassessed}<p class="warn">{unassessed} items have no TRL assessment — their technology risk is unknown, not zero.</p>{/if}

	<div class="eyebrow sec">Validation claims · {riskStore.claims.length}</div>
	<ul class="vs">
		{#each byStatus as x (x.s)}<li><span class="k" style="--c:{VALIDATION_COLORS[x.s]}"></span>{x.n} {x.s}</li>{/each}
	</ul>
	<ul class="claims">
		{#each riskStore.claims as c (c.id)}
			<li>
				<button type="button" onclick={() => c.bomItemId && explorer.select(c.bomItemId)}>
					<span class="k" style="--c:{VALIDATION_COLORS[c.status]}"></span>
					<span class="cl">{c.claim}<i>{c.status} · confidence {claimConfidence(c)}% · {c.bomItemId}</i></span>
				</button>
			</li>
		{/each}
	</ul>
	<p class="foot">
		Halo size/colour = risk score (0.6 technology severity × difficulty (TRL gap blended 70/30 with AD²), 0.25 cost confidence, 0.15 cost spread). Beams =
		validation claims: colour = status, height = latest confidence.
	</p>
</section>

<style>
	.rp {
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
	.sec {
		margin-top: 12px;
		font-size: 10px;
	}
	.hint {
		float: right;
		color: var(--hud-warn);
		letter-spacing: 0.06em;
		text-transform: none;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 4px 0 0;
	}
	.rank button,
	.claims button {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		background: none;
		border: 1px solid transparent;
		padding: 2px 3px;
		color: var(--hud-text);
		font-size: 11px;
		text-align: left;
		cursor: pointer;
	}
	.rank button:hover,
	.rank button.on {
		border-color: var(--hud-line-strong);
	}
	.sc {
		min-width: 24px;
		text-align: center;
		color: #0b1220;
		font-weight: 700;
		font-size: 10px;
		padding: 1px 0;
	}
	.nm {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.nm i {
		font-style: normal;
		font-size: 9.5px;
	}
	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 2px 8px;
		margin: 2px 0 6px 32px;
		font-size: 10px;
	}
	dt {
		color: var(--hud-dim);
	}
	dd {
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	dd span {
		color: var(--hud-dim);
	}
	.more {
		margin-top: 4px;
		font-size: 10px;
		padding: 2px 8px;
	}
	.warn {
		margin: 6px 0 0;
		font-size: 10px;
		color: var(--hud-warn);
		line-height: 1.4;
	}
	.vs {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 12px;
		font-size: 11px;
	}
	.vs li {
		display: flex;
		align-items: center;
		gap: 5px;
	}
	.k {
		width: 3px;
		height: 12px;
		flex: none;
		background: var(--c);
		box-shadow: 0 0 4px var(--c);
	}
	.claims {
		max-height: 220px;
		overflow-y: auto;
		scrollbar-width: thin;
	}
	.claims button {
		align-items: flex-start;
	}
	.cl {
		display: flex;
		flex-direction: column;
		font-size: 10.5px;
		line-height: 1.35;
		color: #c9d6e3;
	}
	.cl i {
		font-style: normal;
		font-size: 9.5px;
		color: var(--hud-dim);
	}
	.foot {
		margin: 10px 0 0;
		font-size: 10px;
		color: var(--hud-faint);
		line-height: 1.45;
	}
</style>
