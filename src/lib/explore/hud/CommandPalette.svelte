<script lang="ts">
	import { getEntity } from '../core/registry';
	import { explorer } from '../core/state.svelte';
	import { searchEntities } from '../core/registry';
	import { PHASE_COLORS } from '../core/theme';
	import { nebula } from '../core/nebulastore.svelte';

	let query = $state('');
	let index = $state(0);
	let input = $state<HTMLInputElement>();

	interface Result {
		id: string;
		kind: string;
		name: string;
		subtitle: string;
		phaseId?: string;
		rq?: boolean;
	}

	/** Research questions match on id, title or slug (all phases once the Nebula has loaded). */
	function searchQuestions(q: string, limit: number): Result[] {
		const s = q.trim().toLowerCase();
		if (s.length < 2) return [];
		return (nebula.layout?.rqs ?? [])
			.filter((r) => r.id.includes(s) || r.title.toLowerCase().includes(s) || r.slug.includes(s))
			.slice(0, limit)
			.map((r) => ({ id: r.id, kind: 'rq', name: `${r.id.toUpperCase()} ${r.title}`, subtitle: r.status, phaseId: r.phaseId, rq: true }));
	}

	const results = $derived<Result[]>([...searchEntities(query, 10), ...searchQuestions(query, 8)]);

	$effect(() => {
		if (explorer.paletteOpen) {
			query = '';
			index = 0;
			nebula.ensure();
			queueMicrotask(() => input?.focus());
		}
	});

	function choose(id: string, workbench = false) {
		if (results.find((r) => r.id === id)?.rq) {
			explorer.showQuestion(id);
			explorer.paletteOpen = false;
			return;
		}
		const e = getEntity(id);
		if (workbench && e?.kind === 'bom') explorer.openWorkbench(id);
		else {
			if (explorer.workbenchId || explorer.lens !== 'physical') explorer.setLens('physical');
			explorer.select(id);
		}
		explorer.paletteOpen = false;
	}

	function key(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') index = Math.min(results.length - 1, index + 1);
		else if (e.key === 'ArrowUp') index = Math.max(0, index - 1);
		else if (e.key === 'Enter' && results[index]) choose(results[index].id, e.shiftKey);
		else if (e.key === 'Escape') explorer.paletteOpen = false;
		else return;
		e.preventDefault();
		e.stopPropagation();
	}
</script>

{#if explorer.paletteOpen}
	<div class="scrim" role="presentation" onclick={() => (explorer.paletteOpen = false)}></div>
	<div class="palette panel" role="dialog" aria-label="Go to">
		<input
			bind:this={input}
			bind:value={query}
			oninput={() => (index = 0)}
			onkeydown={key}
			placeholder="Go to body, phase, BOM item, research question… (⇧↵ BOM → workbench)"
			aria-label="Search"
			role="combobox"
			aria-expanded="true"
			aria-controls="palette-results"
		/>
		<ul id="palette-results" role="listbox">
			{#each results as r, i (r.id)}
				<li role="option" aria-selected={i === index}>
					<button type="button" class:active={i === index} onclick={() => choose(r.id)} onmouseenter={() => (index = i)}>
						<span class="kind" style="color:{PHASE_COLORS[r.phaseId ?? r.id] ?? 'var(--hud-dim)'}">{r.kind}</span>
						<span class="nm">{r.name}</span>
						<span class="st">{r.subtitle}</span>
					</button>
				</li>
			{:else}
				<li class="empty">No matches</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.scrim {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
	}
	.palette {
		position: absolute;
		top: 16vh;
		left: 50%;
		transform: translateX(-50%);
		width: min(560px, calc(100vw - 32px));
		padding: 0;
	}
	input {
		width: 100%;
		box-sizing: border-box;
		background: transparent;
		border: 0;
		border-bottom: 1px solid var(--hud-line);
		padding: 14px 16px;
		color: #fff;
		font-family: var(--font-mono);
		font-size: 14px;
		outline: none;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 6px;
		max-height: 50vh;
		overflow-y: auto;
	}
	button {
		display: grid;
		grid-template-columns: 54px 1fr;
		gap: 0 8px;
		width: 100%;
		text-align: left;
		background: none;
		border: 0;
		padding: 6px 10px;
		cursor: pointer;
	}
	button.active {
		background: rgba(125, 211, 252, 0.1);
	}
	.kind {
		grid-row: span 2;
		font-size: 9.5px;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		padding-top: 2px;
	}
	.nm {
		font-size: 13px;
	}
	.st {
		font-size: 10.5px;
		color: var(--hud-dim);
	}
	.empty {
		padding: 10px;
		color: var(--hud-dim);
	}
</style>
