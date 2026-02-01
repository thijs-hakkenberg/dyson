<script lang="ts">
	import type { SimulationConfig, PropulsionType } from '$lib/services/simulation';

	interface Props {
		config: SimulationConfig;
		disabled?: boolean;
		onConfigChange: (config: SimulationConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof SimulationConfig>(
		key: K,
		value: SimulationConfig[K]
	) {
		onConfigChange({ ...config, [key]: value });
	}

	const propulsionOptions: { value: PropulsionType; label: string }[] = [
		{ value: 'electric', label: 'Electric (Ion)' },
		{ value: 'chemical', label: 'Chemical' },
		{ value: 'hybrid', label: 'Hybrid' }
	];
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Simulation Parameters</h3>

	<div class="space-y-6">
		<!-- Constellation Size -->
		<div>
			<label for="constellation-size" class="block text-sm text-star-dim mb-2">
				Constellation Size: <span class="text-star-white font-semibold">{config.constellationSize}</span>
			</label>
			<input
				id="constellation-size"
				type="range"
				min="20"
				max="70"
				step="5"
				value={config.constellationSize}
				oninput={(e) => updateConfig('constellationSize', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>20</span>
				<span>45</span>
				<span>70</span>
			</div>
		</div>

		<!-- Mission Duration -->
		<div>
			<label for="mission-duration" class="block text-sm text-star-dim mb-2">
				Mission Duration: <span class="text-star-white font-semibold">{config.missionDuration} years</span>
			</label>
			<input
				id="mission-duration"
				type="range"
				min="5"
				max="10"
				step="1"
				value={config.missionDuration}
				oninput={(e) => updateConfig('missionDuration', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>5 yr</span>
				<span>7 yr</span>
				<span>10 yr</span>
			</div>
		</div>

		<!-- Annual Failure Rate -->
		<div>
			<label for="failure-rate" class="block text-sm text-star-dim mb-2">
				Annual Failure Rate: <span class="text-star-white font-semibold">{(config.annualFailureRate * 100).toFixed(0)}%</span>
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

		<!-- Propulsion Type -->
		<div>
			<label for="propulsion-type" class="block text-sm text-star-dim mb-2">Propulsion Type</label>
			<select
				id="propulsion-type"
				value={config.propulsionType}
				onchange={(e) => updateConfig('propulsionType', e.currentTarget.value as PropulsionType)}
				{disabled}
				class="w-full px-3 py-2 bg-space-600 border border-space-500 rounded-lg text-star-white
					   focus:border-cosmic-cyan focus:outline-none focus:ring-1 focus:ring-cosmic-cyan"
			>
				{#each propulsionOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>

		<!-- Monte Carlo Runs -->
		<div>
			<label for="monte-carlo-runs" class="block text-sm text-star-dim mb-2">
				Monte Carlo Runs: <span class="text-star-white font-semibold">{config.monteCarloRuns}</span>
			</label>
			<input
				id="monte-carlo-runs"
				type="range"
				min="100"
				max="1000"
				step="100"
				value={config.monteCarloRuns}
				oninput={(e) => updateConfig('monteCarloRuns', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>100</span>
				<span>500</span>
				<span>1000</span>
			</div>
			<p class="text-xs text-star-faint mt-1">Higher = more accurate, slower</p>
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
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				Run Simulation
			{/if}
		</button>
	</div>
</div>
