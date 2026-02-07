<script lang="ts">
	import type { Phase } from '$lib/types';
	import { formatCurrency } from '$lib/services/content';

	interface Props {
		phases: Phase[];
	}

	let { phases }: Props = $props();

	const statusColors = {
		planned: 'border-space-500 bg-space-700',
		'in-progress': 'border-cosmic-cyan bg-cosmic-blue/20',
		completed: 'border-green-400 bg-green-500/20'
	};

	// Group phases by number to detect parallel phases
	interface PhaseGroup {
		number: number;
		phases: Phase[];
		isParallel: boolean;
	}

	function groupPhases(phases: Phase[]): PhaseGroup[] {
		const groups: Map<number, Phase[]> = new Map();

		for (const phase of phases) {
			const existing = groups.get(phase.number) || [];
			existing.push(phase);
			groups.set(phase.number, existing);
		}

		return Array.from(groups.entries())
			.sort(([a], [b]) => a - b)
			.map(([number, phasesInGroup]) => ({
				number,
				phases: phasesInGroup.sort((a, b) => (a.suffix || '').localeCompare(b.suffix || '')),
				isParallel: phasesInGroup.length > 1
			}));
	}

	const phaseGroups = $derived(groupPhases(phases));
</script>

<div class="relative">
	<!-- Timeline Line -->
	<div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cosmic-blue via-cosmic-purple to-sun-gold"></div>

	<!-- Timeline Items -->
	<div class="space-y-8">
		{#each phaseGroups as group}
			{#if group.isParallel}
				<!-- Parallel phases with fork visualization -->
				<div class="relative">
					<!-- Fork node -->
					<div class="flex gap-6">
						<div class="w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 border-cosmic-purple bg-cosmic-purple/20">
							<span class="font-bold text-star-white">{group.number}</span>
						</div>
						<div class="flex-1 -mt-1">
							<p class="text-sm text-star-dim font-medium mb-2">Parallel Development Tracks</p>
						</div>
					</div>

					<!-- Fork branches -->
					<div class="ml-6 mt-4 relative">
						<!-- Horizontal connector bar -->
						<div class="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-cosmic-purple via-cosmic-cyan to-cosmic-purple mx-8"></div>

						<!-- Vertical drop lines -->
						<div class="absolute top-6 left-8 w-0.5 h-8 bg-cosmic-purple"></div>
						<div class="absolute top-6 right-8 w-0.5 h-8 bg-cosmic-purple"></div>

						<!-- Parallel phase cards -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-14 px-4">
							{#each group.phases as phase}
								<div class="card-glow p-5 relative">
									<!-- Branch indicator -->
									<div class="absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10
										{statusColors[phase.status]}">
										<span class="text-xs font-bold text-star-white">{phase.suffix}</span>
									</div>

									<div class="flex items-start justify-between gap-4 mb-3">
										<div>
											<h3 class="text-lg font-semibold text-star-white">
												{phase.title}
												<span class="text-cosmic-cyan text-sm ml-1">({phase.number}{phase.suffix})</span>
											</h3>
											<p class="text-sm text-star-dim mt-1">{phase.description.slice(0, 100)}...</p>
										</div>
									</div>

									<div class="flex items-center justify-between mt-2">
										<div class="text-right">
											<p class="text-sun-gold font-semibold text-sm">{formatCurrency(phase.totalCost)}</p>
											<p class="text-xs text-star-faint">{phase.estimatedDuration}</p>
										</div>
										<a
											href="/plan/{phase.id}"
											class="inline-flex items-center gap-1 text-sm text-cosmic-cyan hover:underline"
										>
											View Details
											<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
											</svg>
										</a>
									</div>

									{#if phase.parallelWith && phase.parallelWith.length > 0}
										<div class="text-xs text-star-faint mt-2">
											Runs parallel with: Phase {phase.parallelWith.map(id => {
												const p = phases.find(p => p.id === id);
												return p ? `${p.number}${p.suffix || ''}` : '?';
											}).join(', ')}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				</div>
			{:else}
				<!-- Single phase (original layout) -->
				{@const phase = group.phases[0]}
				<div class="relative flex gap-6">
					<!-- Timeline Node -->
					<div class="w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10
						{statusColors[phase.status]}">
						<span class="font-bold text-star-white">{phase.number}</span>
					</div>

					<!-- Content -->
					<div class="flex-1 card-glow p-5 -mt-1">
						<div class="flex items-start justify-between gap-4 mb-3">
							<div>
								<h3 class="text-lg font-semibold text-star-white">{phase.title}</h3>
								<p class="text-sm text-star-dim mt-1">{phase.description.slice(0, 120)}...</p>
							</div>
							<div class="text-right flex-shrink-0">
								<p class="text-sun-gold font-semibold">{formatCurrency(phase.totalCost)}</p>
								<p class="text-xs text-star-faint">{phase.estimatedDuration}</p>
							</div>
						</div>

						{#if phase.dependencies.length > 0}
							<div class="text-xs text-star-faint">
								Depends on: Phase {phases.find((p) => p.id === phase.dependencies[0])?.number ?? '?'}
							</div>
						{/if}

						<a
							href="/plan/{phase.id}"
							class="inline-flex items-center gap-1 mt-3 text-sm text-cosmic-cyan hover:underline"
						>
							View Details
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
