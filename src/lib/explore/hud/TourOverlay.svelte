<script lang="ts">
	/** Lower-third captions and transport controls for the active tour; first-visit invitation otherwise. */
	import { onMount } from 'svelte';
	import { tour } from '../core/tour.svelte';
	import { explorer } from '../core/state.svelte';
	import { TOURS } from '../core/tours';
	import { renderMarkdown } from '../core/wbstore.svelte';

	const INVITE_KEY = 'explore:tour-invite-dismissed';
	let invite = $state(false);

	onMount(() => {
		try {
			invite = !localStorage.getItem(INVITE_KEY);
		} catch {
			invite = true;
		}
		let last = performance.now();
		let raf = 0;
		const loop = (now: number) => {
			tour.tick(Math.min(0.1, (now - last) / 1000));
			last = now;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	});

	function dismissInvite() {
		invite = false;
		try {
			localStorage.setItem(INVITE_KEY, '1');
		} catch {
			/* storage unavailable: invitation simply shows again next visit */
		}
	}

	const step = $derived(tour.step);
	const t = $derived(tour.tour);
	const progress = $derived(step ? Math.min(1, tour.elapsed / step.duration) : 0);
	const nextTour = $derived(t ? TOURS[TOURS.findIndex((x) => x.id === t.id) + 1] : undefined);
	const last = $derived(!!t && tour.index === t.steps.length - 1);
</script>

{#if t && step}
	<section class="tour panel" aria-live="polite" aria-label="Guided tour">
		<div class="head">
			<span class="eyebrow">{t.title} · {tour.index + 1}/{t.steps.length}</span>
			<button type="button" class="x" onclick={() => tour.exit()} aria-label="Exit tour">✕</button>
		</div>
		<h2>{step.title}</h2>
		<p>{@html renderMarkdown(step.body, true)}</p>
		<div class="steps" aria-hidden="true">
			{#each t.steps as _, i (i)}
				<i class:done={i < tour.index} class:cur={i === tour.index}>
					{#if i === tour.index}<b style="width:{progress * 100}%"></b>{/if}
				</i>
			{/each}
		</div>
		<div class="controls">
			<button type="button" class="hud-btn" onclick={() => tour.prev()} disabled={tour.index === 0} aria-label="Previous step">◀</button>
			{#if tour.paused}
				<button type="button" class="hud-btn on" onclick={() => tour.resume()}>▶ Resume</button>
				<span class="hint">Paused — explore freely</span>
			{:else}
				<button type="button" class="hud-btn" onclick={() => tour.pause()}>❚❚ Pause</button>
			{/if}
			<button type="button" class="hud-btn" onclick={() => tour.next()} aria-label="Next step">▶▶</button>
			{#if last && nextTour}
				<button type="button" class="hud-btn on next" onclick={() => tour.start(nextTour)}>Next: {nextTour.title} →</button>
			{/if}
			<span class="keys">Space pause · ←/→ step · Esc exit</span>
		</div>
	</section>
{:else if invite && explorer.lens === 'physical' && !explorer.workbenchId && !explorer.selectedId}
	<section class="invite panel" aria-label="Guided tours">
		<div>
			<div class="eyebrow">New here?</div>
			<div class="it">Take a guided tour</div>
		</div>
		{#each TOURS.slice(0, 2) as x (x.id)}
			<button
				type="button"
				class="hud-btn"
				onclick={() => {
					dismissInvite();
					tour.start(x);
				}}
			>
				▶ {x.title}
			</button>
		{/each}
		<span class="more">+{TOURS.length - 2} phase deep-dives in ▶ Tours</span>
		<button type="button" class="x" onclick={dismissInvite} aria-label="Dismiss">✕</button>
	</section>
{/if}

<style>
	.tour {
		position: absolute;
		left: 50%;
		bottom: 150px;
		transform: translateX(-50%);
		width: min(600px, calc(100vw - 32px));
		padding: 12px 16px 12px;
		z-index: 5;
	}
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.x {
		background: none;
		border: 0;
		color: var(--hud-dim);
		cursor: pointer;
		font-size: 13px;
	}
	.x:hover {
		color: #fff;
	}
	h2 {
		margin: 4px 0 4px;
		font-family: var(--font-cond);
		font-size: 24px;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: #fff;
	}
	p {
		margin: 0;
		font-family: system-ui, sans-serif;
		font-size: 14px;
		line-height: 1.5;
		color: #d5e1ee;
	}
	p :global(strong) {
		color: var(--hud-accent);
		font-weight: 600;
	}
	.steps {
		display: flex;
		gap: 3px;
		margin: 12px 0 10px;
	}
	.steps i {
		flex: 1;
		height: 2px;
		background: rgba(125, 211, 252, 0.15);
		position: relative;
	}
	.steps i.done {
		background: var(--hud-accent);
	}
	.steps b {
		position: absolute;
		inset: 0 auto 0 0;
		background: var(--hud-accent);
	}
	.controls {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
	}
	.hint {
		font-size: 10.5px;
		color: var(--hud-warn);
	}
	.keys {
		margin-left: auto;
		font-size: 10px;
		color: var(--hud-faint);
	}
	.next {
		margin-left: 6px;
	}
	.invite {
		position: absolute;
		left: 50%;
		bottom: 150px;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px 10px 16px;
		z-index: 5;
	}
	.more {
		font-size: 10px;
		color: var(--hud-dim);
	}
	.it {
		font-family: var(--font-cond);
		font-size: 16px;
		font-weight: 600;
		color: #fff;
	}
	@media (max-width: 900px) {
		.tour,
		.invite {
			bottom: 140px;
		}
		.keys {
			display: none;
		}
		.invite {
			flex-wrap: wrap;
			width: calc(100vw - 32px);
		}
	}
</style>
