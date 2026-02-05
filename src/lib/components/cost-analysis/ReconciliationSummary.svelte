<script lang="ts">
	import type { ReconciliationSummary } from '$lib/types/cost-analysis';
	import { formatCostAmount } from '$lib/services/cost-analysis';

	interface Props {
		summary: ReconciliationSummary;
		phaseId?: string;
	}

	let { summary, phaseId }: Props = $props();

	const healthScore = $derived(() => {
		// Calculate a health score based on discrepancy counts
		const total = summary.criticalDiscrepancies + summary.majorDiscrepancies +
			summary.moderateDiscrepancies + summary.minorDiscrepancies;
		if (total === 0) return 100;

		const weightedScore =
			(summary.criticalDiscrepancies * 40) +
			(summary.majorDiscrepancies * 25) +
			(summary.moderateDiscrepancies * 10) +
			(summary.minorDiscrepancies * 2);

		return Math.max(0, 100 - weightedScore);
	});

	const healthColor = $derived(() => {
		const score = healthScore();
		if (score >= 80) return 'text-green-400';
		if (score >= 60) return 'text-amber-400';
		if (score >= 40) return 'text-orange-400';
		return 'text-red-400';
	});

	const healthLabel = $derived(() => {
		const score = healthScore();
		if (score >= 80) return 'Good';
		if (score >= 60) return 'Fair';
		if (score >= 40) return 'Needs Review';
		return 'Critical';
	});
</script>

<div class="card-glow">
	<!-- Header -->
	<div class="px-6 py-4 border-b border-space-500">
		<div class="flex items-center justify-between">
			<div>
				<h3 class="font-semibold text-star-white">Reconciliation Summary</h3>
				{#if phaseId}
					<p class="text-sm text-star-dim mt-1">
						{phaseId === 'all' ? 'All Phases' : phaseId.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
					</p>
				{/if}
			</div>
			<div class="text-right">
				<div class="text-sm text-star-faint">Health Score</div>
				<div class="text-2xl font-bold {healthColor()}">
					{healthScore()}
					<span class="text-sm font-normal">/ 100</span>
				</div>
				<div class="text-xs {healthColor()}">{healthLabel()}</div>
			</div>
		</div>
	</div>

	<!-- Stats Grid -->
	<div class="p-6">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
			<!-- Items Analyzed -->
			<div class="text-center">
				<div class="text-3xl font-bold text-cosmic-cyan">{summary.totalItems}</div>
				<div class="text-sm text-star-dim">Items Analyzed</div>
			</div>

			<!-- Full Data -->
			<div class="text-center">
				<div class="text-3xl font-bold text-star-white">{summary.itemsWithFullData}</div>
				<div class="text-sm text-star-dim">Complete Data</div>
			</div>

			<!-- With Discrepancies -->
			<div class="text-center">
				<div class="text-3xl font-bold text-amber-400">{summary.itemsWithDiscrepancies}</div>
				<div class="text-sm text-star-dim">With Issues</div>
			</div>

			<!-- Avg Variance -->
			<div class="text-center">
				<div class="text-3xl font-bold text-star-white">{summary.averageVariance.toFixed(0)}%</div>
				<div class="text-sm text-star-dim">Avg Variance</div>
			</div>
		</div>

		<!-- Discrepancy Breakdown -->
		<div class="border-t border-space-600 pt-4">
			<h4 class="text-sm font-medium text-star-dim mb-3">Discrepancy Breakdown</h4>
			<div class="grid grid-cols-4 gap-3">
				<div class="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center">
					<div class="text-2xl font-bold text-red-400">{summary.criticalDiscrepancies}</div>
					<div class="text-xs text-red-400/70">Critical</div>
					<div class="text-xs text-star-faint mt-1">>10x diff</div>
				</div>

				<div class="rounded-lg bg-orange-500/10 border border-orange-500/20 p-3 text-center">
					<div class="text-2xl font-bold text-orange-400">{summary.majorDiscrepancies}</div>
					<div class="text-xs text-orange-400/70">Major</div>
					<div class="text-xs text-star-faint mt-1">>100% diff</div>
				</div>

				<div class="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-center">
					<div class="text-2xl font-bold text-amber-400">{summary.moderateDiscrepancies}</div>
					<div class="text-xs text-amber-400/70">Moderate</div>
					<div class="text-xs text-star-faint mt-1">50-100% diff</div>
				</div>

				<div class="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 text-center">
					<div class="text-2xl font-bold text-blue-400">{summary.minorDiscrepancies}</div>
					<div class="text-xs text-blue-400/70">Minor</div>
					<div class="text-xs text-star-faint mt-1"><50% diff</div>
				</div>
			</div>
		</div>

		<!-- Cost Range -->
		{#if summary.totalCostRange.average > 0}
			<div class="border-t border-space-600 pt-4 mt-4">
				<h4 class="text-sm font-medium text-star-dim mb-3">Total Cost Range (All Items)</h4>
				<div class="flex items-center justify-between">
					<div class="text-center">
						<div class="text-sm text-star-faint">Minimum</div>
						<div class="text-lg font-semibold text-green-400">
							{formatCostAmount(summary.totalCostRange.min)}
						</div>
					</div>
					<div class="flex-1 mx-4">
						<div class="h-2 bg-space-600 rounded-full relative">
							<div
								class="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-red-500 rounded-full"
								style="width: 100%"
							></div>
						</div>
					</div>
					<div class="text-center">
						<div class="text-sm text-star-faint">Maximum</div>
						<div class="text-lg font-semibold text-red-400">
							{formatCostAmount(summary.totalCostRange.max)}
						</div>
					</div>
				</div>
				<div class="text-center mt-2">
					<span class="text-sm text-star-dim">Average: </span>
					<span class="text-sm font-semibold text-cosmic-cyan">
						{formatCostAmount(summary.totalCostRange.average)}
					</span>
				</div>
			</div>
		{/if}
	</div>
</div>
