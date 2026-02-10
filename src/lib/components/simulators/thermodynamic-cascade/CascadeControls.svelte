<script lang="ts">
	import type { CascadeConfig } from '$lib/services/simulation/thermodynamic-cascade';
	import { calculateShellTemperatures } from '$lib/services/simulation/thermodynamic-cascade';

	interface Props {
		config: CascadeConfig;
		disabled?: boolean;
		onConfigChange: (config: CascadeConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof CascadeConfig>(key: K, value: CascadeConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	let temperatures = $derived(
		calculateShellTemperatures(config.shellCount, config.innerTemp, config.outerTemp)
	);

	function formatTemp(t: number): string {
		return t >= 100 ? `${t.toFixed(0)} K` : `${t.toFixed(1)} K`;
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Cascade Parameters</h3>

	<div class="space-y-6">
		<!-- Shell Count -->
		<div>
			<label for="shell-count" class="block text-sm text-star-dim mb-2">
				Shell Count:
				<span class="text-star-white font-semibold">{config.shellCount}</span>
				<span class="text-star-faint text-xs ml-1">({config.shellCount - 1} stages)</span>
			</label>
			<input
				id="shell-count"
				type="range"
				min="2"
				max="7"
				step="1"
				value={config.shellCount}
				oninput={(e) => updateConfig('shellCount', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>2</span>
				<span>4</span>
				<span>7</span>
			</div>
		</div>

		<!-- Inner Temperature -->
		<div>
			<label for="inner-temp" class="block text-sm text-star-dim mb-2">
				Inner Temperature:
				<span class="text-star-white font-semibold">{config.innerTemp} K</span>
			</label>
			<input
				id="inner-temp"
				type="range"
				min="800"
				max="1500"
				step="50"
				value={config.innerTemp}
				oninput={(e) => updateConfig('innerTemp', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>800 K</span>
				<span>1150 K</span>
				<span>1500 K</span>
			</div>
		</div>

		<!-- Outer Temperature -->
		<div>
			<label for="outer-temp" class="block text-sm text-star-dim mb-2">
				Outer Temperature:
				<span class="text-star-white font-semibold">{config.outerTemp} K</span>
			</label>
			<input
				id="outer-temp"
				type="range"
				min="20"
				max="100"
				step="5"
				value={config.outerTemp}
				oninput={(e) => updateConfig('outerTemp', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>20 K</span>
				<span>60 K</span>
				<span>100 K</span>
			</div>
		</div>

		<!-- TPV Efficiency -->
		<div>
			<label for="tpv-eff" class="block text-sm text-star-dim mb-2">
				TPV Efficiency (% of Carnot):
				<span class="text-star-white font-semibold"
					>{(config.tpvEfficiency * 100).toFixed(0)}%</span
				>
			</label>
			<input
				id="tpv-eff"
				type="range"
				min="0.20"
				max="0.50"
				step="0.01"
				value={config.tpvEfficiency}
				oninput={(e) => updateConfig('tpvEfficiency', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>20%</span>
				<span>35%</span>
				<span>50%</span>
			</div>
		</div>

		<!-- Spectral Selectivity -->
		<div>
			<label for="spectral-sel" class="block text-sm text-star-dim mb-2">
				Spectral Selectivity:
				<span class="text-star-white font-semibold"
					>{(config.spectralSelectivity * 100).toFixed(0)}%</span
				>
			</label>
			<input
				id="spectral-sel"
				type="range"
				min="0.80"
				max="0.99"
				step="0.01"
				value={config.spectralSelectivity}
				oninput={(e) => updateConfig('spectralSelectivity', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>80%</span>
				<span>90%</span>
				<span>99%</span>
			</div>
		</div>

		<!-- Temperature Profile -->
		<div class="p-3 bg-space-700/30 rounded-lg border border-space-600">
			<p class="text-xs text-star-faint uppercase tracking-wider mb-2">Temperature Profile</p>
			<div class="space-y-1">
				{#each temperatures as temp, i}
					<div class="flex items-center gap-2">
						<span class="text-xs text-star-dim w-16">
							{i === 0 ? 'Inner' : i === temperatures.length - 1 ? 'Outer' : `Shell ${i}`}
						</span>
						<div class="flex-1 h-1.5 bg-space-600 rounded-full">
							<div
								class="h-1.5 rounded-full"
								style="width: {((temp - config.outerTemp) / (config.innerTemp - config.outerTemp)) * 100}%; background: hsl({Math.max(0, 60 - (i / (temperatures.length - 1)) * 60)}, 80%, 50%)"
							></div>
						</div>
						<span class="text-xs text-star-white font-mono w-16 text-right"
							>{formatTemp(temp)}</span
						>
					</div>
				{/each}
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
