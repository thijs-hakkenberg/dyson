<script lang="ts">
	import { explorer, LAYER_LABELS, type LayerId } from '../core/state.svelte';
	import { CLOUDS, cloudCounts } from '../core/clouds';
	import { getEntity } from '../core/registry';
	import { MODEL_COLORS, PHASE_COLORS } from '../core/theme';
	import { NEA_COUNT } from '../core/nea';
	import { formatCount } from '../core/units';

	let open = $state(false);

	const layerIds = Object.keys(LAYER_LABELS) as LayerId[];
	const coarseYear = $derived(Math.round(explorer.year * 4) / 4);
	const sampling = $derived(
		CLOUDS.map((c) => ({ c, n: cloudCounts(c, coarseYear), e: getEntity(c.bomId)! })).filter((x) => x.n.rendered > 0)
	);
</script>

<aside class="layers panel" class:closed={!open} aria-label="Layers and legend">
	<button type="button" class="toggle eyebrow" onclick={() => (open = !open)} aria-expanded={open}>
		Layers {open ? '−' : '+'}
	</button>
	{#if open}
		<ul>
			{#each layerIds as id (id)}
				<li>
					<label>
						<input type="checkbox" checked={explorer.layers[id]} onchange={() => explorer.toggleLayer(id)} />
						<span class="sw" style="--c:{PHASE_COLORS[id] ?? 'var(--hud-accent)'}"></span>
						{LAYER_LABELS[id]}
					</label>
				</li>
			{/each}
		</ul>

		<div class="eyebrow sec">Epistemic status</div>
		<ul class="legend">
			<li><span class="k solid"></span>Observed · ephemeris (true scale)</li>
			<li><span class="k translucent"></span>Projected · consensus baseline</li>
			<li><span class="k dashed"></span>Divergent alternative (model colour)</li>
			<li><span class="k dots"></span>Synthetic population ({formatCount(NEA_COUNT)} NEAs)</li>
		</ul>
		<div class="models">
			{#each Object.entries(MODEL_COLORS) as [m, c] (m)}<span style="--c:{c}">{m}</span>{/each}
		</div>

		{#if sampling.length}
			<div class="eyebrow sec">Marker sampling</div>
			<ul class="legend small">
				{#each sampling as s (s.c.bomId)}
					<li title={s.e.name}>
						<span class="nm">{s.e.name}</span>
						{s.n.ratio <= 1.0001 ? '1:1' : `1 : ${formatCount(s.n.ratio)}`}
					</li>
				{/each}
			</ul>
		{/if}
		<p class="foot">Bodies and distances true scale. Markers and swarm points are fixed screen size. Matrioshka layers below 1000 K false-coloured. Sun shown Hα-style (false colour); prominences and corona illustrative.</p>
		<p class="foot">
			Planet textures: <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener">Solar System Scope</a>,
			<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>. Milky Way:
			<a href="https://www.eso.org/public/images/eso0932a/" target="_blank" rel="noopener">ESO/S. Brunier</a>, CC BY 4.0.
		</p>
	{/if}
</aside>

<style>
	.layers {
		padding: 8px 12px 10px;
		flex: none;
	}
	.layers.closed {
		width: auto;
	}
	.toggle {
		background: none;
		border: 0;
		padding: 0;
		cursor: pointer;
		width: 100%;
		text-align: left;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 6px 0 0;
	}
	li {
		margin: 3px 0;
		font-size: 11px;
	}
	label {
		display: flex;
		align-items: center;
		gap: 6px;
		cursor: pointer;
	}
	input {
		accent-color: var(--hud-accent);
		margin: 0;
	}
	.sw {
		width: 8px;
		height: 8px;
		background: var(--c);
	}
	.sec {
		margin-top: 12px;
		font-size: 10px;
	}
	.legend li {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #b9c7d6;
	}
	.k {
		width: 18px;
		height: 8px;
		flex: none;
	}
	.k.solid {
		background: #4f86c6;
	}
	.k.translucent {
		background: rgba(34, 211, 238, 0.35);
		border: 1px solid #22d3ee;
	}
	.k.dashed {
		border-top: 1px dashed #e07a50;
		height: 0;
	}
	.k.dots {
		background: radial-gradient(circle, #8a96a8 1px, transparent 1.5px) 0 0 / 5px 5px;
	}
	.models {
		display: flex;
		gap: 6px;
		margin-top: 6px;
	}
	.models span {
		font-size: 10px;
		border: 1px solid var(--c);
		color: var(--c);
		padding: 0 5px;
	}
	.small li {
		justify-content: space-between;
	}
	.nm {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 150px;
		color: var(--hud-dim);
	}
	.foot a {
		color: var(--hud-dim);
	}
	.foot {
		margin: 10px 0 0;
		font-size: 10px;
		color: var(--hud-faint);
		line-height: 1.45;
	}
</style>
