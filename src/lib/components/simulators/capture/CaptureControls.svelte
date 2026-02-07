<script lang="ts">
	import type {
		CaptureConfig,
		CaptureMethod
	} from '$lib/services/simulation/capture';

	interface Props {
		config: CaptureConfig;
		disabled?: boolean;
		onConfigChange: (config: CaptureConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof CaptureConfig>(
		key: K,
		value: CaptureConfig[K]
	) {
		onConfigChange({ ...config, [key]: value });
	}

	const methodOptions: { value: CaptureMethod; label: string; description: string }[] = [
		{ value: 'magnetic', label: 'Magnetic', description: 'Electromagnetic deceleration' },
		{ value: 'mechanical', label: 'Mechanical', description: 'Arms/clamps mechanism' },
		{ value: 'net', label: 'Net', description: 'Deployment nets' },
		{ value: 'foam', label: 'Foam', description: 'Impact-absorbing foam' },
		{ value: 'tether', label: 'Tether', description: 'Rotating tether capture' }
	];

	const structuralRatingLabels: Record<number, string> = {
		1: 'Fragile',
		2: 'Light',
		3: 'Standard',
		4: 'Reinforced',
		5: 'Heavy-duty'
	};
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Capture Parameters</h3>

	<div class="space-y-6">
		<!-- Payload Mass -->
		<div>
			<label for="payload-mass" class="block text-sm text-star-dim mb-2">
				Payload Mass:
				<span class="text-star-white font-semibold">{config.payloadMassKg} kg</span>
			</label>
			<input
				id="payload-mass"
				type="range"
				min="10"
				max="1000"
				step="10"
				value={config.payloadMassKg}
				oninput={(e) => updateConfig('payloadMassKg', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>10 kg</span>
				<span>500 kg</span>
				<span>1000 kg</span>
			</div>
		</div>

		<!-- Arrival Velocity -->
		<div>
			<label for="arrival-velocity" class="block text-sm text-star-dim mb-2">
				Arrival Velocity:
				<span class="text-star-white font-semibold">{config.arrivalVelocityMs} m/s</span>
			</label>
			<input
				id="arrival-velocity"
				type="range"
				min="10"
				max="500"
				step="10"
				value={config.arrivalVelocityMs}
				oninput={(e) => updateConfig('arrivalVelocityMs', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>10 m/s</span>
				<span>250 m/s</span>
				<span>500 m/s</span>
			</div>
		</div>

		<!-- Capture Method -->
		<div>
			<label for="capture-method" class="block text-sm text-star-dim mb-2">
				Capture Method
			</label>
			<select
				id="capture-method"
				value={config.captureMethod}
				onchange={(e) => updateConfig('captureMethod', e.currentTarget.value as CaptureMethod)}
				{disabled}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white focus:border-cosmic-cyan focus:outline-none"
			>
				{#each methodOptions as option}
					<option value={option.value}>{option.label} - {option.description}</option>
				{/each}
			</select>
		</div>

		<!-- Target Accuracy -->
		<div>
			<label for="target-accuracy" class="block text-sm text-star-dim mb-2">
				Target Accuracy:
				<span class="text-star-white font-semibold">{config.targetAccuracyM.toFixed(1)} m</span>
			</label>
			<input
				id="target-accuracy"
				type="range"
				min="0.1"
				max="10"
				step="0.1"
				value={config.targetAccuracyM}
				oninput={(e) => updateConfig('targetAccuracyM', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.1 m (precise)</span>
				<span>5 m</span>
				<span>10 m (rough)</span>
			</div>
		</div>

		<!-- Approach Angle Variance -->
		<div>
			<label for="angle-variance" class="block text-sm text-star-dim mb-2">
				Angle Variance:
				<span class="text-star-white font-semibold">{config.approachAngleVarianceDeg}&deg;</span>
			</label>
			<input
				id="angle-variance"
				type="range"
				min="0"
				max="15"
				step="1"
				value={config.approachAngleVarianceDeg}
				oninput={(e) => updateConfig('approachAngleVarianceDeg', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0&deg; (perfect)</span>
				<span>7&deg;</span>
				<span>15&deg;</span>
			</div>
		</div>

		<!-- Timing Accuracy -->
		<div>
			<label for="timing-accuracy" class="block text-sm text-star-dim mb-2">
				Timing Accuracy:
				<span class="text-star-white font-semibold">{config.timingAccuracyMs} ms</span>
			</label>
			<input
				id="timing-accuracy"
				type="range"
				min="1"
				max="100"
				step="1"
				value={config.timingAccuracyMs}
				oninput={(e) => updateConfig('timingAccuracyMs', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 ms (precise)</span>
				<span>50 ms</span>
				<span>100 ms</span>
			</div>
		</div>

		<!-- Structural Rating -->
		<div>
			<label for="structural-rating" class="block text-sm text-star-dim mb-2">
				Structural Rating:
				<span class="text-star-white font-semibold">
					{config.structuralRating} ({structuralRatingLabels[config.structuralRating]})
				</span>
			</label>
			<input
				id="structural-rating"
				type="range"
				min="1"
				max="5"
				step="1"
				value={config.structuralRating}
				oninput={(e) => updateConfig('structuralRating', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 (fragile)</span>
				<span>3</span>
				<span>5 (heavy)</span>
			</div>
		</div>

		<!-- Redundant Systems Toggle -->
		<div class="flex items-center justify-between">
			<label for="redundant-systems" class="text-sm text-star-dim">
				Redundant Systems
			</label>
			<button
				id="redundant-systems"
				aria-label="Toggle redundant systems"
				onclick={() => updateConfig('redundantSystems', !config.redundantSystems)}
				{disabled}
				class="relative w-12 h-6 rounded-full transition-colors {config.redundantSystems
					? 'bg-cosmic-cyan'
					: 'bg-space-600'}"
			>
				<span
					class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform {config.redundantSystems
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
