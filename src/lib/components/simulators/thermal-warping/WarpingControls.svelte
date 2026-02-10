<script lang="ts">
	import type { WarpingConfig } from '$lib/services/simulation/thermal-warping';
	import {
		calculateEquilibriumTemp,
		calculateThickness,
		KAPTON_DENSITY
	} from '$lib/services/simulation/thermal-warping';

	interface Props {
		config: WarpingConfig;
		disabled?: boolean;
		onConfigChange: (config: WarpingConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof WarpingConfig>(key: K, value: WarpingConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	// Derived display values
	let ctePpm = $derived((config.cte * 1e6).toFixed(0));
	let equilibriumTemp = $derived(
		calculateEquilibriumTemp(
			config.orbitalDistance,
			config.absorptivity,
			config.emissivity,
			config.pvEfficiency
		).toFixed(0)
	);
	let thicknessMicrons = $derived(
		(calculateThickness(config.arealDensity) * 1e6).toFixed(1)
	);
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Warping Parameters</h3>

	<div class="space-y-6">
		<!-- Orbital Distance -->
		<div>
			<label for="warp-orbital-distance" class="block text-sm text-star-dim mb-2">
				Orbital Distance:
				<span class="text-star-white font-semibold">{config.orbitalDistance.toFixed(2)} AU</span>
			</label>
			<input
				id="warp-orbital-distance"
				type="range"
				min="0.3"
				max="1.0"
				step="0.05"
				value={config.orbitalDistance}
				oninput={(e) => updateConfig('orbitalDistance', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.3 AU (Mercury)</span>
				<span>1.0 AU (Earth)</span>
			</div>
		</div>

		<!-- CTE -->
		<div>
			<label for="warp-cte" class="block text-sm text-star-dim mb-2">
				CTE (Thermal Expansion):
				<span class="text-star-white font-semibold">{ctePpm} ppm/K</span>
			</label>
			<input
				id="warp-cte"
				type="range"
				min="15"
				max="40"
				step="1"
				value={config.cte * 1e6}
				oninput={(e) => updateConfig('cte', parseFloat(e.currentTarget.value) * 1e-6)}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>15 ppm/K (low)</span>
				<span>40 ppm/K (high)</span>
			</div>
		</div>

		<!-- Tension -->
		<div>
			<label for="warp-tension" class="block text-sm text-star-dim mb-2">
				Applied Tension:
				<span class="text-star-white font-semibold">{config.tension.toFixed(1)} N/m</span>
			</label>
			<input
				id="warp-tension"
				type="range"
				min="0.1"
				max="10"
				step="0.1"
				value={config.tension}
				oninput={(e) => updateConfig('tension', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.1 N/m</span>
				<span>10 N/m</span>
			</div>
		</div>

		<!-- Absorptivity -->
		<div>
			<label for="warp-absorptivity" class="block text-sm text-star-dim mb-2">
				Solar Absorptivity:
				<span class="text-star-white font-semibold">{config.absorptivity.toFixed(2)}</span>
			</label>
			<input
				id="warp-absorptivity"
				type="range"
				min="0.6"
				max="0.95"
				step="0.01"
				value={config.absorptivity}
				oninput={(e) => updateConfig('absorptivity', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.60</span>
				<span>0.95</span>
			</div>
		</div>

		<!-- Emissivity -->
		<div>
			<label for="warp-emissivity" class="block text-sm text-star-dim mb-2">
				Thermal Emissivity:
				<span class="text-star-white font-semibold">{config.emissivity.toFixed(2)}</span>
			</label>
			<input
				id="warp-emissivity"
				type="range"
				min="0.7"
				max="0.95"
				step="0.01"
				value={config.emissivity}
				oninput={(e) => updateConfig('emissivity', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.70</span>
				<span>0.95</span>
			</div>
		</div>

		<!-- PV Efficiency -->
		<div>
			<label for="warp-pv-eff" class="block text-sm text-star-dim mb-2">
				PV Efficiency:
				<span class="text-star-white font-semibold">{(config.pvEfficiency * 100).toFixed(0)}%</span>
			</label>
			<input
				id="warp-pv-eff"
				type="range"
				min="0.15"
				max="0.35"
				step="0.01"
				value={config.pvEfficiency}
				oninput={(e) => updateConfig('pvEfficiency', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>15%</span>
				<span>35%</span>
			</div>
		</div>

		<!-- Areal Density -->
		<div>
			<label for="warp-areal-density" class="block text-sm text-star-dim mb-2">
				Areal Density:
				<span class="text-star-white font-semibold">{config.arealDensity} g/m&sup2;</span>
			</label>
			<input
				id="warp-areal-density"
				type="range"
				min="5"
				max="100"
				step="1"
				value={config.arealDensity}
				oninput={(e) => updateConfig('arealDensity', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>5 g/m&sup2;</span>
				<span>100 g/m&sup2;</span>
			</div>
		</div>

		<!-- Computed values -->
		<div class="p-3 bg-space-700/30 rounded-lg border border-space-600">
			<p class="text-xs text-star-faint mb-2">Computed Material Properties</p>
			<div class="space-y-1 text-xs">
				<div class="flex justify-between">
					<span class="text-star-dim">Equilibrium Temp</span>
					<span class="text-star-white font-mono">{equilibriumTemp} K</span>
				</div>
				<div class="flex justify-between">
					<span class="text-star-dim">Film Thickness</span>
					<span class="text-star-white font-mono">{thicknessMicrons} &micro;m</span>
				</div>
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
