<script lang="ts">
	import {
		DECISION_GATES,
		getGateTimeline,
		getGateReadiness,
		getGateStats,
		type GateStatus
	} from '$lib/services/decision-gates';
	import { TECHNOLOGY_THREADS, QUESTION_DEPENDENCIES } from '$lib/services/critical-path';
	import { TRL_ASSESSMENTS } from '$lib/services/trl-assessment';

	const timeline = getGateTimeline();
	const stats = getGateStats();

	// Expanded gate cards state
	let expandedGates = $state<Set<string>>(new Set());

	function toggleGate(gateId: string) {
		const next = new Set(expandedGates);
		if (next.has(gateId)) {
			next.delete(gateId);
		} else {
			next.add(gateId);
		}
		expandedGates = next;
	}

	function expandAll() {
		expandedGates = new Set(DECISION_GATES.map((g) => g.id));
	}

	function collapseAll() {
		expandedGates = new Set();
	}

	const allExpanded = $derived(expandedGates.size === DECISION_GATES.length);

	// Helper: get thread info
	function getThread(threadId: string) {
		return TECHNOLOGY_THREADS.find((t) => t.id === threadId);
	}

	// Helper: get question dependency info by ID
	function getQuestionDep(questionId: string) {
		return QUESTION_DEPENDENCIES.find((q) => q.questionId === questionId);
	}

	// Helper: get TRL assessment info by ID
	function getTRL(trlId: string) {
		return TRL_ASSESSMENTS.find((a) => a.id === trlId);
	}

	// Status configuration
	const statusConfig: Record<GateStatus, { label: string; color: string; bg: string; ring: string }> = {
		'not-started': {
			label: 'Not Started',
			color: 'text-gray-400',
			bg: 'bg-gray-400',
			ring: 'ring-gray-400'
		},
		'in-progress': {
			label: 'In Progress',
			color: 'text-blue-400',
			bg: 'bg-blue-400',
			ring: 'ring-blue-400'
		},
		'evidence-gathering': {
			label: 'Evidence Gathering',
			color: 'text-cyan-400',
			bg: 'bg-cyan-400',
			ring: 'ring-cyan-400'
		},
		'ready-for-review': {
			label: 'Ready for Review',
			color: 'text-amber-400',
			bg: 'bg-amber-400',
			ring: 'ring-amber-400'
		},
		passed: {
			label: 'Passed',
			color: 'text-green-400',
			bg: 'bg-green-400',
			ring: 'ring-green-400'
		},
		failed: {
			label: 'Failed',
			color: 'text-red-400',
			bg: 'bg-red-400',
			ring: 'ring-red-400'
		},
		deferred: {
			label: 'Deferred',
			color: 'text-gray-400',
			bg: 'bg-gray-400',
			ring: 'ring-gray-400'
		}
	};

	// Timeline months for the visualization
	const timelineMonths = [24, 30, 36, 48, 60];
	const minMonth = 24;
	const maxMonth = 60;
</script>

