<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { NoToneMapping, WebGLRenderer } from 'three';
	import { onMount, untrack } from 'svelte';
	import { page } from '$app/state';
	import ExploreScene from './scene/ExploreScene.svelte';
	import TopBar from './hud/TopBar.svelte';
	import Timeline from './hud/Timeline.svelte';
	import Inspector from './hud/Inspector.svelte';
	import LayerPanel from './hud/LayerPanel.svelte';
	import Telemetry from './hud/Telemetry.svelte';
	import WorkbenchScene from './scene/workbench/WorkbenchScene.svelte';
	import WorkbenchPanel from './hud/WorkbenchPanel.svelte';
	import WorkbenchInspector from './hud/WorkbenchInspector.svelte';
	import { wb } from './core/wbstore.svelte';
	import NebulaScene from './scene/nebula/NebulaScene.svelte';
	import NebulaPanel from './hud/NebulaPanel.svelte';
	import RqInspector from './hud/RqInspector.svelte';
	import { nebula } from './core/nebulastore.svelte';
	import TourOverlay from './hud/TourOverlay.svelte';
	import GateTunnelScene from './scene/gates/GateTunnelScene.svelte';
	import GatePanel from './hud/GatePanel.svelte';
	import GateInspector from './hud/GateInspector.svelte';
	import NetworkPanel from './hud/NetworkPanel.svelte';
	import RiskPanel from './hud/RiskPanel.svelte';
	import SandboxDrawer from './hud/SandboxDrawer.svelte';
	import ChamberScene from './scene/chamber/ChamberScene.svelte';
	import ChamberPanel from './hud/ChamberPanel.svelte';
	import ChamberInspector from './hud/ChamberInspector.svelte';
	import { delib } from './core/delibstore.svelte';
	import { riskStore } from './core/riskstore.svelte';
	import { tour } from './core/tour.svelte';
	import { getTour } from './core/tours';
	import ScaleBar from './hud/ScaleBar.svelte';
	import CommandPalette from './hud/CommandPalette.svelte';
	import { explorer, SPEEDS, TODAY_YEAR } from './core/state.svelte';
	import './hud/hud.css';
	import { provideSunSurface } from './sun/context';
	import type { SunSurfaceFactory } from './sun/types';

	/** Optional external Sun surface renderer (dependency injection; see sun/types.ts) */
	let { sunSurface }: { sunSurface?: SunSurfaceFactory } = $props();
	// svelte-ignore state_referenced_locally
	provideSunSurface(sunSurface);

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
		const t = getTour(page.url.searchParams.get('tour'));
		if (t) queueMicrotask(() => tour.start(t));
	});

	// Load Workbench material when an item opens; flash a short warp on every switch
	let warp = $state(0);
	$effect(() => {
		const id = explorer.workbenchId;
		const lens = explorer.lens;
		const isReady = ready;
		untrack(() => {
			if (id) void wb.ensure(id);
			if (lens === 'knowledge') nebula.ensure();
			if (lens === 'risk') riskStore.ensure();
			if (lens === 'consensus') delib.ensureList();
			if (isReady) warp++;
		});
	});

	// Load the selected deliberation; default to the first concluded one
	$effect(() => {
		const slug = explorer.delibSlug;
		const lens = explorer.lens;
		untrack(() => {
			if (lens !== 'consensus') return;
			if (slug) void delib.open(slug);
		});
	});
	$effect(() => {
		const first = delib.list.find((d) => d.status === 'concluded') ?? delib.list[0];
		if (explorer.lens === 'consensus' && !explorer.delibSlug && first) untrack(() => explorer.openDeliberation(first.slug));
	});

	// Keep the URL shareable without spamming history
	let urlTimer: ReturnType<typeof setTimeout> | undefined;
	$effect(() => {
		void Math.round(explorer.year * 10);
		void explorer.focusId;
		void explorer.selectedId;
		void explorer.workbenchId;
		void explorer.lens;
		void explorer.rqId;
		void explorer.gateSel;
		void explorer.delibSlug;
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
		if (tour.active) {
			const handled: Record<string, () => void> = {
				' ': () => (tour.paused ? tour.resume() : tour.pause()),
				ArrowRight: () => tour.next(),
				ArrowLeft: () => tour.prev(),
				Escape: () => tour.exit()
			};
			if (handled[e.key]) {
				handled[e.key]();
				e.preventDefault();
				return;
			}
		}
		switch (e.key) {
			case ' ':
				explorer.playing = !explorer.playing;
				break;
			case '/':
				explorer.paletteOpen = true;
				break;
			case 'Escape':
				if (explorer.paletteOpen) explorer.paletteOpen = false;
				else if (explorer.workbenchId && explorer.wbSelection) explorer.wbSelection = null;
				else if (explorer.workbenchId) explorer.closeWorkbench();
				else if (explorer.lens === 'knowledge' && explorer.rqId) explorer.rqId = null;
				else if (explorer.lens === 'gates' && explorer.gateSel) explorer.gateSel = null;
				else if (explorer.lens === 'consensus' && explorer.delibPick) explorer.delibPick = null;
				else explorer.selectedId = null;
				break;
			case 'c':
				explorer.setLens(explorer.lens === 'consensus' ? 'physical' : 'consensus');
				break;
			case 'r':
				explorer.setLens(explorer.lens === 'risk' ? 'physical' : 'risk');
				break;
			case 'n':
				explorer.setLens(explorer.lens === 'network' ? 'physical' : 'network');
				break;
			case 'g':
				explorer.setLens(explorer.lens === 'gates' ? 'physical' : 'gates');
				break;
			case 'k':
				explorer.setLens(explorer.lens === 'knowledge' ? 'physical' : 'knowledge');
				break;
			case 'w':
				if (explorer.workbenchId) explorer.closeWorkbench();
				else explorer.openWorkbench(explorer.selectedId);
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
		<!-- Any direct interaction with the scene pauses a running tour -->
		<div class="canvas" onpointerdown={() => tour.pause()} onwheel={() => tour.pause()} role="presentation">
			<Canvas
				createRenderer={(canvas) =>
					new WebGLRenderer({ canvas, antialias: true, logarithmicDepthBuffer: true, powerPreference: 'high-performance' })}
				toneMapping={NoToneMapping}
				dpr={[1, 2]}
			>
				{#if explorer.workbenchId}
					<WorkbenchScene />
				{:else if explorer.lens === 'knowledge'}
					<NebulaScene />
				{:else if explorer.lens === 'gates'}
					<GateTunnelScene />
				{:else if explorer.lens === 'consensus'}
					<ChamberScene />
				{:else}
					<ExploreScene />
				{/if}
			</Canvas>
		</div>
		{#key warp}<div class="warp" aria-hidden="true"></div>{/key}

		{#if explorer.hudVisible && explorer.workbenchId}
			<TopBar />
			<div class="leftcol">
				<WorkbenchPanel />
				<LayerPanel />
			</div>
			<WorkbenchInspector />
			<SandboxDrawer />
		{:else if explorer.hudVisible && explorer.lens === 'consensus'}
			<TopBar />
			<div class="leftcol">
				<ChamberPanel />
				<LayerPanel />
			</div>
			<ChamberInspector />
		{:else if explorer.hudVisible && explorer.lens === 'gates'}
			<TopBar />
			<div class="leftcol">
				<GatePanel />
				<LayerPanel />
			</div>
			<GateInspector />
		{:else if explorer.hudVisible && explorer.lens === 'knowledge'}
			<TopBar />
			<div class="leftcol">
				<NebulaPanel />
				<LayerPanel />
			</div>
			<RqInspector />
		{:else if explorer.hudVisible}
			<TopBar />
			<div class="leftcol">
				{#if explorer.lens === 'network'}<NetworkPanel />{:else if explorer.lens === 'risk'}<RiskPanel />{:else}<Telemetry />{/if}
				{#if !tour.active}<LayerPanel />{/if}
			</div>
			<ScaleBar />
			{#if !tour.active || tour.paused}<Inspector />{/if}
			<Timeline />
			<div class="hint">⌘K go to · Space play · H hide HUD · drag orbit · scroll zoom</div>
		{/if}
		{#if explorer.hudVisible}<TourOverlay />{/if}
		<CommandPalette />
	{/if}
</div>

<style>
	.canvas {
		position: absolute;
		inset: 0;
		z-index: 0;
	}
	.warp {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(circle at 50% 50%, rgba(125, 211, 252, 0.35), rgba(2, 6, 12, 0.95) 70%);
		animation: warp 0.7s ease-out forwards;
	}
	@keyframes warp {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
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
