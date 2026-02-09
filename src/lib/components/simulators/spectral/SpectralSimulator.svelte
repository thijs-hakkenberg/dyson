<script lang="ts">
	import type {
		SpectralConfig,
		SpectralComparisonResult,
		SpectralProgress
	} from '$lib/services/simulation/spectral-analysis';
	import {
		DEFAULT_SPECTRAL_CONFIG,
		runSpectralComparison
	} from '$lib/services/simulation/spectral-analysis';

	import SpectralControls from './SpectralControls.svelte';
	import SpectralResults from './SpectralResults.svelte';
	import ComparisonChart from './ComparisonChart.svelte';

	// State
	let config: SpectralConfig = $state({ ...DEFAULT_SPECTRAL_CONFIG });
	let comparison: SpectralComparisonResult | null = $state(null);
	let progress: SpectralProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);

	// Handle config changes
	function handleConfigChange(newConfig: SpectralConfig) {
		config = newConfig;
	}

	// Run comparison simulation
	async function runSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;

		try {
			const baseConfig = {
				satelliteCount: config.satelliteCount,
				bandwidthMbps: config.bandwidthMbps,
				missionDurationYears: config.missionDurationYears,
				encounterRatePerYear: config.encounterRatePerYear,
				seed: Date.now()
			};

			comparison = await runSpectralComparison(baseConfig, 50, (p) => {
				progress = p;
			});
		} catch (e) {
			error = e instanceof Error ? e.message : 'Simulation failed';
			console.error('Simulation error:', e);
		} finally {
			isRunning = false;
			progress = null;
		}
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">
			On-board vs Ground Spectral Unmixing Simulator
		</h1>
		<p class="text-star-dim">
			Monte Carlo simulation comparing on-board spectral processing vs ground-based analysis.
			Analyze trade-offs between bandwidth, latency, and survey efficiency for asteroid prospecting.
		</p>
	</div>

	<!-- Error display -->
	{#if error}
		<div
			class="max-w-3xl mx-auto p-4 rounded-lg bg-sun-red/20 border border-sun-red/50 text-sun-red"
		>
			<div class="flex items-center gap-2">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>{error}</span>
			</div>
		</div>
	{/if}

	<!-- Main Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Left Column: Controls -->
		<div class="lg:col-span-1 space-y-6">
			<SpectralControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Trade-off Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">Key Trade-offs</h4>
				<ul class="text-xs text-star-dim space-y-2">
					<li class="flex items-start gap-2">
						<span class="text-cosmic-cyan">+</span>
						<span><strong>On-board:</strong> Fast decisions, low bandwidth</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-cosmic-cyan">-</span>
						<span><strong>On-board:</strong> Limited processing power</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-solar-gold">+</span>
						<span><strong>Ground:</strong> Powerful analysis, detailed results</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-solar-gold">-</span>
						<span><strong>Ground:</strong> High latency, bandwidth intensive</span>
					</li>
				</ul>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			<ComparisonChart {comparison} />

			<SpectralResults {comparison} {progress} {isRunning} />
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose prose-invert prose-sm max-w-none space-y-2">
			<p>
				This simulation models NEA encounter opportunities and analyzes how processing location
				affects survey success rates. Each encounter has a limited observation window during which
				data must be captured, processed, and acted upon.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>
					<strong>On-board processing:</strong> Downlinks only processed results (~10 MB), enabling
					fast autonomous decisions
				</li>
				<li>
					<strong>Ground processing:</strong> Downlinks raw hyperspectral data (~100s MB), requires
					round-trip communication
				</li>
				<li>Encounters are missed if bandwidth or latency exceeds observation window</li>
				<li>Latency includes transmission time, light delay, and processing time</li>
			</ul>
			<p class="text-star-faint">
				Results help determine whether on-board edge computing is worth the development cost for
				prospecting missions.
			</p>
		</div>
	</div>
</div>
