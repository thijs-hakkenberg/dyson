<script lang="ts">
	import type { FleetConfig } from '$lib/services/simulation/fleet-logistics';

	interface Props {
		config: FleetConfig;
		disabled?: boolean;
		onConfigChange: (config: FleetConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof FleetConfig>(key: K, value: FleetConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	// Format large numbers
	function formatNumber(n: number): string {
		if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
		return n.toString();
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Fleet Parameters</h3>

	<div class="space-y-6">
		<!-- Vehicle Count -->
		<div>
			<label for="vehicle-count" class="block text-sm text-star-dim mb-2">
				Fleet Size:
				<span class="text-star-white font-semibold">{config.vehicleCount} vehicles</span>
			</label>
			<input
				id="vehicle-count"
				type="range"
				min="5"
				max="25"
				step="1"
				value={config.vehicleCount}
				oninput={(e) => updateConfig('vehicleCount', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>5</span>
				<span>15</span>
				<span>25</span>
			</div>
		</div>

		<!-- Payload Capacity -->
		<div>
			<label for="payload-capacity" class="block text-sm text-star-dim mb-2">
				Payload Capacity:
				<span class="text-star-white font-semibold"
					>{formatNumber(config.payloadCapacityKg)} kg</span
				>
			</label>
			<input
				id="payload-capacity"
				type="range"
				min="80000"
				max="300000"
				step="10000"
				value={config.payloadCapacityKg}
				oninput={(e) => updateConfig('payloadCapacityKg', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>80t</span>
				<span>190t</span>
				<span>300t</span>
			</div>
		</div>

		<!-- Mission Duration -->
		<div>
			<label for="mission-duration" class="block text-sm text-star-dim mb-2">
				Mission Duration:
				<span class="text-star-white font-semibold">{config.missionDurationYears} years</span>
			</label>
			<input
				id="mission-duration"
				type="range"
				min="5"
				max="25"
				step="1"
				value={config.missionDurationYears}
				oninput={(e) => updateConfig('missionDurationYears', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>5 yr</span>
				<span>15 yr</span>
				<span>25 yr</span>
			</div>
		</div>

		<!-- Annual Failure Rate -->
		<div>
			<label for="failure-rate" class="block text-sm text-star-dim mb-2">
				Annual Failure Rate:
				<span class="text-star-white font-semibold"
					>{(config.annualFailureRate * 100).toFixed(0)}%</span
				>
			</label>
			<input
				id="failure-rate"
				type="range"
				min="0"
				max="10"
				step="1"
				value={config.annualFailureRate * 100}
				oninput={(e) => updateConfig('annualFailureRate', parseInt(e.currentTarget.value) / 100)}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0%</span>
				<span>5%</span>
				<span>10%</span>
			</div>
		</div>

		<!-- Budget -->
		<div>
			<label for="budget" class="block text-sm text-star-dim mb-2">
				Fleet Budget:
				<span class="text-star-white font-semibold">${formatNumber(config.budgetDollars)}</span>
			</label>
			<input
				id="budget"
				type="range"
				min="500000000"
				max="5000000000"
				step="500000000"
				value={config.budgetDollars}
				oninput={(e) => updateConfig('budgetDollars', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>$0.5B</span>
				<span>$2.5B</span>
				<span>$5B</span>
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
