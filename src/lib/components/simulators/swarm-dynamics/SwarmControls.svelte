<script lang="ts">
	import type { SwarmDynamicsConfig, PropulsionType } from '$lib/services/simulation/swarm-dynamics';

	interface Props {
		config: SwarmDynamicsConfig;
		disabled?: boolean;
		onConfigChange: (config: SwarmDynamicsConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof SwarmDynamicsConfig>(key: K, value: SwarmDynamicsConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	const propulsionOptions: { value: PropulsionType; label: string }[] = [
		{ value: 'srp_only', label: 'SRP Only' },
		{ value: 'ion', label: 'Ion Thruster' },
		{ value: 'cold_gas', label: 'Cold Gas' },
		{ value: 'hybrid', label: 'Hybrid (SRP + Ion)' }
	];
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Swarm Parameters</h3>

	<div class="space-y-6">
		<!-- Orbital Distance -->
		<div>
			<label for="orbital-distance" class="block text-sm text-star-dim mb-2">
				Orbital Distance:
				<span class="text-star-white font-semibold">{config.orbitalDistanceAU.toFixed(2)} AU</span>
			</label>
			<input
				id="orbital-distance"
				type="range"
				min="0.3"
				max="1.0"
				step="0.05"
				value={config.orbitalDistanceAU}
				oninput={(e) => updateConfig('orbitalDistanceAU', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.3 AU</span>
				<span>0.65 AU</span>
				<span>1.0 AU</span>
			</div>
		</div>

		<!-- Collector Area -->
		<div>
			<label for="collector-area" class="block text-sm text-star-dim mb-2">
				Collector Area:
				<span class="text-star-white font-semibold">{config.collectorAreaM2.toLocaleString()} m&sup2;</span>
			</label>
			<input
				id="collector-area"
				type="range"
				min="100"
				max="10000"
				step="100"
				value={config.collectorAreaM2}
				oninput={(e) => updateConfig('collectorAreaM2', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>100 m&sup2;</span>
				<span>5,000 m&sup2;</span>
				<span>10,000 m&sup2;</span>
			</div>
		</div>

		<!-- Collector Mass -->
		<div>
			<label for="collector-mass" class="block text-sm text-star-dim mb-2">
				Collector Mass:
				<span class="text-star-white font-semibold">{config.collectorMassKg.toLocaleString()} kg</span>
			</label>
			<input
				id="collector-mass"
				type="range"
				min="50"
				max="2000"
				step="50"
				value={config.collectorMassKg}
				oninput={(e) => updateConfig('collectorMassKg', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>50 kg</span>
				<span>1,000 kg</span>
				<span>2,000 kg</span>
			</div>
		</div>

		<!-- Swarm Size -->
		<div>
			<label for="swarm-size" class="block text-sm text-star-dim mb-2">
				Swarm Size:
				<span class="text-star-white font-semibold">{config.swarmSize.toLocaleString()} units</span>
			</label>
			<input
				id="swarm-size"
				type="range"
				min="100"
				max="10000"
				step="100"
				value={config.swarmSize}
				oninput={(e) => updateConfig('swarmSize', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>100</span>
				<span>5,000</span>
				<span>10,000</span>
			</div>
		</div>

		<!-- Inter-Unit Spacing -->
		<div>
			<label for="unit-spacing" class="block text-sm text-star-dim mb-2">
				Inter-Unit Spacing:
				<span class="text-star-white font-semibold">{config.interUnitSpacingM.toLocaleString()} m</span>
			</label>
			<input
				id="unit-spacing"
				type="range"
				min="100"
				max="10000"
				step="100"
				value={config.interUnitSpacingM}
				oninput={(e) => updateConfig('interUnitSpacingM', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>100 m</span>
				<span>5,000 m</span>
				<span>10,000 m</span>
			</div>
		</div>

		<!-- Propulsion Type -->
		<div>
			<label for="propulsion-type" class="block text-sm text-star-dim mb-2">
				Propulsion Type
			</label>
			<select
				id="propulsion-type"
				value={config.propulsionType}
				onchange={(e) => updateConfig('propulsionType', e.currentTarget.value as PropulsionType)}
				{disabled}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white focus:border-cosmic-cyan focus:outline-none"
			>
				{#each propulsionOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>

		<!-- Simulation Duration -->
		<div>
			<label for="sim-years" class="block text-sm text-star-dim mb-2">
				Simulation Duration:
				<span class="text-star-white font-semibold">{config.simulationYears} years</span>
			</label>
			<input
				id="sim-years"
				type="range"
				min="1"
				max="10"
				step="1"
				value={config.simulationYears}
				oninput={(e) => updateConfig('simulationYears', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 yr</span>
				<span>5 yr</span>
				<span>10 yr</span>
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
