<script lang="ts">
	import type {
		OrbitalTradeConfig,
		OrbitalTradeSimulationOutput,
		OrbitalTradeProgress
	} from '$lib/services/simulation/orbital-trade';
	import {
		DEFAULT_ORBITAL_TRADE_CONFIG,
		runOrbitalTradeMonteCarlo,
		ORBITAL_LOCATIONS
	} from '$lib/services/simulation/orbital-trade';

	import OrbitalControls from './OrbitalControls.svelte';
	import OrbitalResults from './OrbitalResults.svelte';
	import ParetoChart from './ParetoChart.svelte';

	// State
	let config: OrbitalTradeConfig = $state({ ...DEFAULT_ORBITAL_TRADE_CONFIG });
	let output: OrbitalTradeSimulationOutput | null = $state(null);
	let progress: OrbitalTradeProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);

	// Handle config changes
	function handleConfigChange(newConfig: OrbitalTradeConfig) {
		config = newConfig;
	}

	// Run simulation
	async function runSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;

		try {
			output = await runOrbitalTradeMonteCarlo(config, 100, (p) => {
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

	// Get location name helper
	function getLocationName(locationId: string): string {
		const data = ORBITAL_LOCATIONS[locationId as keyof typeof ORBITAL_LOCATIONS];
		return data?.name ?? locationId;
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">
			Orbital Location Trade Analysis
		</h1>
		<p class="text-star-dim">
			Multi-objective Monte Carlo analysis to determine optimal orbital depot locations.
			Compare orbital positions from lunar NRHO to Mercury orbit across cost, risk, and capability objectives.
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
			<OrbitalControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Quick Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">Location Overview</h4>
				<div class="space-y-2 text-xs">
					{#each config.candidateLocations.slice(0, 4) as loc}
						{@const data = ORBITAL_LOCATIONS[loc]}
						<div class="flex justify-between text-star-dim">
							<span>{data.name}</span>
							<span class="text-star-faint">{data.distanceAU} AU</span>
						</div>
					{/each}
					{#if config.candidateLocations.length > 4}
						<p class="text-star-faint">
							+{config.candidateLocations.length - 4} more...
						</p>
					{/if}
				</div>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			<ParetoChart {output} />
			<OrbitalResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Location Details Table -->
	{#if output}
		<div class="card-glow p-6">
			<h3 class="text-lg font-bold text-star-white mb-4">Location Details</h3>
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="text-star-faint text-left border-b border-space-600">
							<th class="pb-2 pr-4">Location</th>
							<th class="pb-2 px-4">Distance</th>
							<th class="pb-2 px-4">Delta-V</th>
							<th class="pb-2 px-4">Solar Flux</th>
							<th class="pb-2 px-4">Latency</th>
							<th class="pb-2 px-4">Stability</th>
						</tr>
					</thead>
					<tbody>
						{#each config.candidateLocations as loc}
							{@const data = ORBITAL_LOCATIONS[loc]}
							{@const isRec = output.recommendation === loc}
							{@const isPareto = output.robustParetoFrontier.includes(loc)}
							<tr class="border-b border-space-700 {isRec ? 'bg-cosmic-cyan/5' : ''}">
								<td class="py-2 pr-4">
									<div class="flex items-center gap-2">
										<span class="{isRec ? 'text-cosmic-cyan font-semibold' : 'text-star-white'}">
											{data.name}
										</span>
										{#if isRec}
											<span class="px-1.5 py-0.5 text-xs bg-cosmic-cyan text-space-900 rounded">
												REC
											</span>
										{:else if isPareto}
											<span class="px-1.5 py-0.5 text-xs bg-solar-gold/20 text-solar-gold rounded">
												P
											</span>
										{/if}
									</div>
								</td>
								<td class="py-2 px-4 text-star-dim">{data.distanceAU} AU</td>
								<td class="py-2 px-4 text-star-dim">{data.deltaVFromEarth} km/s</td>
								<td class="py-2 px-4">
									<span class="{data.solarFluxMultiplier > 4 ? 'text-sun-red' : data.solarFluxMultiplier > 2 ? 'text-solar-gold' : 'text-star-dim'}">
										{data.solarFluxMultiplier.toFixed(2)}x
									</span>
								</td>
								<td class="py-2 px-4 text-star-dim">{data.commLatencyMinutes} min</td>
								<td class="py-2 px-4">
									<span class="{data.stabilityClass === 'dynamically_stable'
										? 'text-cosmic-cyan'
										: data.stabilityClass === 'quasi_stable'
											? 'text-solar-gold'
											: 'text-sun-red'} capitalize">
										{data.stabilityClass.replace('_', ' ')}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Analysis Methodology</h3>
		<div class="prose prose-invert prose-sm max-w-none space-y-2">
			<p>
				This multi-objective Monte Carlo simulation evaluates candidate orbital locations across
				three weighted objectives: cost (delta-V requirements), risk (orbital stability),
				and capability (solar power availability, communication latency).
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>
					<strong>Cost Score:</strong> Based on delta-V from Earth and to feedstock sources.
					Lower delta-V = higher score.
				</li>
				<li>
					<strong>Risk Score:</strong> Based on orbital stability class and station-keeping
					requirements. Dynamically stable orbits score highest.
				</li>
				<li>
					<strong>Capability Score:</strong> Combines solar flux (power generation), communication
					latency, and thermal feasibility for manufacturing operations.
				</li>
				<li>
					<strong>Pareto Frontier:</strong> Identifies non-dominated solutions where no single
					location is better in all objectives simultaneously.
				</li>
			</ul>
			<p class="text-star-faint">
				Note: Locations closer to the Sun offer more power but face thermal management challenges.
				L4/L5 points offer stability but longer communication delays.
			</p>
		</div>
	</div>
</div>
