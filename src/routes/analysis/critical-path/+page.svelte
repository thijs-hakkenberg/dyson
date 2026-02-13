<script lang="ts">
	import {
		TECHNOLOGY_THREADS,
		QUESTION_DEPENDENCIES,
		getThreadStats,
		getOverallStats,
		getCriticalPathQuestions,
		getReadyQuestions,
		getBlockedQuestions,
		getThreadQuestions,
		getQuestion,
		type QuestionDependency,
		type TechnologyThread
	} from '$lib/services/critical-path';

	const overallStats = getOverallStats();
	const threadStats = getThreadStats();
	const criticalPathQuestions = getCriticalPathQuestions();
	const readyQuestions = getReadyQuestions();
	const blockedQuestions = getBlockedQuestions();

	// Track expanded threads
	let expandedThreads = $state<Record<string, boolean>>({});

	// Track selected view
	let activeView = $state<'threads' | 'critical-path' | 'ready' | 'blocked'>('threads');

	function toggleThread(threadId: string) {
		expandedThreads = {
			...expandedThreads,
			[threadId]: !expandedThreads[threadId]
		};
	}

	function expandAll() {
		const all: Record<string, boolean> = {};
		TECHNOLOGY_THREADS.forEach((t) => (all[t.id] = true));
		expandedThreads = all;
	}

	function collapseAll() {
		expandedThreads = {};
	}

	// Topological sort for questions within a thread - dependency order
	function getOrderedQuestions(threadId: string): QuestionDependency[] {
		const threadQuestions = getThreadQuestions(threadId);
		const questionMap = new Map(threadQuestions.map((q) => [q.questionId, q]));
		const visited = new Set<string>();
		const result: QuestionDependency[] = [];

		function visit(qId: string) {
			if (visited.has(qId)) return;
			visited.add(qId);
			const q = questionMap.get(qId);
			if (!q) return;
			// Visit dependencies first (only those within this thread)
			for (const depId of q.dependsOn) {
				if (questionMap.has(depId)) {
					visit(depId);
				}
			}
			result.push(q);
		}

		// Start with root nodes (no in-thread dependencies)
		const roots = threadQuestions.filter(
			(q) => q.dependsOn.length === 0 || q.dependsOn.every((d) => !questionMap.has(d))
		);
		roots.forEach((r) => visit(r.questionId));
		// Catch any remaining
		threadQuestions.forEach((q) => visit(q.questionId));

		return result;
	}

	// Order critical path questions in dependency order
	function getOrderedCriticalPath(): QuestionDependency[] {
		const cpSet = new Set(criticalPathQuestions.map((q) => q.questionId));
		const visited = new Set<string>();
		const result: QuestionDependency[] = [];

		function visit(qId: string) {
			if (visited.has(qId) || !cpSet.has(qId)) return;
			visited.add(qId);
			const q = getQuestion(qId);
			if (!q) return;
			for (const depId of q.dependsOn) {
				visit(depId);
			}
			result.push(q);
		}

		criticalPathQuestions.forEach((q) => visit(q.questionId));
		return result;
	}

	const orderedCriticalPath = getOrderedCriticalPath();

	// Status color helpers
	function statusColor(status: string): string {
		switch (status) {
			case 'answered':
				return 'bg-green-400';
			case 'investigating':
				return 'bg-blue-400';
			default:
				return 'bg-gray-400';
		}
	}

	function statusTextColor(status: string): string {
		switch (status) {
			case 'answered':
				return 'text-green-400';
			case 'investigating':
				return 'text-blue-400';
			default:
				return 'text-gray-400';
		}
	}

	function statusLabel(status: string): string {
		switch (status) {
			case 'answered':
				return 'Answered';
			case 'investigating':
				return 'Investigating';
			default:
				return 'Open';
		}
	}

	function priorityColor(priority: string): string {
		switch (priority) {
			case 'critical':
				return 'text-red-400';
			case 'high':
				return 'text-orange-400';
			case 'medium':
				return 'text-amber-400';
			default:
				return 'text-blue-400';
		}
	}

	// Check if a dependency is resolved
	function isDependencyResolved(depId: string): boolean {
		const dep = getQuestion(depId);
		return dep?.status === 'answered';
	}

	// Get the thread for a question
	function getThreadForQuestion(threadId: string): TechnologyThread | undefined {
		return TECHNOLOGY_THREADS.find((t) => t.id === threadId);
	}
