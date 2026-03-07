<script lang="ts">
	import { onMount } from 'svelte';
	import { getPhases, formatCurrency, getTotalProjectCost } from '$lib/services/content';
	import { trackCTA } from '$lib/services/mixpanel';

	let { data } = $props();

	const phases = getPhases();
	const recentPosts = $derived(data.recentPosts);
	const totalCost = getTotalProjectCost();

	let scrollProgress = $state(0);
	let starfieldEl: HTMLDivElement;
	let energyBarsVisible = $state(false);

	onMount(() => {
		// Generate starfield
		if (starfieldEl) {
			const count = 80;
			for (let i = 0; i < count; i++) {
				const star = document.createElement('div');
				star.className = 'star';
				const size = Math.random() * 2 + 0.5;
				star.style.cssText = `
					width: ${size}px; height: ${size}px;
					left: ${Math.random() * 100}%;
					top: ${Math.random() * 100}%;
					--duration: ${Math.random() * 4 + 2}s;
					--min-opacity: ${Math.random() * 0.2 + 0.05};
					--max-opacity: ${Math.random() * 0.5 + 0.3};
				`;
				starfieldEl.appendChild(star);
			}
		}

		// Scroll progress
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
		};
		window.addEventListener('scroll', handleScroll);

		// Scroll reveal
		const revealObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		}, { threshold: 0.15 });

		document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

		// Energy bar animation
		const energyObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					energyBarsVisible = true;
				}
			});
		}, { threshold: 0.15 });

		const energySection = document.querySelector('.energy-comparison');
		if (energySection) energyObserver.observe(energySection);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			revealObserver.disconnect();
			energyObserver.disconnect();
		};
	});

	function getPhaseStatus(index: number): 'active' | 'future' {
		return index === 0 ? 'active' : 'future';
	}

	function getActivityType(post: typeof recentPosts[0]): { label: string; class: string } {
		if (post.category === 'Research Resolutions') return { label: 'Resolved', class: 'resolved' };
		if (post.category === 'Papers') return { label: 'Paper', class: 'paper' };
		return { label: 'Blog', class: 'blog' };
	}

	function formatDate(date: Date): string {
		const now = new Date();
		const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
		if (diff === 0) return 'Today';
		if (diff === 1) return '1 day ago';
		if (diff < 7) return `${diff} days ago`;
		if (diff < 30) return `${Math.floor(diff / 7)} week${Math.floor(diff / 7) > 1 ? 's' : ''} ago`;
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}
</script>

<svelte:head>
	<title>Project Dyson — Engineering the Largest Structure Ever Conceived</title>
	<meta name="description" content="A volunteer-led nonprofit planning the construction of a Dyson swarm. One research question at a time." />
</svelte:head>

<!-- Scroll Progress -->
<div class="scroll-progress" style="width: {scrollProgress}%"></div>

<!-- ═══ HERO ═══ -->
<section class="hero">
	<div class="starfield" bind:this={starfieldEl}></div>
	<div class="hero-visual reveal">
		<div class="sun-container">
			<div class="sun"></div>
			<div class="orbit-ring ring-1"><div class="orbit-dot"></div></div>
			<div class="orbit-ring ring-2"><div class="orbit-dot"></div></div>
			<div class="orbit-ring ring-3"><div class="orbit-dot"></div></div>
		</div>
	</div>
	<h1 class="reveal reveal-delay-1">
		<span>Engineering the Largest</span>
		<span>Structure Ever Conceived</span>
	</h1>
	<p class="hero-sub reveal reveal-delay-2">
		One research question at a time.
	</p>
	<div class="hero-actions reveal reveal-delay-3">
		<a href="/plan" class="btn-primary" onclick={() => trackCTA('See the Plan', 'Hero', '/plan')}>See the Plan</a>
		<a href="#join" class="btn-secondary">Join the Effort</a>
	</div>
	<div class="scroll-hint">
		<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
	</div>
</section>

