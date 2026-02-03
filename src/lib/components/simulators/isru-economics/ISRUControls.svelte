<script lang="ts">
	import type { ISRUEconomicsConfig } from '$lib/services/simulation/isru-economics';

	interface Props {
		config: ISRUEconomicsConfig;
		disabled?: boolean;
		onConfigChange: (config: ISRUEconomicsConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof ISRUEconomicsConfig>(key: K, value: ISRUEconomicsConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	// Format large numbers
	function formatNumber(n: number): string {
		if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
		return n.toString();
	}

	function formatCurrency(n: number): string {
		if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(0)}B`;
		if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
		if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
		return `$${n}`;
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Simulation Parameters</h3>

	<div class="space-y-6">
		<!-- Launch Cost Range -->
		<div>
			<label for="launch-cost" class="block text-sm text-star-dim mb-2">
				Launch Cost Range:
				<span class="text-star-white font-semibold">
					${config.launchCostPerKgLow} - ${config.launchCostPerKgHigh}/kg
				</span>
			</label>
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<span class="text-xs text-star-faint w-8">Low</span>
					<input
						id="launch-cost-low"
						type="range"
						min="100"
						max="2000"
						step="100"
						value={config.launchCostPerKgLow}
						oninput={(e) => updateConfig('launchCostPerKgLow', parseInt(e.currentTarget.value))}
						{disabled}
						class="flex-1 h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
					/>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-xs text-star-faint w-8">High</span>
					<input
						id="launch-cost-high"
						type="range"
						min="500"
						max="5000"
						step="100"
						value={config.launchCostPerKgHigh}
						oninput={(e) => updateConfig('launchCostPerKgHigh', parseInt(e.currentTarget.value))}
						{disabled}
						class="flex-1 h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
					/>
				</div>
			</div>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>$100/kg</span>
				<span>$5,000/kg</span>
			</div>
		</div>

		<!-- ISRU Capital Cost Range -->
		<div>
			<label for="isru-capital" class="block text-sm text-star-dim mb-2">
				ISRU Capital Cost:
				<span class="text-star-white font-semibold">
					${config.isruCapitalCostBLow}B - ${config.isruCapitalCostBHigh}B
				</span>
			</label>
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<span class="text-xs text-star-faint w-8">Low</span>
					<input
						id="isru-capital-low"
						type="range"
						min="5"
						max="100"
						step="5"
						value={config.isruCapitalCostBLow}
						oninput={(e) => updateConfig('isruCapitalCostBLow', parseInt(e.currentTarget.value))}
						{disabled}
						class="flex-1 h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
					/>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-xs text-star-faint w-8">High</span>
					<input
						id="isru-capital-high"
						type="range"
						min="10"
						max="200"
						step="5"
						value={config.isruCapitalCostBHigh}
						oninput={(e) => updateConfig('isruCapitalCostBHigh', parseInt(e.currentTarget.value))}
						{disabled}
						class="flex-1 h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
					/>
				</div>
			</div>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>$5B</span>
				<span>$200B</span>
			</div>
		</div>

		<!-- Target Units -->
		<div>
			<label for="target-units" class="block text-sm text-star-dim mb-2">
				Target Deployment:
				<span class="text-star-white font-semibold">{formatNumber(config.targetDeploymentUnits)} units</span>
			</label>
			<input
				id="target-units"
				type="range"
				min="1000"
				max="100000"
				step="1000"
				value={config.targetDeploymentUnits}
				oninput={(e) => updateConfig('targetDeploymentUnits', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1k</span>
				<span>50k</span>
				<span>100k</span>
			</div>
		</div>

		<!-- Unit Mass -->
		<div>
			<label for="unit-mass" class="block text-sm text-star-dim mb-2">
				Unit Mass:
				<span class="text-star-white font-semibold">{formatNumber(config.unitMassKg)} kg</span>
			</label>
			<input
				id="unit-mass"
				type="range"
				min="1000"
				max="50000"
				step="1000"
				value={config.unitMassKg}
				oninput={(e) => updateConfig('unitMassKg', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1t</span>
				<span>25t</span>
				<span>50t</span>
			</div>
		</div>

		<!-- Production Rates -->
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="earth-production" class="block text-sm text-star-dim mb-2">
					Earth Production:
					<span class="text-star-white font-semibold">{config.earthProductionRatePerYear}/yr</span>
				</label>
				<input
					id="earth-production"
					type="range"
					min="10"
					max="500"
					step="10"
					value={config.earthProductionRatePerYear}
					oninput={(e) => updateConfig('earthProductionRatePerYear', parseInt(e.currentTarget.value))}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
			</div>
			<div>
				<label for="isru-production" class="block text-sm text-star-dim mb-2">
					ISRU Max Rate:
					<span class="text-star-white font-semibold">{config.isruMaxProductionRate}/yr</span>
				</label>
				<input
					id="isru-production"
					type="range"
					min="100"
					max="5000"
					step="100"
					value={config.isruMaxProductionRate}
					oninput={(e) => updateConfig('isruMaxProductionRate', parseInt(e.currentTarget.value))}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
			</div>
		</div>

		<!-- ISRU Ramp-up -->
		<div>
			<label for="ramp-up" class="block text-sm text-star-dim mb-2">
				ISRU Ramp-up Time:
				<span class="text-star-white font-semibold">{config.isruRampUpYears} years</span>
			</label>
			<input
				id="ramp-up"
				type="range"
				min="1"
				max="15"
				step="1"
				value={config.isruRampUpYears}
				oninput={(e) => updateConfig('isruRampUpYears', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 yr</span>
				<span>8 yr</span>
				<span>15 yr</span>
			</div>
		</div>

		<!-- Learning Curves -->
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="learning-earth" class="block text-sm text-star-dim mb-2">
					Earth Learning:
					<span class="text-star-white font-semibold">{(config.learningRateEarth * 100).toFixed(0)}%</span>
				</label>
				<input
					id="learning-earth"
					type="range"
					min="75"
					max="98"
					step="1"
					value={config.learningRateEarth * 100}
					oninput={(e) => updateConfig('learningRateEarth', parseInt(e.currentTarget.value) / 100)}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
				<p class="text-xs text-star-faint mt-1">Lower = faster learning</p>
			</div>
			<div>
				<label for="learning-isru" class="block text-sm text-star-dim mb-2">
					ISRU Learning:
					<span class="text-star-white font-semibold">{(config.learningRateISRU * 100).toFixed(0)}%</span>
				</label>
				<input
					id="learning-isru"
					type="range"
					min="75"
					max="98"
					step="1"
					value={config.learningRateISRU * 100}
					oninput={(e) => updateConfig('learningRateISRU', parseInt(e.currentTarget.value) / 100)}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
				<p class="text-xs text-star-faint mt-1">Lower = faster learning</p>
			</div>
		</div>

		<!-- First Unit & Operational Costs -->
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="first-unit-cost" class="block text-sm text-star-dim mb-2">
					First Unit Cost:
					<span class="text-star-white font-semibold">{formatCurrency(config.firstUnitManufacturingCost)}</span>
				</label>
				<input
					id="first-unit-cost"
					type="range"
					min="10000000"
					max="200000000"
					step="10000000"
					value={config.firstUnitManufacturingCost}
					oninput={(e) => updateConfig('firstUnitManufacturingCost', parseInt(e.currentTarget.value))}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
			</div>
			<div>
				<label for="isru-op-cost" class="block text-sm text-star-dim mb-2">
					ISRU Op Cost:
					<span class="text-star-white font-semibold">{formatCurrency(config.isruOperationalCostPerUnit)}</span>
				</label>
				<input
					id="isru-op-cost"
					type="range"
					min="1000000"
					max="50000000"
					step="1000000"
					value={config.isruOperationalCostPerUnit}
					oninput={(e) => updateConfig('isruOperationalCostPerUnit', parseInt(e.currentTarget.value))}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
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
