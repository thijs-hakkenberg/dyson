<script lang="ts">
	import type { OrbitalTradeConfig, OrbitalLocation, FeedstockSource } from '$lib/services/simulation/orbital-trade';
	import { ORBITAL_LOCATIONS } from '$lib/services/simulation/orbital-trade';

	interface Props {
		config: OrbitalTradeConfig;
		disabled?: boolean;
		onConfigChange: (config: OrbitalTradeConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	// Location options with human-readable names
	const locationOptions: { id: OrbitalLocation; name: string }[] = [
		{ id: 'nrho', name: 'Lunar NRHO' },
		{ id: 'sun_earth_l1', name: 'Sun-Earth L1' },
		{ id: 'sun_earth_l4', name: 'Sun-Earth L4' },
		{ id: 'sun_earth_l5', name: 'Sun-Earth L5' },
		{ id: 'helio_1au', name: 'Heliocentric 1 AU' },
		{ id: 'helio_0p7au', name: 'Heliocentric 0.7 AU' },
		{ id: 'helio_0p5au', name: 'Heliocentric 0.5 AU' },
		{ id: 'sun_mercury_l1', name: 'Sun-Mercury L1 (0.39 AU)' }
	];

	// Feedstock source options
	const feedstockOptions: { id: FeedstockSource; name: string }[] = [
		{ id: 'earth', name: 'Earth' },
		{ id: 'nea', name: 'Near-Earth Asteroids' },
		{ id: 'mercury', name: 'Mercury' }
	];

	function updateConfig<K extends keyof OrbitalTradeConfig>(key: K, value: OrbitalTradeConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	function toggleLocation(location: OrbitalLocation) {
		const current = config.candidateLocations;
		let newLocations: OrbitalLocation[];

		if (current.includes(location)) {
			// Don't allow removing if it's the only location
			if (current.length <= 1) return;
			newLocations = current.filter(l => l !== location);
		} else {
			newLocations = [...current, location];
		}

		updateConfig('candidateLocations', newLocations);
	}

	function updateWeight(key: 'cost' | 'risk' | 'capability', value: number) {
		const weights = { ...config.objectiveWeights };
		weights[key] = value;

		// Normalize so weights sum to 1.0
		const total = weights.cost + weights.risk + weights.capability;
		if (total > 0) {
			weights.cost = weights.cost / total;
			weights.risk = weights.risk / total;
			weights.capability = weights.capability / total;
		}

		updateConfig('objectiveWeights', weights);
	}

	// Format percentage
	function formatPercent(n: number): string {
		return `${(n * 100).toFixed(0)}%`;
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Trade Parameters</h3>

	<div class="space-y-6">
		<!-- Candidate Locations -->
		<div>
			<label class="block text-sm text-star-dim mb-2">Candidate Locations</label>
			<div class="grid grid-cols-2 gap-2">
				{#each locationOptions as option}
					<button
						type="button"
						onclick={() => toggleLocation(option.id)}
						{disabled}
						class="px-3 py-2 text-xs rounded transition-colors text-left {config.candidateLocations.includes(option.id)
							? 'bg-cosmic-cyan/20 border border-cosmic-cyan text-cosmic-cyan'
							: 'bg-space-600 border border-space-500 text-star-dim hover:bg-space-500'}"
					>
						{option.name}
					</button>
				{/each}
			</div>
			<p class="text-xs text-star-faint mt-1">
				{config.candidateLocations.length} location{config.candidateLocations.length !== 1 ? 's' : ''} selected
			</p>
		</div>

		<!-- Feedstock Source -->
		<div>
			<label for="feedstock-source" class="block text-sm text-star-dim mb-2">
				Feedstock Source
			</label>
			<select
				id="feedstock-source"
				value={config.feedstockSource}
				onchange={(e) => updateConfig('feedstockSource', e.currentTarget.value as FeedstockSource)}
				{disabled}
				class="w-full px-3 py-2 rounded bg-space-600 border border-space-500 text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
			>
				{#each feedstockOptions as option}
					<option value={option.id}>{option.name}</option>
				{/each}
			</select>
		</div>

		<!-- Thermal Budget -->
		<div>
			<label for="thermal-budget" class="block text-sm text-star-dim mb-2">
				Thermal Budget:
				<span class="text-star-white font-semibold">{config.thermalBudgetMW.toFixed(1)} MW</span>
			</label>
			<input
				id="thermal-budget"
				type="range"
				min="1.5"
				max="5.0"
				step="0.5"
				value={config.thermalBudgetMW}
				oninput={(e) => updateConfig('thermalBudgetMW', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1.5 MW</span>
				<span>3.25 MW</span>
				<span>5.0 MW</span>
			</div>
		</div>

		<!-- Delta-V Budget -->
		<div>
			<label for="deltav-budget" class="block text-sm text-star-dim mb-2">
				Delta-V Budget:
				<span class="text-star-white font-semibold">{config.deltaVBudgetKms.toFixed(0)} km/s</span>
			</label>
			<input
				id="deltav-budget"
				type="range"
				min="4"
				max="12"
				step="1"
				value={config.deltaVBudgetKms}
				oninput={(e) => updateConfig('deltaVBudgetKms', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>4 km/s</span>
				<span>8 km/s</span>
				<span>12 km/s</span>
			</div>
		</div>

		<!-- Fleet Size -->
		<div>
			<label for="fleet-size" class="block text-sm text-star-dim mb-2">
				Fleet Size:
				<span class="text-star-white font-semibold">{config.fleetSize} vehicles</span>
			</label>
			<input
				id="fleet-size"
				type="range"
				min="10"
				max="100"
				step="5"
				value={config.fleetSize}
				oninput={(e) => updateConfig('fleetSize', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>10</span>
				<span>55</span>
				<span>100</span>
			</div>
		</div>

		<!-- Objective Weights -->
		<div class="border-t border-space-600 pt-4">
			<label class="block text-sm text-star-dim mb-3">Objective Weights</label>

			<div class="space-y-3">
				<!-- Cost Weight -->
				<div>
					<div class="flex justify-between text-xs mb-1">
						<span class="text-star-faint">Cost (delta-V)</span>
						<span class="text-star-white">{formatPercent(config.objectiveWeights.cost)}</span>
					</div>
					<input
						type="range"
						min="0"
						max="1"
						step="0.05"
						value={config.objectiveWeights.cost}
						oninput={(e) => updateWeight('cost', parseFloat(e.currentTarget.value))}
						{disabled}
						class="w-full h-1.5 bg-space-600 rounded-lg appearance-none cursor-pointer accent-solar-gold"
					/>
				</div>

				<!-- Risk Weight -->
				<div>
					<div class="flex justify-between text-xs mb-1">
						<span class="text-star-faint">Risk (stability)</span>
						<span class="text-star-white">{formatPercent(config.objectiveWeights.risk)}</span>
					</div>
					<input
						type="range"
						min="0"
						max="1"
						step="0.05"
						value={config.objectiveWeights.risk}
						oninput={(e) => updateWeight('risk', parseFloat(e.currentTarget.value))}
						{disabled}
						class="w-full h-1.5 bg-space-600 rounded-lg appearance-none cursor-pointer accent-sun-red"
					/>
				</div>

				<!-- Capability Weight -->
				<div>
					<div class="flex justify-between text-xs mb-1">
						<span class="text-star-faint">Capability (power/comm)</span>
						<span class="text-star-white">{formatPercent(config.objectiveWeights.capability)}</span>
					</div>
					<input
						type="range"
						min="0"
						max="1"
						step="0.05"
						value={config.objectiveWeights.capability}
						oninput={(e) => updateWeight('capability', parseFloat(e.currentTarget.value))}
						{disabled}
						class="w-full h-1.5 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
					/>
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
				Run Analysis
			{/if}
		</button>
	</div>
</div>
