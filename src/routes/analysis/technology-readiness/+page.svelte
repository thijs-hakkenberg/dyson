<script lang="ts">
	import {
		TRL_ASSESSMENTS,
		TRL_LABELS,
		RISK_LABELS,
		getTRLStats,
		getTRLGap,
		type TRLAssessment
	} from '$lib/services/trl-assessment';
	import {
		TECHNOLOGY_THREADS,
		QUESTION_DEPENDENCIES
	} from '$lib/services/critical-path';

	const stats = getTRLStats();

	// Build a lookup from questionId to slug
	const questionSlugMap = new Map(
		QUESTION_DEPENDENCIES.map((q) => [q.questionId, q.slug])
	);
	const questionTitleMap = new Map(
		QUESTION_DEPENDENCIES.map((q) => [q.questionId, q.title])
	);

	// Build thread lookup
	const threadMap = new Map(
		TECHNOLOGY_THREADS.map((t) => [t.id, t])
	);

	// Sort assessments by TRL gap (largest first)
	const sortedAssessments = $derived(
		[...TRL_ASSESSMENTS].sort((a, b) => getTRLGap(b) - getTRLGap(a))
	);

	// Group assessments by risk level for the risk matrix
	const riskGroups = $derived.by(() => {
		const groups: Record<string, TRLAssessment[]> = {
			'project-ending': [],
			'architecture-change': [],
			'schedule-delay': [],
			'cost-increase': []
		};
		for (const a of TRL_ASSESSMENTS) {
			groups[a.riskIfFail].push(a);
		}
		return groups;
	});

	// Track which experiment lists are expanded
	let expandedExperiments = $state<Set<string>>(new Set());

	function toggleExperiments(id: string) {
		const next = new Set(expandedExperiments);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		expandedExperiments = next;
	}

	function getTRLBarColor(currentTRL: number): string {
		if (currentTRL >= 7) return '#4ade80'; // green
		if (currentTRL >= 5) return '#facc15'; // yellow
		if (currentTRL >= 3) return '#f97316'; // orange
		return '#ef4444'; // red
	}

	function getGapSeverityText(gap: number): string {
		if (gap <= 1) return 'Low';
		if (gap <= 3) return 'Moderate';
		return 'High';
	}

	function getGapSeverityColor(gap: number): string {
		if (gap <= 1) return 'text-green-400';
		if (gap <= 3) return 'text-amber-400';
		return 'text-red-400';
	}
</script>

