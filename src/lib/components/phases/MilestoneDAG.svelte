<script lang="ts">
	import type { ProjectMilestone } from '$lib/services/content';
	import { getProjectMilestones } from '$lib/services/content';

	interface Props {
		onMilestoneClick?: (milestone: ProjectMilestone) => void;
	}

	let { onMilestoneClick }: Props = $props();

	const milestones = getProjectMilestones();
	const maxYear = Math.max(...milestones.map((m) => m.targetYear));

	// Group milestones by phase
	const phases = ['phase-0', 'phase-1', 'phase-2', 'phase-3a', 'phase-3b'];
	const phaseLabels: Record<string, string> = {
		'phase-0': 'Phase 0: Resource Processing',
		'phase-1': 'Phase 1: Initial Swarm',
		'phase-2': 'Phase 2: Swarm Expansion',
		'phase-3a': 'Phase 3a: Matrioshka Brain',
		'phase-3b': 'Phase 3b: Stellar Engine'
	};

	const phaseColors: Record<string, string> = {
		'phase-0': 'bg-amber-500/20 border-amber-400 text-amber-300',
		'phase-1': 'bg-cosmic-blue/20 border-cosmic-cyan text-cosmic-cyan',
		'phase-2': 'bg-purple-500/20 border-purple-400 text-purple-300',
		'phase-3a': 'bg-green-500/20 border-green-400 text-green-300',
		'phase-3b': 'bg-rose-500/20 border-rose-400 text-rose-300'
	};

	const phaseBgColors: Record<string, string> = {
		'phase-0': 'bg-amber-500/5',
		'phase-1': 'bg-cosmic-blue/5',
		'phase-2': 'bg-purple-500/5',
		'phase-3a': 'bg-green-500/5',
		'phase-3b': 'bg-rose-500/5'
	};

	function getMilestonePosition(milestone: ProjectMilestone) {
		return (milestone.targetYear / maxYear) * 100;
	}

	function handleClick(milestone: ProjectMilestone) {
		if (onMilestoneClick) {
			onMilestoneClick(milestone);
		}
	}

	let hoveredMilestone: ProjectMilestone | null = $state(null);
</script>

<div class="card-glow p-6">
	<div class="flex items-center justify-between mb-6">
		<h3 class="text-xl font-bold text-star-white">Project Milestones</h3>
		<div class="flex items-center gap-4 text-sm">
			<span class="text-star-faint">Total Duration: </span>
			<span class="text-cosmic-cyan font-semibold">{maxYear}+ years</span>
		</div>
	</div>

	<!-- Legend -->
	<div class="flex flex-wrap gap-3 mb-6 text-xs">
		{#each phases as phase}
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded {phaseColors[phase].split(' ').slice(0, 2).join(' ')}"></div>
				<span class="text-star-dim">{phase.replace('phase-', 'P')}</span>
			</div>
		{/each}
	</div>

	<!-- Timeline Container -->
	<div class="relative overflow-x-auto">
		<div class="min-w-[900px]">
			<!-- Year markers -->
			<div class="flex justify-between text-xs text-star-faint border-b border-space-600 pb-2 mb-4 relative h-6">
				{#each Array(Math.ceil(maxYear / 50) + 1) as _, i}
					<span class="absolute" style="left: {(i * 50 / maxYear) * 100}%">
						Year {i * 50}
					</span>
				{/each}
			</div>

			<!-- Grid lines -->
			<div class="absolute top-12 left-0 right-0 bottom-0 pointer-events-none">
				{#each Array(Math.ceil(maxYear / 50) + 1) as _, i}
					<div
						class="absolute h-full w-px bg-space-600/30"
						style="left: {(i * 50 / maxYear) * 100}%"
					></div>
				{/each}
			</div>

			<!-- Phase rows -->
			<div class="space-y-1">
				{#each phases as phase, phaseIndex}
					{@const phaseMilestones = milestones.filter((m) => m.phase === phase)}
					<div class="relative h-14 {phaseBgColors[phase]} rounded-lg">
						<!-- Phase label -->
						<div class="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-star-faint w-8 font-mono">
							{phase.replace('phase-', 'P')}
						</div>

						<!-- Milestones -->
						{#each phaseMilestones as milestone}
							{@const pos = getMilestonePosition(milestone)}
							<button
								class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg border-2 transition-all hover:scale-110 cursor-pointer text-xs font-medium whitespace-nowrap {phaseColors[phase]}"
								style="left: {pos}%"
								onclick={() => handleClick(milestone)}
								onmouseenter={() => (hoveredMilestone = milestone)}
								onmouseleave={() => (hoveredMilestone = null)}
							>
								{milestone.name}
							</button>
						{/each}
					</div>
				{/each}
			</div>

			<!-- Dependency lines (SVG overlay) -->
			<svg class="absolute top-12 left-0 w-full pointer-events-none" style="height: 280px;">
				{#each milestones as milestone}
					{#each milestone.dependencies as depId}
						{@const dep = milestones.find((m) => m.id === depId)}
						{#if dep}
							{@const fromPhaseIndex = phases.indexOf(dep.phase)}
							{@const toPhaseIndex = phases.indexOf(milestone.phase)}
							{@const x1 = (dep.targetYear / maxYear) * 100}
							{@const x2 = (milestone.targetYear / maxYear) * 100}
							{@const y1 = fromPhaseIndex * 60 + 28}
							{@const y2 = toPhaseIndex * 60 + 28}
							<line
								x1="{x1}%"
								{y1}
								x2="{x2}%"
								{y2}
								stroke={milestone.criticalPath ? 'rgb(251 191 36)' : 'rgb(75 85 99)'}
								stroke-width={milestone.criticalPath ? '2' : '1'}
								stroke-dasharray={milestone.criticalPath ? '' : '4'}
								opacity="0.6"
							/>
						{/if}
					{/each}
				{/each}
			</svg>
		</div>
	</div>

	<!-- Hover tooltip -->
	{#if hoveredMilestone}
		<div
			class="fixed z-50 bg-space-700 border border-space-500 rounded-lg p-4 shadow-xl max-w-xs pointer-events-none"
			style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
		>
			<h4 class="font-semibold text-star-white mb-2">{hoveredMilestone.name}</h4>
			<div class="space-y-1 text-sm">
				<p class="text-star-dim">
					<span class="text-star-faint">Phase:</span>
					{phaseLabels[hoveredMilestone.phase]}
				</p>
				<p class="text-star-dim">
					<span class="text-star-faint">Target Year:</span>
					{hoveredMilestone.targetYear}
				</p>
				{#if hoveredMilestone.criticalPath}
					<p class="text-sun-gold text-xs mt-2">On Critical Path</p>
				{/if}
				{#if hoveredMilestone.dependencies.length > 0}
					<p class="text-star-faint text-xs mt-2">
						Depends on: {hoveredMilestone.dependencies.map(d => {
							const dep = milestones.find(m => m.id === d);
							return dep?.name || d;
						}).join(', ')}
					</p>
				{/if}
			</div>
		</div>
	{/if}
</div>
