<script lang="ts">
	import type { ShkadovConfig } from '$lib/services/simulation/shkadov-mirror';
	import { calculateCriticalArealDensity, SIGMA_CRIT } from '$lib/services/simulation/shkadov-mirror';

	interface Props {
		config: ShkadovConfig;
		disabled: boolean;
		onConfigChange: (config: ShkadovConfig) => void;
		onRun: () => void;
	}

	let { config, disabled, onConfigChange, onRun }: Props = $props();

	const criticalDensityGm2 = calculateCriticalArealDensity();

	let isAboveStatiteLimit = $derived(config.arealDensity > SIGMA_CRIT);

	function updateConfig<K extends keyof ShkadovConfig>(key: K, value: ShkadovConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Mirror Parameters</h3>

	<div class="space-y-6">
		<!-- Areal Density -->
		<div>
			<label for="areal-density" class="block text-sm text-star-dim mb-2">
				Areal Density:
				<span class="text-star-white font-semibold">{config.arealDensity.toFixed(1)} kg/m²</span>
			</label>
			<input
				id="areal-density"
				type="range"
				min="0.5"
				max="10"
				step="0.1"
				value={config.arealDensity}
				oninput={(e) => updateConfig('arealDensity', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.5 kg/m²</span>
				<span>5.0 kg/m²</span>
				<span>10.0 kg/m²</span>
			</div>
		</div>

		<!-- Statite Limit Indicator -->
		<div class="p-3 rounded-lg border {isAboveStatiteLimit
			? 'bg-sun-red/10 border-sun-red/30'
			: 'bg-cosmic-cyan/10 border-cosmic-cyan/30'}">
			<p class="text-xs {isAboveStatiteLimit ? 'text-sun-red' : 'text-cosmic-cyan'}">
				Critical areal density (statite limit): <strong>{criticalDensityGm2.toFixed(2)} g/m²</strong>
				({(SIGMA_CRIT * 1000).toFixed(2)} g/m² = {SIGMA_CRIT.toFixed(5)} kg/m²)
			</p>
			<p class="text-xs mt-1 {isAboveStatiteLimit ? 'text-sun-red' : 'text-star-dim'}">
				{#if isAboveStatiteLimit}
					Mirror is ABOVE the statite limit -- solar gravity exceeds radiation pressure.
					The mirror cannot hover freely; it requires active propulsion or orbital mechanics.
				{:else}
					Mirror is below the statite limit -- radiation pressure can support it as a free-floating statite.
				{/if}
			</p>
		</div>

		<!-- Reflectivity -->
		<div>
			<label for="reflectivity" class="block text-sm text-star-dim mb-2">
				Reflectivity:
				<span class="text-star-white font-semibold">{config.reflectivity.toFixed(2)}</span>
			</label>
			<input
				id="reflectivity"
				type="range"
				min="0.90"
				max="0.99"
				step="0.01"
				value={config.reflectivity}
				oninput={(e) => updateConfig('reflectivity', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.90</span>
				<span>0.95</span>
				<span>0.99</span>
			</div>
		</div>

		<!-- Coverage Fraction -->
		<div>
			<label for="coverage-fraction" class="block text-sm text-star-dim mb-2">
				Sky Coverage Fraction:
				<span class="text-star-white font-semibold">{(config.coverageFraction * 100).toFixed(0)}%</span>
			</label>
			<input
				id="coverage-fraction"
				type="range"
				min="0.01"
				max="0.50"
				step="0.01"
				value={config.coverageFraction}
				oninput={(e) => updateConfig('coverageFraction', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1%</span>
				<span>25%</span>
				<span>50%</span>
			</div>
		</div>

		<!-- Run Button -->
		<button
			onclick={onRun}
			disabled={disabled}
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
				Run Trade Study
			{/if}
		</button>
	</div>
</div>
