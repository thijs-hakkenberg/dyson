<script lang="ts">
	import type { QuestionStats } from '$lib/services/questions';

	interface Props {
		stats: QuestionStats;
	}

	let { stats }: Props = $props();

	const statusColors: Record<string, string> = {
		open: 'text-purple-400',
		investigating: 'text-cosmic-cyan',
		answered: 'text-green-400',
		deferred: 'text-star-dim'
	};

	const priorityColors: Record<string, string> = {
		critical: 'text-red-400',
		high: 'text-orange-400',
		medium: 'text-sun-gold',
		low: 'text-star-dim'
	};

	const typeLabels: Record<string, string> = {
		'meta-research': 'Research',
		experimentation: 'Experiment',
		simulation: 'Simulation',
		'engineering-decision': 'Decision',
		discussion: 'Discussion'
	};
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Questions Overview</h3>

	<!-- Total -->
	<div class="mb-6 text-center">
		<div class="text-4xl font-bold text-gradient">{stats.total}</div>
		<div class="text-sm text-star-dim">Total Questions</div>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-2 gap-4">
		<!-- By Status -->
		<div>
			<h4 class="text-xs font-semibold text-star-faint mb-2 uppercase tracking-wider">By Status</h4>
			<div class="space-y-1">
				{#each Object.entries(stats.byStatus) as [status, count]}
					<div class="flex justify-between text-sm">
						<span class="text-star-dim capitalize">{status}</span>
						<span class={statusColors[status]}>{count}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- By Priority -->
		<div>
			<h4 class="text-xs font-semibold text-star-faint mb-2 uppercase tracking-wider">By Priority</h4>
			<div class="space-y-1">
				{#each Object.entries(stats.byPriority) as [priority, count]}
					<div class="flex justify-between text-sm">
						<span class="text-star-dim capitalize">{priority}</span>
						<span class={priorityColors[priority]}>{count}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- By Type -->
		<div>
			<h4 class="text-xs font-semibold text-star-faint mb-2 uppercase tracking-wider">By Type</h4>
			<div class="space-y-1">
				{#each Object.entries(stats.byType) as [type, count]}
					<div class="flex justify-between text-sm">
						<span class="text-star-dim">{typeLabels[type]}</span>
						<span class="text-star-white">{count}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- By Phase -->
		<div>
			<h4 class="text-xs font-semibold text-star-faint mb-2 uppercase tracking-wider">By Phase</h4>
			<div class="space-y-1">
				{#each Object.entries(stats.byPhase) as [phase, count]}
					<div class="flex justify-between text-sm">
						<span class="text-star-dim">{phase.replace('phase-', 'Phase ')}</span>
						<span class="text-cosmic-cyan">{count}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
