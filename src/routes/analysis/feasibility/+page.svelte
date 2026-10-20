<script lang="ts">
	/**
	 * Phase 0 feasibility report. Every figure on this page comes from data: the TRL re-baseline,
	 * the D-02 gates, the research-question graph and the round-2 reconciliation. Prose explains
	 * method and meaning only.
	 */
	import { TECHNOLOGY_THREADS, QUESTION_DEPENDENCIES, getOverallStats } from '$lib/services/critical-path';
	import {
		TRL_ASSESSMENTS,
		RISK_LABELS,
		TRL_SOURCE,
		getTRLStats,
		getTRLGap,
		type TRLAssessment
	} from '$lib/services/trl-assessment';
	import {
		DECISION_GATES,
		GATE_RULINGS,
		GATE_TYPE_LABELS,
		RETIRED_GATES,
		getGateTimeline,
		getGateStats,
		gateWindow
	} from '$lib/services/decision-gates';
	import { PHASE_0_ARCHITECTURE, PHASE_0_ASSUMPTIONS, PHASE_0_DECISION_LIST, D01 } from '$lib/services/phase-0-plan';
	import RulingStatus from '$lib/components/analysis/RulingStatus.svelte';

	const q = getOverallStats();
	const trl = getTRLStats();
	const gates = getGateStats();
	const timeline = getGateTimeline();
	const kdp0b = DECISION_GATES.find((g) => g.id === 'kdp-0b')!;
	const assessed = TRL_SOURCE.assessedAt.slice(0, 10);
	const slugs = new Map(QUESTION_DEPENDENCIES.map((x) => [x.questionId, x.slug]));
	const rq = (id: string) => QUESTION_DEPENDENCIES.find((x) => x.questionId === id);
	const thread = (id: string) => TECHNOLOGY_THREADS.find((t) => t.id === id);
	const fmt = (min: number, max?: number | null) => (max != null && max !== min ? `${min}–${max}` : `${min}`);

	const SEVERITY: Record<string, number> = { 'project-ending': 3, 'architecture-change': 2, 'schedule-delay': 1, 'cost-increase': 0 };
	/** Ordering for the risk register and the top risks: severity, then AD², then TRL gap */
	const byRisk = (a: TRLAssessment, b: TRLAssessment) =>
		SEVERITY[b.riskIfFail] - SEVERITY[a.riskIfFail] || (b.ad2?.max ?? 0) - (a.ad2?.max ?? 0) || getTRLGap(b) - getTRLGap(a);
	const register = [...TRL_ASSESSMENTS].sort(byRisk);
	const projectEnding = register.filter((a) => a.riskIfFail === 'project-ending');
	const topRisks = register.slice(0, 3);
	/** Most mature relative to target: smallest gap at the upper bound */
	const mostMature = [...TRL_ASSESSMENTS].sort((a, b) => a.targetTRL - (a.currentTRLMax ?? a.currentTRL) - (b.targetTRL - (b.currentTRLMax ?? b.currentTRL))).slice(0, 3);

	const byTRL = Array.from({ length: 9 }, (_, i) => TRL_ASSESSMENTS.filter((a) => a.currentTRL === i + 1).length);
	const byAD2 = Array.from({ length: 9 }, (_, i) => TRL_ASSESSMENTS.filter((a) => (a.ad2?.max ?? 0) === i + 1).length);
	const threadCounts = TECHNOLOGY_THREADS.map((t) => ({ t, n: TRL_ASSESSMENTS.filter((a) => a.threadId === t.id).length })).filter((x) => x.n > 0);

	// Roadmap: each project-ending technology's path steps, bucketed by the TRL the step reaches
	// (first number in the synthesis's "TRL reached" cell; steps without one fall by position)
	type Step = { tech: TRLAssessment; step: string; trl: number | null };
	const steps: Step[] = projectEnding.flatMap((a) =>
		(a.path ?? []).map((p, i, all) => {
			const m = /\b([1-9])\b/.exec(p.trlReached);
			return { tech: a, step: p.step, trl: m ? Number(m[1]) : i < all.length / 3 ? 3 : i < (2 * all.length) / 3 ? 5 : 6 };
		})
	);
	const roadmap = [
		{ title: 'Foundation: to TRL 4 (laboratory)', when: 'before the 0A mid-term review', steps: steps.filter((s) => (s.trl ?? 0) <= 4) },
		{ title: 'Relevant environment: TRL 5', when: 'pathfinder and ground campaigns', steps: steps.filter((s) => s.trl === 5) },
		{ title: 'Demonstration: TRL 6 and beyond', when: 'required before KDP-0B', steps: steps.filter((s) => (s.trl ?? 0) >= 6) }
	];

	const evidenceRqs = QUESTION_DEPENDENCIES.filter((x) => /^rq-0-(7[6-9]|8[0-3])$/.test(x.questionId));
	const pendingRulingRqs = QUESTION_DEPENDENCIES.filter((x) => /^rq-0-(6[5-9]|7[0-5])$/.test(x.questionId));
	const accepted = PHASE_0_DECISION_LIST.filter((d) => d.status === 'accepted');
	const proposed = PHASE_0_DECISION_LIST.filter((d) => d.status !== 'accepted');

	const toc = [
		['executive-summary', 'Executive Summary'],
		['architecture', 'Phase 0 Architecture'],
		['critical-technology', 'Critical Technologies'],
		['trl-summary', 'Technology Readiness Summary'],
		['decision-gates', 'Decision Gates'],
		['risk-register', 'Risk Register'],
		['validation-roadmap', 'Validation Roadmap'],
		['conclusions', 'Conclusions and What Would Change Them']
	];
