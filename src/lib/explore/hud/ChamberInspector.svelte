<script lang="ts">
	/** Reader for the Deliberation Chamber: responses, vote reasoning, conclusion. */
	import { explorer } from '../core/state.svelte';
	import { delib } from '../core/delibstore.svelte';
	import { renderMarkdown } from '../core/wbstore.svelte';
	import { VOTE_COLORS, familyOf, roundScores, roundVotes } from '../core/deliberation';
	import { MODEL_COLORS } from '../core/theme';
	import { MODEL_DISPLAY_NAMES, type DiscussionModelId } from '$lib/types/discussion';

	const thread = $derived(delib.thread);
	const pickId = $derived(explorer.delibPick);
	const round = $derived(thread?.rounds?.find((r) => r.roundNumber === explorer.delibRound));

	const resp = $derived.by(() => {
		const m = pickId?.match(/^resp:(\d+):(.+)$/);
		if (!m || !thread) return null;
		const r = thread.rounds.find((x) => x.roundNumber === Number(m[1]));
		const x = r?.responses.find((y) => y.modelId === m[2]);
		return x && r ? { r, x } : null;
	});
	const vote = $derived.by(() => {
		const m = pickId?.match(/^vote:(\d+):(.+)>(.+)$/);
		if (!m || !thread) return null;
		const r = thread.rounds.find((x) => x.roundNumber === Number(m[1]));
		return r ? roundVotes(r).find((a) => a.voter === m[2] && a.target === m[3]) ?? null : null;
	});
	const name = (m: string) => MODEL_DISPLAY_NAMES[m as DiscussionModelId] ?? m;
	const color = (m: string) => MODEL_COLORS[familyOf(m as DiscussionModelId)];
</script>