<svelte:head>
	<title>Technology Readiness Assessment - Project Dyson</title>
	<meta
		name="description"
		content="Technology Readiness Level (TRL) assessment for Phase 0 key technologies in Project Dyson."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Analysis Navigation -->
	<nav class="mb-8 flex flex-wrap gap-2 text-sm">
		<a href="/analysis/feasibility" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Feasibility Report</a>
		<a href="/analysis/critical-path" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Critical Path</a>
		<a href="/analysis/technology-readiness" class="px-3 py-1.5 rounded-lg bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30 font-medium">TRL Dashboard</a>
		<a href="/analysis/decision-gates" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Decision Gates</a>
		<a href="/analysis/cost-reconciliation" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Cost Reconciliation</a>
	</nav>

	<!-- Header -->
	<div class="mb-10">
		<div class="flex items-center gap-3 mb-4">
			<div class="w-10 h-10 rounded-lg bg-cosmic-cyan/20 flex items-center justify-center">
				<svg class="w-6 h-6 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
			</div>
			<h1 class="text-3xl md:text-4xl font-bold text-star-white">Technology Readiness Assessment</h1>
		</div>
		<p class="text-star-dim text-lg max-w-3xl">
			Each Phase 0 key technology is rated on the NASA Technology Readiness Level (TRL) scale from
			1 (basic principles observed) to 9 (system proven in operational environment). The gap between
			current TRL and target TRL identifies where research and development investment is most needed.
		</p>
	</div>

	<!-- Summary Stats -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Technologies Assessed</div>
			<div class="text-3xl font-bold text-star-white">{stats.totalTechnologies}</div>
			<div class="text-xs text-star-faint mt-1">
				TRL {stats.lowestTRL} - {stats.highestTRL} range
			</div>
		</div>
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Average TRL Gap</div>
			<div class="text-3xl font-bold {getGapSeverityColor(stats.averageGap)}">{stats.averageGap}</div>
			<div class="text-xs text-star-faint mt-1">
				Max gap: {stats.maxGap} levels
			</div>
		</div>
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Project-Ending Risks</div>
			<div class="text-3xl font-bold text-red-400">{stats.projectEndingRisks}</div>
			<div class="text-xs text-star-faint mt-1">
				+ {stats.architectureChangeRisks} architecture risks
			</div>
		</div>
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Avg Years to Target</div>
			<div class="text-3xl font-bold text-cosmic-cyan">{stats.avgYearsToTarget}</div>
			<div class="text-xs text-star-faint mt-1">
				Estimated development time
			</div>
		</div>
	</div>

	<!-- TRL Scale Reference -->
	<div class="card-glow p-5 mb-10">
		<h2 class="text-sm font-medium text-star-dim mb-3">TRL Scale Reference</h2>
		<div class="grid grid-cols-3 md:grid-cols-9 gap-2">
			{#each Array.from({ length: 9 }, (_, i) => i + 1) as level}
				<div class="text-center">
					<div
						class="w-full h-2 rounded-full mb-1"
						style="background-color: {getTRLBarColor(level)}; opacity: {0.3 + level * 0.08}"
					></div>
					<div class="text-xs font-bold text-star-white">{level}</div>
					<div class="text-[10px] leading-tight text-star-faint">{TRL_LABELS[level]}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Technology Cards -->
	<div class="mb-10">
		<h2 class="text-2xl font-bold text-star-white mb-6">Technology Assessments</h2>
		<div class="space-y-6">
			{#each sortedAssessments as assessment (assessment.id)}
				{@const thread = threadMap.get(assessment.threadId)}
				{@const gap = getTRLGap(assessment)}
				{@const riskInfo = RISK_LABELS[assessment.riskIfFail]}
				{@const isExpanded = expandedExperiments.has(assessment.id)}

				<div class="card-glow p-6">
					<!-- Top row: name, thread badge, risk badge -->
					<div class="flex flex-wrap items-start justify-between gap-3 mb-4">
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-semibold text-star-white mb-1">{assessment.technology}</h3>
							<p class="text-sm text-star-dim">{assessment.description}</p>
						</div>
						<div class="flex items-center gap-2 flex-shrink-0">
							{#if thread}
								<span
									class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
									style="background-color: {thread.color}20; color: {thread.color}; border: 1px solid {thread.color}40"
								>
									{thread.name}
								</span>
							{/if}
							<span
								class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
								style="background-color: {riskInfo.color}20; color: {riskInfo.color}; border: 1px solid {riskInfo.color}40"
							>
								{riskInfo.label}
							</span>
						</div>
					</div>

					<!-- TRL Bar Visualization -->
					<div class="mb-4">
						<div class="flex items-center justify-between text-xs text-star-faint mb-1.5">
							<span>
								Current TRL: <span class="font-bold text-star-white">
									{assessment.currentTRL}{assessment.currentTRLMax ? `-${assessment.currentTRLMax}` : ''}
								</span>
							</span>
							<span>
								Target TRL: <span class="font-bold text-star-white">{assessment.targetTRL}</span>
							</span>
							<span class={getGapSeverityColor(gap)}>
								Gap: {gap} level{gap !== 1 ? 's' : ''}
							</span>
						</div>
						<!-- TRL bar -->
						<div class="relative h-8 bg-space-900 rounded-lg overflow-hidden border border-space-500">
							<!-- Target zone (unfilled) -->
							<div
								class="absolute top-0 left-0 h-full rounded-lg border-2 border-dashed opacity-30"
								style="width: {(assessment.targetTRL / 9) * 100}%; border-color: {getTRLBarColor(assessment.currentTRL)}"
							></div>
							<!-- Current TRL (filled) -->
							<div
								class="absolute top-0 left-0 h-full rounded-l-lg transition-all duration-500"
								style="width: {(assessment.currentTRL / 9) * 100}%; background-color: {getTRLBarColor(assessment.currentTRL)}"
							></div>
							<!-- If there's a range, show the max with lower opacity -->
							{#if assessment.currentTRLMax}
								<div
									class="absolute top-0 left-0 h-full rounded-l-lg opacity-40"
									style="width: {(assessment.currentTRLMax / 9) * 100}%; background-color: {getTRLBarColor(assessment.currentTRL)}"
								></div>
							{/if}
							<!-- TRL number markers -->
							<div class="absolute inset-0 flex items-center">
								{#each Array.from({ length: 9 }, (_, i) => i + 1) as level}
									<div
										class="absolute text-[10px] font-medium"
										style="left: {((level - 0.5) / 9) * 100}%"
									>
										<span class={level <= assessment.currentTRL ? 'text-space-900 font-bold' : level <= assessment.targetTRL ? 'text-star-faint' : 'text-space-500'}>
											{level}
										</span>
									</div>
								{/each}
							</div>
						</div>
					</div>

					<!-- Evidence -->
					<div class="mb-4">
						<h4 class="text-xs font-medium text-star-faint uppercase tracking-wider mb-1">Evidence</h4>
						<p class="text-sm text-star-dim">{assessment.evidence}</p>
					</div>

					<!-- Years to target -->
					<div class="flex flex-wrap items-center gap-4 mb-4">
						<div class="flex items-center gap-2">
							<svg class="w-4 h-4 text-star-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span class="text-sm text-star-dim">
								<span class="text-star-white font-medium">
									{assessment.yearsToTarget}{assessment.yearsToTargetMax ? `-${assessment.yearsToTargetMax}` : ''}
								</span> years to target TRL
							</span>
						</div>
					</div>

					<!-- Experiments Needed (expandable) -->
					<div class="mb-4">
						<button
							onclick={() => toggleExperiments(assessment.id)}
							class="flex items-center gap-2 text-sm font-medium text-cosmic-cyan hover:text-cosmic-cyan/80 transition-colors"
						>
							<svg
								class="w-4 h-4 transition-transform {isExpanded ? 'rotate-90' : ''}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
							{assessment.experimentsNeeded.length} experiments / demonstrations needed
						</button>
						{#if isExpanded}
							<ul class="mt-2 ml-6 space-y-1.5">
								{#each assessment.experimentsNeeded as experiment, i}
									<li class="flex items-start gap-2 text-sm text-star-dim">
										<span class="text-star-faint font-mono text-xs mt-0.5">{i + 1}.</span>
										<span>{experiment}</span>
									</li>
								{/each}
							</ul>
						{/if}
					</div>

					<!-- Fallback approach -->
					{#if assessment.fallbackApproach}
						<div class="mb-4 p-3 rounded-lg bg-space-600/50 border border-space-500">
							<h4 class="text-xs font-medium text-amber-400 uppercase tracking-wider mb-1">Fallback Approach</h4>
							<p class="text-sm text-star-dim">{assessment.fallbackApproach}</p>
						</div>
					{/if}

					<!-- Related questions (clickable chips) -->
					{#if assessment.relatedQuestionIds.length > 0}
						<div>
							<h4 class="text-xs font-medium text-star-faint uppercase tracking-wider mb-2">Related Research Questions</h4>
							<div class="flex flex-wrap gap-2">
								{#each assessment.relatedQuestionIds as qId}
									{@const slug = questionSlugMap.get(qId)}
									{@const title = questionTitleMap.get(qId)}
									{#if slug}
										<a
											href="/questions/{slug}"
											class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-space-600 text-star-dim hover:text-cosmic-cyan hover:bg-space-500 border border-space-500 hover:border-cosmic-cyan/40 transition-colors"
											title={title}
										>
											<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											{qId.toUpperCase().replace('RQ-0-', 'RQ-0-')}
										</a>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Risk Matrix -->
	<div class="mb-10">
		<h2 class="text-2xl font-bold text-star-white mb-6">Risk Matrix</h2>
		<p class="text-star-dim text-sm mb-6">
			Technologies grouped by the consequence of failing to reach their target TRL.
			Project-ending risks require the most urgent attention and investment.
		</p>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each Object.entries(riskGroups) as [riskKey, assessments]}
				{@const riskInfo = RISK_LABELS[riskKey]}
				{#if assessments.length > 0}
					<div class="card-glow p-5" style="border-color: {riskInfo.color}30">
						<div class="flex items-center gap-2 mb-4">
							<div
								class="w-3 h-3 rounded-full"
								style="background-color: {riskInfo.color}"
							></div>
							<h3 class="text-lg font-semibold" style="color: {riskInfo.color}">{riskInfo.label}</h3>
							<span class="text-sm text-star-faint">({assessments.length})</span>
						</div>
						<div class="space-y-3">
							{#each assessments as assessment}
								{@const thread = threadMap.get(assessment.threadId)}
								{@const gap = getTRLGap(assessment)}
								<div class="flex items-center justify-between p-3 rounded-lg bg-space-600/50">
									<div class="flex-1 min-w-0">
										<div class="text-sm font-medium text-star-white truncate">{assessment.technology}</div>
										<div class="flex items-center gap-2 mt-1">
											{#if thread}
												<span class="text-xs" style="color: {thread.color}">{thread.name}</span>
											{/if}
											<span class="text-xs text-star-faint">
												TRL {assessment.currentTRL}{assessment.currentTRLMax ? `-${assessment.currentTRLMax}` : ''} / {assessment.targetTRL}
											</span>
										</div>
									</div>
									<div class="flex items-center gap-3 flex-shrink-0 ml-3">
										<div class="text-right">
											<div class="text-sm font-bold {getGapSeverityColor(gap)}">Gap: {gap}</div>
											<div class="text-xs text-star-faint">
												{assessment.yearsToTarget}{assessment.yearsToTargetMax ? `-${assessment.yearsToTargetMax}` : ''} yr
											</div>
										</div>
										<!-- Mini TRL bar -->
										<div class="w-16 h-2 bg-space-900 rounded-full overflow-hidden">
											<div
												class="h-full rounded-full"
												style="width: {(assessment.currentTRL / assessment.targetTRL) * 100}%; background-color: {getTRLBarColor(assessment.currentTRL)}"
											></div>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<!-- Legend / Methodology Note -->
	<div class="card-glow p-6">
		<h3 class="text-sm font-medium text-star-dim mb-4">Methodology Notes</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
			<div>
				<h4 class="font-medium text-star-white mb-1">TRL Ratings</h4>
				<p class="text-star-dim">
					Current TRL is based on the best available evidence from literature reviews,
					NASA technology databases, and multi-model consensus analysis. Where a range is
					given (e.g., TRL 4-5), the lower bound is used for gap calculations.
				</p>
			</div>
			<div>
				<h4 class="font-medium text-star-white mb-1">Risk Classification</h4>
				<p class="text-star-dim">
					Risk levels indicate the consequence if the technology fails to reach its target TRL.
					Project-ending risks have no viable alternative architecture. Architecture-change risks
					require fundamental redesign but remain feasible.
				</p>
			</div>
		</div>
	</div>
</div>
