<script lang="ts">
	import { explorer } from '../core/state.svelte';
	import { delib } from '../core/delibstore.svelte';
	import { familyOf } from '../core/deliberation';
	import { MODEL_COLORS, PHASE_COLORS } from '../core/theme';
	import { MODEL_DISPLAY_NAMES, type DiscussionModelId } from '$lib/types/discussion';

	const thread = $derived(delib.thread);
	const n = $derived(thread?.rounds?.length ?? 0);
	const last = $derived(n + (thread?.status === 'concluded' ? 1 : 0));

	let playing = $state(false);
	$effect(() => {
		if (!playing) return;
		const id = setInterval(() => {
			if (explorer.delibRound >= last) playing = false;
			else explorer.delibRound++;
		}, 3500);
		return () => clearInterval(id);
	});
</script>

<section class="cp panel" aria-label="Deliberation chamber">
	<div class="eyebrow">Consensus lens</div>
	<h2>Deliberation Chamber</h2>

	{#if thread}
		<div class="cur">
			<span class="q" style="color:{PHASE_COLORS[thread.phaseId]}">{thread.questionId.toUpperCase()}</span>
			<b>{thread.questionTitle}</b>
		</div>
		<div class="transport">
			<button type="button" class="hud-btn" onclick={() => (explorer.delibRound = Math.max(1, explorer.delibRound - 1))} disabled={explorer.delibRound <= 1}>◀</button>
			<button type="button" class="hud-btn" class:on={playing} onclick={() => (playing = !playing)}>{playing ? '❚❚' : '▶'} replay</button>
			<button type="button" class="hud-btn" onclick={() => (explorer.delibRound = Math.min(last, explorer.delibRound + 1))} disabled={explorer.delibRound >= last}>▶</button>
			<span class="rd">{explorer.delibRound > n ? 'Conclusion' : `Round ${explorer.delibRound} / ${n}`}</span>
		</div>
		<ul class="rounds">
			{#each thread.rounds as r (r.roundNumber)}
				<li>
					<button type="button" class:on={r.roundNumber === explorer.delibRound} onclick={() => (explorer.delibRound = r.roundNumber)}>
						R{r.roundNumber}
						<i style="background:{MODEL_COLORS[familyOf(r.winnerId)]}" title="winner {MODEL_DISPLAY_NAMES[r.winnerId]}"></i>
					</button>
				</li>
			{/each}
			{#if thread.status === 'concluded'}
				<li><button type="button" class:on={explorer.delibRound > n} onclick={() => (explorer.delibRound = n + 1)}>◆</button></li>
			{/if}
		</ul>
	{:else if explorer.delibSlug}
		<p class="dim">Loading discussion…</p>
	{:else}
		<p class="dim">Choose a discussion to replay.</p>
	{/if}

	<div class="eyebrow sec">Discussions · {delib.list.length}</div>
	<ul class="list">
		{#each delib.list as d (d.slug)}
			<li>
				<button type="button" class:on={explorer.delibSlug === d.slug} onclick={() => explorer.openDeliberation(d.slug)}>
					<span class="q" style="color:{PHASE_COLORS[d.phaseId]}">{d.questionId.replace('rq-', '')}</span>
					<span class="t">{d.title}</span>
					<span class="w">
						{#each Object.entries(d.winners) as [m, k] (m)}
							<i style="background:{MODEL_COLORS[familyOf(m as DiscussionModelId)]}" title="{MODEL_DISPLAY_NAMES[m as DiscussionModelId]} won {k}"></i>
						{/each}
					</span>
				</button>
			</li>
		{/each}
	</ul>

	<div class="eyebrow sec">Legend</div>
	<ul class="legend">
		<li><span class="k beam"></span>Response · height = word count</li>
		<li><span class="k" style="--c:#34d399"></span>Approve · <span class="k" style="--c:#fbbf24"></span>neutral · <span class="k" style="--c:#f87171"></span>reject</li>
		<li><span class="k ring"></span>Self-vote (weighted ×{thread?.config?.selfVoteWeight ?? 0.5}) · <span class="k crown"></span>round winner</li>
		<li><span class="k oct"></span>Votes to conclude · grey = continue</li>
	</ul>
</section>

<style>
	.cp {
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
	.cur {
		display: flex;
		flex-direction: column;
		font-size: 11.5px;
		gap: 2px;
		padding: 6px 0;
		border-top: 1px solid var(--hud-line);
	}
	.cur b {
		font-weight: 500;
		color: #fff;
	}
	.q {
		font-size: 10px;
	}
	.transport {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-top: 4px;
	}
	.rd {
		margin-left: auto;
		font-size: 10.5px;
		color: var(--hud-dim);
	}
	.rounds {
		display: flex;
		gap: 4px;
		list-style: none;
		padding: 0;
		margin: 6px 0 0;
	}
	.rounds button {
		display: flex;
		align-items: center;
		gap: 4px;
		background: none;
		border: 1px solid var(--hud-line);
		color: var(--hud-text);
		font-size: 10px;
		padding: 2px 6px;
		cursor: pointer;
	}
	.rounds button.on {
		border-color: var(--hud-accent);
		color: var(--hud-accent);
	}
	.rounds i,
	.w i {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		display: inline-block;
	}
	.sec {
		margin-top: 12px;
		font-size: 10px;
	}
	.list {
		list-style: none;
		padding: 0;
		margin: 4px 0 0;
		max-height: 230px;
		overflow-y: auto;
		scrollbar-width: thin;
	}
	.list button {
		display: grid;
		grid-template-columns: 34px 1fr auto;
		gap: 6px;
		align-items: center;
		width: 100%;
		background: none;
		border: 1px solid transparent;
		padding: 3px;
		color: var(--hud-text);
		font-size: 10.5px;
		text-align: left;
		cursor: pointer;
	}
	.list button:hover,
	.list button.on {
		border-color: var(--hud-line-strong);
	}
	.t {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.w {
		display: flex;
		gap: 2px;
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
		gap: 6px;
		margin: 3px 0;
	}
	.k {
		width: 12px;
		height: 3px;
		background: var(--c, #94a3b8);
		display: inline-block;
		flex: none;
	}
	.beam {
		width: 5px;
		height: 12px;
		background: #e07a50;
	}
	.ring {
		width: 10px;
		height: 10px;
		background: none;
		border: 1px solid #34d399;
		border-radius: 50%;
	}
	.crown {
		width: 10px;
		height: 10px;
		background: none;
		border: 2px solid #fde68a;
		border-radius: 50%;
	}
	.oct {
		width: 8px;
		height: 8px;
		background: #34d399;
		transform: rotate(45deg);
	}
</style>
