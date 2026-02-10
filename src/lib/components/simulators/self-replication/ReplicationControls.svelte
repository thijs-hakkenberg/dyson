<script lang="ts">
	import type { ReplicationConfig } from '$lib/services/simulation/self-replication';
	import { calculateDoublingTime, estimateVitaminBudget } from '$lib/services/simulation/self-replication';

	interface Props {
		config: ReplicationConfig;
		disabled?: boolean;
		onConfigChange: (config: ReplicationConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof ReplicationConfig>(
		key: K,
		value: ReplicationConfig[K]
	) {
		onConfigChange({ ...config, [key]: value });
	}

	// Log scale for target foundries
	let targetLog = $derived(Math.log10(config.targetFoundries));

	function updateTargetFromLog(logVal: number) {
		const value = Math.round(Math.pow(10, logVal));
		updateConfig('targetFoundries', Math.max(100, Math.min(100000, value)));
	}

	// Computed values
	let doublingTime = $derived(calculateDoublingTime(config.closureRatio, config.cycleTimeMonths));
	let vitaminBudget = $derived(
		estimateVitaminBudget(
			config.targetFoundries,
			config.initialFoundries,
			config.foundryMassKg,
			config.closureRatio
		)
	);

	function formatDoublingTime(months: number): string {
		if (!isFinite(months)) return 'Never';
		if (months >= 12) return `${(months / 12).toFixed(1)} years`;
		return `${months.toFixed(1)} months`;
	}

	function formatMass(kg: number): string {
		if (kg >= 1e9) return `${(kg / 1e9).toFixed(1)}M tonnes`;
		if (kg >= 1e6) return `${(kg / 1e6).toFixed(1)}k tonnes`;
		if (kg >= 1e3) return `${(kg / 1e3).toFixed(1)} tonnes`;
		return `${kg.toFixed(0)} kg`;
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Replication Parameters</h3>

	<div class="space-y-6">
		<!-- Closure Ratio -->
		<div>
			<label for="closure-ratio" class="block text-sm text-star-dim mb-2">
				Closure Ratio:
				<span class="text-star-white font-semibold">{(config.closureRatio * 100).toFixed(0)}%</span>
			</label>
			<input
				id="closure-ratio"
				type="range"
				min="0.80"
				max="0.99"
				step="0.01"
				value={config.closureRatio}
				oninput={(e) => updateConfig('closureRatio', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>80%</span>
				<span>90%</span>
				<span>99%</span>
			</div>
		</div>

		<!-- Cycle Time -->
		<div>
			<label for="cycle-time" class="block text-sm text-star-dim mb-2">
				Cycle Time:
				<span class="text-star-white font-semibold">{config.cycleTimeMonths} months</span>
			</label>
			<input
				id="cycle-time"
				type="range"
				min="6"
				max="24"
				step="1"
				value={config.cycleTimeMonths}
				oninput={(e) => updateConfig('cycleTimeMonths', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>6 mo</span>
				<span>15 mo</span>
				<span>24 mo</span>
			</div>
		</div>

		<!-- Initial Foundries -->
		<div>
			<label for="initial-foundries" class="block text-sm text-star-dim mb-2">
				Initial Foundries:
				<span class="text-star-white font-semibold">{config.initialFoundries}</span>
			</label>
			<input
				id="initial-foundries"
				type="range"
				min="1"
				max="10"
				step="1"
				value={config.initialFoundries}
				oninput={(e) => updateConfig('initialFoundries', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1</span>
				<span>5</span>
				<span>10</span>
			</div>
		</div>

		<!-- Target Foundries (log scale) -->
		<div>
			<label for="target-foundries" class="block text-sm text-star-dim mb-2">
				Target Foundries:
				<span class="text-star-white font-semibold">{config.targetFoundries.toLocaleString()}</span>
			</label>
			<input
				id="target-foundries"
				type="range"
				min="2"
				max="5"
				step="0.1"
				value={targetLog}
				oninput={(e) => updateTargetFromLog(parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>100</span>
				<span>1,000</span>
				<span>100,000</span>
			</div>
		</div>

		<!-- Foundry Mass -->
		<div>
			<label for="foundry-mass" class="block text-sm text-star-dim mb-2">
				Foundry Mass:
				<span class="text-star-white font-semibold">{(config.foundryMassKg / 1000).toFixed(0)} tonnes</span>
			</label>
			<input
				id="foundry-mass"
				type="range"
				min="1000"
				max="100000"
				step="1000"
				value={config.foundryMassKg}
				oninput={(e) => updateConfig('foundryMassKg', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 t</span>
				<span>50 t</span>
				<span>100 t</span>
			</div>
		</div>

		<!-- Vitamin Supply Rate -->
		<div>
			<label for="vitamin-supply" class="block text-sm text-star-dim mb-2">
				Vitamin Supply:
				<span class="text-star-white font-semibold">{(config.vitaminSupplyRate / 1000).toFixed(0)} t/month</span>
			</label>
			<input
				id="vitamin-supply"
				type="range"
				min="100"
				max="1000000"
				step="1000"
				value={config.vitaminSupplyRate}
				oninput={(e) => updateConfig('vitaminSupplyRate', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.1 t/mo</span>
				<span>500 t/mo</span>
				<span>1,000 t/mo</span>
			</div>
		</div>

		<!-- Degradation Rate -->
		<div>
			<label for="degradation-rate" class="block text-sm text-star-dim mb-2">
				Degradation Rate:
				<span class="text-star-white font-semibold">{(config.degradationRate * 100).toFixed(1)}%/gen</span>
			</label>
			<input
				id="degradation-rate"
				type="range"
				min="0"
				max="0.05"
				step="0.001"
				value={config.degradationRate}
				oninput={(e) => updateConfig('degradationRate', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0% (perfect)</span>
				<span>2.5%</span>
				<span>5%</span>
			</div>
		</div>

		<!-- Computed values -->
		<div class="p-3 bg-space-700/30 rounded-lg border border-space-600 space-y-2 text-xs">
			<div class="flex justify-between">
				<span class="text-star-dim">Doubling Time</span>
				<span class="text-cosmic-cyan font-mono">{formatDoublingTime(doublingTime)}</span>
			</div>
			<div class="flex justify-between">
				<span class="text-star-dim">Est. Vitamin Budget</span>
				<span class="text-solar-gold font-mono">{formatMass(vitaminBudget)}</span>
			</div>
			<div class="flex justify-between">
				<span class="text-star-dim">Vitamin per Foundry</span>
				<span class="text-star-white font-mono">{formatMass(config.foundryMassKg * (1 - config.closureRatio))}</span>
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