{#if thread}
	<aside class="ci panel" aria-label="Deliberation reader">
		{#if resp}
			<header>
				<div class="eyebrow" style="color:{color(resp.x.modelId)}">Round {resp.r.roundNumber} · response{resp.r.winnerId === resp.x.modelId ? ' · round winner' : ''}</div>
				<h2>{name(resp.x.modelId)}</h2>
			</header>
			<div class="body md">{@html renderMarkdown(resp.x.content)}</div>
		{:else if vote}
			<header>
				<div class="eyebrow">Vote · round {pickId?.split(':')[1]}</div>
				<h2>
					<span style="color:{color(vote.voter)}">{name(vote.voter)}</span> →
					<span style="color:{color(vote.target)}">{name(vote.target)}</span>
				</h2>
				<span class="tag" style="color:{VOTE_COLORS[vote.vote]}">{vote.vote}</span>
			</header>
			<div class="body"><p>{vote.reasoning ?? 'No reasoning recorded.'}</p></div>
		{:else if pickId === 'conclusion' || (explorer.delibRound > (thread.rounds?.length ?? 0) && thread.conclusion)}
			<header>
				<div class="eyebrow">Conclusion · {thread.terminationReason ?? thread.status}</div>
				<h2>{thread.questionTitle}</h2>
			</header>
			<div class="body">
				{#if thread.conclusion}
					<div class="md">{@html renderMarkdown(thread.conclusion.summary)}</div>
					{#if thread.conclusion.keyPoints?.length}<h3>Key points</h3><ul>{#each thread.conclusion.keyPoints as k (k)}<li>{@html renderMarkdown(k, true)}</li>{/each}</ul>{/if}
					{#if thread.conclusion.unresolvedQuestions?.length}<h3>Still unresolved</h3><ul>{#each thread.conclusion.unresolvedQuestions as k (k)}<li>{@html renderMarkdown(k, true)}</li>{/each}</ul>{/if}
					{#if thread.conclusion.recommendedActions?.length}<h3>Recommended actions</h3><ul>{#each thread.conclusion.recommendedActions as k (k)}<li>{@html renderMarkdown(k, true)}</li>{/each}</ul>{/if}
				{:else}
					<p class="dim">No conclusion document.</p>
				{/if}
			</div>
		{:else if round}
			{@const scores = roundScores(round, thread.config?.selfVoteWeight ?? 0.5)}
			<header>
				<div class="eyebrow">Round {round.roundNumber} of {thread.rounds.length}</div>
				<h2>{thread.questionTitle}</h2>
			</header>
			<div class="body">
				<h3>Scores (self-votes ×{thread.config?.selfVoteWeight ?? 0.5})</h3>
				<ul class="scores">
					{#each round.responses as x (x.modelId)}
						<li>
							<button type="button" onclick={() => (explorer.delibPick = `resp:${round.roundNumber}:${x.modelId}`)}>
								<span style="color:{color(x.modelId)}">{name(x.modelId)}{round.winnerId === x.modelId ? ' ♛' : ''}</span>
								<b>{(scores[x.modelId] ?? 0).toFixed(1)}</b>
							</button>
						</li>
					{/each}
				</ul>
				<h3>Votes</h3>
				<ul class="votes">
					{#each roundVotes(round) as a (a.id)}
						<li>
							<button type="button" onclick={() => (explorer.delibPick = `vote:${a.id}`)}>
								<i style="background:{VOTE_COLORS[a.vote]}"></i>
								<span style="color:{color(a.voter)}">{name(a.voter)}</span> → <span style="color:{color(a.target)}">{name(a.target)}</span>
								<em>{a.vote.toLowerCase()}</em>
							</button>
						</li>
					{/each}
				</ul>
				{#if round.terminationVotes?.length}
					<h3>Ready to conclude?</h3>
					<ul class="votes">
						{#each round.terminationVotes as tv (tv.modelId)}
							<li><span style="color:{color(tv.modelId)}">{name(tv.modelId)}</span> <em>{tv.vote.toLowerCase()}</em></li>
						{/each}
					</ul>
				{/if}
				<button type="button" class="hud-btn" onclick={() => explorer.showQuestion(thread.questionId)}>Show question in Research Nebula</button>
				<br /><a class="out" href="/questions/{thread.questionSlug}">Question page →</a>
			</div>
		{/if}
	</aside>
{/if}

<style>
	.ci {
		position: absolute;
		top: 92px;
		right: 12px;
		bottom: 24px;
		width: 420px;
		display: flex;
		flex-direction: column;
	}
	header {
		padding: 12px 14px 10px;
		border-bottom: 1px solid var(--hud-line);
	}
	h2 {
		margin: 4px 0 4px;
		font-family: var(--font-cond);
		font-size: 19px;
		font-weight: 600;
		line-height: 1.15;
		color: #fff;
	}
	h3 {
		margin: 14px 0 4px;
		font-family: var(--font-cond);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--hud-accent);
	}
	.tag {
		border: 1px solid currentColor;
		padding: 0 5px;
		font-size: 10px;
	}
	.body {
		padding: 10px 14px 14px;
		overflow-y: auto;
		scrollbar-width: thin;
		font-family: system-ui, sans-serif;
		font-size: 12.5px;
		line-height: 1.5;
		color: #c9d6e3;
	}
	.dim {
		color: var(--hud-dim);
	}
	ul {
		padding-left: 16px;
	}
	.scores,
	.votes {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.scores button,
	.votes button {
		display: flex;
		align-items: center;
		gap: 6px;
		width: 100%;
		background: none;
		border: 0;
		padding: 2px 0;
		color: inherit;
		font: inherit;
		font-size: 12px;
		text-align: left;
		cursor: pointer;
	}
	.scores button {
		justify-content: space-between;
	}
	.votes li {
		font-size: 12px;
		margin: 1px 0;
	}
	.votes i {
		width: 8px;
		height: 3px;
		flex: none;
	}
	.votes em {
		margin-left: auto;
		font-style: normal;
		color: var(--hud-dim);
		font-size: 11px;
	}
	.out {
		display: inline-block;
		margin-top: 8px;
		color: var(--hud-accent);
		font-family: var(--font-mono);
		font-size: 11px;
	}
	.hud-btn {
		margin-top: 14px;
	}
	.md :global(h1),
	.md :global(h2),
	.md :global(h3) {
		font-family: var(--font-cond);
		color: #fff;
		font-size: 14px;
		margin: 12px 0 4px;
	}
	.md :global(table) {
		display: block;
		overflow-x: auto;
		font-size: 11px;
		border-collapse: collapse;
	}
	.md :global(td),
	.md :global(th) {
		border: 1px solid var(--hud-line);
		padding: 3px 6px;
	}
	@media (max-width: 900px) {
		.ci {
			top: auto;
			left: 12px;
			right: 12px;
			width: auto;
			bottom: 12px;
			max-height: 45vh;
		}
	}
</style>
