<script lang="ts">
	/** Rings a HUD element named by the current tour step and dims the rest of the screen. */
	import { onMount } from 'svelte';

	let { selector }: { selector: string | undefined } = $props();

	let rect = $state<{ x: number; y: number; w: number; h: number } | null>(null);

	// Panels open, close and resize while a step runs, so track the element every frame
	onMount(() => {
		let raf = 0;
		const loop = () => {
			raf = requestAnimationFrame(loop);
			const el = selector ? document.querySelector(selector) : null;
			const r = el?.getBoundingClientRect();
			if (!r || r.width === 0) {
				if (rect) rect = null;
				return;
			}
			// Clip to the visible part of a scrolling panel column
			let top = r.top,
				bottom = r.bottom;
			for (let p = el!.parentElement; p; p = p.parentElement) {
				const o = getComputedStyle(p).overflowY;
				if (o === 'auto' || o === 'scroll') {
					const pr = p.getBoundingClientRect();
					top = Math.max(top, pr.top);
					bottom = Math.min(bottom, pr.bottom);
					break;
				}
			}
			const pad = 6;
			const next = { x: r.left - pad, y: top - pad, w: r.width + pad * 2, h: Math.max(0, bottom - top) + pad * 2 };
			if (!rect || Math.abs(rect.x - next.x) + Math.abs(rect.y - next.y) + Math.abs(rect.w - next.w) + Math.abs(rect.h - next.h) > 0.5)
				rect = next;
		};
		loop();
		return () => cancelAnimationFrame(raf);
	});
</script>

{#if rect}
	<div class="spot" style="left:{rect.x}px;top:{rect.y}px;width:{rect.w}px;height:{rect.h}px" aria-hidden="true"></div>
{/if}

<style>
	.spot {
		position: fixed;
		z-index: 4;
		pointer-events: none;
		border: 1px solid var(--hud-accent);
		box-shadow:
			0 0 0 9999px rgba(2, 6, 12, 0.45),
			0 0 18px rgba(125, 211, 252, 0.45),
			inset 0 0 12px rgba(125, 211, 252, 0.18);
		transition:
			left 0.45s cubic-bezier(0.2, 0.7, 0.2, 1),
			top 0.45s cubic-bezier(0.2, 0.7, 0.2, 1),
			width 0.45s cubic-bezier(0.2, 0.7, 0.2, 1),
			height 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
		animation: pulse 2.2s ease-in-out infinite;
	}
	@keyframes pulse {
		50% {
			border-color: #fff;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.spot {
			transition: none;
			animation: none;
		}
	}
</style>
