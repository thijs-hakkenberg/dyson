<script lang="ts">
	import type { SupplyChainConfig } from '$lib/services/simulation/supply-chain';

	interface Props {
		config: SupplyChainConfig;
		disabled?: boolean;
		onConfigChange: (config: SupplyChainConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof SupplyChainConfig>(key: K, value: SupplyChainConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	function formatNumber(n: number): string {
		if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
		return n.toString();
	}

	function formatPercent(n: number): string {
		return `${(n * 100).toFixed(0)}%`;
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Simulation Parameters</h3>

	<div class="space-y-6">
		<!-- Xenon Production Rate -->
		<div>
			<label for="xenon-production" class="block text-sm text-star-dim mb-2">
				Global Xenon Production:
				<span class="text-star-white font-semibold">{config.xenonProductionRate} tonnes/year</span>
			</label>
			<input
				id="xenon-production"
				type="range"
				min="50"
				max="100"
				step="5"
				value={config.xenonProductionRate}
				oninput={(e) => updateConfig('xenonProductionRate', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>50 t/yr</span>
				<span>75 t/yr</span>
				<span>100 t/yr</span>
			</div>
		</div>

		<!-- Phase 1 Demand -->
		<div>
			<label for="phase1-demand" class="block text-sm text-star-dim mb-2">
				Phase 1 Xenon Demand:
				<span class="text-star-white font-semibold">{config.xenonDemandPhase1} tonnes</span>
			</label>
			<input
				id="phase1-demand"
				type="range"
				min="100"
				max="250"
				step="10"
				value={config.xenonDemandPhase1}
				oninput={(e) => updateConfig('xenonDemandPhase1', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>100 t</span>
				<span>175 t</span>
				<span>250 t</span>
			</div>
		</div>

		<!-- Alternative Propellants -->
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="krypton-avail" class="block text-sm text-star-dim mb-2">
					Krypton Available:
					<span class="text-star-white font-semibold">{config.kryptonAvailability} t/yr</span>
				</label>
				<input
					id="krypton-avail"
					type="range"
					min="100"
					max="400"
					step="25"
					value={config.kryptonAvailability}
					oninput={(e) => updateConfig('kryptonAvailability', parseInt(e.currentTarget.value))}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
			</div>
			<div>
				<label for="argon-avail" class="block text-sm text-star-dim mb-2">
					Argon Available:
					<span class="text-star-white font-semibold">{config.argonAvailability} t/yr</span>
				</label>
				<input
					id="argon-avail"
					type="range"
					min="200"
					max="1000"
					step="50"
					value={config.argonAvailability}
					oninput={(e) => updateConfig('argonAvailability', parseInt(e.currentTarget.value))}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
			</div>
		</div>

		<!-- Stockpiling Strategy -->
		<div>
			<label for="stockpiling-years" class="block text-sm text-star-dim mb-2">
				Stockpiling Period:
				<span class="text-star-white font-semibold">{config.stockpilingYears} years</span>
			</label>
			<input
				id="stockpiling-years"
				type="range"
				min="1"
				max="10"
				step="1"
				value={config.stockpilingYears}
				oninput={(e) => updateConfig('stockpilingYears', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 yr</span>
				<span>5 yr</span>
				<span>10 yr</span>
			</div>
		</div>

		<!-- Project Allocation -->
		<div>
			<label for="allocation" class="block text-sm text-star-dim mb-2">
				Project Allocation:
				<span class="text-star-white font-semibold">{formatPercent(config.projectAllocationFraction)} of global</span>
			</label>
			<input
				id="allocation"
				type="range"
				min="10"
				max="50"
				step="5"
				value={config.projectAllocationFraction * 100}
				oninput={(e) => updateConfig('projectAllocationFraction', parseInt(e.currentTarget.value) / 100)}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>10%</span>
				<span>30%</span>
				<span>50%</span>
			</div>
		</div>

		<!-- Growth and Learning -->
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="growth-rate" class="block text-sm text-star-dim mb-2">
					Production Growth:
					<span class="text-star-white font-semibold">{formatPercent(config.productionGrowthRate)}/yr</span>
				</label>
				<input
					id="growth-rate"
					type="range"
					min="1"
					max="10"
					step="1"
					value={config.productionGrowthRate * 100}
					oninput={(e) => updateConfig('productionGrowthRate', parseInt(e.currentTarget.value) / 100)}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
			</div>
			<div>
				<label for="learning-curve" class="block text-sm text-star-dim mb-2">
					Learning Curve:
					<span class="text-star-white font-semibold">{formatPercent(config.learningCurveEffect)}</span>
				</label>
				<input
					id="learning-curve"
					type="range"
					min="5"
					max="30"
					step="5"
					value={config.learningCurveEffect * 100}
					oninput={(e) => updateConfig('learningCurveEffect', parseInt(e.currentTarget.value) / 100)}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
			</div>
		</div>

		<!-- Uncertainty Parameters -->
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="demand-uncertainty" class="block text-sm text-star-dim mb-2">
					Demand Uncertainty:
					<span class="text-star-white font-semibold">+/-{formatPercent(config.demandUncertaintyRange)}</span>
				</label>
				<input
					id="demand-uncertainty"
					type="range"
					min="10"
					max="50"
					step="5"
					value={config.demandUncertaintyRange * 100}
					oninput={(e) => updateConfig('demandUncertaintyRange', parseInt(e.currentTarget.value) / 100)}
					{disabled}
					class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
				/>
			</div>
			<div>
				<label for="price-elasticity" class="block text-sm text-star-dim mb-2">
					Price Elasticity:
					<span class="text-star-white font-semibold">{config.priceElasticity.toFixed(1)}</span>
				</label>
				<input
					id="price-elasticity"
					type="range"
					min="1"
					max="8"
					step="1"
					value={config.priceElasticity * 10}
					oninput={(e) => updateConfig('priceElasticity', parseInt(e.currentTarget.value) / 10)}
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
