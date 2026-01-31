<script lang="ts">
	import type { FundingCampaign } from '$lib/types';
	import { formatCurrency } from '$lib/services/content';
	import CampaignCard from '$lib/components/funding/CampaignCard.svelte';
	import ProgressBar from '$lib/components/funding/ProgressBar.svelte';

	// Sample campaigns (in production, these would come from a database)
	const campaigns: FundingCampaign[] = [
		{
			id: 'materials-research',
			title: 'Advanced Materials Research',
			description: 'Fund research into ultra-lightweight materials for solar sail construction and structural components.',
			goal: 50000,
			raised: 12500,
			startDate: new Date('2025-01-01'),
			status: 'active',
			relatedPhases: ['phase-1']
		},
		{
			id: 'simulation-compute',
			title: 'Orbital Simulation Computing',
			description: 'Support computational resources for simulating swarm orbital mechanics and collision avoidance.',
			goal: 25000,
			raised: 8750,
			startDate: new Date('2025-01-15'),
			status: 'active',
			relatedPhases: ['phase-1', 'phase-2']
		},
		{
			id: 'mining-feasibility',
			title: 'Asteroid Mining Feasibility Study',
			description: 'Commission a detailed feasibility study for Phase 0 mining operations.',
			goal: 100000,
			raised: 0,
			startDate: new Date('2025-03-01'),
			status: 'upcoming',
			relatedPhases: ['phase-0']
		}
	];

	const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0);
	const totalGoal = campaigns.reduce((sum, c) => sum + c.goal, 0);
	const activeCampaigns = campaigns.filter((c) => c.status === 'active');
</script>

<svelte:head>
	<title>Funding - Project Dyson</title>
	<meta name="description" content="Support Project Dyson's research and development through our funding campaigns." />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-4xl font-bold text-star-white mb-4">
			Funding
		</h1>
		<p class="text-lg text-star-dim max-w-3xl">
			Support the research and development that will make a Dyson swarm possible. Every contribution
			helps advance humanity's most ambitious engineering project.
		</p>
	</div>

	<!-- Overview Stats -->
	<div class="card-glow p-8 mb-12">
		<div class="grid md:grid-cols-4 gap-8 mb-8">
			<div>
				<p class="text-sm text-star-faint mb-1">Total Raised</p>
				<p class="text-3xl font-bold text-sun-gold">{formatCurrency(totalRaised)}</p>
			</div>
			<div>
				<p class="text-sm text-star-faint mb-1">Total Goal</p>
				<p class="text-3xl font-bold text-star-white">{formatCurrency(totalGoal)}</p>
			</div>
			<div>
				<p class="text-sm text-star-faint mb-1">Active Campaigns</p>
				<p class="text-3xl font-bold text-cosmic-cyan">{activeCampaigns.length}</p>
			</div>
			<div>
				<p class="text-sm text-star-faint mb-1">Contributors</p>
				<p class="text-3xl font-bold text-star-white">127</p>
			</div>
		</div>

		<div>
			<p class="text-sm text-star-faint mb-2">Overall Progress</p>
			<ProgressBar value={(totalRaised / totalGoal) * 100} />
			<p class="text-sm text-star-dim mt-2">
				{((totalRaised / totalGoal) * 100).toFixed(1)}% of total funding goal reached
			</p>
		</div>
	</div>

	<!-- How It Works -->
	<section class="mb-12">
		<h2 class="text-2xl font-bold text-star-white mb-6">How Your Contribution Helps</h2>
		<div class="grid md:grid-cols-3 gap-6">
			<div class="card-glow p-6">
				<div class="w-12 h-12 rounded-full bg-cosmic-blue/20 flex items-center justify-center mb-4">
					<svg class="w-6 h-6 text-cosmic-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-star-white mb-2">Research Funding</h3>
				<p class="text-star-dim text-sm">
					Your contributions fund academic research, feasibility studies, and expert consultations.
				</p>
			</div>

			<div class="card-glow p-6">
				<div class="w-12 h-12 rounded-full bg-cosmic-purple/20 flex items-center justify-center mb-4">
					<svg class="w-6 h-6 text-cosmic-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-star-white mb-2">Computing Resources</h3>
				<p class="text-star-dim text-sm">
					Support the computational power needed for simulations, LLM analysis, and data processing.
				</p>
			</div>

			<div class="card-glow p-6">
				<div class="w-12 h-12 rounded-full bg-cosmic-cyan/20 flex items-center justify-center mb-4">
					<svg class="w-6 h-6 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-star-white mb-2">Documentation</h3>
				<p class="text-star-dim text-sm">
					Help us create comprehensive documentation, educational materials, and public outreach.
				</p>
			</div>
		</div>
	</section>

	<!-- Active Campaigns -->
	<section class="mb-12">
		<h2 class="text-2xl font-bold text-star-white mb-6">Active Campaigns</h2>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each campaigns.filter((c) => c.status === 'active') as campaign}
				<CampaignCard {campaign} />
			{/each}
		</div>
	</section>

	<!-- Upcoming Campaigns -->
	{#if campaigns.some((c) => c.status === 'upcoming')}
		<section class="mb-12">
			<h2 class="text-2xl font-bold text-star-white mb-6">Upcoming Campaigns</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each campaigns.filter((c) => c.status === 'upcoming') as campaign}
					<CampaignCard {campaign} />
				{/each}
			</div>
		</section>
	{/if}

	<!-- Transparency Notice -->
	<section class="card-glow p-8">
		<div class="flex items-start gap-4">
			<div class="w-12 h-12 rounded-full bg-sun-gold/20 flex items-center justify-center flex-shrink-0">
				<svg class="w-6 h-6 text-sun-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
				</svg>
			</div>
			<div>
				<h3 class="text-lg font-semibold text-star-white mb-2">Transparency Commitment</h3>
				<p class="text-star-dim">
					All funds are managed transparently with regular public reports. We publish detailed breakdowns
					of how every dollar is spent. As a non-profit organization, we are committed to using
					contributions responsibly and efficiently toward our mission.
				</p>
			</div>
		</div>
	</section>
</div>
