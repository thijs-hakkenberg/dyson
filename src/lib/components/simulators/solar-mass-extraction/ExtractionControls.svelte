<script lang="ts">
	import type { ExtractionConfig, SolarActivityLevel } from '$lib/services/simulation/solar-mass-extraction';
	import { L_SUN } from '$lib/services/simulation/solar-mass-extraction';

	interface Props {
		config: ExtractionConfig;
		disabled: boolean;
		onConfigChange: (config: ExtractionConfig) => void;
		onRun: () => void;
	}

	let { config, disabled, onConfigChange, onRun }: Props = $props();

	// Log-scale mapping for extraction rate
	let logExtractionRate = $derived(Math.log10(config.extractionRate));
	let logBeamPower = $derived(Math.log10(config.beamPower));

	// Total power and comparison to solar luminosity
	let totalPower = $derived(config.stationCount * config.beamPower);
	let powerFraction = $derived(totalPower / L_SUN);

	function updateConfig<K extends keyof ExtractionConfig>(key: K, value: ExtractionConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	function formatScientific(value: number, unit: string): string {
		if (value === 0) return '0 ' + unit;
		const exp = Math.floor(Math.log10(Math.abs(value)));
		const mantissa = value / Math.pow(10, exp);
		if (exp === 0) return mantissa.toFixed(1) + ' ' + unit;
		return mantissa.toFixed(1) + ' x 10^' + exp + ' ' + unit;
	}

	function formatPower(watts: number): string {
		if (watts >= 1e26) return (watts / 1e26).toFixed(2) + ' x 10^26 W';
		if (watts >= 1e24) return (watts / 1e24).toFixed(1) + ' YW';
		if (watts >= 1e21) return (watts / 1e21).toFixed(1) + ' ZW';
		if (watts >= 1e18) return (watts / 1e18).toFixed(1) + ' EW';
		return watts.toExponential(1) + ' W';
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Extraction Parameters</h3>

	<div class="space-y-6">
		<!-- Extraction Rate (log slider) -->
		<div>
			<label for="extraction-rate" class="block text-sm text-star-dim mb-2">
				Target Extraction Rate:
				<span class="text-star-white font-semibold">{formatScientific(config.extractionRate, 'kg/s')}</span>
			</label>
			<input
				id="extraction-rate"
				type="range"
				min="9"
				max="13"
				step="0.1"
				value={logExtractionRate}
				oninput={(e) => updateConfig('extractionRate', Math.pow(10, parseFloat(e.currentTarget.value)))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>10^9 kg/s</span>
				<span>10^11 kg/s</span>
				<span>10^13 kg/s</span>
			</div>
		</div>

		<!-- Station Count -->
		<div>
			<label for="station-count" class="block text-sm text-star-dim mb-2">
				Extraction Stations:
				<span class="text-star-white font-semibold">{config.stationCount.toLocaleString()}</span>
			</label>
			<input
				id="station-count"
				type="range"
				min="10"
				max="10000"
				step="10"
				value={config.stationCount}
				oninput={(e) => updateConfig('stationCount', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>10</span>
				<span>5,000</span>
				<span>10,000</span>
			</div>
		</div>

		<!-- Beam Power per Station (log slider) -->
		<div>
			<label for="beam-power" class="block text-sm text-star-dim mb-2">
				Beam Power per Station:
				<span class="text-star-white font-semibold">{formatScientific(config.beamPower, 'W')}</span>
			</label>
			<input
				id="beam-power"
				type="range"
				min="18"
				max="22"
				step="0.1"
				value={logBeamPower}
				oninput={(e) => updateConfig('beamPower', Math.pow(10, parseFloat(e.currentTarget.value)))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>10^18 W</span>
				<span>10^20 W</span>
				<span>10^22 W</span>
			</div>
		</div>

		<!-- Lifting Efficiency -->
		<div>
			<label for="lifting-efficiency" class="block text-sm text-star-dim mb-2">
				Lifting Efficiency:
				<span class="text-star-white font-semibold">{(config.liftingEfficiency * 100).toFixed(1)}%</span>
			</label>
			<input
				id="lifting-efficiency"
				type="range"
				min="0.01"
				max="0.10"
				step="0.005"
				value={config.liftingEfficiency}
				oninput={(e) => updateConfig('liftingEfficiency', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1%</span>
				<span>5%</span>
				<span>10%</span>
			</div>
		</div>

		<!-- Solar Activity -->
		<div>
			<label for="solar-activity" class="block text-sm text-star-dim mb-2">
				Solar Activity Level
			</label>
			<select
				id="solar-activity"
				value={config.solarActivity}
				onchange={(e) => updateConfig('solarActivity', e.currentTarget.value as SolarActivityLevel)}
				{disabled}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded text-star-white text-sm focus:border-cosmic-cyan focus:outline-none"
			>
				<option value="minimum">Solar Minimum</option>
				<option value="moderate">Moderate Activity</option>
				<option value="maximum">Solar Maximum</option>
			</select>
		</div>

		<!-- Mission Duration -->
		<div>
			<label for="mission-duration" class="block text-sm text-star-dim mb-2">
				Mission Duration:
				<span class="text-star-white font-semibold">{config.missionDuration.toLocaleString()} years</span>
			</label>
			<input
				id="mission-duration"
				type="range"
				min="100"
				max="10000"
				step="100"
				value={config.missionDuration}
				oninput={(e) => updateConfig('missionDuration', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>100 yr</span>
				<span>5,000 yr</span>
				<span>10,000 yr</span>
			</div>
		</div>

		<!-- Total Power Summary -->
		<div class="p-3 rounded-lg border {powerFraction > 0.1 ? 'bg-sun-red/10 border-sun-red/30' : powerFraction > 0.01 ? 'bg-solar-gold/10 border-solar-gold/30' : 'bg-cosmic-cyan/10 border-cosmic-cyan/30'}">
			<p class="text-xs {powerFraction > 0.1 ? 'text-sun-red' : powerFraction > 0.01 ? 'text-solar-gold' : 'text-cosmic-cyan'}">
				Total Beam Power: <strong>{formatPower(totalPower)}</strong>
			</p>
			<p class="text-xs mt-1 {powerFraction > 0.1 ? 'text-sun-red' : 'text-star-dim'}">
				{(powerFraction * 100).toFixed(4)}% of solar luminosity
				{#if powerFraction > 0.1}
					-- DANGER: exceeds 10% stability threshold
				{:else if powerFraction > 0.01}
					-- CAUTION: exceeds 1% perturbation threshold
				{:else}
					-- within safe operating range
				{/if}
			</p>
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
				Run Extraction Analysis
			{/if}
		</button>
	</div>
</div>
