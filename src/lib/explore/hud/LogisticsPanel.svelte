<script lang="ts">
	import { explorer } from '../core/state.svelte';
	import { chainsAt, formatTonnesPerYear } from '../core/logistics';

	const coarse = $derived(Math.round(explorer.year * 20) / 20);
	const states = $derived(chainsAt(coarse));
	const total = $derived(states.filter((s) => s.active).reduce((a, s) => a + s.flow, 0));
</script>

<section class="lp panel" aria-label="Logistics">
	<div class="eyebrow">Logistics lens</div>
	<h2>Mass flow</h2>
	<div class="big">
		<span class="lbl">Delivered through all chains</span>
		<b>{formatTonnesPerYear(total)}</b>
	</div>
	<ul class="chains">
		{#each states as s (s.chain.id)}
			<li class:off={!s.active}>
				<div class="head">
					<span class="sw" style="--c:{s.chain.color}"></span>
					<span class="nm">{s.chain.label}</span>
					<span class="v">{s.active ? formatTonnesPerYear(s.flow) : 'not started'}</span>
				</div>
				{#if s.active}
					<ol>
						{#each s.chain.stages as st (st.id)}
							<li class:bn={s.bottleneck?.id === st.id}>
								<button type="button" onclick={() => explorer.select(st.bomId)}>
									<span>{st.label}</span>
									<span class="cap">{Number.isFinite(st.capacity) ? formatTonnesPerYear(st.capacity) : 'sink'}</span>
								</button>
							</li>
						{/each}
					</ol>
					<p class="note">{s.chain.note}</p>
				{/if}
			</li>
		{/each}
	</ul>
	<p class="foot">
		Flow = weakest stage (red). Capacities = deployed units × consensus per-unit throughput. Particle motion is schematic,
		not transfer-orbit time.
	</p>
</section>

<style>
	.lp {
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
	.big {
		display: flex;
		flex-direction: column;
		padding-top: 6px;
		border-top: 1px solid var(--hud-line);
	}
	.big b {
		font-family: var(--font-cond);
		font-size: 22px;
		font-weight: 600;
		color: var(--hud-accent);
	}
	.lbl {
		font-family: var(--font-cond);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--hud-dim);
	}
	.chains {
		list-style: none;
		padding: 0;
		margin: 8px 0 0;
	}
	.chains > li {
		margin: 8px 0;
	}
	.off {
		opacity: 0.45;
	}
	.head {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 11px;
	}
	.sw {
		width: 10px;
		height: 3px;
		background: var(--c);
		box-shadow: 0 0 4px var(--c);
	}
	.nm {
		flex: 1;
		color: #fff;
	}
	.v {
		color: var(--hud-accent);
		font-variant-numeric: tabular-nums;
	}
	ol {
		list-style: none;
		padding: 0 0 0 14px;
		margin: 3px 0 0;
		border-left: 1px solid var(--hud-line);
	}
	ol button {
		display: flex;
		justify-content: space-between;
		width: 100%;
		background: none;
		border: 0;
		padding: 1px 0;
		color: #b9c7d6;
		font-size: 10.5px;
		cursor: pointer;
		text-align: left;
	}
	ol button:hover {
		color: #fff;
	}
	.bn button {
		color: var(--hud-bad);
	}
	.cap {
		font-variant-numeric: tabular-nums;
	}
	.note,
	.foot {
		margin: 3px 0 0 14px;
		font-size: 9.5px;
		color: var(--hud-faint);
		line-height: 1.4;
	}
	.foot {
		margin: 10px 0 0;
	}
</style>
