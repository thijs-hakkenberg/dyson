<script lang="ts">
	import {
		DECISION_GATES,
		RETIRED_GATES,
		PHASE_0_DECISIONS,
		GATE_RULINGS,
		GATE_TYPE_LABELS,
		getGateTimeline,
		getGateStats,
		getPendingCriteria,
		gateWindow,
		type GateType
	} from '$lib/services/decision-gates';
	import { QUESTION_DEPENDENCIES } from '$lib/services/critical-path';
	import { getAssessment } from '$lib/services/trl-assessment';
	import RulingStatus from '$lib/components/analysis/RulingStatus.svelte';

	const timeline = getGateTimeline();
	const stats = getGateStats();
	const MAX_MONTH = Math.max(...DECISION_GATES.map((g) => g.decisionMonthMax ?? g.decisionMonth));
	const slugs = new Map(QUESTION_DEPENDENCIES.map((q) => [q.questionId, q.slug]));
	const titles = new Map(QUESTION_DEPENDENCIES.map((q) => [q.questionId, q.title]));

	const pendingQuestions = [
		...new Set(
			DECISION_GATES.flatMap((g) => [g.rulingStatus, ...g.criteria.map((c) => c.rulingStatus)]).flatMap((s) => s?.pending?.map((p) => p.question) ?? [])
		)
	].sort((a, b) => Number(a.split('-')[2]) - Number(b.split('-')[2]));

	const TYPE_COLOR: Record<GateType, string> = { kdp: '#22d3ee', review: '#a78bfa', discriminating: '#f59e0b' };

	let expanded = $state<Set<string>>(new Set(['kdp-0b']));
	function toggle(id: string) {
		const next = new Set(expanded);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		expanded = next;
	}
	const allExpanded = $derived(expanded.size === DECISION_GATES.length);
</script>

