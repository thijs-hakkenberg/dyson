<script lang="ts">
	import { explorer } from '../core/state.svelte';
	import { AU_KM, formatDistance, formatLightTime } from '../core/units';

	const TARGET_PX = 120;

	function nice(v: number) {
		const p = Math.pow(10, Math.floor(Math.log10(v)));
		const m = v / p;
		return (m >= 5 ? 5 : m >= 2 ? 2 : 1) * p;
	}

	const bar = $derived.by(() => {
		const au = explorer.auPerPixel * TARGET_PX;
		if (!(au > 0)) return null;
		// Round in the unit that will be displayed
		if (au >= 0.1) {
			const v = nice(au);
			return { px: v / explorer.auPerPixel, label: `${v} AU` };
		}
		const km = nice(au * AU_KM);
		return { px: km / AU_KM / explorer.auPerPixel, label: formatDistance(km / AU_KM) };
	});
</script>

{#if bar}
	<div class="scale" aria-label="Scale">
		<div class="line" style="width:{bar.px}px"></div>
		<div class="lbl">{bar.label}</div>
		<div class="cam">
			cam {formatDistance(explorer.cameraDistance)} · {formatLightTime(explorer.cameraDistance)} light
		</div>
	</div>
{/if}

<style>
	.scale {
		position: absolute;
		left: 260px;
		bottom: 128px;
		pointer-events: none;
		font-size: 10.5px;
		color: var(--hud-dim);
	}
	.line {
		height: 6px;
		border: 1px solid var(--hud-text);
		border-top: 0;
	}
	.lbl {
		color: var(--hud-text);
		margin-top: 2px;
	}
	.cam {
		color: var(--hud-faint);
	}
	@media (max-width: 900px) {
		.scale {
			left: 16px;
			bottom: 132px;
		}
	}
</style>
