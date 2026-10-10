<script lang="ts">
	import { explorer } from '../core/state.svelte';
	import {
		COLLECTORS_PER_SHEPHERD,
		LINK_COLORS,
		LINK_LABELS,
		SIGNAL_SPEEDUP,
		networkAt,
		type LinkKind
	} from '../core/network';
	import { LIGHT_SECONDS_PER_AU, formatCount, formatLightTime } from '../core/units';
	import { getEntity } from '../core/registry';

	const coarse = $derived(Math.round(explorer.year * 50) / 50);
	const net = $derived(networkAt(coarse));
	const fmt = (s: number) => formatLightTime(s / LIGHT_SECONDS_PER_AU);

	const classes = $derived(
		(Object.keys(LINK_LABELS) as LinkKind[])
			.map((k) => {
				const ls = net.links.filter((l) => l.kind === k);
				return {
					k,
					n: ls.length,
					min: Math.min(...ls.map((l) => l.latency)),
					max: Math.max(...ls.map((l) => l.latency))
				};
			})
			.filter((c) => c.n > 0)
	);

	/** Worst-case command round trip from Earth: Earth → hub → farthest node it serves. */
	const worstRoundTrip = $derived.by(() => {
		const toHub = new Map(net.links.filter((l) => l.a === 'net:earth').map((l) => [l.b, l.latency]));
		let worst = 0;
		for (const l of net.links) {
			const viaHub = toHub.get(l.a);
			if (viaHub !== undefined && l.a !== 'net:earth') worst = Math.max(worst, viaHub + l.latency);
		}
		for (const v of toHub.values()) worst = Math.max(worst, v);
		return 2 * worst;
	});
</script>

<section class="np panel" aria-label="Network topology">
	<div class="eyebrow">Network lens</div>
	<h2>Topology &amp; light-time</h2>

	{#if !net.links.length}
		<p class="dim">No network yet — scrub the timeline into Phase 0.</p>
	{:else}
		<div class="big">
			<span class="lbl">Worst command round trip from Earth</span>
			<b>{fmt(worstRoundTrip)}</b>
			<span class="dim">Anything faster than this must be decided locally — the consensus requires Level 4+ autonomy.</span>
		</div>

		<div class="eyebrow sec">Links · one-way light time</div>
		<ul class="rows">
			{#each classes as c (c.k)}
				<li>
					<span class="sw" style="--c:{LINK_COLORS[c.k]}"></span>
					<span class="nm">{LINK_LABELS[c.k]} <i>× {c.n}</i></span>
					<span class="v">{c.min === c.max || c.max - c.min < 0.05 ? fmt(c.max) : `${fmt(c.min)} – ${fmt(c.max)}`}</span>
				</li>
			{/each}
		</ul>

		{#if net.shepherds.length}
			<div class="eyebrow sec">Shepherd coordinators</div>
			<ul class="rows">
				{#each net.shepherds as s (s.bomId)}
					<li>
						<span class="nm">{getEntity(s.bomId)?.name}</span>
						<span class="v">{formatCount(s.represented)}{s.drawn < s.represented ? ` (${s.drawn} drawn)` : ''}</span>
					</li>
				{/each}
			</ul>
			<p class="foot">1 Shepherd per ~{formatCount(COLLECTORS_PER_SHEPHERD)} collectors (consensus: 1,000–5,000).</p>
		{/if}
	{/if}

	<p class="foot">
		Pulses travel at <b>{SIGNAL_SPEEDUP}× light speed</b> so they are visible; latencies are true for the current geometry.
		Swarm authority shown at Sun–Earth L1; inter-shell trunks sampled at 8 per shell.
	</p>
</section>

<style>
	.np {
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
		gap: 2px;
		margin-top: 6px;
		padding-top: 8px;
		border-top: 1px solid var(--hud-line);
	}
	.big b {
		font-family: var(--font-cond);
		font-size: 24px;
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
	.dim {
		font-size: 10.5px;
		color: var(--hud-dim);
		line-height: 1.4;
	}
	.sec {
		margin-top: 12px;
		font-size: 10px;
	}
	.rows {
		list-style: none;
		padding: 0;
		margin: 4px 0 0;
		font-size: 11px;
	}
	.rows li {
		display: flex;
		align-items: center;
		gap: 7px;
		margin: 3px 0;
	}
	.sw {
		width: 12px;
		height: 2px;
		background: var(--c);
		flex: none;
	}
	.nm {
		flex: 1;
		color: #b9c7d6;
	}
	.nm i {
		font-style: normal;
		color: var(--hud-faint);
	}
	.v {
		color: #fff;
		font-variant-numeric: tabular-nums;
		text-align: right;
	}
	.foot {
		margin: 10px 0 0;
		font-size: 10px;
		color: var(--hud-faint);
		line-height: 1.45;
	}
	.foot b {
		color: var(--hud-warn);
		font-weight: 500;
	}
</style>
