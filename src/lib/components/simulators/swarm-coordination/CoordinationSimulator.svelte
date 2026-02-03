<script lang="ts">
	import type {
		SwarmCoordinationConfig,
		SwarmCoordinationOutput,
		TopologyComparisonResult,
		SwarmCoordinationProgress
	} from '$lib/services/simulation/swarm-coordination';
	import {
		DEFAULT_SWARM_COORDINATION_CONFIG,
		runSwarmCoordinationMonteCarlo,
		runSwarmCoordinationComparison
	} from '$lib/services/simulation/swarm-coordination';

	import CoordinationControls from './CoordinationControls.svelte';
	import CoordinationResults from './CoordinationResults.svelte';
	import ScalabilityChart from './ScalabilityChart.svelte';

	// State
	let config: SwarmCoordinationConfig = $state({ ...DEFAULT_SWARM_COORDINATION_CONFIG });
	let output: SwarmCoordinationOutput | null = $state(null);
	let comparison: TopologyComparisonResult | null = $state(null);
	let progress: SwarmCoordinationProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'comparison' = $state('comparison');

	// Handle config changes
	function handleConfigChange(newConfig: SwarmCoordinationConfig) {
		config = newConfig;
	}

	// Run single simulation
	async function runSingleSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;
		comparison = null;

		try {
			output = await runSwarmCoordinationMonteCarlo(config, 50, (p) => {
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

	// Run comparison simulation
	async function runComparisonSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;
		output = null;

		try {
			const baseConfig = {
				nodeCount: config.nodeCount,
				clusterSize: config.clusterSize,
				coordinatorDutyCycleHours: config.coordinatorDutyCycleHours,
				bandwidthPerNodeKbps: config.bandwidthPerNodeKbps,
				nodeFailureRatePerYear: config.nodeFailureRatePerYear,
				coordinatorPowerW: config.coordinatorPowerW,
				basePowerW: config.basePowerW,
				simulationDays: config.simulationDays
			};

			comparison = await runSwarmCoordinationComparison(
				baseConfig,
				['centralized', 'hierarchical', 'mesh'],
				30,
				(p) => {
					progress = p;
				}
			);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Comparison failed';
			console.error('Comparison error:', e);
		} finally {
			isRunning = false;
			progress = null;
		}
	}

	// Run appropriate simulation based on mode
	function runSimulation() {
		if (mode === 'single') {
			runSingleSimulation();
		} else {
			runComparisonSimulation();
		}
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">
			Swarm Coordination Architecture Simulator
		</h1>
		<p class="text-star-dim">
			Monte Carlo simulation comparing coordination topologies for large-scale Dyson swarms.
			Analyze communication overhead, latency, and availability across centralized, hierarchical,
			and mesh network architectures at scales up to 1 million nodes.
		</p>
	</div>

	<!-- Mode Toggle -->
	<div class="flex justify-center gap-4">
		<button
			onclick={() => (mode = 'single')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'single'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Single Topology
		</button>
		<button
			onclick={() => (mode = 'comparison')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'comparison'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Compare Topologies
		</button>
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
			<CoordinationControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Mode Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">
					{mode === 'single' ? 'Single Topology Mode' : 'Comparison Mode'}
				</h4>
				<p class="text-xs text-star-dim">
					{#if mode === 'single'}
						Tests the {config.coordinationTopology} topology with {config.nodeCount.toLocaleString()} nodes
						and {config.bandwidthPerNodeKbps} kbps bandwidth per node.
					{:else}
						Compares all three topologies (centralized, hierarchical, mesh) with the same
						base parameters to identify the optimal architecture for your swarm size.
					{/if}
				</p>
			</div>

			<!-- Research Questions -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">Research Questions</h4>
				<ul class="text-xs text-star-dim space-y-1">
					<li>
						<span class="text-cosmic-cyan">rq-1-24:</span> Architecture at scale
					</li>
					<li>
						<span class="text-cosmic-cyan">rq-1-39:</span> Coordinator duty cycle
					</li>
					<li>
						<span class="text-cosmic-cyan">rq-2-17:</span> Fleet coordination constraints
					</li>
				</ul>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			{#if mode === 'comparison'}
				<ScalabilityChart {comparison} />
			{/if}

			<CoordinationResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose-space text-sm space-y-2">
			<p>
				This discrete event simulation models coordination patterns for Dyson swarm elements,
				comparing three network topologies: centralized (single coordinator), hierarchical
				(cluster-based with regional coordinators), and mesh (peer-to-peer gossip protocol).
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>Message passing simulates ephemeris updates, handoffs, and collision warnings</li>
				<li>Coordinator duty cycling models power constraints and rotation schedules</li>
				<li>Node failures follow exponential distribution based on annual failure rate</li>
				<li>Light-time delays estimated for swarm orbital positions</li>
			</ul>
			<p class="text-star-faint">
				Key trade-off: Centralized has lowest latency but single point of failure; hierarchical
				balances scalability with structure; mesh provides best fault tolerance but higher latency.
			</p>
		</div>
	</div>
</div>