</script>

<svelte:head>
	<title>Critical Path Analysis - Project Dyson</title>
	<meta
		name="description"
		content="Dependency graph and critical path analysis for Phase 0 research questions, organized by technology thread."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Analysis Navigation -->
	<nav class="mb-8 flex flex-wrap gap-2 text-sm">
		<a href="/analysis/feasibility" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Feasibility Report</a>
		<a href="/analysis/critical-path" class="px-3 py-1.5 rounded-lg bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30 font-medium">Critical Path</a>
		<a href="/analysis/technology-readiness" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">TRL Dashboard</a>
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
						d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
					/>
				</svg>
			</div>
			<h1 class="text-3xl md:text-4xl font-bold text-star-white">Critical Path Analysis</h1>
		</div>
		<p class="text-star-dim text-lg max-w-4xl">
			Phase 0 research questions organized into 7 technology threads with dependency
			relationships mapped. The critical path identifies questions that must be resolved
			before the Phase 0 to Phase 1 transition can proceed.
		</p>
	</div>

	<!-- Overall Stats Cards -->
	<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
		<div class="card-glow p-4 text-center">
			<div class="text-3xl font-bold text-star-white mb-1">{overallStats.total}</div>
			<div class="text-sm text-star-dim">Total Questions</div>
		</div>
		<div class="card-glow p-4 text-center">
			<div class="text-3xl font-bold text-green-400 mb-1">{overallStats.answered}</div>
			<div class="text-sm text-star-dim">Answered</div>
		</div>
		<div class="card-glow p-4 text-center">
			<div class="text-3xl font-bold text-blue-400 mb-1">{overallStats.investigating}</div>
			<div class="text-sm text-star-dim">Investigating</div>
		</div>
		<div class="card-glow p-4 text-center">
			<div class="text-3xl font-bold text-cosmic-cyan mb-1">{overallStats.withLiterature}</div>
			<div class="text-sm text-star-dim">With Literature</div>
		</div>
		<div class="card-glow p-4 text-center">
			<div class="text-3xl font-bold text-sun-gold mb-1">{overallStats.criticalPath}</div>
			<div class="text-sm text-star-dim">Critical Path</div>
		</div>
		<div class="card-glow p-4 text-center">
			<div class="text-3xl font-bold mb-1" class:text-green-400={overallStats.completionPercent >= 50} class:text-amber-400={overallStats.completionPercent >= 25 && overallStats.completionPercent < 50} class:text-red-400={overallStats.completionPercent < 25}>
				{overallStats.completionPercent}%
			</div>
			<div class="text-sm text-star-dim">Complete</div>
		</div>
	</div>

	<!-- View Toggle -->
	<div class="flex flex-wrap items-center gap-2 mb-8">
		<button
			class="px-4 py-2 rounded-lg text-sm font-medium transition-all {activeView === 'threads'
				? 'bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/40'
				: 'bg-space-700 text-star-dim border border-space-500 hover:border-space-400'}"
			onclick={() => (activeView = 'threads')}
		>
			Technology Threads
		</button>
		<button
			class="px-4 py-2 rounded-lg text-sm font-medium transition-all {activeView === 'critical-path'
				? 'bg-sun-gold/20 text-sun-gold border border-sun-gold/40'
				: 'bg-space-700 text-star-dim border border-space-500 hover:border-space-400'}"
			onclick={() => (activeView = 'critical-path')}
		>
			Critical Path ({criticalPathQuestions.length})
		</button>
		<button
			class="px-4 py-2 rounded-lg text-sm font-medium transition-all {activeView === 'ready'
				? 'bg-green-400/20 text-green-400 border border-green-400/40'
				: 'bg-space-700 text-star-dim border border-space-500 hover:border-space-400'}"
			onclick={() => (activeView = 'ready')}
		>
			Ready to Investigate ({readyQuestions.length})
		</button>
		<button
			class="px-4 py-2 rounded-lg text-sm font-medium transition-all {activeView === 'blocked'
				? 'bg-red-400/20 text-red-400 border border-red-400/40'
				: 'bg-space-700 text-star-dim border border-space-500 hover:border-space-400'}"
			onclick={() => (activeView = 'blocked')}
		>
			Blocked ({blockedQuestions.length})
		</button>
	</div>

	<!-- THREADS VIEW -->
	{#if activeView === 'threads'}
		<!-- Expand/Collapse Controls -->
		<div class="flex items-center gap-3 mb-6">
			<button
				class="text-sm text-cosmic-cyan hover:underline"
				onclick={expandAll}
			>
				Expand All
			</button>
			<span class="text-space-500">|</span>
			<button
				class="text-sm text-cosmic-cyan hover:underline"
				onclick={collapseAll}
			>
				Collapse All
			</button>
		</div>

		<!-- Thread Cards -->
		<div class="space-y-6">
			{#each threadStats as ts (ts.thread.id)}
				{@const thread = ts.thread}
				{@const isExpanded = expandedThreads[thread.id] ?? false}
				{@const orderedQuestions = getOrderedQuestions(thread.id)}

				<div class="card-glow overflow-hidden">
					<!-- Thread Header (clickable) -->
					<button
						class="w-full p-6 text-left hover:bg-space-600/30 transition-colors"
						onclick={() => toggleThread(thread.id)}
					>
						<div class="flex items-start justify-between gap-4">
							<div class="flex items-start gap-4 flex-1 min-w-0">
								<!-- Thread Icon + Color Bar -->
								<div class="flex-shrink-0">
									<div
										class="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
										style="background: {thread.color}20;"
									>
										{thread.icon}
									</div>
								</div>

								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-3 mb-1">
										<h2 class="text-xl font-bold text-star-white">{thread.name}</h2>
										{#if ts.criticalPathCount > 0}
											<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-sun-gold/20 text-sun-gold border border-sun-gold/30">
												<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
												</svg>
												{ts.criticalPathCount} critical
											</span>
										{/if}
									</div>
									<p class="text-sm text-star-dim line-clamp-2">{thread.description}</p>

									<!-- Progress Bar -->
									<div class="mt-3 flex items-center gap-4">
										<div class="flex-1 max-w-xs">
											<div class="h-2 bg-space-600 rounded-full overflow-hidden">
												<div
													class="h-full rounded-full transition-all duration-500"
													style="width: {ts.completionPercent}%; background: {thread.color};"
												></div>
											</div>
										</div>
										<span class="text-sm font-medium" style="color: {thread.color};">
											{ts.answered}/{ts.total}
										</span>
									</div>

									<!-- Mini Stats -->
									<div class="mt-2 flex flex-wrap items-center gap-4 text-xs text-star-faint">
										<span class="flex items-center gap-1">
											<span class="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
											{ts.answered} answered
										</span>
										<span class="flex items-center gap-1">
											<span class="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
											{ts.investigating} investigating
										</span>
										<span class="flex items-center gap-1">
											<span class="w-2 h-2 rounded-full bg-gray-400 inline-block"></span>
											{ts.open} open
										</span>
										<span class="flex items-center gap-1">
											<svg class="w-3 h-3 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
											</svg>
											{ts.withLiterature} with literature
										</span>
									</div>
								</div>
							</div>

							<!-- Expand Arrow -->
							<div class="flex-shrink-0 mt-1">
								<svg
									class="w-5 h-5 text-star-dim transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</div>
						</div>
					</button>

					<!-- Expanded: Questions with Dependency Graph -->
					{#if isExpanded}
						<div class="border-t border-space-500">
							<!-- Thread Rationale -->
							<div class="px-6 py-4 bg-space-800/50">
								<p class="text-sm text-star-dim italic">
									<span class="text-star-faint font-medium">Why this matters:</span>
									{thread.rationale}
								</p>
							</div>

							<!-- Dependency Graph -->
							<div class="p-6 space-y-1">
								{#each orderedQuestions as question, idx (question.questionId)}
									{@const inThreadDeps = question.dependsOn.filter((d) => orderedQuestions.some((q) => q.questionId === d))}
									{@const crossThreadDeps = question.dependsOn.filter((d) => !orderedQuestions.some((q) => q.questionId === d))}
									{@const hasDownstreamInThread = orderedQuestions.some((q) => q.dependsOn.includes(question.questionId))}

									<div class="flex items-stretch gap-0">
										<!-- Connector Column -->
										<div class="w-10 flex-shrink-0 flex flex-col items-center relative">
											<!-- Vertical line above (if not first root or has upstream) -->
											{#if idx > 0}
												<div
													class="w-0.5 flex-1"
													style="background: {thread.color}40;"
												></div>
											{:else}
												<div class="flex-1"></div>
											{/if}

											<!-- Node dot -->
											<div
												class="w-4 h-4 rounded-full border-2 flex-shrink-0 z-10 {question.criticalPath ? 'ring-2 ring-offset-1 ring-offset-space-700' : ''}"
												style="
													background: {question.status === 'answered' ? '#4ade80' : question.status === 'investigating' ? '#60a5fa' : '#9ca3af'};
													border-color: {thread.color};
													{question.criticalPath ? `ring-color: ${thread.color};` : ''}
												"
											></div>

											<!-- Vertical line below (if not last) -->
											{#if idx < orderedQuestions.length - 1}
												<div
													class="w-0.5 flex-1"
													style="background: {thread.color}40;"
												></div>
											{:else}
												<div class="flex-1"></div>
											{/if}
										</div>

										<!-- Question Card -->
										<div class="flex-1 py-2">
											<a
												href="/questions/{question.slug}"
												class="block p-4 rounded-lg border transition-all hover:border-opacity-60 {question.criticalPath
													? 'bg-space-800/80 border-sun-gold/30 hover:border-sun-gold/60 shadow-[0_0_12px_rgba(245,158,11,0.08)]'
													: 'bg-space-800/50 border-space-500/50 hover:border-space-400'}"
											>
												<div class="flex items-start justify-between gap-3">
													<div class="flex-1 min-w-0">
														<div class="flex items-center gap-2 mb-1.5">
															<span class="text-xs font-mono text-star-faint">{question.questionId.toUpperCase()}</span>
															<span class="w-2 h-2 rounded-full {statusColor(question.status)}"></span>
															<span class="text-xs {statusTextColor(question.status)}">{statusLabel(question.status)}</span>
															{#if question.criticalPath}
																<span class="text-xs font-medium text-sun-gold">CRITICAL PATH</span>
															{/if}
														</div>
														<h3 class="text-sm font-medium text-star-white leading-snug mb-2">
															{question.title}
														</h3>

														<!-- Dependencies & Blocks -->
														<div class="flex flex-wrap items-center gap-3 text-xs">
															<!-- Priority -->
															<span class="{priorityColor(question.priority)} capitalize">
																{question.priority} priority
															</span>

															<!-- Literature -->
															{#if question.hasLiteratureReview}
																<span class="flex items-center gap-1 text-cosmic-cyan">
																	<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
																	</svg>
																	Literature
																</span>
															{/if}

															<!-- Conclusion -->
															{#if question.hasConclusion}
																<span class="flex items-center gap-1 text-green-400">
																	<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
																	</svg>
																	Concluded
																</span>
															{/if}

															<!-- In-thread deps -->
															{#if inThreadDeps.length > 0}
																<span class="text-star-faint flex items-center gap-1">
																	<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
																	</svg>
																	depends on
																	{#each inThreadDeps as depId, i}
																		{@const dep = getQuestion(depId)}
																		<span class="{isDependencyResolved(depId) ? 'text-green-400' : 'text-amber-400'}">
																			{depId.toUpperCase()}{#if i < inThreadDeps.length - 1},{/if}
																		</span>
																	{/each}
																</span>
															{/if}

															<!-- Cross-thread deps -->
															{#if crossThreadDeps.length > 0}
																<span class="text-star-faint flex items-center gap-1">
																	<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
																	</svg>
																	cross-thread:
																	{#each crossThreadDeps as depId, i}
																		{@const depThread = getThreadForQuestion(getQuestion(depId)?.threadId ?? '')}
																		<span
																			class="{isDependencyResolved(depId) ? 'text-green-400' : 'text-amber-400'}"
																			title="{depThread?.name ?? 'Unknown thread'}"
																		>
																			{depId.toUpperCase()}{#if i < crossThreadDeps.length - 1},{/if}
																		</span>
																	{/each}
																</span>
															{/if}

															<!-- Blocks count -->
															{#if question.blocks.length > 0}
																<span class="text-star-faint flex items-center gap-1">
																	<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
																	</svg>
																	blocks {question.blocks.length}
																</span>
															{/if}
														</div>

														<!-- Gate Description -->
														{#if question.gateDescription}
															<div class="mt-2 text-xs text-sun-gold/80 italic">
																{question.gateDescription}
															</div>
														{/if}
													</div>

													<!-- Arrow -->
													<svg class="w-4 h-4 text-star-faint flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
													</svg>
												</div>
											</a>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	<!-- CRITICAL PATH VIEW -->
	{#if activeView === 'critical-path'}
		<div class="mb-6">
			<p class="text-star-dim text-sm max-w-3xl">
				These {orderedCriticalPath.length} questions form the critical path from Phase 0 research
				to Phase 1 transition. Each must be resolved in order -- blocking questions gate downstream progress.
			</p>
		</div>

		<div class="space-y-1">
			{#each orderedCriticalPath as question, idx (question.questionId)}
				{@const thread = getThreadForQuestion(question.threadId)}

				<div class="flex items-stretch gap-0">
					<!-- Connector Column -->
					<div class="w-10 flex-shrink-0 flex flex-col items-center relative">
						{#if idx > 0}
							<div class="w-0.5 flex-1 bg-sun-gold/30"></div>
						{:else}
							<div class="flex-1"></div>
						{/if}

						<div
							class="w-5 h-5 rounded-full border-2 border-sun-gold flex-shrink-0 z-10 ring-2 ring-sun-gold/20 ring-offset-1 ring-offset-space-900"
							style="background: {question.status === 'answered' ? '#4ade80' : question.status === 'investigating' ? '#60a5fa' : '#9ca3af'};"
						></div>

						{#if idx < orderedCriticalPath.length - 1}
							<div class="w-0.5 flex-1 bg-sun-gold/30"></div>
						{:else}
							<div class="flex-1"></div>
						{/if}
					</div>

					<!-- Question Card -->
					<div class="flex-1 py-2">
						<a
							href="/questions/{question.slug}"
							class="block p-5 rounded-lg bg-space-800/80 border border-sun-gold/20 hover:border-sun-gold/50 transition-all shadow-[0_0_15px_rgba(245,158,11,0.05)]"
						>
							<div class="flex items-start justify-between gap-4">
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-3 mb-2">
										<span class="text-xs font-mono text-star-faint">{question.questionId.toUpperCase()}</span>
										<span class="w-2 h-2 rounded-full {statusColor(question.status)}"></span>
										<span class="text-xs {statusTextColor(question.status)} font-medium">{statusLabel(question.status)}</span>
										{#if thread}
											<span
												class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
												style="background: {thread.color}15; color: {thread.color}; border: 1px solid {thread.color}30;"
											>
												{thread.icon} {thread.name}
											</span>
										{/if}
									</div>
									<h3 class="text-base font-medium text-star-white leading-snug mb-2">
										{question.title}
									</h3>

									{#if question.gateDescription}
										<div class="flex items-start gap-2 text-sm text-sun-gold/90">
											<svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
											</svg>
											<span>Gates: {question.gateDescription}</span>
										</div>
									{/if}

									<!-- Dependency info -->
									<div class="mt-3 flex flex-wrap items-center gap-4 text-xs">
										<span class="{priorityColor(question.priority)} capitalize">
											{question.priority} priority
										</span>
										{#if question.hasLiteratureReview}
											<span class="text-cosmic-cyan flex items-center gap-1">
												<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
												</svg>
												Literature Review
											</span>
										{/if}
										{#if question.hasConclusion}
											<span class="text-green-400 flex items-center gap-1">
												<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>
												Concluded
											</span>
										{/if}
										{#if question.dependsOn.length > 0}
											<span class="text-star-faint">
												Depends on:
												{#each question.dependsOn as depId, i}
													<span class="{isDependencyResolved(depId) ? 'text-green-400' : 'text-amber-400'} font-mono">
														{depId.toUpperCase()}{#if i < question.dependsOn.length - 1}, {/if}
													</span>
												{/each}
											</span>
										{/if}
										{#if question.blocks.length > 0}
											<span class="text-star-faint">
												Blocks: <span class="text-star-dim font-mono">{question.blocks.map((b) => b.toUpperCase()).join(', ')}</span>
											</span>
										{/if}
									</div>
								</div>

								<svg class="w-4 h-4 text-star-faint flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</div>
						</a>
					</div>
				</div>
			{/each}
		</div>

		<!-- Critical Path Summary -->
		<div class="mt-8 card-glow p-6">
			<h3 class="text-sm font-medium text-star-dim mb-4">Critical Path Status Summary</h3>
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div class="text-center p-4 rounded-lg bg-space-800/50">
					<div class="text-2xl font-bold text-green-400 mb-1">
						{orderedCriticalPath.filter((q) => q.status === 'answered').length}
					</div>
					<div class="text-xs text-star-dim">Resolved</div>
				</div>
				<div class="text-center p-4 rounded-lg bg-space-800/50">
					<div class="text-2xl font-bold text-blue-400 mb-1">
						{orderedCriticalPath.filter((q) => q.status === 'investigating').length}
					</div>
					<div class="text-xs text-star-dim">Under Investigation</div>
				</div>
				<div class="text-center p-4 rounded-lg bg-space-800/50">
					<div class="text-2xl font-bold text-gray-400 mb-1">
						{orderedCriticalPath.filter((q) => q.status === 'open').length}
					</div>
					<div class="text-xs text-star-dim">Not Yet Started</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- READY VIEW -->
	{#if activeView === 'ready'}
		<div class="mb-6">
			<p class="text-star-dim text-sm max-w-3xl">
				These {readyQuestions.length} questions have all their dependencies resolved and are ready
				for active investigation. Prioritize by criticality and thread importance.
			</p>
		</div>

		{#if readyQuestions.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each readyQuestions as question (question.questionId)}
					{@const thread = getThreadForQuestion(question.threadId)}

					<a
						href="/questions/{question.slug}"
						class="block card-glow p-5 hover:border-green-400/40 transition-all"
					>
						<div class="flex items-start gap-3">
							<div
								class="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
								style="background: {thread?.color ?? '#666'}20;"
							>
								{thread?.icon ?? '?'}
							</div>
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-2 mb-1">
									<span class="text-xs font-mono text-star-faint">{question.questionId.toUpperCase()}</span>
									<span class="w-2 h-2 rounded-full {statusColor(question.status)}"></span>
									<span class="text-xs {statusTextColor(question.status)}">{statusLabel(question.status)}</span>
									{#if question.criticalPath}
										<span class="text-xs text-sun-gold font-medium">CRITICAL</span>
									{/if}
								</div>
								<h3 class="text-sm font-medium text-star-white mb-2">{question.title}</h3>
								<div class="flex flex-wrap items-center gap-3 text-xs">
									<span class="{priorityColor(question.priority)} capitalize">{question.priority}</span>
									{#if thread}
										<span style="color: {thread.color};">{thread.name}</span>
									{/if}
									{#if question.blocks.length > 0}
										<span class="text-star-faint">Unblocks {question.blocks.length} question{question.blocks.length > 1 ? 's' : ''}</span>
									{/if}
								</div>
							</div>
							<svg class="w-4 h-4 text-star-faint flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="card-glow p-12 text-center">
				<svg class="w-16 h-16 mx-auto mb-4 text-green-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<h3 class="text-xl font-semibold text-star-white mb-2">All Clear</h3>
				<p class="text-star-dim">All unblocked questions are currently being investigated or have been answered.</p>
			</div>
		{/if}
	{/if}

	<!-- BLOCKED VIEW -->
	{#if activeView === 'blocked'}
		<div class="mb-6">
			<p class="text-star-dim text-sm max-w-3xl">
				These {blockedQuestions.length} questions have unresolved dependencies preventing investigation.
				Resolve the blocking questions first to unblock downstream work.
			</p>
		</div>

		{#if blockedQuestions.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each blockedQuestions as question (question.questionId)}
					{@const thread = getThreadForQuestion(question.threadId)}
					{@const unresolvedDeps = question.dependsOn.filter((d) => !isDependencyResolved(d))}

					<a
						href="/questions/{question.slug}"
						class="block card-glow p-5 hover:border-red-400/40 transition-all"
					>
						<div class="flex items-start gap-3">
							<div
								class="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
								style="background: {thread?.color ?? '#666'}20;"
							>
								{thread?.icon ?? '?'}
							</div>
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-2 mb-1">
									<span class="text-xs font-mono text-star-faint">{question.questionId.toUpperCase()}</span>
									<span class="w-2 h-2 rounded-full {statusColor(question.status)}"></span>
									<span class="text-xs {statusTextColor(question.status)}">{statusLabel(question.status)}</span>
								</div>
								<h3 class="text-sm font-medium text-star-white mb-2">{question.title}</h3>

								<!-- Blockers -->
								<div class="text-xs text-red-400/80 flex items-start gap-1.5">
									<svg class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
									<span>
										Blocked by:
										{#each unresolvedDeps as depId, i}
											{@const dep = getQuestion(depId)}
											<span class="text-amber-400 font-mono" title="{dep?.title ?? 'Unknown'}">
												{depId.toUpperCase()}{#if i < unresolvedDeps.length - 1},{/if}
											</span>
										{/each}
									</span>
								</div>

								<div class="mt-2 flex flex-wrap items-center gap-3 text-xs">
									<span class="{priorityColor(question.priority)} capitalize">{question.priority}</span>
									{#if thread}
										<span style="color: {thread.color};">{thread.name}</span>
									{/if}
								</div>
							</div>
							<svg class="w-4 h-4 text-star-faint flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="card-glow p-12 text-center">
				<svg class="w-16 h-16 mx-auto mb-4 text-green-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<h3 class="text-xl font-semibold text-star-white mb-2">No Blocked Questions</h3>
				<p class="text-star-dim">All questions have their dependencies resolved.</p>
			</div>
		{/if}
	{/if}

	<!-- Legend / Info Footer -->
	<div class="mt-12 card-glow p-6">
		<h3 class="text-sm font-medium text-star-dim mb-4">How to Read This Analysis</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
			<div>
				<h4 class="font-medium text-star-white mb-2">Status Indicators</h4>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<span class="w-3 h-3 rounded-full bg-green-400"></span>
						<span class="text-star-dim">Answered -- resolved with conclusion</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="w-3 h-3 rounded-full bg-blue-400"></span>
						<span class="text-star-dim">Investigating -- active research underway</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="w-3 h-3 rounded-full bg-gray-400"></span>
						<span class="text-star-dim">Open -- not yet started</span>
					</div>
				</div>
			</div>
			<div>
				<h4 class="font-medium text-star-white mb-2">Critical Path</h4>
				<p class="text-star-dim">
					Questions marked <span class="text-sun-gold font-medium">CRITICAL PATH</span> are on the
					shortest dependency chain to Phase 1. Resolving these first maximizes project velocity.
				</p>
			</div>
			<div>
				<h4 class="font-medium text-star-white mb-2">Dependencies</h4>
				<p class="text-star-dim">
					Arrows show "must resolve before" relationships. <span class="text-green-400">Green</span>
					dependency IDs are resolved; <span class="text-amber-400">amber</span> are still pending.
				</p>
			</div>
			<div>
				<h4 class="font-medium text-star-white mb-2">Thread Colors</h4>
				<div class="space-y-1">
					{#each TECHNOLOGY_THREADS as thread (thread.id)}
						<div class="flex items-center gap-2">
							<span class="w-3 h-3 rounded-full" style="background: {thread.color};"></span>
							<span class="text-star-dim text-xs">{thread.name}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
