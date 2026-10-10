<script lang="ts">
	/**
	 * HUD reticle + label anchored to a 3D point. Objects at true scale are
	 * usually sub-pixel, so the reticle is what makes them findable.
	 */
	import { HTML } from '@threlte/extras';
	import { explorer } from '../core/state.svelte';

	let {
		id,
		label,
		sub = '',
		color = '#7dd3fc',
		ghost = false,
		minor = false,
		always = false
	}: {
		id?: string;
		label: string;
		sub?: string;
		color?: string;
		ghost?: boolean;
		minor?: boolean;
		always?: boolean;
	} = $props();

	const selected = $derived(!!id && explorer.selectedId === id);
	const show = $derived(always || selected || explorer.layers.labels);
</script>

{#if show}
	<HTML pointerEvents="none" zIndexRange={[40, 0]}>
		<div class="anchor" style="--c:{color}">
			<button
				type="button"
				class="mk"
				data-lbl={selected ? 'selected' : minor || ghost ? 'minor' : 'major'}
				class:ghost
				class:minor
				class:selected
				disabled={!id}
				onclick={() => id && explorer.select(id)}
				aria-label={label}
			>
				<span class="ret"></span>
				<span class="txt">
					<b>{label}</b>
					{#if sub}<i>{sub}</i>{/if}
				</span>
			</button>
		</div>
	</HTML>
{/if}

<style>
	.anchor {
		position: relative;
		width: 0;
		height: 0;
	}
	.mk {
		position: absolute;
		left: -7px;
		top: -7px;
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
	.mk:disabled {
		cursor: default;
	}
	.ret {
		width: 14px;
		height: 14px;
		flex: none;
		background:
			linear-gradient(var(--c), var(--c)) top left / 4px 1px no-repeat,
			linear-gradient(var(--c), var(--c)) top left / 1px 4px no-repeat,
			linear-gradient(var(--c), var(--c)) top right / 4px 1px no-repeat,
			linear-gradient(var(--c), var(--c)) top right / 1px 4px no-repeat,
			linear-gradient(var(--c), var(--c)) bottom left / 4px 1px no-repeat,
			linear-gradient(var(--c), var(--c)) bottom left / 1px 4px no-repeat,
			linear-gradient(var(--c), var(--c)) bottom right / 4px 1px no-repeat,
			linear-gradient(var(--c), var(--c)) bottom right / 1px 4px no-repeat;
		transition: transform 0.15s;
	}
	.txt {
		display: flex;
		flex-direction: column;
		line-height: 1.15;
		margin-top: -2px;
		text-shadow: 0 0 4px #000, 0 0 2px #000;
	}
	b {
		font-weight: 500;
		font-size: 11px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	i {
		font-style: normal;
		font-size: 10px;
		opacity: 0.65;
	}
	.minor .ret {
		width: 8px;
		height: 8px;
		margin: 3px;
	}
	.minor b {
		font-size: 10px;
		opacity: 0.8;
	}
	.ghost {
		opacity: 0.75;
	}
	.ghost .ret {
		border: 1px dashed var(--c);
		background: none;
		border-radius: 50%;
	}
	.mk:hover .ret,
	.selected .ret {
		transform: scale(1.35);
	}
	.selected b {
		color: #fff;
	}
	.selected .ret {
		box-shadow: 0 0 8px var(--c);
	}
	.mk .txt {
		transition: opacity 0.2s;
	}
	.mk:global([data-occluded]) .txt {
		opacity: 0;
	}
	.mk:global([data-occluded]):hover .txt {
		opacity: 1;
	}
</style>
