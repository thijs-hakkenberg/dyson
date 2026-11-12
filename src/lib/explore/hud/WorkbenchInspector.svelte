<script lang="ts">
	import { elementModel } from '../core/models';
	/** Right-hand reading panel for the Workbench: long text stays in the DOM. */
	import { explorer } from '../core/state.svelte';
	import { wb, renderMarkdown } from '../core/wbstore.svelte';
	import { MODEL_COLORS, PRIORITY_COLORS, RQ_STATUS_COLORS } from '../core/theme';

	const data = $derived(wb.data);
	const layout = $derived(wb.layout);
	const sel = $derived(explorer.wbSelection);

	type View =
		| { kind: 'core' }
		| { kind: 'model'; modelId: string }
		| { kind: 'fork'; forkId: string; positionIdx: number | null }
		| { kind: 'spec' | 'open'; idx: number }
		| { kind: 'rq'; qid: string }
		| { kind: 'trl'; id: string };

	const view = $derived.by((): View => {
		if (!sel || sel === 'core') return { kind: 'core' };
		if (sel.startsWith('model:')) return { kind: 'model', modelId: sel.slice(6) };
		if (sel.startsWith('spec:')) return { kind: 'spec', idx: Number(sel.slice(5)) };
		if (sel.startsWith('open:')) return { kind: 'open', idx: Number(sel.slice(5)) };
		if (sel.startsWith('rq:')) return { kind: 'rq', qid: sel.slice(3) };
		if (sel.startsWith('trl:')) return { kind: 'trl', id: sel.slice(4) };
		const fork = layout?.forks.find((f) => sel === f.id || sel.startsWith(`${f.id}:`));
		if (fork) {
			const j = sel === fork.id ? null : Number(sel.slice(fork.id.length + 1));
			return { kind: 'fork', forkId: fork.id, positionIdx: j };
		}
		return { kind: 'core' };
	});

	const fork = $derived(view.kind === 'fork' ? layout?.forks.find((f) => f.id === view.forkId) : undefined);
	const spec = $derived(view.kind === 'model' ? data?.spec?.specs.find((s) => s.modelId === view.modelId) : undefined);
	const rq = $derived(view.kind === 'rq' ? data?.questions.find((q) => q.questionId === view.qid) : undefined);
	const trl = $derived(view.kind === 'trl' ? data?.trl.find((t) => t.id === view.id) : undefined);
	const family = (id: string) => (id.startsWith('claude') ? 'Claude' : id.startsWith('gemini') ? 'Gemini' : 'GPT');
	const strip = (s: string) => s.replace(/\*\*/g, '');
</script>

