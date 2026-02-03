<script lang="ts">
	import type { SwarmCoordinationConfig, CoordinationTopology } from '$lib/services/simulation/swarm-coordination';

	interface Props {
		config: SwarmCoordinationConfig;
		disabled?: boolean;
		onConfigChange: (config: SwarmCoordinationConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof SwarmCoordinationConfig>(key: K, value: SwarmCoordinationConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	// Format large numbers
	function formatNumber(n: number): string {
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
		return n.toString();
	}

	const topologies: { value: CoordinationTopology; label: string; description: string }[] = [
		{ value: 'centralized', label: 'Centralized', description: 'Single coordinator' },
		{ value: 'hierarchical', label: 'Hierarchical', description: 'Cluster-based' },
		{ value: 'mesh', label: 'Mesh', description: 'Peer-to-peer gossip' }
	];
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Swarm Parameters</h3>

	<div class="space-y-6">
		<!-- Node Count -->
		<div>
			<label for="node-count" class="block text-sm text-star-dim mb-2">
				Node Count:
				<span class="text-star-white font-semibold">{formatNumber(config.nodeCount)} nodes</span>
			</label>
			<input
				id="node-count"
				type="range"
				min="1000"
				max="1000000"
				step="1000"
				value={config.nodeCount}
				oninput={(e) => updateConfig('nodeCount', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1k</span>
				<span>500k</span>
				<span>1M</span>
			</div>
		</div>

		<!-- Topology Selection -->
		<fieldset>
			<legend class="block text-sm text-star-dim mb-2">Coordination Topology</legend>
			<div class="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Coordination topology selection">
				{#each topologies as topology}
					<button
						type="button"
						onclick={() => updateConfig('coordinationTopology', topology.value)}
						{disabled}
						class="p-3 rounded-lg text-center transition-colors {config.coordinationTopology === topology.value
							? 'bg-cosmic-cyan text-space-900 font-semibold'
							: 'bg-space-600 text-star-dim hover:bg-space-500'}"
					>
						<div class="text-sm font-medium">{topology.label}</div>
						<div class="text-xs {config.coordinationTopology === topology.value ? 'text-space-700' : 'text-star-faint'}">{topology.description}</div>
					</button>
				{/each}
			</div>
		</fieldset>

		<!-- Cluster Size (only for hierarchical) -->
		{#if config.coordinationTopology === 'hierarchical'}
			<div>
				<label for="cluster-size" class="block text-sm text-star-dim mb-2">
					Cluster Size:
					<span class="text-star-white font-semibold">{config.clusterSize} nodes</span>
				</label>
				<input
					id="cluster-size"
					type="range"
					min="50"
					max="200"
					step="10"
					value={config.clusterSize}
					oninput={(e) => updateConfig('clusterSize', parseInt(e.currentTarget.value))}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
				<div class="flex justify-between text-xs text-star-faint mt-1">
					<span>50</span>
					<span>125</span>
					<span>200</span>
				</div>
			</div>
		{/if}

		<!-- Duty Cycle -->
		<div>
			<label for="duty-cycle" class="block text-sm text-star-dim mb-2">
				Coordinator Duty Cycle:
				<span class="text-star-white font-semibold">{config.coordinatorDutyCycleHours} hours</span>
			</label>
			<input
				id="duty-cycle"
				type="range"
				min="1"
				max="168"
				step="1"
				value={config.coordinatorDutyCycleHours}
				oninput={(e) => updateConfig('coordinatorDutyCycleHours', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1h</span>
				<span>84h</span>
				<span>168h (1 week)</span>
			</div>
		</div>

		<!-- Bandwidth per Node -->
		<div>
			<label for="bandwidth" class="block text-sm text-star-dim mb-2">
				Bandwidth per Node:
				<span class="text-star-white font-semibold">{config.bandwidthPerNodeKbps} kbps</span>
			</label>
			<input
				id="bandwidth"
				type="range"
				min="0.1"
				max="10"
				step="0.1"
				value={config.bandwidthPerNodeKbps}
				oninput={(e) => updateConfig('bandwidthPerNodeKbps', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.1</span>
				<span>5</span>
				<span>10</span>
			</div>
		</div>

		<!-- Failure Rate -->
		<div>
			<label for="failure-rate" class="block text-sm text-star-dim mb-2">
				Annual Node Failure Rate:
				<span class="text-star-white font-semibold">{(config.nodeFailureRatePerYear * 100).toFixed(1)}%</span>
			</label>
			<input
				id="failure-rate"
				type="range"
				min="0.01"
				max="0.1"
				step="0.005"
				value={config.nodeFailureRatePerYear}
				oninput={(e) => updateConfig('nodeFailureRatePerYear', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1%</span>
				<span>5%</span>
				<span>10%</span>
			</div>
		</div>

		<!-- Run Button -->
		<button
			onclick={onRun}
			{disabled}
			class="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{#if disabled}
				<span class="spinner w-5 h-5"></span>
				Running...
			{:else}
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				Run Simulation
			{/if}
		</button>
	</div>
</div>
