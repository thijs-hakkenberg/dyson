<script lang="ts">
	import type {
		ElectricalFaultConfig,
		InsulationMaterial,
		SystemTopology
	} from '$lib/services/simulation/electrical-fault';

	interface Props {
		config: ElectricalFaultConfig;
		disabled?: boolean;
		onConfigChange: (config: ElectricalFaultConfig) => void;
		onRun: () => void;
	}

	let { config, disabled = false, onConfigChange, onRun }: Props = $props();

	function updateConfig<K extends keyof ElectricalFaultConfig>(
		key: K,
		value: ElectricalFaultConfig[K]
	) {
		onConfigChange({ ...config, [key]: value });
	}

	const materialOptions: { value: InsulationMaterial; label: string; description: string }[] = [
		{ value: 'kapton', label: 'Kapton', description: 'Good radiation tolerance' },
		{ value: 'polyimide', label: 'Polyimide', description: 'Good thermal stability' },
		{ value: 'teflon', label: 'Teflon (PTFE)', description: 'Low cost, moderate radiation' },
		{ value: 'ceramic', label: 'Ceramic', description: 'Best radiation resistance' }
	];

	const topologyOptions: { value: SystemTopology; label: string; description: string }[] = [
		{ value: 'series', label: 'Series', description: 'Higher voltage, cascade risk' },
		{ value: 'parallel', label: 'Parallel', description: 'Fault isolation, higher current' },
		{ value: 'hybrid', label: 'Hybrid', description: 'Balanced approach' }
	];
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-6">Electrical Fault Parameters</h3>

	<div class="space-y-6">
		<!-- Voltage Level -->
		<div>
			<label for="voltage-level" class="block text-sm text-star-dim mb-2">
				Operating Voltage:
				<span class="text-star-white font-semibold">{config.voltageLevel.toLocaleString()} V</span>
			</label>
			<input
				id="voltage-level"
				type="range"
				min="600"
				max="10000"
				step="100"
				value={config.voltageLevel}
				oninput={(e) => updateConfig('voltageLevel', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>600V</span>
				<span>3kV</span>
				<span>10kV</span>
			</div>
		</div>

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

		<!-- Insulation Material -->
		<div>
			<label for="insulation-material" class="block text-sm text-star-dim mb-2">
				Insulation Material
			</label>
			<select
				id="insulation-material"
				value={config.insulationMaterial}
				onchange={(e) => updateConfig('insulationMaterial', e.currentTarget.value as InsulationMaterial)}
				{disabled}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white focus:border-cosmic-cyan focus:outline-none"
			>
				{#each materialOptions as option}
					<option value={option.value}>{option.label} - {option.description}</option>
				{/each}
			</select>
		</div>

		<!-- Insulation Thickness -->
		<div>
			<label for="insulation-thickness" class="block text-sm text-star-dim mb-2">
				Insulation Thickness:
				<span class="text-star-white font-semibold">{config.insulationThickness.toFixed(1)} mm</span>
			</label>
			<input
				id="insulation-thickness"
				type="range"
				min="0.5"
				max="5.0"
				step="0.1"
				value={config.insulationThickness}
				oninput={(e) => updateConfig('insulationThickness', parseFloat(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>0.5 mm</span>
				<span>2.5 mm</span>
				<span>5.0 mm</span>
			</div>
		</div>

		<!-- System Topology -->
		<div>
			<label for="system-topology" class="block text-sm text-star-dim mb-2">
				System Topology
			</label>
			<select
				id="system-topology"
				value={config.systemTopology}
				onchange={(e) => updateConfig('systemTopology', e.currentTarget.value as SystemTopology)}
				{disabled}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white focus:border-cosmic-cyan focus:outline-none"
			>
				{#each topologyOptions as option}
					<option value={option.value}>{option.label} - {option.description}</option>
				{/each}
			</select>
		</div>

		<!-- Total Power Capacity -->
		<div>
			<label for="power-capacity" class="block text-sm text-star-dim mb-2">
				Total Power Capacity:
				<span class="text-star-white font-semibold">{config.totalPowerCapacity} MW</span>
			</label>
			<input
				id="power-capacity"
				type="range"
				min="10"
				max="1000"
				step="10"
				value={config.totalPowerCapacity}
				oninput={(e) => updateConfig('totalPowerCapacity', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>10 MW</span>
				<span>500 MW</span>
				<span>1 GW</span>
			</div>
		</div>

		<!-- Detection Response Time -->
		<div>
			<label for="detection-time" class="block text-sm text-star-dim mb-2">
				Detection Response:
				<span class="text-star-white font-semibold">{config.detectionResponseTime} ms</span>
			</label>
			<input
				id="detection-time"
				type="range"
				min="1"
				max="100"
				step="1"
				value={config.detectionResponseTime}
				oninput={(e) => updateConfig('detectionResponseTime', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 ms (fast)</span>
				<span>50 ms</span>
				<span>100 ms (slow)</span>
			</div>
		</div>

		<!-- Isolation Response Time -->
		<div>
			<label for="isolation-time" class="block text-sm text-star-dim mb-2">
				Isolation Response:
				<span class="text-star-white font-semibold">{config.isolationResponseTime} ms</span>
			</label>
			<input
				id="isolation-time"
				type="range"
				min="1"
				max="200"
				step="1"
				value={config.isolationResponseTime}
				oninput={(e) => updateConfig('isolationResponseTime', parseInt(e.currentTarget.value))}
				{disabled}
				class="w-full h-2 bg-space-600 rounded-lg appearance-none cursor-pointer accent-cosmic-cyan"
			/>
			<div class="flex justify-between text-xs text-star-faint mt-1">
				<span>1 ms</span>
				<span>100 ms</span>
				<span>200 ms</span>
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
