<script lang="ts">
	/** HTML label for a Workbench node; clicking selects it in the Workbench. */
	import { HTML } from '@threlte/extras';
	import { explorer } from '../../core/state.svelte';

	let {
		id,
		label,
		sub = '',
		color = '#7dd3fc',
		dashed = false,
		quiet = false,
		selected: selectedProp,
		onpick
	}: {
		id: string;
		label: string;
		sub?: string;
		color?: string;
		dashed?: boolean;
		quiet?: boolean;
		/** Override selection state (defaults to the Workbench selection) */
		selected?: boolean;
		/** Override click behaviour (defaults to toggling the Workbench selection) */
		onpick?: () => void;
	} = $props();

	const selected = $derived(selectedProp ?? explorer.wbSelection === id);
</script>

<HTML pointerEvents="none" zIndexRange={[40, 0]}>
	<div class="anchor" style="--c:{color}">
		<button
			type="button"
			class="lb"
			data-lbl={selected ? 'selected' : quiet ? 'minor' : 'major'}
			class:dashed
			class:quiet
			class:selected
			onclick={() => (onpick ? onpick() : (explorer.wbSelection = selected ? null : id))}
			aria-label={label}
			title={quiet ? label : ''}
		>
			<span class="dot"></span>
			{#if !quiet || selected}
				<span class="txt"><b>{label}</b>{#if sub}<i>{sub}</i>{/if}</span>
			{/if}
		</button>
	</div>
</HTML>

<style>
	.anchor {
		position: relative;
		width: 0;
		height: 0;
	}
	.lb {
		position: absolute;
		left: -6px;
		top: -6px;
		display: flex;
		align-items: flex-start;
		gap: 6px;
		background: none;
		border: 0;
		padding: 0;
		color: var(--c);
		cursor: pointer;
		pointer-events: auto;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		text-align: left;
		white-space: nowrap;
	}
	.dot {
		width: 12px;
		height: 12px;
		flex: none;
		border: 1px solid var(--c);
		transform: rotate(45deg) scale(0.75);
		transition: transform 0.15s;
	}
	.dashed .dot {
		border-style: dashed;
		border-radius: 50%;
		transform: none;
	}
	.quiet .dot {
		opacity: 0.6;
		transform: rotate(45deg) scale(0.5);
	}
	.txt {
		display: flex;
		flex-direction: column;
		line-height: 1.15;
		margin-top: -1px;
		width: max-content;
		max-width: 240px;
		white-space: normal;
		text-shadow: 0 0 4px #000, 0 0 2px #000;
	}
	b {
		font-weight: 500;
		font-size: 11px;
		letter-spacing: 0.05em;
	}
	i {
		font-style: normal;
		font-size: 10px;
		opacity: 0.65;
	}
	.lb:hover .dot,
	.selected .dot {
		transform: rotate(45deg) scale(1.1);
		box-shadow: 0 0 8px var(--c);
	}
	.selected b {
		color: #fff;
	}
	.lb .txt {
		transition: opacity 0.2s;
	}
	.lb:global([data-occluded]) .txt {
		opacity: 0;
	}
	.lb:global([data-occluded]):hover .txt {
		opacity: 1;
	}
</style>
