<script lang="ts">
	import type { SpectralConfig, ProcessingLocation } from '$lib/services/simulation/spectral-analysis';

	interface Props {
		config: SpectralConfig;
		disabled?: boolean;
		onConfigChange: (config: SpectralConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof SpectralConfig>(key: K, value: SpectralConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	const processingOptions: { value: ProcessingLocation; label: string; description: string }[] = [
		{
			value: 'onboard',
			label: 'On-board Processing',
			description: 'Low bandwidth, fast decisions'
		},
		{
			value: 'ground',
			label: 'Ground Processing',
			description: 'High bandwidth, powerful analysis'
		}
	];
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Simulation Parameters</h3>

	<div class="space-y-6">
		<!-- Processing Location -->
		<div>
			<label class="block text-sm text-star-dim mb-3">Processing Location</label>
			<div class="space-y-2">
				{#each processingOptions as option}
					<button
						onclick={() => updateConfig('processingLocation', option.value)}
						{disabled}
						class="w-full p-3 rounded-lg border text-left transition-colors {config.processingLocation ===
						option.value
							? 'border-cosmic-cyan bg-cosmic-cyan/10 text-star-white'
							: 'border-space-500 bg-space-700/50 text-star-dim hover:border-space-400'}"
					>
						<div class="font-semibold">{option.label}</div>
						<div class="text-xs mt-1 opacity-75">{option.description}</div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Satellite Count -->
		<div>
			<label for="satellite-count" class="block text-sm text-star-dim mb-2">
				Constellation Size:
				<span class="text-star-white font-semibold">{config.satelliteCount} satellites</span>
			</label>
			<input
				id="satellite-count"
				type="range"
				min="10"
				max="100"
				step="5"
				value={config.satelliteCount}
				oninput={(e) => updateConfig('satelliteCount', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>10</span>
				<span>55</span>
				<span>100</span>
			</div>
		</div>

		<!-- Bandwidth -->
		<div>
			<label for="bandwidth" class="block text-sm text-star-dim mb-2">
				Downlink Bandwidth:
				<span class="text-star-white font-semibold">{config.bandwidthMbps} Mbps</span>
			</label>
			<input
				id="bandwidth"
				type="range"
				min="1"
				max="50"
				step="1"
				value={config.bandwidthMbps}
				oninput={(e) => updateConfig('bandwidthMbps', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1</span>
				<span>25</span>
				<span>50</span>
			</div>
		</div>

		<!-- Mission Duration -->
		<div>
			<label for="mission-duration" class="block text-sm text-star-dim mb-2">
				Mission Duration:
				<span class="text-star-white font-semibold">{config.missionDurationYears} years</span>
			</label>
			<input
				id="mission-duration"
				type="range"
				min="3"
				max="15"
				step="1"
				value={config.missionDurationYears}
				oninput={(e) => updateConfig('missionDurationYears', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>3 yr</span>
				<span>9 yr</span>
				<span>15 yr</span>
			</div>
		</div>

		<!-- Encounter Rate -->
		<div>
			<label for="encounter-rate" class="block text-sm text-star-dim mb-2">
				Encounter Rate:
				<span class="text-star-white font-semibold"
					>{config.encounterRatePerYear} per satellite/year</span
				>
			</label>
			<input
				id="encounter-rate"
				type="range"
				min="5"
				max="50"
				step="5"
				value={config.encounterRatePerYear}
				oninput={(e) => updateConfig('encounterRatePerYear', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>5</span>
				<span>25</span>
				<span>50</span>
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
				Run Comparison
			{/if}
		</button>
	</div>
</div>
