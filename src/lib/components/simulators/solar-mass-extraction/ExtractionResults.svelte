<script lang="ts">
	import type { ExtractionResult, ExtractionProgress, RiskLevel } from '$lib/services/simulation/solar-mass-extraction';

	interface Props {
		output: ExtractionResult | null;
		progress: ExtractionProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatScientific(value: number): string {
		if (value === 0) return '0';
		const exp = Math.floor(Math.log10(Math.abs(value)));
		const mantissa = value / Math.pow(10, exp);
		if (Math.abs(exp) <= 2) return value.toPrecision(3);
		return mantissa.toFixed(2) + ' x 10^' + exp;
	}

	function formatRate(kgs: number): string {
		return formatScientific(kgs) + ' kg/s';
	}

	function formatMass(kg: number): string {
		if (kg >= 1e27) return (kg / 1.989e30).toFixed(4) + ' M_sun';
		if (kg >= 1e24) return (kg / 1e24).toFixed(1) + ' Yg';
		if (kg >= 1e21) return (kg / 1e21).toFixed(1) + ' Zg';
		if (kg >= 1e18) return (kg / 1e18).toFixed(1) + ' Eg';
		return formatScientific(kg) + ' kg';
	}

	function formatPower(watts: number): string {
		if (watts >= 1e26) return (watts / 1e26).toFixed(2) + ' x 10^26 W';
		if (watts >= 1e24) return (watts / 1e24).toFixed(1) + ' YW';
		if (watts >= 1e21) return (watts / 1e21).toFixed(1) + ' ZW';
		if (watts >= 1e18) return (watts / 1e18).toFixed(1) + ' EW';
		return watts.toExponential(1) + ' W';
	}

	function riskColor(risk: RiskLevel): string {
		switch (risk) {
			case 'safe': return 'text-green-400';
			case 'caution': return 'text-solar-gold';
			case 'danger': return 'text-orange-400';
			case 'critical': return 'text-sun-red';
		}
	}

	function riskBorder(risk: RiskLevel): string {
		switch (risk) {
			case 'safe': return 'bg-green-400/10 border-green-400/30';
			case 'caution': return 'bg-solar-gold/10 border-solar-gold/30';
			case 'danger': return 'bg-orange-400/10 border-orange-400/30';
			case 'critical': return 'bg-sun-red/10 border-sun-red/30';
		}
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Extraction Analysis Results</h3>

	{#if isRunning && progress}
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<span class="spinner w-5 h-5"></span>
				<span class="text-star-dim">
					Running iteration {progress.currentStep} of {progress.totalSteps}...
				</span>
			</div>
			<div class="w-full bg-space-600 rounded-full h-2">
				<div
					class="bg-cosmic-cyan h-2 rounded-full transition-all duration-200"
					style="width: {progress.percentComplete}%"
				></div>
			</div>
			<p class="text-sm text-star-faint">{progress.percentComplete.toFixed(0)}% complete</p>
		</div>
	{:else if output}
		<div class="space-y-6">
			<!-- Risk Classification -->
			<div class="p-4 rounded-lg border {riskBorder(output.riskLevel)}">
				<p class="text-xs text-star-faint uppercase tracking-wider mb-1">Risk Classification</p>
				<p class="text-2xl font-bold {riskColor(output.riskLevel)} uppercase">
					{output.riskLevel}
				</p>
				<p class="text-sm text-star-dim mt-1">
					Stability margin: {(output.stabilityMargin.mean * 100).toFixed(2)}%
					<span class="text-star-faint">
						(CI: {(output.stabilityMargin.low * 100).toFixed(2)}% - {(output.stabilityMargin.high * 100).toFixed(2)}%)
					</span>
				</p>
			</div>

			<!-- Key Metrics Grid -->
			<div class="grid grid-cols-2 gap-3">
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Optimal Rate</p>
					<p class="text-star-white font-semibold text-sm">{formatRate(output.optimalRate.mean)}</p>
					<p class="text-xs text-star-faint">
						CI: {formatScientific(output.optimalRate.low)} - {formatScientific(output.optimalRate.high)}
					</p>
				</div>
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Max Feasible Rate</p>
					<p class="text-star-white font-semibold text-sm">{formatRate(output.maxFeasibleRate.mean)}</p>
					<p class="text-xs text-star-faint">
						CI: {formatScientific(output.maxFeasibleRate.low)} - {formatScientific(output.maxFeasibleRate.high)}
					</p>
				</div>
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Total Mass Extracted</p>
					<p class="text-star-white font-semibold text-sm">{formatMass(output.totalMassExtracted.mean)}</p>
					<p class="text-xs text-star-faint">
						over {output.config.missionDuration.toLocaleString()} years
					</p>
				</div>
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Energy Budget</p>
					<p class="text-star-white font-semibold text-sm">{formatPower(output.energyBudget.mean)}</p>
					<p class="text-xs text-star-faint">
						total beam power required
					</p>
				</div>
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Luminosity Change</p>
					<p class="text-star-white font-semibold text-sm">
						{(output.luminosityPerturbation.mean * 100).toFixed(6)}%
					</p>
					<p class="text-xs text-star-faint">
						over mission duration
					</p>
				</div>
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Data Source</p>
					<p class="text-star-white font-semibold text-sm">
						{output.usedResponseSurfaces ? 'Pre-computed surfaces' : 'Analytical model'}
					</p>
					<p class="text-xs text-star-faint">
						{output.iterations} MC iterations
					</p>
				</div>
			</div>

			<!-- Execution Stats -->
			<div class="text-xs text-star-faint flex justify-between border-t border-space-600 pt-3">
				<span>Sweep points: {output.meanSweepPoints.length}</span>
				<span>Execution: {(output.executionTimeMs / 1000).toFixed(2)}s</span>
			</div>
		</div>
	{:else}
		<p class="text-star-dim text-sm">
			Configure extraction parameters and run the analysis to see results.
		</p>
	{/if}
</div>