<!-- ═══ THE PROBLEM ═══ -->
<section class="problem-section" id="problem">
	<div class="section-inner">
		<div class="section-label reveal">The Problem</div>
		<h2 class="section-title reveal reveal-delay-1">
			What if we could capture the<br>
			full energy output of a star?
		</h2>
		<p class="section-desc reveal reveal-delay-2">
			A Dyson swarm is a constellation of solar-collecting satellites orbiting a star.
			It's the difference between catching rain in a cup and damming an entire river.
		</p>
		<div class="energy-comparison reveal reveal-delay-3">
			<div class="energy-bar">
				<div class="energy-label">
					<span class="name">Earth's total energy use</span>
					<span class="value">580 exajoules/year</span>
				</div>
				<div class="bar-track">
					<div class="bar-fill earth" style="width: {energyBarsVisible ? '0.3%' : '0'}"></div>
				</div>
			</div>
			<div class="energy-bar">
				<div class="energy-label">
					<span class="name">A Dyson swarm</span>
					<span class="value">3.8 × 10²⁶ watts</span>
				</div>
				<div class="bar-track">
					<div class="bar-fill dyson" style="width: {energyBarsVisible ? '100%' : '0'}"></div>
				</div>
			</div>
			<p class="energy-footnote">
				Earth's energy consumption is not even visible at this scale.
			</p>
		</div>
	</div>
</section>