{#if data && !(explorer.wbView === 'model' && elementModel(explorer.workbenchId) && !sel)}
	<aside class="wbi panel" aria-label="Workbench inspector">
		{#if view.kind === 'core'}
			<header>
				<div class="eyebrow">Consensus core</div>
				<h2>Recommended approach</h2>
			</header>
			<div class="body">
				{#if data.spec?.consensus.recommendedApproach}
					<div class="md">{@html renderMarkdown(data.spec.consensus.recommendedApproach)}</div>
				{:else}
					<p class="dim">No consensus document.</p>
				{/if}
				{#if data.spec?.consensus.keySpecs.length}
					<h3>Agreed key specifications</h3>
					<ul class="list">
						{#each data.spec.consensus.keySpecs as k, i (i)}
							<li><button type="button" onclick={() => (explorer.wbSelection = `spec:${i}`)}>{@html renderMarkdown(k, true)}</button></li>
						{/each}
					</ul>
				{/if}
				<a class="out" href="/plan/{data.phaseId}/bom/{data.slug}">Full spec page →</a>
			</div>
		{:else if view.kind === 'model' && spec}
			<header style="--c:{MODEL_COLORS[family(spec.modelId)]}">
				<div class="eyebrow model">Model specification · proposed</div>
				<h2>{spec.modelName}</h2>
				<div class="dim">Generated {spec.generatedDate}</div>
			</header>
			<div class="body md">{@html renderMarkdown(spec.content)}</div>
		{:else if view.kind === 'fork' && fork}
			<header>
				<div class="eyebrow">
					Divergent view <span class="prio" style="color:{PRIORITY_COLORS[fork.priority]}">{fork.priority}</span>
				</div>
				<h2>{fork.topic.topic}</h2>
			</header>
			<div class="body">
				<ul class="positions">
					{#each fork.positions as p, j (p.id)}
						<li class:hl={view.positionIdx === j}>
							<button type="button" onclick={() => (explorer.wbSelection = p.id)}>
								<span class="who">
									{#each p.models as m (m)}<i style="--c:{MODEL_COLORS[m]}">{m}</i>{/each}
									{#if !p.models.length}<i style="--c:#94a3b8">unattributed</i>{/if}
								</span>
								<span class="stmt">{@html renderMarkdown(p.statement, true)}</span>
							</button>
						</li>
					{/each}
				</ul>
				{#if fork.topic.impact}<h3>Why it matters</h3><p>{fork.topic.impact}</p>{/if}
				{#if fork.topic.resolutionPath}<h3>Path to resolution</h3><p>{fork.topic.resolutionPath}</p>{/if}
				<p class="dim note">Divergent views are preserved, not resolved.</p>
			</div>
		{:else if view.kind === 'spec' && data.spec}
			<header><div class="eyebrow">Agreed key specification</div></header>
			<div class="body md">{@html renderMarkdown(data.spec.consensus.keySpecs[view.idx] ?? '')}</div>
		{:else if view.kind === 'open' && data.spec}
			<header><div class="eyebrow warnc">Open question (from consensus)</div></header>
			<div class="body md">{@html renderMarkdown(data.spec.consensus.openQuestions[view.idx] ?? '')}</div>
		{:else if view.kind === 'rq' && rq}
			<header>
				<div class="eyebrow">
					Research question <span class="prio" style="color:{RQ_STATUS_COLORS[rq.status]}">{rq.status}</span>
				</div>
				<h2>{rq.questionId.toUpperCase()} · {rq.title}</h2>
			</header>
			<div class="body">
				<button type="button" class="hud-btn" onclick={() => explorer.showQuestion(rq.questionId)}>Show in Research Nebula</button>
				<br />
				<a class="out" href="/questions/{rq.slug}">Open question page →</a>
			</div>
		{:else if view.kind === 'trl' && trl}
			<header>
				<div class="eyebrow">Technology readiness · {trl.id}</div>
				<h2>{trl.technology}</h2>
				<div class="dim">
					TRL {trl.currentTRL}{trl.currentTRLMax ? `–${trl.currentTRLMax}` : ''} → {trl.targetTRL}{trl.ad2 ? ` · AD² ${trl.ad2.min === trl.ad2.max ? trl.ad2.max : `${trl.ad2.min}–${trl.ad2.max}`}` : ''} · {trl.yearsToTarget}{trl.yearsToTargetMax ? `–${trl.yearsToTargetMax}` : ''} yr{trl.phaseNeed ? ` · needed in ${Array.isArray(trl.phaseNeed) ? trl.phaseNeed.join('/') : trl.phaseNeed}` : ''}
				</div>
			</header>
			<div class="body">
				<p><span class="dim">Required:</span> {trl.description}</p>
				{#if trl.panelRatings}
					<h3>Panel{trl.agreement === 'diverge' ? ' (diverges)' : trl.agreement === 'ruled' ? ' (set by owner ruling)' : ''}</h3>
					<ul class="list plain">
						{#each trl.panelRatings as r (r.model)}
							<li>{r.name}: TRL {r.currentTRL.min === r.currentTRL.max ? r.currentTRL.min : `${r.currentTRL.min}–${r.currentTRL.max}`}→{r.targetTRL} · AD² {r.ad2} · {r.riskIfFail}</li>
						{/each}
					</ul>
				{/if}
				{#each trl.rulingStatus?.pending ?? [] as p (p.question)}
					<button type="button" class="hud-btn" onclick={() => explorer.showQuestion(p.question)}>⧗ Owner ruling pending: {p.question.toUpperCase()} (evidence {p.evidence.join(', ').toUpperCase()})</button>
				{/each}
				<h3>Where the evidence stands</h3>
				<p>{trl.evidence}</p>
				{#if trl.experimentsNeeded.length}
					<h3>Development path</h3>
					<ul class="list plain">{#each trl.experimentsNeeded as x (x)}<li>{x}</li>{/each}</ul>
				{/if}
				{#if trl.fallbackApproach}<h3>Fallback</h3><p>{trl.fallbackApproach}</p>{/if}
			</div>
		{:else}
			<div class="body"><p class="dim">{strip(sel ?? '')}</p></div>
		{/if}
	</aside>
{/if}

<style>
	.wbi {
		position: absolute;
		top: 92px;
		right: 12px;
		bottom: 24px;
		width: 400px;
		display: flex;
		flex-direction: column;
	}
	header {
		padding: 12px 14px 10px;
		border-bottom: 1px solid var(--hud-line);
	}
	h2 {
		margin: 4px 0 0;
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
	.model {
		color: var(--c);
	}
	.warnc {
		color: var(--hud-warn);
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
		font-size: 11px;
	}
	.note {
		margin-top: 14px;
	}
	.prio {
		margin-left: 6px;
		border: 1px solid currentColor;
		padding: 0 4px;
		font-size: 9px;
	}
	.list {
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.list li {
		border-left: 2px solid var(--hud-line);
		margin: 4px 0;
	}
	.list button,
	.positions button {
		background: none;
		border: 0;
		padding: 2px 8px;
		text-align: left;
		color: inherit;
		font: inherit;
		cursor: pointer;
		width: 100%;
	}
	.list button:hover,
	.positions button:hover {
		background: rgba(125, 211, 252, 0.06);
	}
	.plain li {
		padding: 2px 8px;
	}
	.positions {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.positions li {
		margin: 6px 0;
		border: 1px solid var(--hud-line);
	}
	.positions li.hl {
		border-color: var(--hud-line-strong);
		background: rgba(125, 211, 252, 0.05);
	}
	.positions button {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 6px 8px;
	}
	.who {
		display: flex;
		gap: 4px;
	}
	.who i {
		font-style: normal;
		font-family: var(--font-mono);
		font-size: 9.5px;
		color: var(--c);
		border: 1px solid var(--c);
		padding: 0 5px;
	}
	.out {
		display: inline-block;
		margin-top: 14px;
		color: var(--hud-accent);
		font-family: var(--font-mono);
		font-size: 11px;
	}
	.md :global(h1),
	.md :global(h2),
	.md :global(h3),
	.md :global(h4) {
		font-family: var(--font-cond);
		color: #fff;
		letter-spacing: 0.04em;
		margin: 14px 0 4px;
		font-size: 14px;
	}
	.md :global(table) {
		border-collapse: collapse;
		font-size: 11px;
		margin: 8px 0;
		display: block;
		overflow-x: auto;
	}
	.md :global(th),
	.md :global(td) {
		border: 1px solid var(--hud-line);
		padding: 3px 6px;
	}
	.md :global(code),
	.md :global(pre) {
		font-family: var(--font-mono);
		font-size: 10.5px;
	}
	.md :global(pre) {
		overflow-x: auto;
		background: rgba(0, 0, 0, 0.3);
		padding: 6px;
	}
	.md :global(a) {
		color: var(--hud-accent);
	}
	@media (max-width: 900px) {
		.wbi {
			top: auto;
			left: 12px;
			right: 12px;
			width: auto;
			bottom: 12px;
			max-height: 45vh;
		}
	}
</style>
