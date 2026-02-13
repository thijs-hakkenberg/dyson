<script lang="ts">
	import {
		TECHNOLOGY_THREADS,
		QUESTION_DEPENDENCIES,
		getOverallStats,
		getCriticalPathQuestions,
		getThreadStats,
		getThreadQuestions
	} from '$lib/services/critical-path';
	import {
		TRL_ASSESSMENTS,
		TRL_LABELS,
		getTRLStats,
		getTRLGap,
		getAssessmentsByThread
	} from '$lib/services/trl-assessment';
	import {
		DECISION_GATES,
		getGateTimeline,
		getGateReadiness,
		getGateStats
	} from '$lib/services/decision-gates';

	const overallStats = getOverallStats();
	const threadStats = getThreadStats();
	const trlStats = getTRLStats();
	const gateStats = getGateStats();
	const gateTimeline = getGateTimeline();
	const criticalPathQuestions = getCriticalPathQuestions();

	const reportDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	// Compute risk register from TRL assessments
	const riskRegister = TRL_ASSESSMENTS.map((a) => ({
		technology: a.technology,
		riskIfFail: a.riskIfFail,
		gap: getTRLGap(a),
		currentTRL: a.currentTRL,
		currentTRLMax: a.currentTRLMax,
		targetTRL: a.targetTRL,
		yearsToTarget: a.yearsToTarget,
		yearsToTargetMax: a.yearsToTargetMax,
		fallbackApproach: a.fallbackApproach,
		relatedQuestionIds: a.relatedQuestionIds,
		threadId: a.threadId
	})).sort((a, b) => {
		const riskOrder: Record<string, number> = {
			'project-ending': 0,
			'architecture-change': 1,
			'schedule-delay': 2,
			'cost-increase': 3
		};
		return (riskOrder[a.riskIfFail] ?? 4) - (riskOrder[b.riskIfFail] ?? 4);
	});

	// Compute experiment timeline buckets
	const nearTermExperiments: { technology: string; experiment: string }[] = [];
	const midTermExperiments: { technology: string; experiment: string }[] = [];
	const longTermExperiments: { technology: string; experiment: string }[] = [];

	for (const a of TRL_ASSESSMENTS) {
		const experiments = a.experimentsNeeded;
		// Distribute experiments roughly across the time horizon
		const total = experiments.length;
		for (let i = 0; i < total; i++) {
			const fraction = i / Math.max(total - 1, 1);
			const entry = { technology: a.technology, experiment: experiments[i] };
			if (fraction < 0.4) {
				nearTermExperiments.push(entry);
			} else if (fraction < 0.75) {
				midTermExperiments.push(entry);
			} else {
				longTermExperiments.push(entry);
			}
		}
	}

	function riskLabel(risk: string): string {
		const labels: Record<string, string> = {
			'project-ending': 'Project Ending',
			'architecture-change': 'Architecture Change',
			'schedule-delay': 'Schedule Delay',
			'cost-increase': 'Cost Increase'
		};
		return labels[risk] ?? risk;
	}

	function riskColor(risk: string): string {
		const colors: Record<string, string> = {
			'project-ending': 'text-red-400',
			'architecture-change': 'text-orange-400',
			'schedule-delay': 'text-amber-400',
			'cost-increase': 'text-yellow-300'
		};
		return colors[risk] ?? 'text-star-dim';
	}

	function riskBg(risk: string): string {
		const colors: Record<string, string> = {
			'project-ending': 'bg-red-500/10 border-red-500/30',
			'architecture-change': 'bg-orange-500/10 border-orange-500/30',
			'schedule-delay': 'bg-amber-500/10 border-amber-500/30',
			'cost-increase': 'bg-yellow-500/10 border-yellow-500/30'
		};
		return colors[risk] ?? '';
	}

	function statusLabel(status: string): string {
		const labels: Record<string, string> = {
			open: 'Open',
			investigating: 'Investigating',
			answered: 'Answered'
		};
		return labels[status] ?? status;
	}

	function statusColor(status: string): string {
		const colors: Record<string, string> = {
			open: 'text-star-dim',
			investigating: 'text-amber-400',
			answered: 'text-green-400'
		};
		return colors[status] ?? 'text-star-dim';
	}

	function gateStatusLabel(status: string): string {
		const labels: Record<string, string> = {
			'not-started': 'Not Started',
			'in-progress': 'In Progress',
			'evidence-gathering': 'Evidence Gathering',
			'ready-for-review': 'Ready for Review',
			passed: 'Passed',
			failed: 'Failed',
			deferred: 'Deferred'
		};
		return labels[status] ?? status;
	}

	function gateStatusColor(status: string): string {
		const colors: Record<string, string> = {
			'not-started': 'text-star-faint',
			'in-progress': 'text-cosmic-cyan',
			'evidence-gathering': 'text-amber-400',
			'ready-for-review': 'text-blue-400',
			passed: 'text-green-400',
			failed: 'text-red-400',
			deferred: 'text-star-dim'
		};
		return colors[status] ?? 'text-star-dim';
	}

	// Table of contents sections
	const tocSections = [
		{ id: 'executive-summary', number: '1', title: 'Executive Summary' },
		{ id: 'architecture-overview', number: '2', title: 'Phase 0 Architecture Overview' },
		{ id: 'critical-technology', number: '3', title: 'Critical Technology Assessment' },
		{ id: 'trl-summary', number: '4', title: 'Technology Readiness Summary' },
		{ id: 'decision-gates', number: '5', title: 'Decision Gate Schedule' },
		{ id: 'risk-register', number: '6', title: 'Risk Register' },
		{ id: 'validation-roadmap', number: '7', title: 'Experimental Validation Roadmap' },
		{ id: 'conclusions', number: '8', title: 'Conclusions and Recommendations' }
	];

	function getThreadById(id: string) {
		return TECHNOLOGY_THREADS.find((t) => t.id === id);
	}
</script>

