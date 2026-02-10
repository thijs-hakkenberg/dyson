<script lang="ts">
	import type { DeploymentOptConfig, DeploymentStrategy } from '$lib/services/simulation/deployment-optimization';

	interface Props {
		config: DeploymentOptConfig;
		disabled?: boolean;
		nnAvailable: boolean | null;
		onConfigChange: (config: DeploymentOptConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, nnAvailable, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof DeploymentOptConfig>(key: K, value: DeploymentOptConfig[K]) {
		onConfigChange({ ...config, [key]: value });
	}

	function toggleStrategy(strategy: DeploymentStrategy) {
		const current = config.strategies;
		if (current.includes(strategy)) {
			if (current.length <= 1) return; // keep at least one
			updateConfig('strategies', current.filter((s) => s !== strategy));
		} else {
			updateConfig('strategies', [...current, strategy]);
		}
	}

	const strategyLabels: Record<DeploymentStrategy, string> = {
		sequential: 'Sequential',
		batch: 'Batch',
		greedy: 'Greedy',
		'nn-guided': 'NN-Guided'
	};

	const strategyColors: Record<DeploymentStrategy, string> = {
		sequential: 'bg-blue-500',
		batch: 'bg-green-500',
		greedy: 'bg-orange-500',
		'nn-guided': 'bg-cyan-500'
	};
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Deployment Parameters</h3>

	<!-- NN Status -->
	<div class="mb-6 flex items-center gap-2">
		{#if nnAvailable === null}
			<span class="w-2 h-2 rounded-full bg-star-faint animate-pulse"></span>
			<span class="text-sm text-star-faint">Loading NN weights...</span>
		{:else if nnAvailable}
			<span class="w-2 h-2 rounded-full bg-green-400"></span>
			<span class="text-sm text-green-400">NN trajectory estimator loaded</span>
		{:else}
			<span class="w-2 h-2 rounded-full bg-yellow-400"></span>
			<span class="text-sm text-yellow-400">Using Hohmann fallback</span>
		{/if}
	</div>

	<div class="space-y-6">
		<!-- Unit Count -->
		<div>
			<label for="unit-count" class="block text-sm text-star-dim mb-2">
				Units to Deploy:
				<span class="text-star-white font-semibold">{config.unitCount.toLocaleString()}</span>
			</label>
			<input
				id="unit-count"
				type="range"
				min="100"
				max="5000"
				step="100"
				value={config.unitCount}
				oninput={(e) => updateConfig('unitCount', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>100</span>
				<span>2,500</span>
				<span>5,000</span>
			</div>
		</div>

		<!-- Tug Count -->
		<div>
			<label for="tug-count" class="block text-sm text-star-dim mb-2">
				Tug Vehicles:
				<span class="text-star-white font-semibold">{config.tugCount}</span>
			</label>
			<input
				id="tug-count"
				type="range"
				min="5"
				max="50"
				step="5"
				value={config.tugCount}
				oninput={(e) => updateConfig('tugCount', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>5</span>
				<span>25</span>
				<span>50</span>
			</div>
		</div>

		<!-- Assembly Node -->
		<div>
			<label for="assembly-node" class="block text-sm text-star-dim mb-2">Assembly Node</label>
			<select
				id="assembly-node"
				value={config.assemblyNode}
				onchange={(e) => updateConfig('assemblyNode', e.currentTarget.value as 'L1' | 'L4')}
				{disabled}
				class="w-full bg-space-600 text-star-white rounded-lg px-3 py-2 text-sm border border-space-500 focus:border-cosmic-cyan focus:outline-none"
			>
				<option value="L1">L1 (Sun-Earth, 0.99 AU)</option>
				<option value="L4">L4 (60 deg ahead, 1.0 AU)</option>
			</select>
		</div>

		<!-- Propellant Budget -->
		<div>
			<label for="propellant-budget" class="block text-sm text-star-dim mb-2">
				Propellant Budget:
				<span class="text-star-white font-semibold">{config.propellantBudget} km/s</span>
			</label>
			<input
				id="propellant-budget"
				type="range"
				min="10"
				max="200"
				step="10"
				value={config.propellantBudget}
				oninput={(e) => updateConfig('propellantBudget', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>10</span>
				<span>100</span>
				<span>200 km/s</span>
			</div>
		</div>

		<!-- Strategy Selection -->
		<div>
			<span class="block text-sm text-star-dim mb-3">Strategies to Compare</span>
			<div class="grid grid-cols-2 gap-2">
				{#each (['sequential', 'batch', 'greedy', 'nn-guided'] as DeploymentStrategy[]) as strategy}
					<button
						onclick={() => toggleStrategy(strategy)}
						{disabled}
						class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
							{config.strategies.includes(strategy)
								? 'bg-space-500 text-star-white border border-space-400'
								: 'bg-space-700 text-star-faint border border-space-600'}"
					>
						<span class="w-3 h-3 rounded-sm {config.strategies.includes(strategy) ? strategyColors[strategy] : 'bg-space-600'}"></span>
						{strategyLabels[strategy]}
					</button>
				{/each}
			</div>
		</div>

		<!-- Iterations -->
		<div>
			<label for="iterations" class="block text-sm text-star-dim mb-2">
				MC Iterations:
				<span class="text-star-white font-semibold">{config.iterations}</span>
			</label>
			<input
				id="iterations"
				type="range"
				min="10"
				max="200"
				step="10"
				value={config.iterations}
				oninput={(e) => updateConfig('iterations', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>10</span>
				<span>100</span>
				<span>200</span>
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