<svelte:head>
	<title>Decision Gates - Project Dyson</title>
	<meta
		name="description"
		content="Phase 0 decision gates under D-02: programme decisions KDP-0A and KDP-0B, internal reviews, and the target, demand, economics and licence gates, with each criterion's ruling status."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<nav class="mb-8 flex flex-wrap gap-2 text-sm">
		<a href="/analysis/feasibility" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Feasibility Report</a>
		<a href="/analysis/critical-path" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Critical Path</a>
		<a href="/analysis/technology-readiness" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">TRL Dashboard</a>
		<a href="/analysis/decision-gates" class="px-3 py-1.5 rounded-lg bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30 font-medium">Decision Gates</a>
		<a href="/analysis/cost-reconciliation" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Cost Reconciliation</a>
	</nav>

	<div class="mb-10">
		<h1 class="text-3xl md:text-4xl font-bold text-star-white mb-4">Decision Gates</h1>
		<p class="text-star-dim text-lg max-w-3xl">
			Phase 0 is split in two: 0A (research and pathfinders) is funded; 0B (production) is held as an option and
			exercised only at KDP-0B. The gates below decide whether and when. Stringency follows reversibility: the one-way
			commitment at KDP-0B needs TRL 6 in a relevant environment with no waivers for project-ending technologies;
			internal 0A milestones need TRL 4–5. Four discriminating gates test what TRL cannot: the target, demand,
			economics and the licence.
		</p>
		<p class="text-sm text-star-faint mt-3 max-w-3xl">
			Months are windows from the start of Phase 0, as the model panel proposed them. Thresholds the owner has not yet
			ruled on are shown as proposed, with the research question that will settle them.
		</p>
	</div>

	<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Gates</div>
			<div class="text-3xl font-bold text-star-white">{stats.totalGates}</div>
			<div class="text-xs text-star-faint mt-1">{stats.byType.kdp} KDPs · {stats.byType.review} reviews · {stats.byType.discriminating} discriminating</div>
		</div>
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Criteria</div>
			<div class="text-3xl font-bold text-star-white">{stats.totalCriteria}</div>
			<div class="text-xs text-star-faint mt-1">{stats.metCriteria} met so far (Phase 0 has not started)</div>
		</div>
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Awaiting a ruling</div>
			<div class="text-3xl font-bold text-violet-300">{stats.pendingCriteria}</div>
			<div class="text-xs text-star-faint mt-1">criteria · {stats.disputedCriteria} disputed by the panel</div>
		</div>
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Rulings confirmed</div>
			<div class="text-3xl font-bold text-emerald-300">{GATE_RULINGS.length}</div>
			<div class="text-xs text-star-faint mt-1">{PHASE_0_DECISIONS.filter((d) => d.status === 'accepted').length} of {PHASE_0_DECISIONS.length} decisions accepted</div>
		</div>
	</div>

	<!-- Timeline of decision windows -->
	<div class="card-glow p-6 mb-8">
		<h2 class="text-lg font-semibold text-star-white mb-1">Decision windows</h2>
		<p class="text-xs text-star-faint mb-5">Each bar runs from the earliest to the latest month a gate can decide. KDP-0B must pass before the month-{MAX_MONTH} sunset.</p>
		<div class="space-y-2">
			{#each timeline as g (g.id)}
				{@const left = (g.decisionMonth / MAX_MONTH) * 100}
				{@const width = Math.max(1.2, (((g.decisionMonthMax ?? g.decisionMonth) - g.decisionMonth) / MAX_MONTH) * 100)}
				<a href="#{g.id}" class="grid grid-cols-[minmax(0,14rem)_1fr] gap-3 items-center group">
					<span class="text-xs text-star-dim truncate group-hover:text-star-white">{g.name}</span>
					<span class="relative h-4 bg-space-900 rounded">
						<span class="absolute top-0 h-full rounded" style="left: {left}%; width: {width}%; background: {TYPE_COLOR[g.type ?? 'review']}66; border: 1px solid {TYPE_COLOR[g.type ?? 'review']}"></span>
						<span class="absolute -top-0.5 text-[10px] text-star-faint" style="left: calc({left + width}% + 4px)">{gateWindow(g)}</span>
					</span>
				</a>
			{/each}
		</div>
		<div class="flex flex-wrap gap-4 mt-4 text-xs text-star-faint">
			{#each Object.entries(GATE_TYPE_LABELS) as [t, l]}
				<span class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded" style="background: {TYPE_COLOR[t as GateType]}66; border: 1px solid {TYPE_COLOR[t as GateType]}"></span>{l}</span>
			{/each}
		</div>
	</div>

	<!-- Gates -->
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-xl font-bold text-star-white">Gates</h2>
		<button onclick={() => (expanded = allExpanded ? new Set() : new Set(DECISION_GATES.map((g) => g.id)))} class="text-sm text-cosmic-cyan hover:underline">{allExpanded ? 'Collapse all' : 'Expand all'}</button>
	</div>
	<div class="space-y-4 mb-12">
		{#each timeline as g (g.id)}
			{@const pending = getPendingCriteria(g)}
			<div class="card-glow overflow-hidden" id={g.id}>
				<button onclick={() => toggle(g.id)} class="w-full text-left p-5 flex flex-wrap items-start justify-between gap-3">
					<div class="flex-1 min-w-0">
						<div class="flex flex-wrap items-center gap-2 mb-1">
							<span class="px-2 py-0.5 rounded text-[11px] font-medium" style="background: {TYPE_COLOR[g.type ?? 'review']}22; color: {TYPE_COLOR[g.type ?? 'review']}">{GATE_TYPE_LABELS[g.type ?? 'review']}</span>
							<span class="text-xs text-star-faint font-mono">{gateWindow(g)}</span>
							{#if g.disputed}<span class="text-[11px] text-orange-300">panel disputes parts</span>{/if}
							{#if pending.length}<span class="text-[11px] text-violet-300">⧗ {pending.length} criteria await a ruling</span>{/if}
						</div>
						<h3 class="text-lg font-semibold text-star-white">{g.name}</h3>
						<p class="text-sm text-star-dim mt-1">{g.description}</p>
					</div>
					<span class="text-star-faint">{expanded.has(g.id) ? '▾' : '▸'}</span>
				</button>
				{#if expanded.has(g.id)}
					<div class="px-5 pb-5 border-t border-space-600">
						<div class="overflow-x-auto mt-4">
							<table class="w-full text-xs">
								<thead>
									<tr class="text-left text-star-faint border-b border-space-500">
										<th class="py-1.5 pr-3 w-1/4">Criterion</th>
										<th class="py-1.5 pr-3 w-1/3">Threshold (as proposed)</th>
										<th class="py-1.5 pr-3">Technologies</th>
										<th class="py-1.5">Status</th>
									</tr>
								</thead>
								<tbody>
									{#each g.criteria as c}
										<tr class="border-b border-space-600/60 align-top">
											<td class="py-2 pr-3">
												<div class="text-star-white">{c.description}</div>
												<div class="text-star-faint mt-0.5">{c.metric}</div>
											</td>
											<td class="py-2 pr-3 text-star-dim">
												{#if c.trlRequired}<span class="text-cosmic-cyan font-medium">TRL {c.trlRequired}. </span>{/if}{c.threshold}
												{#if c.proposedBy?.length && c.proposedBy.length < 3}<div class="text-star-faint mt-0.5">Proposed by {c.proposedBy.join(', ')}</div>{/if}
											</td>
											<td class="py-2 pr-3">
												<div class="flex flex-wrap gap-1">
													{#each c.technologies ?? [] as t}
														<a href="/analysis/technology-readiness#{t}" class="font-mono px-1.5 py-0.5 rounded bg-space-600 text-star-dim hover:text-cosmic-cyan" title={getAssessment(t)?.technology}>{t}</a>
													{/each}
												</div>
											</td>
											<td class="py-2">
												{#if c.rulingStatus}<RulingStatus status={c.rulingStatus} />{:else}<span class="text-star-faint">Agreed as written</span>{/if}
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-sm">
							<div class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25">
								<div class="text-xs font-medium text-emerald-300 uppercase tracking-wider mb-1">Pass</div>
								<p class="text-star-dim">{g.passOutcome}</p>
							</div>
							<div class="p-3 rounded-lg bg-red-500/10 border border-red-500/25">
								<div class="text-xs font-medium text-red-300 uppercase tracking-wider mb-1">Fail</div>
								<p class="text-star-dim">{g.failOutcome}</p>
								{#if g.rulingStatus}<div class="mt-2"><RulingStatus status={g.rulingStatus} /></div>{/if}
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Decisions -->
	<div class="card-glow p-6 mb-8" id="decisions">
		<h2 class="text-xl font-bold text-star-white mb-4">Owner decisions</h2>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead><tr class="text-left text-star-faint border-b border-space-500"><th class="py-2 pr-3">Decision</th><th class="py-2 pr-3">Recommendation</th><th class="py-2">Status</th></tr></thead>
				<tbody>
					{#each PHASE_0_DECISIONS as d}
						<tr class="border-b border-space-600/60 align-top">
							<td class="py-2 pr-3"><span class="font-mono text-star-faint">{d.id}</span> <span class="text-star-white">{d.title}</span></td>
							<td class="py-2 pr-3 text-star-dim">{d.recommendation}</td>
							<td class="py-2 whitespace-nowrap">
								{#if d.status === 'accepted'}<span class="text-emerald-300">✓ accepted {d.decided}</span>{:else}<span class="text-amber-300">◐ proposed; interim</span>{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Rulings -->
	<div class="card-glow p-6 mb-8" id="rulings">
		<h2 class="text-xl font-bold text-star-white mb-2">Gate rulings</h2>
		<p class="text-sm text-star-dim mb-4">
			The panel deliberated eleven open gate rules. The owner confirmed the points where the panel genuinely converged.
			The rest wait on evidence: each is routed to a research question, and is ruled when that question reports.
		</p>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<div>
				<h3 class="text-sm font-medium text-emerald-300 mb-2">Confirmed</h3>
				<ul class="space-y-2">
					{#each GATE_RULINGS as r}
						<li class="text-sm text-star-dim">
							<span class="font-mono text-emerald-300">{r.id}</span>
							<a href="/questions/{slugs.get(r.question)}" class="text-star-faint hover:text-cosmic-cyan">({r.question})</a>
							{r.ruling}
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<h3 class="text-sm font-medium text-violet-300 mb-2">Awaiting evidence</h3>
				<ul class="space-y-2">
					{#each pendingQuestions as q}
						<li class="text-sm">
							<a href="/questions/{slugs.get(q)}" class="text-star-white hover:text-cosmic-cyan"><span class="font-mono text-violet-300">{q}</span> {titles.get(q)}</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- Retired -->
	<details class="card-glow p-6">
		<summary class="cursor-pointer text-lg font-semibold text-star-white">Retired gates (March 2026, {RETIRED_GATES.length})</summary>
		<p class="text-sm text-star-dim mt-3 mb-4">The earlier plan had five numbered gates at fixed months. D-02 replaced them; each is listed with what took its place.</p>
		<div class="space-y-3">
			{#each RETIRED_GATES as g}
				<div class="p-3 rounded-lg bg-space-600/40 border border-space-500">
					<div class="text-sm text-star-white"><span class="font-mono text-star-faint">{g.id}</span> {g.name} <span class="text-star-faint">(month {g.decisionMonth})</span></div>
					<p class="text-sm text-star-dim mt-1">{g.retiredReason}</p>
					<div class="text-xs text-star-faint mt-1">
						Replaced by {#each g.replacedBy as id, i}<a href="#{id}" class="text-cosmic-cyan hover:underline font-mono">{id}</a>{i < g.replacedBy.length - 1 ? ', ' : ''}{/each}
					</div>
				</div>
			{/each}
		</div>
	</details>
</div>
