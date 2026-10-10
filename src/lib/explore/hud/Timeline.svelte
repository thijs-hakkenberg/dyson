<script lang="ts">
	import { explorer, SPEEDS, TODAY_YEAR } from '../core/state.svelte';
	import { TIMELINE, ASSUMED_PHASE0_START, buildAxis, yearToAxis, axisToYear } from '../core/timeline';
	import { PHASE_COLORS } from '../core/theme';
	import { formatYear } from '../core/units';

	const axis = buildAxis(TODAY_YEAR);
	const pct = (y: number) => `${(yearToAxis(y, axis) * 100).toFixed(3)}%`;
	const width = (a: number, b: number) => `${((yearToAxis(b, axis) - yearToAxis(a, axis)) * 100).toFixed(3)}%`;

	// 3a and 3b run in parallel: give them their own lane
	const lane = (id: string) => (id === 'phase-3b' ? 1 : 0);

	const ticks = [...new Set(axis.flatMap((s) => [s.from, s.to]).map((y) => Math.round(y)))];

	let track = $state<HTMLDivElement>();
	let dragging = false;

	function seek(e: PointerEvent) {
		if (!track) return;
		const r = track.getBoundingClientRect();
		const u = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
		explorer.setYear(axisToYear(u, axis));
	}
	function down(e: PointerEvent) {
		dragging = true;
		explorer.playing = false;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		seek(e);
	}
	function move(e: PointerEvent) {
		if (dragging) seek(e);
	}
	function up() {
		dragging = false;
	}
	function key(e: KeyboardEvent) {
		const step = e.shiftKey ? 10 : 1;
		if (e.key === 'ArrowRight') explorer.setYear(explorer.year + step);
		else if (e.key === 'ArrowLeft') explorer.setYear(explorer.year - step);
		else return;
		e.preventDefault();
	}
</script>

<section class="timeline panel" aria-label="Construction timeline">
	<div class="controls">
		<button type="button" class="hud-btn" onclick={() => explorer.setYear(TODAY_YEAR)} title="Back to today (Home)">⇤ Now</button>
		<button
			type="button"
			class="hud-btn play"
			class:on={explorer.playing}
			onclick={() => (explorer.playing = !explorer.playing)}
			title="Play / pause (Space)">{explorer.playing ? '❚❚' : '▶'}</button
		>
		<div class="speeds" role="group" aria-label="Playback speed">
			{#each SPEEDS as s, i (s.label)}
				<button type="button" class="hud-btn" class:on={explorer.speedIndex === i} onclick={() => (explorer.speedIndex = i)}
					>{s.label}</button
				>
			{/each}
		</div>
		<div class="note">
			Projection · P0 start assumed {ASSUMED_PHASE0_START} · nominal = midpoint of planned duration · hatched = min/max envelope
		</div>
	</div>

	<div
		class="track"
		bind:this={track}
		role="slider"
		tabindex="0"
		aria-label="Construction year"
		aria-valuemin={Math.round(axis[0].from)}
		aria-valuemax={Math.round(axis[axis.length - 1].to)}
		aria-valuenow={Math.round(explorer.year)}
		onpointerdown={down}
		onpointermove={move}
		onpointerup={up}
		onkeydown={key}
	>
		{#each TIMELINE as w (w.id)}
			<div
				class="env"
				style="left:{pct(w.startMin)};width:{width(w.startMin, w.endMax)};top:{8 + lane(w.id) * 20 + 13}px;--c:{PHASE_COLORS[w.id]}"
			></div>
			<div
				class="band"
				class:live={explorer.year >= w.start}
				style="left:{pct(w.start)};width:{width(w.start, w.end)};top:{8 + lane(w.id) * 20}px;--c:{PHASE_COLORS[w.id]}"
				title="{w.label} {w.title}: {Math.round(w.start)}–{Math.round(w.end)} nominal ({w.durationMin}–{w.durationMax} yr)"
			>
				<span>{w.label} {w.title}</span>
			</div>
		{/each}

		<div class="today" style="left:{pct(TODAY_YEAR)}" title="Today"></div>

		{#each ticks as t (t)}
			<div class="tick" style="left:{pct(t)}"><span>{t}</span></div>
		{/each}

		<div class="head" style="left:{pct(explorer.year)}">
			<span>{formatYear(explorer.year)}</span>
		</div>
	</div>
</section>

<style>
	.timeline {
		position: absolute;
		left: 12px;
		right: 12px;
		bottom: 12px;
		padding: 8px 14px 6px;
	}
	.controls {
		display: flex;
		gap: 6px;
		align-items: center;
		margin-bottom: 4px;
	}
	.play {
		width: 34px;
	}
	.speeds {
		display: flex;
		gap: 2px;
		margin-left: 6px;
	}
	.speeds .hud-btn {
		padding: 3px 6px;
		font-size: 10px;
	}
	.note {
		margin-left: auto;
		color: var(--hud-faint);
		font-size: 10px;
		text-align: right;
	}
	.track {
		position: relative;
		height: 68px;
		cursor: ew-resize;
		touch-action: none;
		user-select: none;
	}
	.band {
		position: absolute;
		height: 14px;
		background: color-mix(in srgb, var(--c) 18%, transparent);
		border-left: 2px solid var(--c);
		color: var(--c);
		font-size: 10px;
		letter-spacing: 0.06em;
		overflow: hidden;
		white-space: nowrap;
		opacity: 0.55;
	}
	.band.live {
		opacity: 1;
		background: color-mix(in srgb, var(--c) 28%, transparent);
	}
	.band span {
		padding-left: 4px;
		line-height: 14px;
	}
	.env {
		position: absolute;
		height: 4px;
		background: repeating-linear-gradient(
			135deg,
			color-mix(in srgb, var(--c) 55%, transparent) 0 2px,
			transparent 2px 5px
		);
		opacity: 0.6;
	}
	.tick {
		position: absolute;
		bottom: 0;
		height: 12px;
		border-left: 1px solid var(--hud-faint);
	}
	.tick span {
		position: absolute;
		left: 3px;
		bottom: -1px;
		font-size: 9.5px;
		color: var(--hud-faint);
	}
	.today {
		position: absolute;
		top: 0;
		bottom: 0;
		border-left: 1px dashed var(--hud-ok);
		opacity: 0.6;
	}
	.head {
		position: absolute;
		top: -2px;
		bottom: 0;
		border-left: 1px solid #fff;
		box-shadow: 0 0 6px var(--hud-accent);
		pointer-events: none;
	}
	.head span {
		position: absolute;
		bottom: 12px;
		left: 4px;
		background: var(--hud-bg-solid);
		border: 1px solid var(--hud-line-strong);
		padding: 0 4px;
		font-size: 10px;
		color: #fff;
		white-space: nowrap;
	}
	@media (max-width: 900px) {
		.note {
			display: none;
		}
		.speeds .hud-btn:nth-child(n + 5) {
			display: none;
		}
	}
</style>
