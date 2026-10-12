<script lang="ts">
	import { explorer, MAX_YEAR, SPEEDS, TODAY_YEAR } from '../core/state.svelte';
	import { deepTime, DEEP_MAX_MYR, DEEP_SPEEDS } from '../core/deeptime.svelte';
	import { TIMELINE, ASSUMED_PHASE0_START, buildAxis, yearToAxis, axisToYear } from '../core/timeline';
	import { PHASE_COLORS } from '../core/theme';
	import { formatYear } from '../core/units';

	const axis = buildAxis(TODAY_YEAR);
	// The right end of the track continues past the build-out into deep time (linear in Myr)
	const DEEP = 0.1;
	const MAIN = 1 - DEEP;
	const pct = (y: number) => `${(yearToAxis(y, axis) * MAIN * 100).toFixed(3)}%`;
	const width = (a: number, b: number) => `${((yearToAxis(b, axis) - yearToAxis(a, axis)) * MAIN * 100).toFixed(3)}%`;
	const deepPct = (myr: number) => `${((MAIN + (myr / DEEP_MAX_MYR) * DEEP) * 100).toFixed(3)}%`;
	const inDeep = $derived(deepTime.myr > 0);
	const atEnd = $derived(explorer.year >= MAX_YEAR - 1e-6);
	const speeds = $derived(atEnd ? DEEP_SPEEDS.map((s) => s.label) : SPEEDS.map((s) => s.label));

	// 3a and 3b run in parallel: give them their own lane
	const lane = (id: string) => (id === 'phase-3b' ? 1 : 0);

	// Drop tick labels that would collide (e.g. today and the assumed Phase 0 start) at this track width
	let trackW = $state(1000);
	const allTicks = [...new Set(axis.flatMap((s) => [s.from, s.to]).map((y) => Math.round(y)))];
	const ticks = $derived.by(() => {
		const out: number[] = [];
		for (const y of allTicks) {
			const last = out[out.length - 1];
			if (last === undefined || (yearToAxis(y, axis) - yearToAxis(last, axis)) * MAIN * trackW > 34) out.push(y);
		}
		return out;
	});

	let track = $state<HTMLDivElement>();
	let dragging = false;

	function seek(e: PointerEvent) {
		if (!track) return;
		const r = track.getBoundingClientRect();
		const u = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
		if (u > MAIN) {
			explorer.setYear(MAX_YEAR);
			deepTime.myr = ((u - MAIN) / DEEP) * DEEP_MAX_MYR;
		} else {
			deepTime.myr = 0;
			explorer.setYear(axisToYear(u / MAIN, axis));
		}
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
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		const dir = e.key === 'ArrowRight' ? 1 : -1;
		// Deep time steps in Myr; stepping back out of it returns to the build-out year
		if (inDeep || (atEnd && dir > 0)) deepTime.myr = Math.min(DEEP_MAX_MYR, Math.max(0, deepTime.myr + dir * step));
		else explorer.setYear(explorer.year + dir * step);
		e.preventDefault();
	}
</script>

<section class="timeline panel" aria-label="Construction timeline">
	<div class="controls">
		<button type="button" class="hud-btn" onclick={() => {
				deepTime.myr = 0;
				explorer.setYear(TODAY_YEAR);
			}} title="Back to today (Home)">⇤ Now</button>
		<button
			type="button"
			class="hud-btn play"
			class:on={explorer.playing}
			onclick={() => (explorer.playing = !explorer.playing)}
			title="Play / pause (Space)">{explorer.playing ? '❚❚' : '▶'}</button
		>
		<div class="speeds" role="group" aria-label="Playback speed">
			{#each speeds as label, i (i)}
				<button type="button" class="hud-btn" class:on={explorer.speedIndex === i} onclick={() => (explorer.speedIndex = i)}
					>{label}</button
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
		bind:clientWidth={trackW}
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

		<div
			class="deep"
			class:live={inDeep}
			style="left:{deepPct(0)};width:{DEEP * 100}%"
			title="Deep time: the Sun's galactic orbit for {DEEP_MAX_MYR} Myr after the build-out, with or without the stellar engine. Planets are held at {Math.round(MAX_YEAR)}."
		>
			<span>Deep time →</span>
			<i>+{DEEP_MAX_MYR} Myr</i>
		</div>

		{#each ticks as t (t)}
			<div class="tick" style="left:{pct(t)}"><span>{t}</span></div>
		{/each}

		<div class="head" class:flip={inDeep || atEnd} style="left:{inDeep ? deepPct(deepTime.myr) : pct(explorer.year)}">
			<span>{inDeep ? `+${deepTime.myr.toFixed(deepTime.myr < 10 ? 1 : 0)} Myr` : formatYear(explorer.year)}</span>
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
	.deep {
		position: absolute;
		top: 8px;
		height: 34px;
		border-left: 1px dashed var(--hud-line-strong);
		background: repeating-linear-gradient(90deg, rgba(125, 211, 252, 0.06) 0 2px, transparent 2px 6px);
		color: var(--hud-dim);
		font-size: 9.5px;
		padding: 2px 5px;
		overflow: hidden;
		white-space: nowrap;
	}
	.deep.live {
		background: repeating-linear-gradient(90deg, rgba(125, 211, 252, 0.16) 0 2px, transparent 2px 6px);
		color: var(--hud-accent);
	}
	.deep span,
	.deep i {
		display: block;
		font-style: normal;
	}
	.deep i {
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
	.head.flip span {
		left: auto;
		right: 4px;
	}
	.controls .hud-btn {
		white-space: nowrap;
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
	/* Phones: the plan spans centuries, so keep the faster speeds and shrink the buttons */
	@media (max-width: 700px) {
		.speeds .hud-btn:nth-child(n + 5) {
			display: inline-block;
		}
		.speeds .hud-btn:nth-child(-n + 2) {
			display: none;
		}
		.controls .hud-btn {
			font-size: 10px;
			padding: 3px 6px;
		}
	}
</style>
