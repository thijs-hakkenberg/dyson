<script lang="ts">
	import type { DepotLogisticsConfig } from '$lib/services/simulation/depot-logistics';

	interface Props {
		config: DepotLogisticsConfig;
		disabled?: boolean;
		onConfigChange: (config: DepotLogisticsConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof DepotLogisticsConfig>(key: K, value: DepotLogisticsConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	// Format large numbers
	function formatNumber(n: number): string {
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
		return n.toString();
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Depot Parameters</h3>

	<div class="space-y-6">
		<!-- Depot Spacing -->
		<div>
			<label for="depot-spacing" class="block text-sm text-star-dim mb-2">
				Depot Spacing:
				<span class="text-star-white font-semibold">{formatNumber(config.depotSpacingKm)} km</span>
			</label>
			<input
				id="depot-spacing"
				type="range"
				min="50000"
				max="500000"
				step="10000"
				value={config.depotSpacingKm}
				oninput={(e) => updateConfig('depotSpacingKm', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>50k km</span>
				<span>275k km</span>
				<span>500k km</span>
			</div>
		</div>

		<!-- Inspector Count -->
		<div>
			<label for="inspector-count" class="block text-sm text-star-dim mb-2">
				Inspector Drones:
				<span class="text-star-white font-semibold">{formatNumber(config.inspectorCount)}</span>
			</label>
			<input
				id="inspector-count"
				type="range"
				min="1000"
				max="50000"
				step="1000"
				value={config.inspectorCount}
				oninput={(e) => updateConfig('inspectorCount', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1k</span>
				<span>25k</span>
				<span>50k</span>
			</div>
		</div>

		<!-- Servicer Count -->
		<div>
			<label for="servicer-count" class="block text-sm text-star-dim mb-2">
				Servicer Drones:
				<span class="text-star-white font-semibold">{formatNumber(config.servicerCount)}</span>
			</label>
			<input
				id="servicer-count"
				type="range"
				min="100"
				max="5000"
				step="100"
				value={config.servicerCount}
				oninput={(e) => updateConfig('servicerCount', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>100</span>
				<span>2.5k</span>
				<span>5k</span>
			</div>
		</div>

		<!-- Swarm Size -->
		<div>
			<label for="swarm-size" class="block text-sm text-star-dim mb-2">
				Swarm Size:
				<span class="text-star-white font-semibold">{config.swarmSizeMillions}M collectors</span>
			</label>
			<input
				id="swarm-size"
				type="range"
				min="1"
				max="10"
				step="1"
				value={config.swarmSizeMillions}
				oninput={(e) => updateConfig('swarmSizeMillions', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1M</span>
				<span>5M</span>
				<span>10M</span>
			</div>
		</div>

		<!-- Failure Rate -->
		<div>
			<label for="failure-rate" class="block text-sm text-star-dim mb-2">
				Annual Failure Rate:
				<span class="text-star-white font-semibold"
					>{(config.failureRatePerYear * 100).toFixed(1)}%</span
				>
			</label>
			<input
				id="failure-rate"
				type="range"
				min="1"
				max="5"
				step="0.5"
				value={config.failureRatePerYear * 100}
				oninput={(e) => updateConfig('failureRatePerYear', parseFloat(e.currentTarget.value) / 100)}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1%</span>
				<span>3%</span>
				<span>5%</span>
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