</script>

<svelte:head>
	<title>Phase 0 Technical Feasibility Assessment - Project Dyson</title>
	<meta
		name="description"
		content="Phase 0 feasibility after the October 2026 re-assessment: the 0A/0B split, 26 critical technologies on TRL and AD², the D-02 decision gates, the risk register and what would change the assessment."
	/>
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<nav class="mb-8 flex flex-wrap gap-2 text-sm">
		<a href="/analysis/feasibility" class="px-3 py-1.5 rounded-lg bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30 font-medium">Feasibility Report</a>
		<a href="/analysis/critical-path" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Critical Path</a>
		<a href="/analysis/technology-readiness" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">TRL Dashboard</a>
		<a href="/analysis/decision-gates" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Decision Gates</a>
		<a href="/analysis/cost-reconciliation" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Cost Reconciliation</a>
	</nav>

	<header class="mb-16 text-center">
		<span class="inline-block text-sm font-mono tracking-widest uppercase text-cosmic-cyan mb-4">Project Dyson &mdash; Technical Document</span>
		<h1 class="text-4xl md:text-5xl font-bold text-star-white mb-4 leading-tight">Phase 0 Technical Feasibility Assessment</h1>
		<p class="text-xl text-star-dim mb-8 max-w-3xl mx-auto">Asteroid resources for the swarm: research, pathfinders and a gated production option</p>
		<div class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-star-faint font-mono">
			<span>Version 2.0</span>
			<span>Readiness assessed {assessed}</span>
			<span>Panel: {TRL_SOURCE.panel.join(', ')}</span>
		</div>
		<div class="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cosmic-cyan to-transparent"></div>
	</header>

	<nav class="card-glow p-8 mb-16">
		<h2 class="text-lg font-bold text-star-white mb-6 uppercase tracking-wider">Contents</h2>
		<ol class="space-y-3">
			{#each toc as [id, title], i}
				<li>
					<a href="#{id}" class="flex items-baseline gap-3 text-star-dim hover:text-cosmic-cyan transition-colors group">
						<span class="font-mono text-cosmic-cyan/70 group-hover:text-cosmic-cyan">{i + 1}.</span>
						<span class="border-b border-dotted border-space-500 flex-1 group-hover:border-cosmic-cyan/30">{title}</span>
					</a>
				</li>
			{/each}
		</ol>
	</nav>

	<!-- 1 -->
	<section id="executive-summary" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8"><span class="text-3xl font-mono text-cosmic-cyan/60">1.</span><h2 class="text-3xl font-bold text-star-white">Executive Summary</h2></div>
		<div class="card-glow p-8 space-y-6">
			<div class="space-y-4 text-star-dim leading-relaxed">
				<p>
					Phase 0 asks whether material from near-Earth asteroids can supply the swarm. A three-model re-assessment
					found the earlier plan, a central station processing ore at scale, could not close. The agreed course is
					decision <strong class="text-star-white">{D01.id}</strong> (accepted {D01.decided}): {D01.recommendation}
				</p>
				<p>
					This report rests on {trl.totalTechnologies} critical technologies rated on TRL and AD²,
					{gates.totalGates} decision gates under D-02, and {q.total} Phase 0 research questions. It quotes no
					single cost: the panel's Phase 0 estimates differ by up to an order of magnitude, and they are shown
					side by side below.
				</p>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
				<div class="bg-space-800 rounded-lg p-4 text-center">
					<div class="text-2xl font-bold text-orange-400">TRL {trl.lowestTRL}–{trl.highestTRL}</div>
					<div class="text-xs text-star-faint mt-1">Current readiness, all {trl.totalTechnologies} technologies</div>
				</div>
				<div class="bg-space-800 rounded-lg p-4 text-center">
					<div class="text-2xl font-bold text-red-400">{trl.projectEndingRisks}</div>
					<div class="text-xs text-star-faint mt-1">Project-ending technologies</div>
				</div>
				<div class="bg-space-800 rounded-lg p-4 text-center">
					<div class="text-2xl font-bold text-star-white">{gates.totalGates}</div>
					<div class="text-xs text-star-faint mt-1">Gates ({gates.byType.kdp} KDPs, {gates.byType.discriminating} discriminating)</div>
				</div>
				<div class="bg-space-800 rounded-lg p-4 text-center">
					<div class="text-2xl font-bold text-violet-300">{gates.pendingCriteria}</div>
					<div class="text-xs text-star-faint mt-1">Gate criteria awaiting a ruling</div>
				</div>
			</div>

			<p class="text-star-dim leading-relaxed">
				<strong class="text-amber-400">Readiness: early.</strong> No critical technology is above TRL {trl.highestTRL}; KDP-0B
				requires TRL {kdp0b.criteria.find((c) => c.trlRequired)?.trlRequired} with no waivers for the project-ending ones.
				The panel estimates {fmt(Math.min(...TRL_ASSESSMENTS.map((a) => a.yearsToTarget)), Math.max(...TRL_ASSESSMENTS.map((a) => a.yearsToTargetMax ?? a.yearsToTarget)))}
				years to reach target, depending on the technology. That is why 0B is an option, not a commitment.
			</p>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
				<div class="bg-red-500/5 border border-red-500/20 rounded-lg p-6">
					<h3 class="text-sm font-bold text-red-400 uppercase tracking-wider mb-4">Hardest project-ending technologies</h3>
					<ol class="space-y-3 text-sm">
						{#each topRisks as a}
							<li>
								<a href="/analysis/technology-readiness#{a.id}" class="text-star-white hover:text-cosmic-cyan font-medium">{a.id} {a.technology}</a>
								<div class="text-star-faint">TRL {fmt(a.currentTRL, a.currentTRLMax)} → {a.targetTRL} · AD² {a.ad2 ? fmt(a.ad2.min, a.ad2.max) : '—'} · {fmt(a.yearsToTarget, a.yearsToTargetMax)} yr</div>
							</li>
						{/each}
					</ol>
				</div>
				<div class="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
					<h3 class="text-sm font-bold text-green-400 uppercase tracking-wider mb-4">Closest to target</h3>
					<ol class="space-y-3 text-sm">
						{#each mostMature as a}
							<li>
								<a href="/analysis/technology-readiness#{a.id}" class="text-star-white hover:text-cosmic-cyan font-medium">{a.id} {a.technology}</a>
								<div class="text-star-faint">TRL {fmt(a.currentTRL, a.currentTRLMax)} → {a.targetTRL} · {RISK_LABELS[a.riskIfFail].label}</div>
							</li>
						{/each}
					</ol>
				</div>
			</div>

			<div class="bg-cosmic-cyan/5 border border-cosmic-cyan/20 rounded-lg p-6">
				<h3 class="text-sm font-bold text-cosmic-cyan uppercase tracking-wider mb-3">Recommendation</h3>
				<p class="text-star-dim">
					{#each accepted as d, i}<strong class="text-star-white">{d.id}:</strong> {d.recommendation}{i < accepted.length - 1 ? ' ' : ''}{/each}
				</p>
				<p class="text-sm text-star-faint mt-3">
					Still proposed, used as interim positions: {#each proposed as d, i}{d.id} ({d.title.toLowerCase()}){i < proposed.length - 1 ? '; ' : '.'}{/each}
				</p>
			</div>
		</div>
	</section>

	<!-- 2 -->
	<section id="architecture" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8"><span class="text-3xl font-mono text-cosmic-cyan/60">2.</span><h2 class="text-3xl font-bold text-star-white">Phase 0 Architecture</h2></div>
		<div class="card-glow p-8 space-y-6">
			<p class="text-star-dim leading-relaxed">
				All three models agreed the changes below. Where they gave different numbers, the range spans them; contested
				values stay with the model that gave them.
			</p>
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead><tr class="text-left text-star-faint border-b border-space-500"><th class="py-2 pr-3 w-2/5">Change</th><th class="py-2 pr-3">Value</th><th class="py-2">Attribution</th></tr></thead>
					<tbody>
						{#each PHASE_0_ARCHITECTURE.agreedChanges as c}
							<tr class="border-b border-space-600/60 align-top">
								<td class="py-2 pr-3 text-star-white">{c.change}</td>
								<td class="py-2 pr-3 text-star-dim">{c.value}</td>
								<td class="py-2 text-star-faint text-xs">{c.attribution}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<h3 class="text-lg font-bold text-star-white pt-4">Phase cost, as each model estimated it</h3>
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead><tr class="text-left text-star-faint border-b border-space-500"><th class="py-2 pr-3">Model</th><th class="py-2 pr-3">0A</th><th class="py-2 pr-3">0B</th><th class="py-2">Total</th></tr></thead>
					<tbody>
						{#each PHASE_0_ARCHITECTURE.phaseCost as c}
							<tr class="border-b border-space-600/60"><td class="py-2 pr-3 text-star-white">{c.model}</td><td class="py-2 pr-3 text-star-dim">{c.phase0A}</td><td class="py-2 pr-3 text-star-dim">{c.phase0B}</td><td class="py-2 text-star-dim">{c.total}</td></tr>
						{/each}
					</tbody>
				</table>
			</div>
			<p class="text-xs text-star-faint">
				Source: <code>{PHASE_0_ARCHITECTURE.source}</code> §2 and §3.17. Most cost figures are low-confidence allowances; the
				BOM is being rebuilt from these ranges. See <a href="/analysis/cost-reconciliation" class="text-cosmic-cyan hover:underline">cost reconciliation</a>.
			</p>
		</div>
	</section>

	<!-- 3 -->
	<section id="critical-technology" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8"><span class="text-3xl font-mono text-cosmic-cyan/60">3.</span><h2 class="text-3xl font-bold text-star-white">Critical Technologies</h2></div>
		<p class="text-star-dim mb-6 leading-relaxed">
			The {projectEnding.length} technologies whose failure would end the production option. Each must reach TRL 6 in a
			relevant environment before KDP-0B. Each card is summarised from the
			<a href="/analysis/technology-readiness" class="text-cosmic-cyan hover:underline">TRL dashboard</a>, which has every
			model's rating, the evidence register and the development path.
		</p>
		<div class="space-y-4">
			{#each projectEnding as a}
				{@const th = thread(a.threadId)}
				<div class="card-glow p-5">
					<div class="flex flex-wrap items-start justify-between gap-3">
						<a href="/analysis/technology-readiness#{a.id}" class="text-lg font-semibold text-star-white hover:text-cosmic-cyan"><span class="font-mono text-star-faint mr-1">{a.id}</span> {a.technology}</a>
						{#if th}<span class="text-xs px-2 py-0.5 rounded-full" style="background: {th.color}20; color: {th.color}">{th.name}</span>{/if}
					</div>
					<div class="text-sm text-star-faint mt-1">
						TRL {fmt(a.currentTRL, a.currentTRLMax)} → {a.targetTRL} · AD² {a.ad2 ? fmt(a.ad2.min, a.ad2.max) : '—'} · {fmt(a.yearsToTarget, a.yearsToTargetMax)} years · needed in {Array.isArray(a.phaseNeed) ? a.phaseNeed.join('/') : a.phaseNeed}
						{#if a.agreement === 'diverge'}<span class="text-orange-300"> · panel diverges</span>{/if}
					</div>
					<p class="text-sm text-star-dim mt-2">{a.evidence}</p>
					{#if a.rulingStatus}<div class="mt-2"><RulingStatus status={a.rulingStatus} /></div>{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- 4 -->
	<section id="trl-summary" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8"><span class="text-3xl font-mono text-cosmic-cyan/60">4.</span><h2 class="text-3xl font-bold text-star-white">Technology Readiness Summary</h2></div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each [{ title: 'Current TRL (lower bound)', counts: byTRL, color: '#f97316' }, { title: 'AD² (upper bound)', counts: byAD2, color: '#a78bfa' }] as h}
				<div class="card-glow p-6">
					<h3 class="text-sm font-medium text-star-dim mb-4">{h.title}</h3>
					<div class="flex items-end gap-2 h-32">
						{#each h.counts as n, i}
							<div class="flex-1 flex flex-col items-center justify-end h-full">
								<div class="text-[10px] text-star-faint mb-1">{n || ''}</div>
								<div class="w-full rounded-t" style="height: {(n / Math.max(...h.counts, 1)) * 100}%; background: {h.color}; opacity: {n ? 0.85 : 0.1}; min-height: 2px"></div>
								<div class="text-xs text-star-dim mt-1">{i + 1}</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="card-glow p-6 mt-6">
			<h3 class="text-sm font-medium text-star-dim mb-3">By technology thread</h3>
			<div class="flex flex-wrap gap-3">
				{#each threadCounts as { t, n }}
					<span class="text-sm px-3 py-1 rounded-full" style="background: {t.color}20; color: {t.color}">{t.name}: {n}</span>
				{/each}
			</div>
			<p class="text-sm text-star-faint mt-4">
				Panel agreement: {trl.totalTechnologies - trl.diverging - trl.ruled} agree, {trl.diverging} diverge, {trl.ruled} set by owner
				ruling. {trl.byPhaseNeed['0A']} technologies are needed in 0A, {trl.byPhaseNeed['0B']} only for 0B.
			</p>
		</div>
	</section>

	<!-- 5 -->
	<section id="decision-gates" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8"><span class="text-3xl font-mono text-cosmic-cyan/60">5.</span><h2 class="text-3xl font-bold text-star-white">Decision Gates</h2></div>
		<div class="card-glow p-6">
			<p class="text-star-dim mb-5 leading-relaxed">
				Under D-02, gates are programme decisions (KDPs), internal reviews, and discriminating gates that test what TRL
				cannot. Months are windows from the start of Phase 0. {RETIRED_GATES.length} earlier gates were retired; the
				<a href="/analysis/decision-gates" class="text-cosmic-cyan hover:underline">decision-gates page</a> shows why, with every criterion.
			</p>
			<table class="w-full text-sm">
				<thead><tr class="text-left text-star-faint border-b border-space-500"><th class="py-2 pr-3">Gate</th><th class="py-2 pr-3">Type</th><th class="py-2 pr-3">Window</th><th class="py-2">Criteria</th></tr></thead>
				<tbody>
					{#each timeline as g}
						<tr class="border-b border-space-600/60">
							<td class="py-2 pr-3"><a href="/analysis/decision-gates#{g.id}" class="text-star-white hover:text-cosmic-cyan">{g.name}</a></td>
							<td class="py-2 pr-3 text-star-dim text-xs">{GATE_TYPE_LABELS[g.type ?? 'review']}</td>
							<td class="py-2 pr-3 text-star-dim font-mono text-xs">{gateWindow(g)}</td>
							<td class="py-2 text-star-dim text-xs">{g.criteria.length}{#if g.criteria.some((c) => c.rulingStatus?.pending?.length)}<span class="text-violet-300"> · ⧗ {g.criteria.filter((c) => c.rulingStatus?.pending?.length).length} pending</span>{/if}</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<p class="text-sm text-star-faint mt-4">
				{GATE_RULINGS.length} gate rulings are confirmed. The rest wait on evidence from
				{#each evidenceRqs as r, i}<a href="/questions/{r.slug}" class="text-cosmic-cyan hover:underline">{r.questionId}</a>{i < evidenceRqs.length - 1 ? ', ' : '.'}{/each}
			</p>
		</div>
	</section>

	<!-- 6 -->
	<section id="risk-register" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8"><span class="text-3xl font-mono text-cosmic-cyan/60">6.</span><h2 class="text-3xl font-bold text-star-white">Risk Register</h2></div>
		<div class="card-glow p-6 overflow-x-auto">
			<p class="text-sm text-star-dim mb-4">Ordered by consequence, then difficulty (AD²), then TRL gap. ⧗ marks a risk class or criterion awaiting an owner ruling.</p>
			<table class="w-full text-sm">
				<thead><tr class="text-left text-star-faint border-b border-space-500"><th class="py-2 pr-3">Technology</th><th class="py-2 pr-3">Consequence</th><th class="py-2 pr-3">TRL</th><th class="py-2 pr-3">AD²</th><th class="py-2">Years</th></tr></thead>
				<tbody>
					{#each register as a}
						<tr class="border-b border-space-600/60">
							<td class="py-1.5 pr-3"><a href="/analysis/technology-readiness#{a.id}" class="text-star-white hover:text-cosmic-cyan"><span class="font-mono text-star-faint">{a.id}</span> {a.technology}</a>{#if a.rulingStatus?.pending?.length}<span class="text-violet-300" title="Awaiting an owner ruling"> ⧗</span>{/if}</td>
							<td class="py-1.5 pr-3 text-xs" style="color: {RISK_LABELS[a.riskIfFail].color}">{RISK_LABELS[a.riskIfFail].label}</td>
							<td class="py-1.5 pr-3 text-star-dim">{fmt(a.currentTRL, a.currentTRLMax)} → {a.targetTRL}</td>
							<td class="py-1.5 pr-3 text-star-dim">{a.ad2 ? fmt(a.ad2.min, a.ad2.max) : '—'}</td>
							<td class="py-1.5 text-star-dim">{fmt(a.yearsToTarget, a.yearsToTargetMax)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- 7 -->
	<section id="validation-roadmap" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8"><span class="text-3xl font-mono text-cosmic-cyan/60">7.</span><h2 class="text-3xl font-bold text-star-white">Validation Roadmap</h2></div>
		<p class="text-star-dim mb-6 leading-relaxed">
			The development paths of the {projectEnding.length} project-ending technologies, grouped by the TRL each step reaches.
			Steps and costs are the panel's, attributed in each technology's path.
		</p>
		<div class="space-y-6">
			{#each roadmap as stage}
				<div class="card-glow p-6">
					<h3 class="text-lg font-bold text-star-white">{stage.title}</h3>
					<p class="text-xs text-star-faint mb-4">{stage.when} · {stage.steps.length} steps</p>
					<ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
						{#each stage.steps as s}
							<li class="text-star-dim"><a href="/analysis/technology-readiness#{s.tech.id}" class="font-mono text-cosmic-cyan/80 hover:text-cosmic-cyan">{s.tech.id}</a> {s.step}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- 8 -->
	<section id="conclusions" class="mb-20">
		<div class="flex items-baseline gap-3 mb-8"><span class="text-3xl font-mono text-cosmic-cyan/60">8.</span><h2 class="text-3xl font-bold text-star-white">Conclusions and What Would Change Them</h2></div>
		<div class="space-y-6">
			<div class="card-glow p-6">
				<h3 class="text-lg font-bold text-star-white mb-3">Assessment</h3>
				<p class="text-star-dim leading-relaxed">
					Phase 0 is feasible as a research and pathfinder programme. Whether asteroid production (0B) is feasible is not
					yet known, and the plan is built so that this does not need to be known now. {projectEnding.length} project-ending
					technologies sit at TRL {fmt(Math.min(...projectEnding.map((a) => a.currentTRL)), Math.max(...projectEnding.map((a) => a.currentTRLMax ?? a.currentTRL)))}
					and must reach TRL 6 before KDP-0B. {gates.byType.discriminating} discriminating gates must also pass for the same configuration: a
					sampled target, signed demand, delivered cost against Earth supply, and a licence.
				</p>
			</div>
			<div class="card-glow p-6">
				<h3 class="text-lg font-bold text-star-white mb-3">Next steps</h3>
				<ol class="space-y-2 text-sm list-decimal list-inside text-star-dim">
					<li>Answer the evidence questions behind the open gate rulings:
						<ul class="mt-1 ml-5 space-y-1 list-disc">
							{#each evidenceRqs as r}
								<li><a href="/questions/{r.slug}" class="text-cosmic-cyan hover:underline">{r.questionId}</a> {r.title} <span class="text-star-faint">({r.priority})</span></li>
							{/each}
						</ul>
					</li>
					<li>Rule on the {pendingRulingRqs.length} gate questions as their evidence reports, then fix the gate thresholds.</li>
					<li>Sign off the proposed decisions ({proposed.map((d) => d.id).join(', ')}), now used as interim positions.</li>
					<li>Rebuild the BOM and cost from the agreed architecture, keeping each model's figures.</li>
				</ol>
			</div>
			<div class="card-glow p-6">
				<h3 class="text-lg font-bold text-star-white mb-3">What would change the assessment</h3>
				<p class="text-sm text-star-dim mb-4">D-01 rests on these assumptions. Each line names the evidence that would falsify it.</p>
				<table class="w-full text-sm">
					<thead><tr class="text-left text-star-faint border-b border-space-500"><th class="py-2 pr-3">Assumption</th><th class="py-2">Falsified by</th></tr></thead>
					<tbody>
						{#each PHASE_0_ASSUMPTIONS as a}
							<tr class="border-b border-space-600/60 align-top"><td class="py-2 pr-3 text-star-white">{a.assumption}</td><td class="py-2 text-star-dim">{a.falsifier}</td></tr>
						{/each}
					</tbody>
				</table>
				<p class="text-xs text-star-faint mt-4">
					Sources: <code>reconciliation/phase-0/decisions.md</code>, the
					<a href="https://github.com/thijs-hakkenberg/dyson/blob/main/reconciliation/phase-0/open-questions.md" class="text-cosmic-cyan hover:underline">open-question register</a>,
					and the TRL re-baseline ({assessed}).
					{#if slugs.get('rq-0-62')}See also <a href="/questions/{slugs.get('rq-0-62')}" class="text-cosmic-cyan hover:underline">rq-0-62</a> ({rq('rq-0-62')?.title}).{/if}
				</p>
			</div>
		</div>
	</section>
</div>