<!-- ═══ THE PLAN ═══ -->
<section class="plan-section" id="plan">
	<div class="section-inner">
		<div class="section-label reveal">The Plan</div>
		<h2 class="section-title reveal reveal-delay-1">
			{phases.length} phases. Centuries.<br>{formatCurrency(totalCost)}.
		</h2>
		<p class="section-desc reveal reveal-delay-2">
			We don't start building until every question is answered. Phase 0 is pure research&mdash;proving feasibility before spending a single dollar on hardware.
		</p>
		<div class="phase-timeline reveal reveal-delay-3">
			{#each phases as phase, i}
				<div class="phase-item">
					<div class="phase-marker {getPhaseStatus(i)}">{phase.number}</div>
					<div class="phase-content">
						<h3>
							{phase.title}
							{#if phase.status === 'in-progress'}
								<span class="phase-tag active">In Progress</span>
							{:else}
								<span class="phase-tag planned">Planned</span>
							{/if}
						</h3>
						<div class="phase-meta">
							<span class="cost">{formatCurrency(phase.totalCost)}</span>
							<span>{phase.estimatedDuration}</span>
						</div>
						<p class="phase-desc">{phase.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══ RIGHT NOW ═══ -->
<section class="now-section" id="now">
	<div class="section-inner">
		<div class="section-label reveal">Right Now</div>
		<div class="now-quote reveal reveal-delay-1">
			We're answering the 51 hardest questions<br>
			before spending a single dollar.
		</div>
		<div class="activity-list">
			{#each recentPosts as post, i}
				{@const activity = getActivityType(post)}
				<a class="activity-item reveal reveal-delay-{i + 1}" href="/blog/{post.slug}">
					<span class="activity-type {activity.class}">{activity.label}</span>
					<div class="activity-body">
						<h4>{post.title}</h4>
						<p>{post.description} &middot; {formatDate(post.date)}</p>
					</div>
					<span class="activity-arrow">&rarr;</span>
				</a>
			{/each}
		</div>
		<div class="now-actions reveal reveal-delay-4">
			<a href="/research" class="btn-primary" onclick={() => trackCTA('Explore All Research', 'Right Now', '/research')}>Explore All Research</a>
			<a href="/questions" class="btn-secondary" onclick={() => trackCTA('See Open Questions', 'Right Now', '/questions')}>See Open Questions</a>
		</div>
	</div>
</section>

<!-- ═══ Stats Bar ═══ -->
<div class="stats-bar reveal">
	<div class="stat">
		<div class="stat-value">51</div>
		<div class="stat-label">Questions</div>
	</div>
	<div class="stat">
		<div class="stat-value">5</div>
		<div class="stat-label">Resolved</div>
	</div>
	<div class="stat">
		<div class="stat-value">150+</div>
		<div class="stat-label">Papers Cited</div>
	</div>
	<div class="stat">
		<div class="stat-value">23</div>
		<div class="stat-label">Contributors</div>
	</div>
	<div class="stat">
		<div class="stat-value">7</div>
		<div class="stat-label">Tech Threads</div>
	</div>
</div>

<!-- ═══ JOIN ═══ -->
<section class="join-section" id="join">
	<div class="section-inner">
		<div class="section-label reveal" style="justify-content:center;">
			<span>Join the Effort</span>
		</div>
		<h2 class="section-title reveal reveal-delay-1">
			23 volunteers. Zero investors.<br>
			Everything is public.
		</h2>
		<p class="section-desc reveal reveal-delay-2">
			Every plan is open. Every paper is cited. Every decision is documented.
			We need researchers, engineers, writers, and developers.
		</p>
		<div class="join-roles reveal reveal-delay-3">
			<span class="role-chip">Research Contributor</span>
			<span class="role-chip">Engineering Analyst</span>
			<span class="role-chip">Content Creator</span>
			<span class="role-chip">Developer</span>
		</div>
		<div class="join-links reveal reveal-delay-4">
			<a href="https://github.com/thijs-hakkenberg/dyson" class="join-link" target="_blank" rel="noopener noreferrer">
				<svg viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
				GitHub
			</a>
		</div>
	</div>
</section>

<style>
	/* ── Scroll Progress Bar ── */
	.scroll-progress {
		position: fixed;
		top: 0;
		left: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-amber));
		z-index: 1000;
		transition: width 0.1s linear;
	}

	/* ── Sections ── */
	section {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 6rem 2.5rem;
		position: relative;
	}

	.section-inner {
		max-width: 900px;
		margin: 0 auto;
		width: 100%;
	}

	/* ── Hero ── */
	.hero {
		text-align: center;
		overflow: hidden;
	}

	.starfield {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	:global(.star) {
		position: absolute;
		border-radius: 50%;
		background: white;
		animation: twinkle var(--duration) ease-in-out infinite;
	}

	@keyframes twinkle {
		0%, 100% { opacity: var(--min-opacity); }
		50% { opacity: var(--max-opacity); }
	}

	.hero-visual {
		position: relative;
		margin-bottom: 3rem;
		display: flex;
		justify-content: center;
	}

	.sun-container {
		position: relative;
		width: 120px;
		height: 120px;
	}

	.sun {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: radial-gradient(circle at 40% 40%, #ffd97d, var(--color-accent-gold), #c47a15);
		box-shadow:
			0 0 60px rgba(240,168,48,0.4),
			0 0 120px rgba(240,168,48,0.15);
		animation: sun-pulse 4s ease-in-out infinite;
	}

	@keyframes sun-pulse {
		0%, 100% { box-shadow: 0 0 60px rgba(240,168,48,0.4), 0 0 120px rgba(240,168,48,0.15); }
		50% { box-shadow: 0 0 80px rgba(240,168,48,0.5), 0 0 160px rgba(240,168,48,0.2); }
	}

	.orbit-ring {
		position: absolute;
		border: 1px solid rgba(240,168,48,0.15);
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.ring-1 { width: 200px; height: 200px; }
	.ring-2 { width: 280px; height: 280px; }
	.ring-3 { width: 360px; height: 360px; }

	.orbit-dot {
		position: absolute;
		width: 4px;
		height: 4px;
		background: var(--color-accent-gold);
		border-radius: 50%;
		box-shadow: 0 0 6px rgba(240,168,48,0.6);
	}

	.ring-1 .orbit-dot {
		top: -2px; left: 50%; transform: translateX(-50%);
		animation: orbit2 12s linear infinite;
	}

	.ring-2 .orbit-dot {
		top: 50%; right: -2px; transform: translateY(-50%);
		animation: orbit3 18s linear infinite reverse;
	}

	.ring-3 .orbit-dot {
		bottom: -2px; left: 50%; transform: translateX(-50%);
		animation: orbit4 25s linear infinite;
	}

	@keyframes orbit2 {
		from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
		to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
	}
	@keyframes orbit3 {
		from { transform: rotate(0deg) translateX(140px) rotate(0deg); }
		to { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
	}
	@keyframes orbit4 {
		from { transform: rotate(0deg) translateX(180px) rotate(0deg); }
		to { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
	}

	.hero h1 {
		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin-bottom: 1.5rem;
		position: relative;
	}

	.hero h1 span {
		display: block;
		background: linear-gradient(135deg, var(--color-star-white) 0%, var(--color-star-dim) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-sub {
		font-size: 1.25rem;
		color: var(--color-star-dim);
		margin-bottom: 2.5rem;
		font-weight: 300;
		position: relative;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		position: relative;
	}

	.scroll-hint {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-star-faint);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		animation: bob 2s ease-in-out infinite;
	}

	@keyframes bob {
		0%, 100% { transform: translateX(-50%) translateY(0); }
		50% { transform: translateX(-50%) translateY(8px); }
	}

	.scroll-hint svg {
		width: 20px;
		height: 20px;
		stroke: var(--color-star-faint);
		fill: none;
		stroke-width: 2;
	}

	/* ── Section Labels ── */
	.section-label {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-accent-gold);
		margin-bottom: 2rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.section-label::after {
		content: '';
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, var(--color-accent-gold), transparent);
		opacity: 0.3;
	}

	.section-title {
		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		line-height: 1.15;
		margin-bottom: 1.5rem;
		letter-spacing: -0.02em;
	}

	.section-desc {
		font-size: 1.15rem;
		color: var(--color-star-dim);
		line-height: 1.7;
		max-width: 600px;
		font-weight: 300;
	}

	/* ── Problem Section — Energy Scale ── */
	.energy-comparison {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.energy-bar {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.energy-label {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.energy-label .name {
		font-weight: 500;
		font-size: 0.95rem;
	}

	.energy-label .value {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.85rem;
		color: var(--color-star-faint);
	}

	.bar-track {
		height: 8px;
		background: var(--color-space-700);
		border-radius: 4px;
		overflow: hidden;
	}

	.bar-fill {
		height: 100%;
		border-radius: 4px;
		transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.bar-fill.earth { background: var(--color-status-info); }
	.bar-fill.dyson {
		background: linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-amber));
	}

	.energy-footnote {
		font-size: 0.8rem;
		color: var(--color-star-faint);
		font-style: italic;
		margin-top: 1rem;
	}

	/* ── Plan Section ── */
	.plan-section { background: var(--color-space-800); }

	.phase-timeline {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		gap: 0;
		position: relative;
	}

	.phase-timeline::before {
		content: '';
		position: absolute;
		left: 1.25rem;
		top: 0;
		bottom: 0;
		width: 2px;
		background: rgba(255,255,255,0.06);
	}

	.phase-item {
		display: flex;
		gap: 2rem;
		padding: 1.75rem 0;
		position: relative;
		align-items: flex-start;
	}

	.phase-marker {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Space Grotesk', sans-serif;
		font-weight: 700;
		font-size: 0.8rem;
		position: relative;
		z-index: 1;
	}

	.phase-marker.active {
		background: var(--color-accent-gold);
		color: var(--color-space-900);
		box-shadow: 0 0 20px rgba(240,168,48,0.3);
	}

	.phase-marker.future {
		background: var(--color-space-700);
		color: var(--color-star-faint);
		border: 1px solid rgba(255,255,255,0.06);
	}

	.phase-content h3 {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.phase-meta {
		display: flex;
		gap: 1.5rem;
		font-size: 0.85rem;
		color: var(--color-star-faint);
		margin-bottom: 0.5rem;
	}

	.phase-meta .cost {
		color: var(--color-accent-gold);
		font-family: 'Space Grotesk', sans-serif;
		font-weight: 500;
	}

	.phase-desc {
		font-size: 0.9rem;
		color: var(--color-star-dim);
		line-height: 1.6;
	}

	.phase-tag {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		margin-left: 0.75rem;
	}

	.phase-tag.active {
		background: rgba(52,211,153,0.15);
		color: var(--color-status-success);
	}

	.phase-tag.planned {
		background: rgba(255,255,255,0.05);
		color: var(--color-star-faint);
	}

	/* ── Right Now Section ── */
	.now-section { background: var(--color-space-900); }

	.now-quote {
		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 300;
		line-height: 1.4;
		margin-bottom: 3rem;
		color: var(--color-star-white);
		border-left: 3px solid var(--color-accent-gold);
		padding-left: 1.5rem;
	}

	.activity-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.activity-item {
		display: flex;
		gap: 1.25rem;
		padding: 1.25rem 1.5rem;
		background: var(--color-space-700);
		border-radius: 10px;
		border: 1px solid rgba(255,255,255,0.06);
		transition: all 0.2s;
		text-decoration: none;
		color: inherit;
		cursor: pointer;
	}

	.activity-item:hover {
		border-color: rgba(240,168,48,0.2);
		background: rgba(14,21,40,0.8);
		transform: translateX(4px);
	}

	.activity-type {
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		flex-shrink: 0;
		align-self: flex-start;
		margin-top: 0.15rem;
	}

	.activity-type.blog { background: rgba(59,130,246,0.15); color: var(--color-status-info); }
	.activity-type.resolved { background: rgba(52,211,153,0.15); color: var(--color-status-success); }
	.activity-type.paper { background: rgba(240,168,48,0.15); color: var(--color-accent-gold); }

	.activity-body h4 {
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 0.25rem;
	}

	.activity-body p {
		font-size: 0.85rem;
		color: var(--color-star-faint);
	}

	.activity-arrow {
		margin-left: auto;
		color: var(--color-star-faint);
		align-self: center;
		font-size: 1.2rem;
		transition: color 0.2s;
	}

	.activity-item:hover .activity-arrow { color: var(--color-accent-gold); }

	.now-actions {
		display: flex;
		gap: 1rem;
		margin-top: 2.5rem;
	}

	/* ── Stats Bar ── */
	.stats-bar {
		display: flex;
		gap: 2rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 3rem;
		padding: 2rem 2.5rem;
		border-top: 1px solid rgba(255,255,255,0.06);
		border-bottom: 1px solid rgba(255,255,255,0.06);
	}

	.stat {
		text-align: center;
		min-width: 100px;
	}

	.stat-value {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-accent-gold);
		line-height: 1;
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--color-star-faint);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-top: 0.5rem;
	}

	/* ── Join Section ── */
	.join-section {
		background: var(--color-space-800);
		text-align: center;
	}

	.join-section .section-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.join-section .section-desc {
		text-align: center;
		margin: 0 auto 2rem;
	}

	.join-roles {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 3rem;
	}

	.role-chip {
		padding: 0.5rem 1.25rem;
		border-radius: 100px;
		border: 1px solid rgba(255,255,255,0.06);
		font-size: 0.85rem;
		color: var(--color-star-dim);
		transition: all 0.2s;
		cursor: default;
	}

	.role-chip:hover {
		border-color: var(--color-accent-gold);
		color: var(--color-accent-gold);
		background: rgba(240,168,48,0.15);
	}

	.join-links {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.join-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-star-dim);
		text-decoration: none;
		font-size: 0.95rem;
		transition: color 0.2s;
	}

	.join-link:hover { color: var(--color-accent-gold); }

	.join-link svg {
		width: 18px;
		height: 18px;
		fill: currentColor;
	}

	/* ── Responsive ── */
	@media (max-width: 768px) {
		section { padding: 4rem 1.5rem; }

		.hero h1 { font-size: 2.25rem; }
		.hero-sub { font-size: 1rem; }

		.hero-actions {
			flex-direction: column;
			align-items: center;
		}

		.sun-container { width: 80px; height: 80px; }
		.sun { width: 80px; height: 80px; }
		.ring-1 { width: 140px; height: 140px; }
		.ring-2 { width: 200px; height: 200px; }
		.ring-3 { width: 260px; height: 260px; }

		.stats-bar { gap: 1.5rem; }
		.stat-value { font-size: 1.5rem; }

		.phase-item { gap: 1.25rem; }
		.now-actions { flex-direction: column; align-items: stretch; text-align: center; }
		.join-links { flex-direction: column; align-items: center; }
	}
</style>
