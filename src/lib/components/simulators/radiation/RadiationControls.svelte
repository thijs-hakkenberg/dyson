<script lang="ts">
	import type {
		RadiationDegradationConfig,
		PVTechnology
	} from '$lib/services/simulation/radiation-degradation';

	interface Props {
		config: RadiationDegradationConfig;
		disabled?: boolean;
		onConfigChange: (config: RadiationDegradationConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof RadiationDegradationConfig>(
		key: K,
		value: RadiationDegradationConfig[K]
	) {
		onConfigChange({ ...config, [key]: value });
	}

	const pvTechnologyOptions: { value: PVTechnology; label: string; description: string }[] = [
		{ value: 'perovskite', label: 'Perovskite', description: 'Self-annealing but radiation-sensitive' },
		{ value: 'cdte', label: 'CdTe', description: 'Good radiation tolerance' },
		{ value: 'iii-v', label: 'III-V', description: 'Most radiation resistant' },
		{ value: 'silicon', label: 'Silicon', description: 'Reference baseline' },
		{ value: 'hybrid', label: 'Hybrid/Tandem', description: 'Balanced performance' }
	];
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">PV Degradation Parameters</h3>

	<div class="space-y-6">
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
				<span>0.3 AU (Mercury)</span>
				<span>0.65 AU</span>
				<span>1.0 AU (Earth)</span>
			</div>
		</div>

		<!-- PV Technology -->
		<div>
			<label for="pv-technology" class="block text-sm text-star-dim mb-2"> PV Technology </label>
			<select
				id="pv-technology"
				value={config.pvTechnology}
				onchange={(e) => updateConfig('pvTechnology', e.currentTarget.value as PVTechnology)}
				{disabled}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white focus:border-cosmic-cyan focus:outline-none"
			>
				{#each pvTechnologyOptions as option}
					<option value={option.value}>{option.label} - {option.description}</option>
				{/each}
			</select>
		</div>

		<!-- Shielding Mass -->
		<div>
			<label for="shielding-mass" class="block text-sm text-star-dim mb-2">
				Shielding Mass:
				<span class="text-star-white font-semibold">{config.shieldingMass} g/m&sup2;</span>
			</label>
			<input
				id="shielding-mass"
				type="range"
				min="0"
				max="50"
				step="1"
				value={config.shieldingMass}
				oninput={(e) => updateConfig('shieldingMass', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0 (none)</span>
				<span>10 (50% atten.)</span>
				<span>50 g/m&sup2;</span>
			</div>
		</div>

		<!-- Mission Duration -->
		<div>
			<label for="mission-duration" class="block text-sm text-star-dim mb-2">
				Mission Duration:
				<span class="text-star-white font-semibold">{config.missionDuration} years</span>
			</label>
			<input
				id="mission-duration"
				type="range"
				min="5"
				max="25"
				step="1"
				value={config.missionDuration}
				oninput={(e) => updateConfig('missionDuration', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>5 yr</span>
				<span>15 yr</span>
				<span>25 yr</span>
			</div>
		</div>

		<!-- Initial Efficiency -->
		<div>
			<label for="initial-efficiency" class="block text-sm text-star-dim mb-2">
				Initial Efficiency:
				<span class="text-star-white font-semibold">{config.initialEfficiency}%</span>
			</label>
			<input
				id="initial-efficiency"
				type="range"
				min="15"
				max="40"
				step="1"
				value={config.initialEfficiency}
				oninput={(e) => updateConfig('initialEfficiency', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>15%</span>
				<span>27%</span>
				<span>40%</span>
			</div>
		</div>

		<!-- SPE Rate -->
		<div>
			<label for="spe-rate" class="block text-sm text-star-dim mb-2">
				Solar Proton Event Rate:
				<span class="text-star-white font-semibold">{config.solarProtonEventRate}/year</span>
			</label>
			<input
				id="spe-rate"
				type="range"
				min="1"
				max="25"
				step="1"
				value={config.solarProtonEventRate}
				oninput={(e) => updateConfig('solarProtonEventRate', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 (solar min)</span>
				<span>~10 (average)</span>
				<span>25 (solar max)</span>
			</div>
		</div>

		<!-- Temperature Cycling Toggle -->
		<div class="flex items-center justify-between">
			<label for="temp-cycling" class="text-sm text-star-dim">
				Temperature Cycling Damage
			</label>
			<button
				id="temp-cycling"
				aria-label="Toggle temperature cycling damage"
				onclick={() => updateConfig('temperatureCycling', !config.temperatureCycling)}
				{disabled}
				class="relative w-12 h-6 rounded-full transition-colors {config.temperatureCycling
					? 'bg-cosmic-cyan'
					: 'bg-space-600'}"
			>
				<span
					class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform {config.temperatureCycling
						? 'translate-x-6'
						: ''}"
				></span>
			</button>
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