<svelte:head>
	<title>Decision Gates - Project Dyson</title>
	<meta
		name="description"
		content="Go/no-go decision gates for Phase 0 to Phase 1 transition, tracking measurable criteria and readiness for the Dyson swarm project."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Analysis Navigation -->
	<nav class="mb-8 flex flex-wrap gap-2 text-sm">
		<a href="/analysis/feasibility" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Feasibility Report</a>
		<a href="/analysis/critical-path" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Critical Path</a>
		<a href="/analysis/technology-readiness" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">TRL Dashboard</a>
		<a href="/analysis/decision-gates" class="px-3 py-1.5 rounded-lg bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30 font-medium">Decision Gates</a>
		<a href="/analysis/cost-reconciliation" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Cost Reconciliation</a>
	</nav>

	<!-- Header -->
	<div class="mb-10">
		<div class="flex items-center gap-3 mb-4">
			<div class="w-10 h-10 rounded-lg bg-cosmic-purple/20 flex items-center justify-center">
				<svg class="w-6 h-6 text-cosmic-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
					/>
				</svg>
			</div>
			<h1 class="text-3xl md:text-4xl font-bold text-star-white">Decision Gates</h1>
		</div>
		<p class="text-star-dim text-lg max-w-3xl">
			Go/no-go decision gates for the Phase 0 to Phase 1 transition. Each gate defines measurable
			criteria that must be met before committing to major architectural decisions. Gates are linked
			to research questions, TRL assessments, and validation experiments that provide the evidence
			for each decision.
		</p>
	</div>

	<!-- Timeline Visualization -->
	<div class="card-glow p-6 mb-8">
		<h2 class="text-lg font-semibold text-star-white mb-6">Phase 0 Decision Timeline</h2>
		<div class="relative">
			<!-- Timeline bar -->
			<div class="relative mx-8">
				<div class="h-1 bg-space-500 rounded-full"></div>

				<!-- Month markers and gate dots -->
				{#each timelineMonths as month}
					{@const pct = ((month - minMonth) / (maxMonth - minMonth)) * 100}
					{@const gatesAtMonth = timeline.filter((g) => g.decisionMonth === month)}
					<div
						class="absolute top-0 -translate-y-1/2 -translate-x-1/2"
						style="left: {pct}%"
					>
						<!-- Gate dots stacked if multiple at same month -->
						{#each gatesAtMonth as gate, i}
							{@const cfg = statusConfig[gate.status]}
							<div
								class="relative"
								style="margin-top: {i > 0 ? '-2px' : '0'}"
							>
								<div
									class="w-5 h-5 rounded-full {cfg.bg} ring-2 {cfg.ring} ring-offset-2 ring-offset-space-700 transition-all"
									title="{gate.name} - {cfg.label}"
								></div>
							</div>
						{/each}
					</div>
					<!-- Month label below -->
					<div
						class="absolute top-6 -translate-x-1/2 text-center"
						style="left: {pct}%"
					>
						<span class="text-xs font-medium text-star-dim whitespace-nowrap">Month {month}</span>
						<!-- Gate names below month -->
						<div class="mt-1 space-y-0.5">
							{#each gatesAtMonth as gate}
								{@const cfg = statusConfig[gate.status]}
								<div class="text-[10px] {cfg.color} whitespace-nowrap max-w-[120px] truncate mx-auto" title={gate.name}>
									{gate.name.length > 20 ? gate.name.slice(0, 18) + '...' : gate.name}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
		<!-- Spacer for labels below timeline -->
		<div class="h-20"></div>

		<!-- Legend -->
		<div class="flex flex-wrap gap-4 mt-2 text-xs">
			{#each Object.entries(statusConfig) as [key, cfg]}
				{@const hasStatus = DECISION_GATES.some((g) => g.status === key)}
				{#if hasStatus}
					<div class="flex items-center gap-1.5">
						<div class="w-2.5 h-2.5 rounded-full {cfg.bg}"></div>
						<span class="text-star-dim">{cfg.label}</span>
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<!-- Summary Stats -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
		<!-- Total Gates -->
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Total Gates</div>
			<div class="text-3xl font-bold text-star-white">{stats.totalGates}</div>
			<div class="text-xs text-star-faint mt-1">
				{stats.passed} passed, {stats.inProgress} active, {stats.notStarted} not started
			</div>
		</div>

		<!-- Criteria Met -->
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Criteria Met</div>
			<div class="text-3xl font-bold text-star-white">
				{stats.metCriteria}<span class="text-lg text-star-faint">/{stats.totalCriteria}</span>
			</div>
			<div class="text-xs text-star-faint mt-1">
				Across all decision gates
			</div>
		</div>

		<!-- Overall Readiness -->
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Overall Readiness</div>
			<div class="text-3xl font-bold {stats.overallReadiness >= 75 ? 'text-green-400' : stats.overallReadiness >= 40 ? 'text-amber-400' : 'text-red-400'}">
				{stats.overallReadiness}%
			</div>
			<div class="w-full bg-space-500 rounded-full h-1.5 mt-2">
				<div
					class="h-1.5 rounded-full transition-all {stats.overallReadiness >= 75 ? 'bg-green-400' : stats.overallReadiness >= 40 ? 'bg-amber-400' : 'bg-red-400'}"
					style="width: {stats.overallReadiness}%"
				></div>
			</div>
		</div>

		<!-- Next Gate -->
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Next Gate</div>
			{#if stats.nextGate}
				{@const nextCfg = statusConfig[stats.nextGate.status]}
				<div class="text-lg font-bold text-star-white leading-tight">
					Month {stats.nextGate.decisionMonth}
				</div>
				<div class="text-xs {nextCfg.color} mt-1 truncate" title={stats.nextGate.name}>
					{stats.nextGate.name}
				</div>
			{:else}
				<div class="text-lg font-bold text-green-400">All Passed</div>
			{/if}
		</div>
	</div>

	<!-- Controls -->
	<div class="flex items-center justify-between mb-6">
		<h2 class="text-xl font-bold text-star-white">Gate Details</h2>
		<button
			class="text-sm text-star-dim hover:text-cosmic-cyan transition-colors"
			onclick={() => allExpanded ? collapseAll() : expandAll()}
		>
			{allExpanded ? 'Collapse All' : 'Expand All'}
		</button>
	</div>

	<!-- Gate Cards -->
	<div class="space-y-6">
		{#each timeline as gate (gate.id)}
			{@const readiness = getGateReadiness(gate)}
			{@const cfg = statusConfig[gate.status]}
			{@const thread = getThread(gate.threadId)}
			{@const isExpanded = expandedGates.has(gate.id)}
			{@const criteriaMet = gate.criteria.filter((c) => c.met).length}

			<div class="card-glow overflow-hidden">
				<!-- Gate Header (always visible, clickable) -->
				<button
					class="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-space-600/30 transition-colors"
					onclick={() => toggleGate(gate.id)}
				>
					<div class="flex-1 min-w-0">
						<div class="flex items-center gap-3 mb-2 flex-wrap">
							<!-- Gate name -->
							<h3 class="text-lg font-semibold text-star-white">{gate.name}</h3>
							<!-- Status badge -->
							<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium {cfg.color} bg-space-600">
								<span class="w-1.5 h-1.5 rounded-full {cfg.bg}"></span>
								{cfg.label}
							</span>
							<!-- Decision month -->
							<span class="text-xs text-star-faint bg-space-600 px-2 py-0.5 rounded">
								Month {gate.decisionMonth}
							</span>
							<!-- Thread badge -->
							{#if thread}
								<span
									class="text-xs px-2 py-0.5 rounded border"
									style="color: {thread.color}; border-color: {thread.color}40; background: {thread.color}10;"
								>
									{thread.name}
								</span>
							{/if}
						</div>

						<!-- Readiness bar -->
						<div class="flex items-center gap-3">
							<div class="flex-1 max-w-xs bg-space-500 rounded-full h-2">
								<div
									class="h-2 rounded-full transition-all {readiness >= 75 ? 'bg-green-400' : readiness >= 40 ? 'bg-amber-400' : readiness > 0 ? 'bg-blue-400' : 'bg-space-500'}"
									style="width: {Math.max(readiness, 2)}%"
								></div>
							</div>
							<span class="text-sm text-star-dim whitespace-nowrap">
								{criteriaMet}/{gate.criteria.length} criteria met ({readiness}%)
							</span>
						</div>
					</div>

					<!-- Expand/collapse chevron -->
					<div class="flex-shrink-0">
						<svg
							class="w-5 h-5 text-star-faint transition-transform {isExpanded ? 'rotate-180' : ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</div>
				</button>

				<!-- Expanded content -->
				{#if isExpanded}
					<div class="border-t border-space-500 p-6 space-y-6">
						<!-- Description -->
						<p class="text-star-dim">{gate.description}</p>

						<!-- Criteria Checklist -->
						<div>
							<h4 class="text-sm font-semibold text-star-white uppercase tracking-wider mb-3">
								Decision Criteria
							</h4>
							<div class="space-y-3">
								{#each gate.criteria as criterion (criterion.id)}
									<div class="flex gap-3 p-3 rounded-lg bg-space-600/50">
										<!-- Checkbox indicator -->
										<div class="flex-shrink-0 mt-0.5">
											{#if criterion.met}
												<div class="w-5 h-5 rounded bg-green-400/20 border border-green-400 flex items-center justify-center">
													<svg class="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
													</svg>
												</div>
											{:else}
												<div class="w-5 h-5 rounded bg-space-500 border border-space-400"></div>
											{/if}
										</div>
										<div class="flex-1 min-w-0">
											<div class="text-sm font-medium {criterion.met ? 'text-green-400' : 'text-star-white'}">
												{criterion.description}
											</div>
											<div class="text-xs text-star-faint mt-1">
												<span class="font-medium text-star-dim">Metric:</span> {criterion.metric}
											</div>
											{#if criterion.currentEvidence}
												<div class="text-xs text-star-faint mt-1">
													<span class="font-medium text-star-dim">Evidence:</span> {criterion.currentEvidence}
												</div>
											{/if}
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- Pass / Fail Outcomes -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<!-- Pass outcome -->
							<div class="p-4 rounded-lg bg-green-400/5 border border-green-400/20">
								<div class="flex items-center gap-2 mb-2">
									<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
									</svg>
									<h4 class="text-sm font-semibold text-green-400 uppercase tracking-wider">If Gate Passes</h4>
								</div>
								<p class="text-sm text-star-dim">{gate.passOutcome}</p>
							</div>

							<!-- Fail outcome -->
							<div class="p-4 rounded-lg bg-red-400/5 border border-red-400/20">
								<div class="flex items-center gap-2 mb-2">
									<svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
									<h4 class="text-sm font-semibold text-red-400 uppercase tracking-wider">If Gate Fails</h4>
								</div>
								<p class="text-sm text-star-dim">{gate.failOutcome}</p>
							</div>
						</div>

						<!-- Gated Decisions -->
						{#if gate.gatedDecisions.length > 0}
							<div>
								<h4 class="text-sm font-semibold text-star-white uppercase tracking-wider mb-3">
									Gated Architectural Decisions
								</h4>
								<div class="flex flex-wrap gap-2">
									{#each gate.gatedDecisions as decision}
										<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-600 text-sm text-star-dim border border-space-500">
											<svg class="w-3.5 h-3.5 text-cosmic-purple flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
											</svg>
											{decision}
										</span>
									{/each}
								</div>
							</div>
						{/if}

						<!-- Related Links -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<!-- Related Questions -->
							{#if gate.relatedQuestionIds.length > 0}
								<div>
									<h4 class="text-sm font-semibold text-star-white uppercase tracking-wider mb-3">
										Related Research Questions
									</h4>
									<div class="space-y-1.5">
										{#each gate.relatedQuestionIds as qId}
											{@const q = getQuestionDep(qId)}
											{#if q}
												<a
													href="/questions/{q.slug}"
													class="flex items-center gap-2 text-sm text-star-dim hover:text-cosmic-cyan transition-colors group"
												>
													<span class="w-1.5 h-1.5 rounded-full {q.status === 'answered' ? 'bg-green-400' : q.status === 'investigating' ? 'bg-blue-400' : 'bg-gray-400'} flex-shrink-0"></span>
													<span class="group-hover:underline truncate">{q.title}</span>
													<span class="text-xs text-star-faint flex-shrink-0">({q.questionId})</span>
												</a>
											{:else}
												<span class="text-sm text-star-faint">{qId}</span>
											{/if}
										{/each}
									</div>
								</div>
							{/if}

							<!-- Related TRL Assessments -->
							{#if gate.relatedTRLIds.length > 0}
								<div>
									<h4 class="text-sm font-semibold text-star-white uppercase tracking-wider mb-3">
										Related TRL Assessments
									</h4>
									<div class="space-y-1.5">
										{#each gate.relatedTRLIds as trlId}
											{@const trl = getTRL(trlId)}
											{#if trl}
												<a
													href="/analysis/technology-readiness"
													class="flex items-center gap-2 text-sm text-star-dim hover:text-cosmic-cyan transition-colors group"
												>
													<span class="inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold bg-space-500 text-star-white flex-shrink-0">
														{trl.currentTRL}
													</span>
													<span class="group-hover:underline truncate">{trl.technology}</span>
													<span class="text-xs text-star-faint flex-shrink-0">
														TRL {trl.currentTRL}{trl.currentTRLMax ? '-' + trl.currentTRLMax : ''} / {trl.targetTRL}
													</span>
												</a>
											{:else}
												<span class="text-sm text-star-faint">{trlId}</span>
											{/if}
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Footer Legend -->
	<div class="mt-10 card-glow p-6">
		<h3 class="text-sm font-medium text-star-dim mb-4">About Decision Gates</h3>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
			<div>
				<h4 class="font-medium text-star-white mb-1">Purpose</h4>
				<p class="text-star-dim">
					Decision gates are formal go/no-go checkpoints that must be passed before committing
					to major architectural decisions. They convert research uncertainty into actionable
					engineering decisions.
				</p>
			</div>
			<div>
				<h4 class="font-medium text-star-white mb-1">Evidence-Based</h4>
				<p class="text-star-dim">
					Each gate criterion requires specific, measurable evidence from research questions,
					TRL assessments, and validation experiments. Gates cannot be passed by consensus
					alone.
				</p>
			</div>
			<div>
				<h4 class="font-medium text-star-white mb-1">Fail-Forward</h4>
				<p class="text-star-dim">
					Every gate defines both pass and fail outcomes. A failed gate does not stop the
					project -- it redirects to an alternative architecture with understood tradeoffs.
				</p>
			</div>
		</div>
	</div>
</div>
