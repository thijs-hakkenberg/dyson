<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { NoToneMapping, WebGLRenderer } from 'three';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import ExploreScene from './scene/ExploreScene.svelte';
	import TopBar from './hud/TopBar.svelte';
	import Timeline from './hud/Timeline.svelte';
	import Inspector from './hud/Inspector.svelte';
	import LayerPanel from './hud/LayerPanel.svelte';
	import Telemetry from './hud/Telemetry.svelte';
	import ScaleBar from './hud/ScaleBar.svelte';
	import CommandPalette from './hud/CommandPalette.svelte';
	import { explorer, SPEEDS, TODAY_YEAR } from './core/state.svelte';
	import './hud/hud.css';

	let webgl = $state<boolean | null>(null);
	let ready = $state(false);

	onMount(() => {
		try {
			const c = document.createElement('canvas');
			webgl = !!(c.getContext('webgl2') || c.getContext('webgl'));
		} catch {
			webgl = false;
		}
		explorer.readUrl(page.url);
		ready = true;
	});

	// Keep the URL shareable without spamming history
	let urlTimer: ReturnType<typeof setTimeout> | undefined;
	$effect(() => {
		void Math.round(explorer.year * 10);
		void explorer.focusId;
		void explorer.selectedId;
		if (!ready) return;
		clearTimeout(urlTimer);
		urlTimer = setTimeout(() => explorer.writeUrl(), 400);
	});

	function onKey(e: KeyboardEvent) {
		const typing = (e.target as HTMLElement)?.closest?.('input, textarea, [contenteditable]');
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			explorer.paletteOpen = !explorer.paletteOpen;
			return;
		}
		if (typing) return;
		switch (e.key) {
			case ' ':
				explorer.playing = !explorer.playing;
				break;
			case '/':
				explorer.paletteOpen = true;
				break;
			case 'Escape':
				if (explorer.paletteOpen) explorer.paletteOpen = false;
				else explorer.selectedId = null;
				break;
			case 'h':
				explorer.hudVisible = !explorer.hudVisible;
				break;
			case '[':
				explorer.speedIndex = Math.max(0, explorer.speedIndex - 1);
				break;
			case ']':
				explorer.speedIndex = Math.min(SPEEDS.length - 1, explorer.speedIndex + 1);
				break;
			case 'f':
				if (explorer.selectedId) explorer.select(explorer.selectedId);
				break;
			case 'Home':
				explorer.setYear(TODAY_YEAR);
				break;
			default:
				return;
		}
		e.preventDefault();
	}
</script>

<svelte:window onkeydown={onKey} />

<div class="explore-root">
	{#if webgl === false}
		<div class="nowebgl">
			<p>The immersive explorer needs WebGL, which isn't available in this browser.</p>
			<a href="/plan">Browse the plan instead →</a>
		</div>
	{:else if ready}
		<div class="canvas">
			<Canvas
				createRenderer={(canvas) =>
					new WebGLRenderer({ canvas, antialias: true, logarithmicDepthBuffer: true, powerPreference: 'high-performance' })}
				toneMapping={NoToneMapping}
				dpr={[1, 2]}
			>
				<ExploreScene />
			</Canvas>
		</div>

		{#if explorer.hudVisible}
			<TopBar />
			<div class="leftcol">
				<Telemetry />
				<LayerPanel />
			</div>
			<ScaleBar />
			<Inspector />
			<Timeline />
			<div class="hint">⌘K go to · Space play · H hide HUD · drag orbit · scroll zoom</div>
		{/if}
		<CommandPalette />
	{/if}
</div>

<style>
	.canvas {
		position: absolute;
		inset: 0;
		z-index: 0;
	}
	.leftcol {
		position: absolute;
		top: 92px;
		left: 12px;
		bottom: 150px;
		width: 264px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		overflow-y: auto;
		scrollbar-width: thin;
		pointer-events: none;
	}
	.leftcol > :global(*) {
		pointer-events: auto;
	}
	.hint {
		position: absolute;
		right: 16px;
		bottom: 128px;
		font-size: 10px;
		color: var(--hud-faint);
		pointer-events: none;
	}
	.nowebgl {
		display: grid;
		place-content: center;
		height: 100%;
		text-align: center;
		gap: 8px;
	}
	@media (max-width: 900px) {
		.hint {
			display: none;
		}
		.leftcol {
			bottom: auto;
			max-height: 40vh;
		}
	}
</style>
