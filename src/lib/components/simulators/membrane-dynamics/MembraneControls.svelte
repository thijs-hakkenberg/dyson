<script lang="ts">
	import type { MembraneConfig } from '$lib/services/simulation/membrane-dynamics';
	import { calculateCentrifugalTension } from '$lib/services/simulation/membrane-dynamics';

	interface Props {
		config: MembraneConfig;
		disabled?: boolean;
		onConfigChange: (config: MembraneConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof MembraneConfig>(key: K, value: MembraneConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	// Derived: effective tension including centrifugal contribution
	let centrifugalTension = $derived(
		calculateCentrifugalTension(config.arealDensity / 1000, config.spinRate, config.diameter)
	);
	let effectiveTension = $derived(config.tension + centrifugalTension);
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Membrane Parameters</h3>

	<div class="space-y-6">
		<!-- Diameter -->
		<div>
			<label for="membrane-diameter" class="block text-sm text-star-dim mb-2">
				Diameter:
				<span class="text-star-white font-semibold">{config.diameter} m</span>
			</label>
			<input
				id="membrane-diameter"
				type="range"
				min="100"
				max="1000"
				step="50"
				value={config.diameter}
				oninput={(e) => updateConfig('diameter', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>100 m</span>
				<span>500 m</span>
				<span>1000 m</span>
			</div>
		</div>

		<!-- Areal Density -->
		<div>
			<label for="areal-density" class="block text-sm text-star-dim mb-2">
				Areal Density:
				<span class="text-star-white font-semibold">{config.arealDensity} g/m&sup2;</span>
			</label>
			<input
				id="areal-density"
				type="range"
				min="35"
				max="50"
				step="1"
				value={config.arealDensity}
				oninput={(e) => updateConfig('arealDensity', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>35 g/m&sup2;</span>
				<span>42 g/m&sup2;</span>
				<span>50 g/m&sup2;</span>
			</div>
		</div>

		<!-- Applied Tension -->
		<div>
			<label for="tension" class="block text-sm text-star-dim mb-2">
				Applied Tension:
				<span class="text-star-white font-semibold">{config.tension.toFixed(2)} N/m</span>
			</label>
			<input
				id="tension"
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
				<span>5 N/m</span>
				<span>10 N/m</span>
			</div>
		</div>

		<!-- Spin Rate -->
		<div>
			<label for="spin-rate" class="block text-sm text-star-dim mb-2">
				Spin Rate:
				<span class="text-star-white font-semibold">{config.spinRate.toFixed(2)} RPM</span>
			</label>
			<input
				id="spin-rate"
				type="range"
				min="0"
				max="0.5"
				step="0.01"
				value={config.spinRate}
				oninput={(e) => updateConfig('spinRate', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0 (no spin)</span>
				<span>0.25 RPM</span>
				<span>0.5 RPM</span>
			</div>
		</div>

		<!-- Damping Ratio -->
		<div>
			<label for="damping-ratio" class="block text-sm text-star-dim mb-2">
				Damping Ratio:
				<span class="text-star-white font-semibold">{config.dampingRatio.toFixed(3)}</span>
			</label>
			<input
				id="damping-ratio"
				type="range"
				min="0.01"
				max="0.10"
				step="0.005"
				value={config.dampingRatio}
				oninput={(e) => updateConfig('dampingRatio', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.01</span>
				<span>0.05</span>
				<span>0.10</span>
			</div>
		</div>

		<!-- Boom Stiffness -->
		<div>
			<label for="boom-stiffness" class="block text-sm text-star-dim mb-2">
				Boom Stiffness:
				<span class="text-star-white font-semibold">{config.boomStiffness >= 1e6 ? (config.boomStiffness / 1e6).toFixed(0) + ' MN/m' : (config.boomStiffness / 1e3).toFixed(0) + ' kN/m'}</span>
			</label>
			<input
				id="boom-stiffness"
				type="range"
				min="3"
				max="6"
				step="0.1"
				value={Math.log10(config.boomStiffness)}
				oninput={(e) => updateConfig('boomStiffness', Math.pow(10, parseFloat(e.currentTarget.value)))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 kN/m</span>
				<span>~30 kN/m</span>
				<span>1 MN/m</span>
			</div>
		</div>

		<!-- Orbital Distance -->
		<div>
			<label for="orbital-distance" class="block text-sm text-star-dim mb-2">
				Orbital Distance:
				<span class="text-star-white font-semibold">{config.orbitalDistance.toFixed(2)} AU</span>
			</label>
			<input
				id="orbital-distance"
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
				<span>0.3 AU</span>
				<span>0.65 AU</span>
				<span>1.0 AU</span>
			</div>
		</div>

		<!-- Effective Tension Display -->
		<div class="p-3 bg-space-700/30 rounded-lg border border-space-600">
			<div class="flex justify-between text-xs">
				<span class="text-star-faint">Applied Tension</span>
				<span class="text-star-white font-mono">{config.tension.toFixed(2)} N/m</span>
			</div>
			<div class="flex justify-between text-xs mt-1">
				<span class="text-star-faint">Centrifugal Tension</span>
				<span class="text-star-white font-mono">+{centrifugalTension.toFixed(3)} N/m</span>
			</div>
			<div class="flex justify-between text-xs mt-1 pt-1 border-t border-space-600">
				<span class="text-cosmic-cyan font-semibold">Effective Tension</span>
				<span class="text-cosmic-cyan font-mono font-semibold">{effectiveTension.toFixed(3)} N/m</span>
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
