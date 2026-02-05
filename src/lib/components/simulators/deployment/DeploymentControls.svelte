<script lang="ts">
	import type {
		DeploymentConfig,
		DeploymentMechanism,
		DeploymentSpeed
	} from '$lib/services/simulation/deployment-reliability';

	interface Props {
		config: DeploymentConfig;
		disabled?: boolean;
		onConfigChange: (config: DeploymentConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof DeploymentConfig>(
		key: K,
		value: DeploymentConfig[K]
	) {
		onConfigChange({ ...config, [key]: value });
	}

	const mechanismOptions: { value: DeploymentMechanism; label: string; description: string }[] = [
		{ value: 'inflatable', label: 'Inflatable', description: 'Gas-inflated deployment' },
		{ value: 'motor-driven', label: 'Motor-driven', description: 'Mechanical unfurling' },
		{ value: 'centrifugal', label: 'Centrifugal', description: 'Spin-deployed' },
		{ value: 'shape-memory', label: 'Shape-memory', description: 'Thermal actuation' },
		{ value: 'hybrid', label: 'Hybrid', description: 'Combined mechanisms' }
	];

	const speedOptions: { value: DeploymentSpeed; label: string }[] = [
		{ value: 'slow', label: 'Slow (2x time, safer)' },
		{ value: 'medium', label: 'Medium (balanced)' },
		{ value: 'fast', label: 'Fast (0.5x time, riskier)' }
	];
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Deployment Parameters</h3>

	<div class="space-y-6">
		<!-- Membrane Area -->
		<div>
			<label for="membrane-area" class="block text-sm text-star-dim mb-2">
				Membrane Area:
				<span class="text-star-white font-semibold">{config.membraneArea.toLocaleString()} m&sup2;</span>
			</label>
			<input
				id="membrane-area"
				type="range"
				min="100"
				max="10000"
				step="100"
				value={config.membraneArea}
				oninput={(e) => updateConfig('membraneArea', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>100 m&sup2;</span>
				<span>5,000 m&sup2;</span>
				<span>10,000 m&sup2;</span>
			</div>
		</div>

		<!-- Deployment Mechanism -->
		<div>
			<label for="deployment-mechanism" class="block text-sm text-star-dim mb-2">
				Deployment Mechanism
			</label>
			<select
				id="deployment-mechanism"
				value={config.deploymentMechanism}
				onchange={(e) => updateConfig('deploymentMechanism', e.currentTarget.value as DeploymentMechanism)}
				{disabled}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white focus:border-cosmic-cyan focus:outline-none"
			>
				{#each mechanismOptions as option}
					<option value={option.value}>{option.label} - {option.description}</option>
				{/each}
			</select>
		</div>

		<!-- Deployment Speed -->
		<div>
			<label for="deployment-speed" class="block text-sm text-star-dim mb-2">
				Deployment Speed
			</label>
			<select
				id="deployment-speed"
				value={config.deploymentSpeed}
				onchange={(e) => updateConfig('deploymentSpeed', e.currentTarget.value as DeploymentSpeed)}
				{disabled}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white focus:border-cosmic-cyan focus:outline-none"
			>
				{#each speedOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>

		<!-- Temperature Range -->
		<div>
			<label class="block text-sm text-star-dim mb-2">
				Temperature Range:
				<span class="text-star-white font-semibold">
					{config.minTemperature}&deg;C to {config.maxTemperature}&deg;C
				</span>
			</label>
			<div class="space-y-2">
				<div>
					<span class="text-xs text-star-faint">Min Temp</span>
					<input
						type="range"
						min="-150"
						max="50"
						step="10"
						value={config.minTemperature}
						oninput={(e) => updateConfig('minTemperature', parseInt(e.currentTarget.value))}
						{disabled}
						class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
					/>
				</div>
				<div>
					<span class="text-xs text-star-faint">Max Temp</span>
					<input
						type="range"
						min="0"
						max="150"
						step="10"
						value={config.maxTemperature}
						oninput={(e) => updateConfig('maxTemperature', parseInt(e.currentTarget.value))}
						{disabled}
						class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
					/>
				</div>
			</div>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>-150&deg;C</span>
				<span>0&deg;C</span>
				<span>+150&deg;C</span>
			</div>
		</div>

		<!-- Maximum Attempts -->
		<div>
			<label for="max-attempts" class="block text-sm text-star-dim mb-2">
				Maximum Attempts:
				<span class="text-star-white font-semibold">{config.maxAttempts}</span>
			</label>
			<input
				id="max-attempts"
				type="range"
				min="1"
				max="5"
				step="1"
				value={config.maxAttempts}
				oninput={(e) => updateConfig('maxAttempts', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 (no retry)</span>
				<span>3</span>
				<span>5 attempts</span>
			</div>
		</div>

		<!-- Membrane Thickness -->
		<div>
			<label for="membrane-thickness" class="block text-sm text-star-dim mb-2">
				Membrane Thickness:
				<span class="text-star-white font-semibold">{config.membraneThickness} um</span>
			</label>
			<input
				id="membrane-thickness"
				type="range"
				min="1"
				max="25"
				step="1"
				value={config.membraneThickness}
				oninput={(e) => updateConfig('membraneThickness', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 um (thin)</span>
				<span>5 um</span>
				<span>25 um (thick)</span>
			</div>
		</div>

		<!-- Thermal Preconditioning Toggle -->
		<div class="flex items-center justify-between">
			<label for="thermal-precond" class="text-sm text-star-dim">
				Thermal Preconditioning
			</label>
			<button
				id="thermal-precond"
				onclick={() => updateConfig('thermalPreconditioning', !config.thermalPreconditioning)}
				{disabled}
				class="relative w-12 h-6 rounded-full transition-colors {config.thermalPreconditioning
					? 'bg-cosmic-cyan'
					: 'bg-space-600'}"
			>
				<span
					class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform {config.thermalPreconditioning
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
