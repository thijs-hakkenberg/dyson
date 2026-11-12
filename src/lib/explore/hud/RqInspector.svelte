<script lang="ts">
	/** Research question reader for the Nebula. */
	import { explorer } from '../core/state.svelte';
	import { nebula } from '../core/nebulastore.svelte';
	import { renderMarkdown } from '../core/wbstore.svelte';
	import { getEntity } from '../core/registry';
	import { PHASE_COLORS, PRIORITY_COLORS, RQ_STATUS_COLORS } from '../core/theme';
	import { TECHNOLOGY_THREADS } from '$lib/services/critical-path';
	import { getGatesForQuestion, getGateReadiness, gateWindow } from '$lib/services/decision-gates';
	import { fetchQuestionById } from '$lib/services/questions/questions-fetchers';
	import type { ResearchQuestion } from '$lib/types/entities';

	const q = $derived(nebula.layout?.rqs.find((x) => x.id === explorer.rqId));
	const thread = $derived(TECHNOLOGY_THREADS.find((t) => t.id === q?.threadId));
	const gates = $derived(q ? getGatesForQuestion(q.id) : []);
	const boms = $derived(
		q ? [...new Set([q.sourceBomId, ...q.relatedBom])].map((id) => getEntity(id)).filter((e) => !!e) : []
	);

	let full = $state<ResearchQuestion | null>(null);
	let loadedFor = '';
	$effect(() => {
		const id = q?.id;
		if (!id || loadedFor === id) return;
		loadedFor = id;
		full = null;
		fetchQuestionById(id).then((r) => {
			if (loadedFor === id) full = r;
		});
	});
	const title = (id: string) => nebula.layout?.rqs.find((x) => x.id === id)?.title ?? '';
	const status = (id: string) => nebula.layout?.rqs.find((x) => x.id === id)?.status ?? 'open';
</script>

{#if q}
	<aside class="rqi panel" aria-label="Research question">
		<header>
			<div class="eyebrow">
				<span style="color:{PHASE_COLORS[q.phaseId]}">{q.id.toUpperCase()}</span>
				<span class="tag" style="color:{RQ_STATUS_COLORS[q.status]}">{q.status}</span>
				<span class="tag" style="color:{PRIORITY_COLORS[q.priority]}">{q.priority}</span>
				{#if q.criticalPath}<span class="tag" style="color:{PRIORITY_COLORS.critical}">critical path</span>{/if}
			</div>
			<h2>{q.title}</h2>
			<div class="meta">
				{#if thread}<span style="color:{thread.color}">{thread.name}</span> ·{/if}
				{q.questionType ?? ''}
				{#if q.hasLiterature} · literature review{/if}
				{#if q.hasConclusion} · deliberation concluded{/if}
			</div>
			<button type="button" class="close" onclick={() => (explorer.rqId = null)} aria-label="Close">×</button>
		</header>
		<div class="body">
			{#if q.gateDescription}<p class="gd">{q.gateDescription}</p>{/if}

			{#if boms.length}
				<h3>BOM items</h3>
				<ul class="links">
					{#each boms as b (b!.id)}
						<li>
							<span>{b!.name}</span>
							<button type="button" class="hud-btn" onclick={() => explorer.openWorkbench(b!.id)}>workbench</button>
							<button
								type="button"
								class="hud-btn"
								onclick={() => {
									explorer.setLens('physical');
									explorer.select(b!.id);
								}}>orrery</button
							>
						</li>
					{/each}
				</ul>
			{/if}

			{#if q.dependsOn.length}
				<h3>Depends on</h3>
				<ul class="links">
					{#each q.dependsOn as d (d)}
						<li><button type="button" class="rq" onclick={() => (explorer.rqId = d)}><i style="background:{RQ_STATUS_COLORS[status(d)]}"></i>{d.toUpperCase()} {title(d)}</button></li>
					{/each}
				</ul>
			{/if}
			{#if q.blocks.length}
				<h3>Unblocks</h3>
				<ul class="links">
					{#each q.blocks as d (d)}
						<li><button type="button" class="rq" onclick={() => (explorer.rqId = d)}><i style="background:{RQ_STATUS_COLORS[status(d)]}"></i>{d.toUpperCase()} {title(d)}</button></li>
					{/each}
				</ul>
			{/if}
			{#if gates.length}
				<h3>Feeds decision gates</h3>
				<ul class="links">
					{#each gates as g (g.id)}
						<li><span>{g.name}</span><span class="dim">{gateWindow(g)} · {getGateReadiness(g)}% met</span></li>
					{/each}
				</ul>
			{/if}

			{#if full?.context}
				<h3>Question</h3>
				<div class="md">{@html renderMarkdown(full.context)}</div>
			{/if}
			{#if q.hasConclusion}
				<button type="button" class="hud-btn" onclick={() => explorer.openDeliberation(q.slug)}>Replay deliberation in the Chamber</button>
				<br />
			{/if}
			<a class="out" href="/questions/{q.slug}">Open question page →</a>
		</div>
	</aside>
{/if}

<style>
	.rqi {
		position: absolute;
		top: 92px;
		right: 12px;
		bottom: 24px;
		width: 400px;
		display: flex;
		flex-direction: column;
	}
	header {
		position: relative;
		padding: 12px 14px 10px;
		border-bottom: 1px solid var(--hud-line);
	}
	.tag {
		margin-left: 6px;
		border: 1px solid currentColor;
		padding: 0 4px;
		font-size: 9px;
	}
	h2 {
		margin: 6px 26px 4px 0;
		font-family: var(--font-cond);
		font-size: 19px;
		font-weight: 600;
		line-height: 1.15;
		color: #fff;
	}
	.meta {
		font-size: 10.5px;
		color: var(--hud-dim);
	}
	.close {
		position: absolute;
		top: 8px;
		right: 10px;
		background: none;
		border: 0;
		color: var(--hud-dim);
		font-size: 18px;
		cursor: pointer;
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
	.gd {
		margin: 0 0 6px;
		color: #e2e8f0;
		border-left: 2px solid var(--hud-accent);
		padding-left: 8px;
	}
	h3 {
		margin: 14px 0 4px;
		font-family: var(--font-cond);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--hud-accent);
	}
	.links {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.links li {
		display: flex;
		align-items: center;
		gap: 6px;
		margin: 3px 0;
		font-size: 11.5px;
	}
	.links li > span:first-child {
		flex: 1;
	}
	.links .hud-btn {
		padding: 1px 6px;
		font-size: 10px;
	}
	.rq {
		display: flex;
		align-items: center;
		gap: 6px;
		background: none;
		border: 0;
		padding: 0;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}
	.rq:hover {
		color: #fff;
	}
	.rq i {
		width: 7px;
		height: 7px;
		flex: none;
		transform: rotate(45deg);
	}
	.dim {
		color: var(--hud-dim);
		font-size: 10.5px;
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
	.out {
		display: inline-block;
		margin-top: 14px;
		color: var(--hud-accent);
		font-family: var(--font-mono);
		font-size: 11px;
	}
	@media (max-width: 900px) {
		.rqi {
			top: auto;
			left: 12px;
			right: 12px;
			width: auto;
			bottom: 12px;
			max-height: 45vh;
		}
	}
</style>
