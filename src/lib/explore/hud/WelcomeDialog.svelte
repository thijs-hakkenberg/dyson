<script lang="ts">
	/**
	 * First-visit welcome: offers the interface tour and the two story tours.
	 * Shown once per browser, and never over a deep link (someone sent you
	 * somewhere specific) or a tour link.
	 */
	import { onMount } from 'svelte';
	import { tour } from '../core/tour.svelte';
	import { getTour, TOURS } from '../core/tours';

	const SEEN_KEY = 'explore:welcome-seen';
	let open = $state(false);
	let primary = $state<HTMLButtonElement>();

	onMount(() => {
		const params = [...new URLSearchParams(location.search).keys()].filter((k) => !/^utm_|^ref$/.test(k));
		if (params.length) return;
		try {
			open = !localStorage.getItem(SEEN_KEY);
		} catch {
			open = true;
		}
	});

	$effect(() => {
		if (open) primary?.focus();
	});

	function close() {
		open = false;
		try {
			localStorage.setItem(SEEN_KEY, '1');
		} catch {
			/* storage unavailable: the welcome simply shows again next visit */
		}
	}

	function start(id: string) {
		const t = getTour(id);
		close();
		if (t) tour.start(t);
	}

	const ui = getTour('interface')!;
	const stories = ['why-swarm', 'asteroid-to-swarm'].map((id) => getTour(id)!).filter(Boolean);
	const more = TOURS.length - 1 - stories.length;
</script>

<svelte:window onkeydown={(e) => open && e.key === 'Escape' && close()} />

{#if open}
	<div class="backdrop" role="presentation" onclick={close}></div>
	<div class="dialog panel" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
		<div class="eyebrow">Project Dyson · Explorer</div>
		<h2 id="welcome-title">The plan, in 3D</h2>
		<p>
			Every phase, component and open research question of the Dyson swarm plan, placed in a live model of the Solar
			System. Figures come from the multi-model consensus specs, and where the AI models disagree, every view is shown.
		</p>

		<button type="button" class="opt main" bind:this={primary} onclick={() => start(ui.id)}>
			<span class="play" aria-hidden="true">▶</span>
			<span>
				<b>{ui.title}</b>
				<i>{ui.subtitle} · recommended first</i>
			</span>
		</button>
		<div class="eyebrow sec">Or start with a story</div>
		{#each stories as t (t.id)}
			<button type="button" class="opt" onclick={() => start(t.id)}>
				<span class="play" aria-hidden="true">▶</span>
				<span>
					<b>{t.title}</b>
					<i>{t.subtitle}</i>
				</span>
			</button>
		{/each}

		<div class="foot">
			<span>+{more} phase deep dives under <b>▶ Tours</b> · <kbd>?</kbd> shortcuts</span>
			<button type="button" class="hud-btn" onclick={close}>Explore on my own</button>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 30;
		background: rgba(2, 6, 12, 0.55);
		backdrop-filter: blur(2px);
		animation: fade 0.4s ease;
	}
	.dialog {
		position: fixed;
		z-index: 31;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: min(520px, calc(100vw - 32px));
		max-height: calc(100vh - 32px);
		overflow-y: auto;
		padding: 20px 22px 16px;
		animation: rise 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
	}
	h2 {
		margin: 4px 0 8px;
		font-family: var(--font-cond);
		font-size: 30px;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: #fff;
	}
	p {
		margin: 0 0 16px;
		font-family: system-ui, sans-serif;
		font-size: 14px;
		line-height: 1.55;
		color: #d5e1ee;
	}
	.opt {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
		margin: 0 0 6px;
		padding: 10px 12px;
		text-align: left;
		cursor: pointer;
		color: inherit;
		font: inherit;
		background: rgba(125, 211, 252, 0.04);
		border: 1px solid var(--hud-line);
		transition:
			border-color 0.15s,
			background 0.15s;
	}
	.opt:hover,
	.opt:focus-visible {
		border-color: var(--hud-accent);
		background: rgba(125, 211, 252, 0.1);
		outline: none;
	}
	.opt.main {
		padding: 14px;
		border-color: var(--hud-accent);
		background: rgba(125, 211, 252, 0.12);
		box-shadow: 0 0 24px rgba(125, 211, 252, 0.15);
	}
	.opt.main b {
		font-size: 17px;
	}
	.play {
		flex: none;
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border: 1px solid var(--hud-accent);
		border-radius: 50%;
		color: var(--hud-accent);
		font-size: 11px;
	}
	.opt span:last-child {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.opt b {
		font-family: var(--font-cond);
		font-size: 15px;
		font-weight: 600;
		color: #fff;
		letter-spacing: 0.02em;
	}
	.opt i {
		font-style: normal;
		font-size: 11px;
		color: var(--hud-dim);
	}
	.sec {
		margin: 12px 0 6px;
		font-size: 10px;
	}
	.foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		flex-wrap: wrap;
		margin-top: 12px;
		font-size: 10.5px;
		color: var(--hud-dim);
	}
	.foot b {
		color: var(--hud-text, #e2e8f0);
		font-weight: 500;
	}
	kbd {
		font-family: inherit;
		border: 1px solid var(--hud-line);
		padding: 0 4px;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translate(-50%, calc(-50% + 16px));
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.backdrop,
		.dialog {
			animation: none;
		}
	}
</style>