<svelte:head>
	<title>Phase 0 Technical Feasibility Assessment - Project Dyson</title>
	<meta
		name="description"
		content="Comprehensive technical feasibility assessment for Phase 0 of the Dyson swarm construction program. Evaluates technology readiness, critical path, risks, and decision gates."
	/>
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Analysis Navigation -->
	<nav class="mb-8 flex flex-wrap gap-2 text-sm">
		<a href="/analysis/feasibility" class="px-3 py-1.5 rounded-lg bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30 font-medium">Feasibility Report</a>
		<a href="/analysis/critical-path" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Critical Path</a>
		<a href="/analysis/technology-readiness" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">TRL Dashboard</a>
		<a href="/analysis/decision-gates" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Decision Gates</a>
		<a href="/analysis/cost-reconciliation" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Cost Reconciliation</a>
	</nav>

	<!-- ================================================================ -->
	<!-- TITLE BLOCK                                                      -->
	<!-- ================================================================ -->
	<header class="mb-16 text-center">
		<div class="mb-6">
			<span class="inline-block text-sm font-mono tracking-widest uppercase text-cosmic-cyan mb-4">
				Project Dyson &mdash; Technical Document
			</span>
		</div>
		<h1 class="text-4xl md:text-5xl font-bold text-star-white mb-4 leading-tight">
			Phase 0 Technical Feasibility Assessment
		</h1>
		<p class="text-xl text-star-dim mb-8 max-w-3xl mx-auto">
			Space Resource Processing: Asteroid Mining, Material Processing, and Orbital Infrastructure
		</p>
		<div class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-star-faint font-mono">
			<span>Version 1.0</span>
			<span>{reportDate}</span>
			<span>Project Dyson Research Team</span>
		</div>
		<div class="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cosmic-cyan to-transparent"></div>
	</header>

	<!-- ================================================================ -->
	<!-- TABLE OF CONTENTS                                                -->
	<!-- ================================================================ -->
	<nav class="card-glow p-8 mb-16">
		<h2 class="text-lg font-bold text-star-white mb-6 uppercase tracking-wider">Table of Contents</h2>
		<ol class="space-y-3">
			{#each tocSections as section}
				<li>
					<a
						href="#{section.id}"
						class="flex items-baseline gap-3 text-star-dim hover:text-cosmic-cyan transition-colors group"
					>
						<span class="font-mono text-cosmic-cyan/70 group-hover:text-cosmic-cyan">{section.number}.</span>
						<span class="border-b border-dotted border-space-500 flex-1 group-hover:border-cosmic-cyan/30">{section.title}</span>
					</a>
				</li>
			{/each}
		</ol>
	</nav>

	<!-- ================================================================ -->
	<!-- 1. EXECUTIVE SUMMARY                                             -->
	<!-- ================================================================ -->
	<section id="executive-summary" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8">
			<span class="text-3xl font-mono text-cosmic-cyan/60">1.</span>
			<h2 class="text-3xl font-bold text-star-white">Executive Summary</h2>
		</div>

		<div class="card-glow p-8 space-y-6">
			<div class="space-y-4 text-star-dim leading-relaxed">
				<p>
					Phase 0 of the Dyson swarm construction program aims to establish the foundational
					infrastructure for asteroid mining and in-space material processing. The phase encompasses
					seven major bill-of-materials items&mdash;prospecting satellites, mining robots, a material
					processing station, transport vehicles, solar power arrays, in-situ propellant production
					systems, and organizational infrastructure&mdash;at an estimated total cost of
					<strong class="text-star-white">$15.7 billion</strong> over a 10&ndash;15 year development
					and deployment timeline.
				</p>

				<p>
					This assessment evaluates the technical feasibility of Phase 0 by analyzing
					<strong class="text-star-white">{overallStats.total} research questions</strong> organized
					across {TECHNOLOGY_THREADS.length} technology threads,
					<strong class="text-star-white">{trlStats.totalTechnologies} key technology areas</strong>
					rated on the NASA TRL scale, and
					<strong class="text-star-white">{gateStats.totalGates} decision gates</strong> that must be
					passed before committing to detailed design.
				</p>
			</div>

			<!-- Key Metrics -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
				<div class="bg-space-800 rounded-lg p-4 text-center">
					<div class="text-2xl font-bold text-star-white">{overallStats.answered}/{overallStats.total}</div>
					<div class="text-xs text-star-faint mt-1">Questions Answered</div>
				</div>
				<div class="bg-space-800 rounded-lg p-4 text-center">
					<div class="text-2xl font-bold text-star-white">{trlStats.totalTechnologies}</div>
					<div class="text-xs text-star-faint mt-1">Technologies Assessed</div>
				</div>
				<div class="bg-space-800 rounded-lg p-4 text-center">
					<div class="text-2xl font-bold text-star-white">{gateStats.totalGates}</div>
					<div class="text-xs text-star-faint mt-1">Decision Gates Defined</div>
				</div>
				<div class="bg-space-800 rounded-lg p-4 text-center">
					<div class="text-2xl font-bold text-amber-400">{trlStats.averageGap}</div>
					<div class="text-xs text-star-faint mt-1">Average TRL Gap</div>
				</div>
			</div>

			<div class="space-y-4 text-star-dim leading-relaxed">
				<p>
					<strong class="text-amber-400">Overall readiness assessment: Early stage &mdash; significant
					technology development required.</strong> The average TRL gap across all assessed technologies
					is {trlStats.averageGap} levels, with the most challenging technologies (microgravity
					metallurgy, in-space silicon purification) requiring advances of {trlStats.maxGap} TRL levels.
					Two technologies carry "project-ending" risk classifications, meaning their failure would
					require fundamental architecture changes or program redesign.
				</p>
			</div>

			<!-- Top Risks and Strengths -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
				<div class="bg-red-500/5 border border-red-500/20 rounded-lg p-6">
					<h3 class="text-sm font-bold text-red-400 uppercase tracking-wider mb-4">Top 3 Risks</h3>
					<ol class="space-y-3 text-sm text-star-dim">
						<li class="flex gap-2">
							<span class="text-red-400 font-mono shrink-0">1.</span>
							<span><strong class="text-star-white">Microgravity metallurgy at industrial scale</strong> (TRL 2&ndash;3) &mdash;
							No precedent exists for smelting, casting, and forming structural metals in microgravity.
							Failure is project-ending without artificial gravity fallback.</span>
						</li>
						<li class="flex gap-2">
							<span class="text-red-400 font-mono shrink-0">2.</span>
							<span><strong class="text-star-white">ISRU water extraction from asteroids</strong> (TRL 3&ndash;4) &mdash;
							Extraction rates, water purity, and energy costs at asteroid targets remain uncharacterized.
							Propellant production viability depends entirely on this technology.</span>
						</li>
						<li class="flex gap-2">
							<span class="text-red-400 font-mono shrink-0">3.</span>
							<span><strong class="text-star-white">In-space silicon purification to solar-grade</strong> (TRL 2&ndash;3) &mdash;
							Achieving 6N purity from asteroid feedstock in microgravity is undemonstrated.
							Solar cell self-fabrication, essential for long-term scaling, depends on this capability.</span>
						</li>
					</ol>
				</div>

				<div class="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
					<h3 class="text-sm font-bold text-green-400 uppercase tracking-wider mb-4">Top 3 Strengths</h3>
					<ol class="space-y-3 text-sm text-star-dim">
						<li class="flex gap-2">
							<span class="text-green-400 font-mono shrink-0">1.</span>
							<span><strong class="text-star-white">Solar electric propulsion at 100+ kW</strong> (TRL 6&ndash;7) &mdash;
							The highest-readiness technology in the portfolio. NASA AEPS and Gateway PPE provide
							strong heritage. Gap to Phase 0 requirements is modest.</span>
						</li>
						<li class="flex gap-2">
							<span class="text-green-400 font-mono shrink-0">2.</span>
							<span><strong class="text-star-white">JWST sunshield heritage for cryogenic storage</strong> (TRL 6&ndash;7) &mdash;
							Successful JWST deployment demonstrates the core technology. Adaptation for
							propellant depot is engineering refinement, not breakthrough research.</span>
						</li>
						<li class="flex gap-2">
							<span class="text-green-400 font-mono shrink-0">3.</span>
							<span><strong class="text-star-white">Resolved architecture questions</strong> ({overallStats.answered} answered, {overallStats.withConclusion} with conclusions) &mdash;
							Key architectural decisions on propellant production scope, water-first ISRU strategy,
							ISRU cost methodology, and human-rating deferral are already resolved, providing
							a stable foundation for downstream design.</span>
						</li>
					</ol>
				</div>
			</div>

			<div class="mt-8 bg-cosmic-blue/10 border border-cosmic-blue/30 rounded-lg p-6">
				<h3 class="text-sm font-bold text-cosmic-cyan uppercase tracking-wider mb-3">Recommendation</h3>
				<p class="text-star-dim text-sm leading-relaxed">
					Proceed with Phase 0 technology development on a two-track strategy: (1) initiate ISS
					pathfinder experiments for microgravity metallurgy and water extraction within 2&ndash;3
					years to retire project-ending risks early; (2) advance the higher-TRL technologies
					(propulsion, sunshield, prospecting) toward flight readiness in parallel. The cryogenic
					propellant architecture decision (Gate 2, month 30) is the nearest critical gate and should
					drive near-term experimental priorities. A formal go/no-go assessment for the full Phase 0
					program should be scheduled at Gate 5 (month 60), by which time all key technologies should
					have reached TRL 5 or have approved risk mitigations.
				</p>
			</div>
		</div>
	</section>

	<!-- ================================================================ -->
	<!-- 2. PHASE 0 ARCHITECTURE OVERVIEW                                 -->
	<!-- ================================================================ -->
	<section id="architecture-overview" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8">
			<span class="text-3xl font-mono text-cosmic-cyan/60">2.</span>
			<h2 class="text-3xl font-bold text-star-white">Phase 0 Architecture Overview</h2>
		</div>

		<div class="card-glow p-8 space-y-6">
			<div class="space-y-4 text-star-dim leading-relaxed">
				<p>
					Phase 0, "Space Resource Processing," establishes the supply chain that every subsequent
					phase of the Dyson swarm program depends upon. The concept is straightforward even if the
					engineering is not: identify suitable near-Earth asteroids, mine them for raw materials,
					transport those materials to an orbital processing facility at the Sun-Earth L4 or L5
					Lagrange point, and refine them into structural metals, semiconductor-grade silicon, and
					propellant. The seven BOM items represent the major hardware elements required to execute
					this concept.
				</p>
				<p>
					The estimated Phase 0 cost of <strong class="text-star-white">$15.7 billion</strong> spans
					seven major line items, with the material processing station dominating at $10B. This cost
					estimate carries significant uncertainty (roughly &plusmn;30&ndash;50%) due to the novel
					nature of most systems. A key output of the research program is to reduce this uncertainty
					to &plusmn;30% or better before committing to detailed design (Gate 5).
				</p>
			</div>

			<h3 class="text-xl font-bold text-star-white mt-10 mb-6">Technology Threads</h3>
			<p class="text-star-dim text-sm mb-6">
				The {overallStats.total} Phase 0 research questions are organized into {TECHNOLOGY_THREADS.length}
				technology threads. Each thread represents a coherent engineering discipline that must advance
				for Phase 0 to succeed.
			</p>

			<div class="space-y-6">
				{#each TECHNOLOGY_THREADS as thread}
					{@const stats = threadStats.find((s) => s.thread.id === thread.id)}
					<div class="bg-space-800 rounded-lg p-6 border-l-4" style:border-left-color={thread.color}>
						<div class="flex items-start justify-between gap-4 mb-3">
							<h4 class="text-lg font-semibold text-star-white">
								{thread.icon} {thread.name}
							</h4>
							{#if stats}
								<span class="text-xs font-mono text-star-faint shrink-0">
									{stats.answered}/{stats.total} answered
								</span>
							{/if}
						</div>
						<p class="text-sm text-star-dim leading-relaxed mb-3">{thread.description}</p>
						<p class="text-xs text-star-faint italic">{thread.rationale}</p>
					</div>
				{/each}
			</div>

			<h3 class="text-xl font-bold text-star-white mt-10 mb-4">Thread Interconnections</h3>
			<div class="text-star-dim text-sm leading-relaxed space-y-3">
				<p>
					These threads are deeply interdependent. The <strong class="text-star-white">Prospecting</strong>
					thread gates the <strong class="text-star-white">Mining</strong> thread: without confirmed
					asteroid composition data, mining robot design cannot be finalized. Mining throughput
					determines the feedstock rate for <strong class="text-star-white">ISRU &amp; Materials
					Processing</strong>, which in turn sizes the processing station&rsquo;s power demand from
					the <strong class="text-star-white">Power &amp; Energy</strong> thread.
				</p>
				<p>
					The <strong class="text-star-white">Propulsion &amp; Transport</strong> thread links to
					nearly every other thread through the propellant production question: transport vehicle
					sizing depends on propellant type (cryogenic vs. storable), which depends on whether the
					<strong class="text-star-white">Cryogenic Storage</strong> architecture closes, which in
					turn depends on ISRU water extraction rates. The propellant production scope decision
					(rq-0-14, answered) established that in-situ propellant production is within Phase 0 scope,
					connecting propulsion directly to mining and processing.
				</p>
				<p>
					The <strong class="text-star-white">Governance &amp; Integration</strong> thread sits
					above all others: cost methodology validation (rq-0-28, answered) provides the economic
					framework for evaluating every other thread&rsquo;s decisions, and the multi-century
					governance question will constrain organizational architecture throughout the program.
				</p>
			</div>
		</div>
	</section>

	<!-- ================================================================ -->
	<!-- 3. CRITICAL TECHNOLOGY ASSESSMENT                                -->
	<!-- ================================================================ -->
	<section id="critical-technology" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8">
			<span class="text-3xl font-mono text-cosmic-cyan/60">3.</span>
			<h2 class="text-3xl font-bold text-star-white">Critical Technology Assessment</h2>
		</div>

		<p class="text-star-dim mb-8 leading-relaxed">
			This section evaluates each technology thread in detail, examining the status of constituent
			research questions, relevant TRL assessments, literature coverage, and critical path items.
			The assessment identifies specific strengths and gaps within each area.
		</p>

		{#each TECHNOLOGY_THREADS as thread, threadIndex}
			{@const stats = threadStats.find((s) => s.thread.id === thread.id)}
			{@const questions = getThreadQuestions(thread.id)}
			{@const assessments = getAssessmentsByThread(thread.id)}
			{@const cpQuestions = questions.filter((q) => q.criticalPath)}

			<div class="card-glow p-8 mb-8">
				<div class="flex items-center gap-3 mb-6">
					<span class="text-2xl">{thread.icon}</span>
					<h3 class="text-xl font-bold text-star-white">
						3.{threadIndex + 1} {thread.name}
					</h3>
				</div>

				<p class="text-star-dim text-sm leading-relaxed mb-6">{thread.description}</p>

				<!-- Research Questions Table -->
				<h4 class="text-sm font-bold text-star-white uppercase tracking-wider mb-3">Research Questions</h4>
				<div class="overflow-x-auto mb-6">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-b border-space-500">
								<th class="text-left py-2 pr-4 text-star-faint font-medium">ID</th>
								<th class="text-left py-2 pr-4 text-star-faint font-medium">Question</th>
								<th class="text-left py-2 pr-4 text-star-faint font-medium">Status</th>
								<th class="text-center py-2 pr-4 text-star-faint font-medium">Lit.</th>
								<th class="text-center py-2 text-star-faint font-medium">CP</th>
							</tr>
						</thead>
						<tbody>
							{#each questions as q, i}
								<tr class="{i % 2 === 0 ? 'bg-space-700/30' : ''} border-b border-space-600/30">
									<td class="py-2 pr-4 font-mono text-star-faint text-xs">{q.questionId}</td>
									<td class="py-2 pr-4 text-star-dim">{q.title}</td>
									<td class="py-2 pr-4">
										<span class="{statusColor(q.status)} text-xs font-medium">{statusLabel(q.status)}</span>
									</td>
									<td class="py-2 pr-4 text-center">
										{#if q.hasLiteratureReview}
											<span class="text-green-400 text-xs">Yes</span>
										{:else}
											<span class="text-star-faint text-xs">&mdash;</span>
										{/if}
									</td>
									<td class="py-2 text-center">
										{#if q.criticalPath}
											<span class="text-red-400 text-xs font-bold">Yes</span>
										{:else}
											<span class="text-star-faint text-xs">&mdash;</span>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- TRL Assessments -->
				{#if assessments.length > 0}
					<h4 class="text-sm font-bold text-star-white uppercase tracking-wider mb-3">Key TRL Assessments</h4>
					<div class="space-y-3 mb-6">
						{#each assessments as a}
							<div class="bg-space-800 rounded p-4">
								<div class="flex items-start justify-between gap-4 mb-2">
									<span class="text-sm font-medium text-star-white">{a.technology}</span>
									<span class="text-xs font-mono shrink-0 {riskColor(a.riskIfFail)}">{riskLabel(a.riskIfFail)}</span>
								</div>
								<div class="flex gap-6 text-xs text-star-faint">
									<span>Current TRL: <strong class="text-star-dim">{a.currentTRL}{a.currentTRLMax ? `\u2013${a.currentTRLMax}` : ''}</strong></span>
									<span>Target: <strong class="text-star-dim">{a.targetTRL}</strong></span>
									<span>Gap: <strong class="text-amber-400">{getTRLGap(a)}</strong></span>
									<span>Years: <strong class="text-star-dim">{a.yearsToTarget}{a.yearsToTargetMax ? `\u2013${a.yearsToTargetMax}` : ''}</strong></span>
								</div>
							</div>
						{/each}
					</div>
				{/if}

				<!-- Summary Stats -->
				{#if stats}
					<div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
						<div class="bg-space-800 rounded p-3 text-center">
							<div class="text-lg font-bold text-star-white">{stats.withLiterature}/{stats.total}</div>
							<div class="text-xs text-star-faint">Literature Reviews</div>
						</div>
						<div class="bg-space-800 rounded p-3 text-center">
							<div class="text-lg font-bold text-star-white">{stats.criticalPathCount}</div>
							<div class="text-xs text-star-faint">Critical Path Items</div>
						</div>
						<div class="bg-space-800 rounded p-3 text-center">
							<div class="text-lg font-bold text-green-400">{stats.answered}</div>
							<div class="text-xs text-star-faint">Answered</div>
						</div>
						<div class="bg-space-800 rounded p-3 text-center">
							<div class="text-lg font-bold text-amber-400">{stats.investigating}</div>
							<div class="text-xs text-star-faint">Investigating</div>
						</div>
					</div>
				{/if}

				<!-- Critical Path Items -->
				{#if cpQuestions.length > 0}
					<h4 class="text-sm font-bold text-star-white uppercase tracking-wider mb-3">Critical Path Items</h4>
					<ul class="space-y-2 mb-6">
						{#each cpQuestions as q}
							<li class="flex items-start gap-2 text-sm">
								<span class="text-red-400 mt-0.5 shrink-0">&bull;</span>
								<span class="text-star-dim">
									<strong class="text-star-white">{q.questionId}:</strong> {q.title}
									{#if q.gateDescription}
										&mdash; <em class="text-star-faint">{q.gateDescription}</em>
									{/if}
								</span>
							</li>
						{/each}
					</ul>
				{/if}

				<!-- Strengths & Gaps -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 class="text-xs font-bold text-green-400 uppercase tracking-wider mb-2">Strengths</h4>
						<ul class="text-xs text-star-dim space-y-1">
							{#if stats && stats.answered > 0}
								<li>{stats.answered} of {stats.total} questions resolved</li>
							{/if}
							{#if stats && stats.withLiterature > 0}
								<li>{stats.withLiterature} questions have literature reviews</li>
							{/if}
							{#if assessments.some((a) => a.currentTRL >= 5)}
								<li>Some technologies already at TRL 5+</li>
							{/if}
							{#if questions.some((q) => q.hasConclusion)}
								<li>Key architectural decisions resolved via multi-model consensus</li>
							{/if}
						</ul>
					</div>
					<div>
						<h4 class="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Gaps</h4>
						<ul class="text-xs text-star-dim space-y-1">
							{#if stats && stats.open > 0}
								<li>{stats.open} questions still open (not yet investigated)</li>
							{/if}
							{#if stats && (stats.total - stats.withLiterature) > 0}
								<li>{stats.total - stats.withLiterature} questions lack literature reviews</li>
							{/if}
							{#if assessments.some((a) => a.riskIfFail === 'project-ending')}
								<li>Contains project-ending risk technologies</li>
							{/if}
							{#if assessments.some((a) => getTRLGap(a) >= 4)}
								<li>TRL gaps of 4+ levels require multi-year development campaigns</li>
							{/if}
						</ul>
					</div>
				</div>
			</div>
		{/each}
	</section>

	<!-- ================================================================ -->
	<!-- 4. TECHNOLOGY READINESS SUMMARY                                  -->
	<!-- ================================================================ -->
	<section id="trl-summary" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8">
			<span class="text-3xl font-mono text-cosmic-cyan/60">4.</span>
			<h2 class="text-3xl font-bold text-star-white">Technology Readiness Summary</h2>
		</div>

		<div class="card-glow p-8">
			<div class="overflow-x-auto mb-8">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-space-500">
							<th class="text-left py-3 pr-4 text-star-faint font-medium">Technology</th>
							<th class="text-center py-3 px-3 text-star-faint font-medium">Current</th>
							<th class="text-center py-3 px-3 text-star-faint font-medium">Target</th>
							<th class="text-center py-3 px-3 text-star-faint font-medium">Gap</th>
							<th class="text-left py-3 px-3 text-star-faint font-medium">Risk Level</th>
							<th class="text-center py-3 pl-3 text-star-faint font-medium">Years</th>
						</tr>
					</thead>
					<tbody>
						{#each TRL_ASSESSMENTS as a, i}
							{@const gap = getTRLGap(a)}
							<tr class="{i % 2 === 0 ? 'bg-space-700/30' : ''} border-b border-space-600/30 {a.riskIfFail === 'project-ending' ? 'border-l-2 border-l-red-500' : ''}">
								<td class="py-3 pr-4 text-star-dim">{a.technology}</td>
								<td class="py-3 px-3 text-center font-mono text-star-white">
									{a.currentTRL}{a.currentTRLMax ? `\u2013${a.currentTRLMax}` : ''}
								</td>
								<td class="py-3 px-3 text-center font-mono text-star-white">{a.targetTRL}</td>
								<td class="py-3 px-3 text-center font-mono font-bold {gap >= 4 ? 'text-red-400' : gap >= 3 ? 'text-amber-400' : 'text-green-400'}">{gap}</td>
								<td class="py-3 px-3">
									<span class="{riskColor(a.riskIfFail)} text-xs font-medium">{riskLabel(a.riskIfFail)}</span>
								</td>
								<td class="py-3 pl-3 text-center font-mono text-star-dim">
									{a.yearsToTarget}{a.yearsToTargetMax ? `\u2013${a.yearsToTargetMax}` : ''}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Project-ending risks callout -->
			{#if trlStats.projectEndingRisks > 0}
				<div class="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
					<h4 class="text-sm font-bold text-red-400 uppercase tracking-wider mb-3">
						Project-Ending Risk Technologies ({trlStats.projectEndingRisks})
					</h4>
					<div class="space-y-4">
						{#each TRL_ASSESSMENTS.filter((a) => a.riskIfFail === 'project-ending') as a}
							<div>
								<p class="text-sm text-star-white font-medium mb-1">{a.technology}</p>
								<p class="text-xs text-star-dim mb-2">{a.evidence}</p>
								{#if a.fallbackApproach}
									<p class="text-xs text-star-faint">
										<strong class="text-orange-400">Fallback:</strong> {a.fallbackApproach}
									</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Gap Analysis -->
			<h3 class="text-lg font-bold text-star-white mb-4">Overall TRL Gap Analysis</h3>
			<div class="text-star-dim text-sm leading-relaxed space-y-3">
				<p>
					The average TRL gap across all {trlStats.totalTechnologies} assessed technologies is
					<strong class="text-amber-400">{trlStats.averageGap} levels</strong>, with current TRLs
					ranging from {trlStats.lowestTRL} to {trlStats.highestTRL}. The estimated average time
					to reach target TRL is <strong class="text-star-white">{trlStats.avgYearsToTarget} years</strong>,
					though individual technologies range from 4 to 18 years depending on starting point and
					complexity.
				</p>
				<p>
					The TRL distribution reveals a bimodal pattern:
					<strong class="text-star-white">{TRL_ASSESSMENTS.filter((a) => a.currentTRL >= 5).length}
					technologies are at TRL 5 or above</strong>, representing proven approaches that need
					engineering refinement, while
					<strong class="text-star-white">{TRL_ASSESSMENTS.filter((a) => a.currentTRL <= 3).length}
					technologies remain at TRL 3 or below</strong>, requiring fundamental demonstrations
					before design commitments can be made.
				</p>
				<p>
					{trlStats.projectEndingRisks} technologies are classified as project-ending risks,
					and {trlStats.architectureChangeRisks} would require architecture changes if they fail
					to reach target TRL. The remaining technologies carry schedule-delay or cost-increase
					risk classifications&mdash;significant but manageable.
				</p>
			</div>
		</div>
	</section>

	<!-- ================================================================ -->
	<!-- 5. DECISION GATE SCHEDULE                                        -->
	<!-- ================================================================ -->
	<section id="decision-gates" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8">
			<span class="text-3xl font-mono text-cosmic-cyan/60">5.</span>
			<h2 class="text-3xl font-bold text-star-white">Decision Gate Schedule</h2>
		</div>

		<div class="card-glow p-8">
			<p class="text-star-dim text-sm leading-relaxed mb-8">
				Five decision gates structure the Phase 0 development timeline. Each gate defines measurable
				go/no-go criteria that must be satisfied before key architectural commitments are made. The
				gates are sequenced so that earlier decisions inform and constrain later ones.
			</p>

			<!-- Gate Timeline Table -->
			<div class="overflow-x-auto mb-8">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-space-500">
							<th class="text-left py-3 pr-4 text-star-faint font-medium">Gate</th>
							<th class="text-center py-3 px-3 text-star-faint font-medium">Month</th>
							<th class="text-center py-3 px-3 text-star-faint font-medium">Readiness</th>
							<th class="text-left py-3 px-3 text-star-faint font-medium">Status</th>
							<th class="text-center py-3 pl-3 text-star-faint font-medium">Criteria Met</th>
						</tr>
					</thead>
					<tbody>
						{#each gateTimeline as gate, i}
							{@const readiness = getGateReadiness(gate)}
							{@const metCount = gate.criteria.filter((c) => c.met).length}
							<tr class="{i % 2 === 0 ? 'bg-space-700/30' : ''} border-b border-space-600/30">
								<td class="py-3 pr-4 text-star-white font-medium">{gate.name}</td>
								<td class="py-3 px-3 text-center font-mono text-star-dim">{gate.decisionMonth}</td>
								<td class="py-3 px-3 text-center">
									<span class="font-mono {readiness === 0 ? 'text-star-faint' : readiness < 50 ? 'text-red-400' : readiness < 100 ? 'text-amber-400' : 'text-green-400'}">{readiness}%</span>
								</td>
								<td class="py-3 px-3">
									<span class="{gateStatusColor(gate.status)} text-xs font-medium">{gateStatusLabel(gate.status)}</span>
								</td>
								<td class="py-3 pl-3 text-center font-mono text-star-dim">{metCount}/{gate.criteria.length}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Overall Gate Stats -->
			<div class="grid grid-cols-3 gap-4 mb-8">
				<div class="bg-space-800 rounded-lg p-4 text-center">
					<div class="text-2xl font-bold text-star-white">{gateStats.passed}/{gateStats.totalGates}</div>
					<div class="text-xs text-star-faint mt-1">Gates Passed</div>
				</div>
				<div class="bg-space-800 rounded-lg p-4 text-center">
					<div class="text-2xl font-bold text-star-white">{gateStats.overallReadiness}%</div>
					<div class="text-xs text-star-faint mt-1">Overall Readiness</div>
				</div>
				<div class="bg-space-800 rounded-lg p-4 text-center">
					<div class="text-2xl font-bold text-star-white">{gateStats.metCriteria}/{gateStats.totalCriteria}</div>
					<div class="text-xs text-star-faint mt-1">Criteria Met</div>
				</div>
			</div>

			<!-- Gate Dependency Chain -->
			<h3 class="text-lg font-bold text-star-white mb-4">Gate Dependency Chain</h3>
			<div class="text-star-dim text-sm leading-relaxed space-y-3 mb-8">
				<p>
					The gates form a logical progression. <strong class="text-star-white">Gate 4 (Asteroid
					Target Selection, month 24)</strong> comes first because everything downstream depends on
					knowing what material is available. <strong class="text-star-white">Gate 2 (Cryogenic
					Propellant Architecture, month 30)</strong> follows closely, determining whether the
					transport system uses cryogenic or storable propellants&mdash;a decision that cascades
					through propellant production, depot sizing, and station power budgets.
				</p>
				<p>
					<strong class="text-star-white">Gate 1 (Microgravity Materials Processing, month 36)</strong>
					is the most consequential: it determines whether the processing station operates in
					microgravity (baseline) or requires artificial gravity (fallback). The answer shapes the
					station mass budget by potentially billions of dollars.
					<strong class="text-star-white">Gate 3 (ISRU Water Extraction, month 48)</strong> validates
					the propellant production throughput that the water-first ISRU strategy depends on.
				</p>
				<p>
					<strong class="text-star-white">Gate 5 (Preliminary Design Review, month 60)</strong>
					is the comprehensive checkpoint: all preceding gates must be passed or waived, all key
					technologies must reach TRL 5, and the mass, power, and cost budgets must close with margin.
					This is the formal go/no-go for committing to detailed design and hardware procurement.
				</p>
			</div>

			<!-- Most Urgently Needed Evidence -->
			<div class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
				<h4 class="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">Most Urgently Needed Evidence</h4>
				<ul class="space-y-2 text-sm text-star-dim">
					{#each gateTimeline.slice(0, 3) as gate}
						{#each gate.criteria.filter((c) => !c.met).slice(0, 2) as criterion}
							<li class="flex items-start gap-2">
								<span class="text-amber-400 mt-0.5 shrink-0">&bull;</span>
								<span>
									<strong class="text-star-white">{gate.name}:</strong>
									{criterion.description} &mdash;
									<em class="text-star-faint">{criterion.metric}</em>
								</span>
							</li>
						{/each}
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<!-- ================================================================ -->
	<!-- 6. RISK REGISTER                                                 -->
	<!-- ================================================================ -->
	<section id="risk-register" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8">
			<span class="text-3xl font-mono text-cosmic-cyan/60">6.</span>
			<h2 class="text-3xl font-bold text-star-white">Risk Register</h2>
		</div>

		<div class="card-glow p-8">
			<p class="text-star-dim text-sm leading-relaxed mb-8">
				The risk register is derived from TRL assessments, identifying the consequence of each
				technology failing to reach its target readiness level. Risks are classified by impact:
				project-ending (requires fundamental redesign), architecture-change (requires significant
				but bounded redesign), schedule-delay (extends timeline without redesign), and cost-increase
				(achievable but more expensive than planned).
			</p>

			<div class="overflow-x-auto mb-8">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-space-500">
							<th class="text-left py-3 pr-4 text-star-faint font-medium">Technology / Risk</th>
							<th class="text-left py-3 px-3 text-star-faint font-medium">Impact</th>
							<th class="text-center py-3 px-3 text-star-faint font-medium">TRL Gap</th>
							<th class="text-left py-3 pl-3 text-star-faint font-medium">Mitigation / Fallback</th>
						</tr>
					</thead>
					<tbody>
						{#each riskRegister as risk, i}
							<tr class="{i % 2 === 0 ? 'bg-space-700/30' : ''} border-b border-space-600/30">
								<td class="py-3 pr-4">
									<div class="text-star-white text-sm font-medium">{risk.technology}</div>
									<div class="text-xs text-star-faint mt-1">
										TRL {risk.currentTRL}{risk.currentTRLMax ? `\u2013${risk.currentTRLMax}` : ''} &rarr; {risk.targetTRL}
										&middot; {risk.yearsToTarget}{risk.yearsToTargetMax ? `\u2013${risk.yearsToTargetMax}` : ''} years
									</div>
								</td>
								<td class="py-3 px-3">
									<span class="{riskColor(risk.riskIfFail)} text-xs font-bold">{riskLabel(risk.riskIfFail)}</span>
								</td>
								<td class="py-3 px-3 text-center font-mono font-bold {risk.gap >= 4 ? 'text-red-400' : risk.gap >= 3 ? 'text-amber-400' : 'text-green-400'}">{risk.gap}</td>
								<td class="py-3 pl-3 text-xs text-star-dim max-w-xs">
									{risk.fallbackApproach ?? 'No fallback identified'}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Big Unknowns -->
			<h3 class="text-lg font-bold text-star-white mb-4">Key Unknowns</h3>
			<div class="space-y-4">
				<div class="{riskBg('project-ending')} border rounded-lg p-5">
					<h4 class="text-sm font-bold text-red-400 mb-2">Microgravity Metallurgy at Scale</h4>
					<p class="text-xs text-star-dim leading-relaxed">
						No industrial-scale metal processing has ever been attempted in microgravity.
						Small-scale ISS experiments (sub-100g) have demonstrated basic melting and
						solidification, but the physics of grain structure formation, alloy segregation,
						and thermal management at the tonne-per-month scale are wholly uncharacterized.
						This is the single most important technology risk in the entire program. The
						fallback&mdash;adding artificial gravity via station rotation&mdash;is feasible
						but adds billions in station mass and complexity.
					</p>
				</div>

				<div class="{riskBg('project-ending')} border rounded-lg p-5">
					<h4 class="text-sm font-bold text-red-400 mb-2">ISRU Water Extraction Rates from Asteroids</h4>
					<p class="text-xs text-star-dim leading-relaxed">
						While OSIRIS-REx confirmed hydrated minerals on asteroid Bennu, the actual
						extraction rates achievable from real asteroid material under operational conditions
						are unknown. Lab demonstrations with meteorite analogs show promise, but the
						energy cost, water purity, and throughput at scale have wide uncertainty bands.
						If asteroid water extraction proves insufficient, the fallback to lunar water
						sources significantly increases transport cost and complexity.
					</p>
				</div>

				<div class="{riskBg('architecture-change')} border rounded-lg p-5">
					<h4 class="text-sm font-bold text-orange-400 mb-2">Cryocooler Scaling to Hundred-Watt Class</h4>
					<p class="text-xs text-star-dim leading-relaxed">
						Current flight cryocoolers operate at milliwatt to single-watt cooling capacity.
						Zero-boiloff LH2 storage at depot scale requires 100&ndash;500W cooling at 20K.
						NASA&rsquo;s GODU-LH2 program demonstrated ground-based ZBO with a 20W-class
						cooler, but the jump to 100W+ flight systems is a significant engineering challenge.
						Failure would push the architecture toward storable propellants, reducing Isp by
						approximately 30% and changing the entire ISRU chemistry chain.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ================================================================ -->
	<!-- 7. EXPERIMENTAL VALIDATION ROADMAP                               -->
	<!-- ================================================================ -->
	<section id="validation-roadmap" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8">
			<span class="text-3xl font-mono text-cosmic-cyan/60">7.</span>
			<h2 class="text-3xl font-bold text-star-white">Experimental Validation Roadmap</h2>
		</div>

		<div class="card-glow p-8">
			<p class="text-star-dim text-sm leading-relaxed mb-8">
				The following roadmap synthesizes the experiments needed across all {trlStats.totalTechnologies}
				technology areas into a rough timeline. Experiments are categorized by when they can realistically
				begin, accounting for precursor dependencies and facility requirements. A total of
				{nearTermExperiments.length + midTermExperiments.length + longTermExperiments.length} experiments
				are identified across all technologies.
			</p>

			<!-- Near-Term -->
			<div class="mb-10">
				<div class="flex items-center gap-3 mb-4">
					<div class="w-3 h-3 rounded-full bg-green-400"></div>
					<h3 class="text-lg font-bold text-star-white">Near-Term (0&ndash;3 years): Foundation Experiments</h3>
				</div>
				<p class="text-star-dim text-xs mb-4">
					These experiments can start with current facilities (ISS, parabolic flights, ground labs)
					and do not require results from other experiments.
				</p>
				<div class="space-y-2">
					{#each nearTermExperiments as exp}
						<div class="flex items-start gap-3 bg-space-800/50 rounded p-3">
							<span class="text-green-400 mt-0.5 shrink-0 text-xs">&bull;</span>
							<div>
								<span class="text-xs text-star-dim">{exp.experiment}</span>
								<span class="text-xs text-star-faint ml-2">({exp.technology})</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Mid-Term -->
			<div class="mb-10">
				<div class="flex items-center gap-3 mb-4">
					<div class="w-3 h-3 rounded-full bg-amber-400"></div>
					<h3 class="text-lg font-bold text-star-white">Medium-Term (3&ndash;7 years): Scaling and Qualification</h3>
				</div>
				<p class="text-star-dim text-xs mb-4">
					These experiments require results from near-term pathfinders and may need dedicated
					free-flyer missions or specialized test facilities.
				</p>
				<div class="space-y-2">
					{#each midTermExperiments as exp}
						<div class="flex items-start gap-3 bg-space-800/50 rounded p-3">
							<span class="text-amber-400 mt-0.5 shrink-0 text-xs">&bull;</span>
							<div>
								<span class="text-xs text-star-dim">{exp.experiment}</span>
								<span class="text-xs text-star-faint ml-2">({exp.technology})</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Long-Term -->
			<div>
				<div class="flex items-center gap-3 mb-4">
					<div class="w-3 h-3 rounded-full bg-red-400"></div>
					<h3 class="text-lg font-bold text-star-white">Long-Term (7&ndash;15 years): Integration and Demonstration</h3>
				</div>
				<p class="text-star-dim text-xs mb-4">
					Full-scale prototype demonstrations and integrated system tests. These depend on
					successful scaling experiments and may require purpose-built orbital test platforms.
				</p>
				<div class="space-y-2">
					{#each longTermExperiments as exp}
						<div class="flex items-start gap-3 bg-space-800/50 rounded p-3">
							<span class="text-red-400 mt-0.5 shrink-0 text-xs">&bull;</span>
							<div>
								<span class="text-xs text-star-dim">{exp.experiment}</span>
								<span class="text-xs text-star-faint ml-2">({exp.technology})</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ================================================================ -->
	<!-- 8. CONCLUSIONS AND RECOMMENDATIONS                               -->
	<!-- ================================================================ -->
	<section id="conclusions" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8">
			<span class="text-3xl font-mono text-cosmic-cyan/60">8.</span>
			<h2 class="text-3xl font-bold text-star-white">Conclusions and Recommendations</h2>
		</div>

		<div class="card-glow p-8 space-y-8">
			<!-- Overall Assessment -->
			<div>
				<h3 class="text-lg font-bold text-star-white mb-4">Overall Feasibility Assessment</h3>
				<div class="text-star-dim text-sm leading-relaxed space-y-3">
					<p>
						Phase 0 of the Dyson swarm construction program is <strong class="text-amber-400">
						technically ambitious but not implausible</strong>. No identified technology
						requirement violates known physics. The challenges are engineering challenges&mdash;scaling
						laboratory demonstrations to industrial systems, adapting terrestrial processes to
						microgravity, and validating system performance over decade-plus operational lifetimes.
					</p>
					<p>
						However, the program requires advancing multiple technologies simultaneously through
						3&ndash;5 TRL levels, which historically takes 10&ndash;20 years per technology in
						space programs. The presence of {trlStats.projectEndingRisks} project-ending risk
						technologies means that early go/no-go experiments are essential to avoid investing
						a decade in a fundamentally infeasible architecture.
					</p>
					<p>
						The current research posture is appropriate for this stage: {overallStats.answered} of
						{overallStats.total} questions have been resolved ({overallStats.completionPercent}%),
						{overallStats.investigating} are under active investigation, and {overallStats.withLiterature}
						have formal literature reviews. The multi-model consensus approach has proven effective
						at resolving architectural questions (propellant scope, water-first strategy, human-rating
						deferral) while preserving divergent views for future reference.
					</p>
				</div>
			</div>

			<!-- Recommended Next Steps -->
			<div>
				<h3 class="text-lg font-bold text-star-white mb-4">Recommended Next Steps (Prioritized)</h3>
				<ol class="space-y-4">
					<li class="flex items-start gap-3">
						<span class="text-cosmic-cyan font-mono font-bold shrink-0">1.</span>
						<div class="text-sm text-star-dim leading-relaxed">
							<strong class="text-star-white">Initiate ISS pathfinder experiments for microgravity metallurgy</strong>
							(Year 1&ndash;3). This is the highest-priority activity because it addresses the
							single most consequential technology risk. A 100g metal melting and casting
							experiment would retire or confirm the project-ending risk at modest cost.
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-cosmic-cyan font-mono font-bold shrink-0">2.</span>
						<div class="text-sm text-star-dim leading-relaxed">
							<strong class="text-star-white">Fund ground-based cryocooler scaling demonstration</strong>
							(Year 1&ndash;2). Gate 2 (Cryogenic Architecture Selection) at month 30 is the
							nearest decision point. A 50&ndash;100W reverse-Brayton ground demo would provide
							critical evidence for this gate, allowing the propellant architecture decision
							on schedule.
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-cosmic-cyan font-mono font-bold shrink-0">3.</span>
						<div class="text-sm text-star-dim leading-relaxed">
							<strong class="text-star-white">Complete literature reviews for remaining critical-path questions</strong>
							(Year 1). Only {overallStats.withLiterature} of {overallStats.total} questions
							({overallStats.literatureCoverage}%) have literature reviews. Prioritize the
							{criticalPathQuestions.filter((q) => !q.hasLiteratureReview).length} critical-path
							questions lacking reviews to ensure the research program is grounded in
							current scientific knowledge.
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-cosmic-cyan font-mono font-bold shrink-0">4.</span>
						<div class="text-sm text-star-dim leading-relaxed">
							<strong class="text-star-white">Design and fund asteroid prospecting pathfinder mission</strong>
							(Year 2&ndash;4). Gate 4 (Asteroid Target Selection) at month 24 requires
							composition-confirmed targets. A single prospecting satellite to a near-Earth
							asteroid would advance the autonomous prospecting TRL from 5&ndash;6 to 7 and
							provide ground truth for composition algorithms.
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-cosmic-cyan font-mono font-bold shrink-0">5.</span>
						<div class="text-sm text-star-dim leading-relaxed">
							<strong class="text-star-white">Begin lab-scale water extraction from CI/CM chondrite analogs</strong>
							(Year 1&ndash;3). Characterize extraction rate, water purity, and energy cost
							using available meteorite samples and simulants. This provides early data for
							Gate 3 (ISRU Water Extraction) and sizes the propellant production plant.
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-cosmic-cyan font-mono font-bold shrink-0">6.</span>
						<div class="text-sm text-star-dim leading-relaxed">
							<strong class="text-star-white">Advance remaining open research questions through multi-model deliberation</strong>
							(Ongoing). {overallStats.open} questions remain in "open" status. Systematic
							investigation using the multi-model consensus approach should continue to build
							the architectural framework while experimental programs generate data.
						</div>
					</li>
				</ol>
			</div>

			<!-- Scenario Analysis -->
			<div>
				<h3 class="text-lg font-bold text-star-white mb-4">What Would Change the Assessment</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div class="bg-green-500/5 border border-green-500/20 rounded-lg p-5">
						<h4 class="text-sm font-bold text-green-400 mb-3">Positive Scenarios</h4>
						<ul class="space-y-2 text-xs text-star-dim">
							<li class="flex items-start gap-2">
								<span class="text-green-400 shrink-0">&bull;</span>
								<span>ISS metallurgy experiment demonstrates structural-quality alloys in microgravity,
								eliminating the need for artificial gravity and its associated mass and cost penalties.</span>
							</li>
							<li class="flex items-start gap-2">
								<span class="text-green-400 shrink-0">&bull;</span>
								<span>Rapid commercial cryocooler development (driven by in-space propellant depot
								demand from NASA/commercial programs) accelerates Gate 2 evidence by 2&ndash;3 years.</span>
							</li>
							<li class="flex items-start gap-2">
								<span class="text-green-400 shrink-0">&bull;</span>
								<span>Discovery of a highly favorable near-Earth asteroid target (high water content,
								favorable orbit, well-characterized surface) simplifies mining design and reduces
								prospecting campaign scope.</span>
							</li>
							<li class="flex items-start gap-2">
								<span class="text-green-400 shrink-0">&bull;</span>
								<span>Dramatic launch cost reductions (Starship or equivalent achieving &lt;$100/kg to LEO)
								make Earth-launched components competitive with ISRU for early phases, providing
								a robust fallback for every ISRU technology risk.</span>
							</li>
						</ul>
					</div>

					<div class="bg-red-500/5 border border-red-500/20 rounded-lg p-5">
						<h4 class="text-sm font-bold text-red-400 mb-3">Negative Scenarios</h4>
						<ul class="space-y-2 text-xs text-star-dim">
							<li class="flex items-start gap-2">
								<span class="text-red-400 shrink-0">&bull;</span>
								<span>Microgravity metallurgy experiments reveal fundamental grain-structure defects
								that cannot be overcome without gravity, forcing a complete station redesign with
								rotational gravity at +$5&ndash;10B cost increase.</span>
							</li>
							<li class="flex items-start gap-2">
								<span class="text-red-400 shrink-0">&bull;</span>
								<span>Asteroid water content proves significantly lower than spectroscopic predictions
								suggest, making ISRU propellant production uneconomical and requiring Earth- or
								lunar-sourced propellant at 3&ndash;5x higher cost.</span>
							</li>
							<li class="flex items-start gap-2">
								<span class="text-red-400 shrink-0">&bull;</span>
								<span>Cryocooler development stalls at current power levels, forcing storable propellant
								architecture with 30% lower Isp. Increases fleet size or transit times significantly
								and changes ISRU chemistry requirements.</span>
							</li>
							<li class="flex items-start gap-2">
								<span class="text-red-400 shrink-0">&bull;</span>
								<span>Multiple technologies simultaneously fail to advance, creating a compounding
								effect where fallback approaches for different technologies are mutually
								incompatible, requiring full architecture redesign.</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Closing Statement -->
			<div class="mt-8 pt-8 border-t border-space-500">
				<p class="text-star-dim text-sm leading-relaxed">
					Phase 0 represents the most technically challenging phase of the Dyson swarm program:
					it requires solving the ISRU bootstrapping problem where no prior industrial space
					infrastructure exists to build upon. The research and analysis conducted to date provides
					a structured framework for identifying, tracking, and retiring the key technology risks.
					The recommended strategy&mdash;early, inexpensive experiments on the highest-risk
					technologies, combined with systematic research question resolution&mdash;offers the
					best path toward a credible go/no-go decision at Gate 5 (month 60).
				</p>
				<p class="text-star-dim text-sm leading-relaxed mt-3">
					The fundamental question is not whether the required technologies can eventually work,
					but whether they can be matured on a timeline and at a cost that makes the overall
					program viable. The answer to that question will come from experiments, not analysis.
					The priority now is to start the experimental clock.
				</p>
			</div>
		</div>
	</section>

	<!-- ================================================================ -->
	<!-- FOOTER                                                           -->
	<!-- ================================================================ -->
	<footer class="text-center text-star-faint text-xs py-8 border-t border-space-600">
		<p>
			Phase 0 Technical Feasibility Assessment &middot; Project Dyson &middot; {reportDate}
		</p>
		<p class="mt-1">
			Generated from {overallStats.total} research questions, {trlStats.totalTechnologies} TRL assessments,
			and {gateStats.totalGates} decision gates.
		</p>
	</footer>
</div>
