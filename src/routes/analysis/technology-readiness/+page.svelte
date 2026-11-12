<script lang="ts">
	import {
		TRL_ASSESSMENTS,
		LEGACY_TRL_ASSESSMENTS,
		TRL_LABELS,
		RISK_LABELS,
		AGREEMENT_LABELS,
		TRL_SOURCE,
		getTRLStats,
		getTRLGap,
		shortModelName,
		type TRLAssessment
	} from '$lib/services/trl-assessment';
	import { TECHNOLOGY_THREADS, QUESTION_DEPENDENCIES } from '$lib/services/critical-path';
	import RulingStatus from '$lib/components/analysis/RulingStatus.svelte';

	const stats = getTRLStats();
	const questionSlugMap = new Map(QUESTION_DEPENDENCIES.map((q) => [q.questionId, q.slug]));
	const questionTitleMap = new Map(QUESTION_DEPENDENCIES.map((q) => [q.questionId, q.title]));
	const threadMap = new Map(TECHNOLOGY_THREADS.map((t) => [t.id, t]));
	const assessedDate = TRL_SOURCE.assessedAt.slice(0, 10);

	let phaseFilter = $state<'all' | '0A' | '0B'>('all');
	let riskFilter = $state<string>('all');

	const shown = $derived(
		[...TRL_ASSESSMENTS]
			.filter((a) => phaseFilter === 'all' || a.phaseNeed === phaseFilter)
			.filter((a) => riskFilter === 'all' || a.riskIfFail === riskFilter)
			.sort((a, b) => getTRLGap(b) - getTRLGap(a) || (b.ad2?.max ?? 0) - (a.ad2?.max ?? 0))
	);

	const riskGroups = $derived.by(() => {
		const groups: Record<string, TRLAssessment[]> = { 'project-ending': [], 'architecture-change': [], 'schedule-delay': [], 'cost-increase': [] };
		for (const a of TRL_ASSESSMENTS) groups[a.riskIfFail].push(a);
		return groups;
	});

	// Evidence register is large; load it when a card asks for it
	type EvidenceSet = Record<string, { model: string; name: string; items: { claim: string | null; source: string | null; scaleDemonstrated: string | null; scaleRatio: string | null; confident: boolean }[] }[]>;
	let evidence = $state<EvidenceSet | null>(null);
	async function loadEvidence() {
		if (!evidence) evidence = (await import('$lib/data/phase-0-readiness-evidence.json')).default as EvidenceSet;
	}

	let open = $state<Record<string, 'path' | 'evidence' | 'panel' | null>>({});
	async function toggle(id: string, what: 'path' | 'evidence' | 'panel') {
		open = { ...open, [id]: open[id] === what ? null : what };
		if (what === 'evidence') await loadEvidence();
	}

	const fmt = (min: number, max?: number | null) => (max != null && max !== min ? `${min}–${max}` : `${min}`);

	function getTRLBarColor(trl: number): string {
		if (trl >= 7) return '#4ade80';
		if (trl >= 5) return '#facc15';
		if (trl >= 3) return '#f97316';
		return '#ef4444';
	}
	function gapColor(gap: number): string {
		if (gap <= 1) return 'text-green-400';
		if (gap <= 3) return 'text-amber-400';
		return 'text-red-400';
	}
	function ad2Color(ad2: number): string {
		if (ad2 >= 7) return 'text-red-400';
		if (ad2 >= 5) return 'text-amber-400';
		return 'text-green-400';
	}
	const agreementClass: Record<string, string> = {
		agree: 'bg-space-600 text-star-dim border-space-500',
		diverge: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
		ruled: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
	};
	const phaseLabel = (p: TRLAssessment['phaseNeed']) => (Array.isArray(p) ? p.join(' / ') : (p ?? '—'));
</script>

<svelte:head>
	<title>Technology Readiness Assessment - Project Dyson</title>
	<meta
		name="description"
		content="Phase 0 technology readiness re-baseline: 26 critical technologies rated on TRL and AD² by a three-model panel, with every model's rating, evidence and development path."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<nav class="mb-8 flex flex-wrap gap-2 text-sm">
		<a href="/analysis/feasibility" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Feasibility Report</a>
		<a href="/analysis/critical-path" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Critical Path</a>
		<a href="/analysis/technology-readiness" class="px-3 py-1.5 rounded-lg bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30 font-medium">TRL Dashboard</a>
		<a href="/analysis/decision-gates" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Decision Gates</a>
		<a href="/analysis/cost-reconciliation" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Cost Reconciliation</a>
	</nav>

	<div class="mb-10">
		<div class="flex items-center gap-3 mb-4">
			<div class="w-10 h-10 rounded-lg bg-cosmic-cyan/20 flex items-center justify-center">
				<svg class="w-6 h-6 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
			</div>
			<h1 class="text-3xl md:text-4xl font-bold text-star-white">Technology Readiness Assessment</h1>
		</div>
		<p class="text-star-dim text-lg max-w-3xl">
			The critical technologies of the revised Phase 0 architecture, each rated on the NASA Technology Readiness
			Level (TRL) scale and on AD² (advancement degree of difficulty, 1–9) at the scale and environment Phase 0
			actually needs. Three models rated each one independently ({TRL_SOURCE.panel.join(', ')}); the headline is
			the range across the panel, never an average, and every model's rating is kept.
		</p>
		<p class="text-sm text-star-faint mt-3 max-w-3xl">
			Re-baselined {assessedDate} under decision D-02: KDP-0B, the one-way commitment to production, needs TRL 6 in a
			relevant environment with no waivers for project-ending technologies. Source:
			<code class="text-xs">{TRL_SOURCE.baseline}</code>.
		</p>
	</div>

	<div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Technologies</div>
			<div class="text-3xl font-bold text-star-white">{stats.totalTechnologies}</div>
			<div class="text-xs text-star-faint mt-1">{stats.byPhaseNeed['0A']} needed in 0A · {stats.byPhaseNeed['0B']} in 0B</div>
		</div>
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Current TRL range</div>
			<div class="text-3xl font-bold text-orange-400">{stats.lowestTRL}–{stats.highestTRL}</div>
			<div class="text-xs text-star-faint mt-1">Average gap {stats.averageGap} levels (lower bound)</div>
		</div>
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Project-ending</div>
			<div class="text-3xl font-bold text-red-400">{stats.projectEndingRisks}</div>
			<div class="text-xs text-star-faint mt-1">+ {stats.architectureChangeRisks} architecture-change</div>
		</div>
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Panel</div>
			<div class="text-3xl font-bold text-star-white">{stats.diverging}<span class="text-base text-star-faint"> diverge</span></div>
			<div class="text-xs text-star-faint mt-1">{stats.ruled} set by owner ruling · max AD² {stats.maxAD2}</div>
		</div>
		<div class="card-glow p-5">
			<div class="text-sm text-star-faint mb-1">Awaiting a ruling</div>
			<div class="text-3xl font-bold text-violet-300">{stats.awaitingRuling}</div>
			<div class="text-xs text-star-faint mt-1">risk class or criterion open; see <a href="/analysis/decision-gates#rulings" class="text-cosmic-cyan hover:underline">rulings</a></div>
		</div>
	</div>

	<div class="card-glow p-5 mb-10">
		<h2 class="text-sm font-medium text-star-dim mb-3">TRL Scale Reference</h2>
		<div class="grid grid-cols-3 md:grid-cols-9 gap-2">
			{#each Array.from({ length: 9 }, (_, i) => i + 1) as level}
				<div class="text-center">
					<div class="w-full h-2 rounded-full mb-1" style="background-color: {getTRLBarColor(level)}; opacity: {0.3 + level * 0.08}"></div>
					<div class="text-xs font-bold text-star-white">{level}</div>
					<div class="text-[10px] leading-tight text-star-faint">{TRL_LABELS[level]}</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="mb-10">
		<div class="flex flex-wrap items-end justify-between gap-4 mb-6">
			<h2 class="text-2xl font-bold text-star-white">Technology Assessments</h2>
			<div class="flex flex-wrap gap-2 text-sm">
				{#each [['all', 'All phases'], ['0A', 'Needed in 0A'], ['0B', 'Needed in 0B']] as [v, l]}
					<button onclick={() => (phaseFilter = v as typeof phaseFilter)} class="px-3 py-1 rounded-lg border {phaseFilter === v ? 'bg-cosmic-cyan/20 text-cosmic-cyan border-cosmic-cyan/40' : 'border-space-500 text-star-dim hover:text-star-white'}">{l}</button>
				{/each}
				<select bind:value={riskFilter} class="px-3 py-1 rounded-lg bg-space-800 border border-space-500 text-star-dim">
					<option value="all">All risk classes</option>
					{#each Object.entries(RISK_LABELS) as [k, v]}
						<option value={k}>{v.label}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="space-y-6">
			{#each shown as a (a.id)}
				{@const thread = threadMap.get(a.threadId)}
				{@const gap = getTRLGap(a)}
				{@const riskInfo = RISK_LABELS[a.riskIfFail]}
				<div class="card-glow p-6" id={a.id}>
					<div class="flex flex-wrap items-start justify-between gap-3 mb-4">
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-semibold text-star-white mb-1"><span class="font-mono text-star-faint mr-2">{a.id}</span>{a.technology}</h3>
							<p class="text-sm text-star-dim"><span class="text-star-faint">Required:</span> {a.required}</p>
						</div>
						<div class="flex flex-wrap items-center gap-2 flex-shrink-0">
							{#if thread}
								<span class="px-2.5 py-1 rounded-full text-xs font-medium" style="background-color: {thread.color}20; color: {thread.color}; border: 1px solid {thread.color}40">{thread.name}</span>
							{/if}
							<span class="px-2.5 py-1 rounded-full text-xs font-medium bg-space-600 text-star-dim border border-space-500">Needed in {phaseLabel(a.phaseNeed)}</span>
							<span class="px-2.5 py-1 rounded-full text-xs font-medium border {agreementClass[a.agreement ?? 'agree']}">{AGREEMENT_LABELS[a.agreement ?? 'agree']}</span>
							<span class="px-2.5 py-1 rounded-full text-xs font-medium" style="background-color: {riskInfo.color}20; color: {riskInfo.color}; border: 1px solid {riskInfo.color}40">{riskInfo.label}</span>
						</div>
					</div>

					<div class="mb-4">
						<div class="flex flex-wrap items-center justify-between gap-2 text-xs text-star-faint mb-1.5">
							<span>Current TRL: <span class="font-bold text-star-white">{fmt(a.currentTRL, a.currentTRLMax)}</span>{#if a.conditionalTRL}<span class="text-emerald-300"> (TRL {a.conditionalTRL} conditional)</span>{/if}</span>
							<span>Target: <span class="font-bold text-star-white">TRL {a.targetTRL}</span></span>
							<span>AD²: <span class="font-bold {ad2Color(a.ad2?.max ?? 0)}">{a.ad2 ? fmt(a.ad2.min, a.ad2.max) : '—'}</span></span>
							<span class={gapColor(gap)}>Gap: {gap} level{gap !== 1 ? 's' : ''}</span>
							<span>{fmt(a.yearsToTarget, a.yearsToTargetMax)} years to target</span>
						</div>
						<div class="relative h-8 bg-space-900 rounded-lg overflow-hidden border border-space-500">
							<div class="absolute top-0 left-0 h-full rounded-lg border-2 border-dashed opacity-30" style="width: {(a.targetTRL / 9) * 100}%; border-color: {getTRLBarColor(a.currentTRL)}"></div>
							<div class="absolute top-0 left-0 h-full rounded-l-lg" style="width: {(a.currentTRL / 9) * 100}%; background-color: {getTRLBarColor(a.currentTRL)}"></div>
							{#if a.currentTRLMax}
								<div class="absolute top-0 left-0 h-full rounded-l-lg opacity-40" style="width: {(a.currentTRLMax / 9) * 100}%; background-color: {getTRLBarColor(a.currentTRL)}"></div>
							{/if}
							<div class="absolute inset-0 flex items-center">
								{#each Array.from({ length: 9 }, (_, i) => i + 1) as level}
									<div class="absolute text-[10px] font-medium" style="left: {((level - 0.5) / 9) * 100}%">
										<span class={level <= a.currentTRL ? 'text-space-900 font-bold' : level <= a.targetTRL ? 'text-star-faint' : 'text-space-500'}>{level}</span>
									</div>
								{/each}
							</div>
						</div>
					</div>

					<!-- Per-model ratings, always visible: divergence is part of the rating -->
					{#if a.panelRatings}
						<div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
							{#each a.panelRatings as r}
								<div class="p-2.5 rounded-lg bg-space-600/50 border border-space-500 text-xs">
									<div class="font-medium text-star-white mb-1">{r.name}</div>
									<div class="text-star-dim">
										TRL {fmt(r.currentTRL.min, r.currentTRL.max)} → {r.targetTRL} · AD² {r.ad2} · {r.yearsToTarget ? `${fmt(r.yearsToTarget.min, r.yearsToTarget.max)} yr` : 'no estimate'}
									</div>
									<div class="text-star-faint mt-0.5">{RISK_LABELS[r.riskIfFail]?.label ?? r.riskIfFail} · confidence {r.confidence ?? '—'}</div>
								</div>
							{/each}
						</div>
					{/if}

					{#if a.ownerRuling}
						<div class="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-sm">
							<span class="text-emerald-300 font-medium">Owner ruling ({a.ownerRuling.decided}):</span>
							<span class="text-star-dim">rates {a.ownerRuling.assessedObject}</span>
						</div>
					{/if}

					{#if a.rulingStatus}
						<div class="mb-4">
							<h4 class="text-xs font-medium text-star-faint uppercase tracking-wider mb-1.5">Ruling status</h4>
							<RulingStatus status={a.rulingStatus} />
						</div>
					{/if}

					<div class="mb-4">
						<h4 class="text-xs font-medium text-star-faint uppercase tracking-wider mb-1">Where the evidence stands</h4>
						<p class="text-sm text-star-dim">{a.evidence}</p>
					</div>

					<div class="flex flex-wrap gap-4 mb-2 text-sm">
						<button onclick={() => toggle(a.id, 'path')} class="font-medium text-cosmic-cyan hover:text-cosmic-cyan/80">{open[a.id] === 'path' ? '▾' : '▸'} Development path ({a.path?.length ?? 0} steps)</button>
						<button onclick={() => toggle(a.id, 'evidence')} class="font-medium text-cosmic-cyan hover:text-cosmic-cyan/80">{open[a.id] === 'evidence' ? '▾' : '▸'} Evidence register</button>
						<button onclick={() => toggle(a.id, 'panel')} class="font-medium text-cosmic-cyan hover:text-cosmic-cyan/80">{open[a.id] === 'panel' ? '▾' : '▸'} Unmet exit criteria and fallbacks</button>
					</div>

					{#if open[a.id] === 'path'}
						<div class="mt-2 overflow-x-auto">
							<table class="w-full text-xs">
								<thead><tr class="text-left text-star-faint border-b border-space-500"><th class="py-1.5 pr-3">Step</th><th class="py-1.5 pr-3">Content (contributors)</th><th class="py-1.5 pr-3">Cost / duration by model</th><th class="py-1.5">TRL reached</th></tr></thead>
								<tbody>
									{#each a.path ?? [] as p}
										<tr class="border-b border-space-600/60 align-top">
											<td class="py-1.5 pr-3 text-star-white font-medium">{p.step}</td>
											<td class="py-1.5 pr-3 text-star-dim">{p.content}</td>
											<td class="py-1.5 pr-3 text-star-dim">{p.costByModel}</td>
											<td class="py-1.5 text-star-dim">{p.trlReached}</td>
										</tr>
									{/each}
								</tbody>
							</table>
							<p class="text-[11px] text-star-faint mt-2">Ranges are each model's own estimate, attributed and not summed. Full synthesis: <code>{a.source}</code></p>
						</div>
					{:else if open[a.id] === 'evidence'}
						<div class="mt-2 space-y-3">
							{#if !evidence}
								<p class="text-xs text-star-faint">Loading…</p>
							{:else}
								{#each evidence[a.id] ?? [] as m}
									<div>
										<div class="text-xs font-medium text-star-white mb-1">{m.name} ({m.items.length})</div>
										<ul class="space-y-1">
											{#each m.items as e}
												<li class="text-xs text-star-dim">
													<span class={e.confident ? 'text-emerald-300' : 'text-amber-300'} title={e.confident ? 'Model confident in this source' : 'Model unsure or unverified'}>{e.confident ? '●' : '○'}</span>
													{e.claim} <span class="text-star-faint">— {e.source}</span>
													{#if e.scaleDemonstrated}<span class="text-star-faint"> · shown at {e.scaleDemonstrated}</span>{/if}
													{#if e.scaleRatio}<span class="text-orange-300/80"> · gap {e.scaleRatio}</span>{/if}
												</li>
											{/each}
										</ul>
									</div>
								{/each}
								<p class="text-[11px] text-star-faint">● cited as confident · ○ the citing model marked it unsure or unverified. Citations are the models' and have not all been checked.</p>
							{/if}
						</div>
					{:else if open[a.id] === 'panel'}
						<div class="mt-2 space-y-2">
							{#each a.panelRatings ?? [] as r}
								<div class="p-3 rounded-lg bg-space-600/40 border border-space-500 text-xs">
									<div class="font-medium text-star-white mb-1">{r.name}</div>
									{#if r.unmetExitCriterion}<p class="text-star-dim mb-1"><span class="text-star-faint">First unmet exit criterion:</span> {r.unmetExitCriterion}</p>{/if}
									{#if r.fallback}<p class="text-star-dim"><span class="text-amber-300">Fallback:</span> {r.fallback}</p>{/if}
								</div>
							{/each}
						</div>
					{/if}

					{#if a.relatedQuestionIds.length > 0}
						<div class="mt-4">
							<h4 class="text-xs font-medium text-star-faint uppercase tracking-wider mb-2">Related Research Questions</h4>
							<div class="flex flex-wrap gap-2">
								{#each a.relatedQuestionIds as qId}
									{@const slug = questionSlugMap.get(qId)}
									{#if slug}
										<a href="/questions/{slug}" class="px-2.5 py-1 rounded-full text-xs bg-space-600 text-star-dim hover:text-cosmic-cyan hover:bg-space-500 border border-space-500 hover:border-cosmic-cyan/40 transition-colors" title={questionTitleMap.get(qId)}>{qId.toUpperCase()}</a>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<div class="mb-10">
		<h2 class="text-2xl font-bold text-star-white mb-2">Risk Matrix</h2>
		<p class="text-star-dim text-sm mb-6">
			Technologies grouped by the consequence of failing to reach their target TRL. The headline class is the most severe
			any model gave; where models split, the class waits on an owner ruling (marked ⧗).
		</p>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each Object.entries(riskGroups) as [riskKey, list]}
				{@const riskInfo = RISK_LABELS[riskKey]}
				{#if list.length > 0}
					<div class="card-glow p-5" style="border-color: {riskInfo.color}30">
						<div class="flex items-center gap-2 mb-4">
							<div class="w-3 h-3 rounded-full" style="background-color: {riskInfo.color}"></div>
							<h3 class="text-lg font-semibold" style="color: {riskInfo.color}">{riskInfo.label}</h3>
							<span class="text-sm text-star-faint">({list.length})</span>
						</div>
						<div class="space-y-2">
							{#each list as a}
								{@const thread = threadMap.get(a.threadId)}
								<a href="#{a.id}" class="flex items-center justify-between p-2.5 rounded-lg bg-space-600/50 hover:bg-space-600">
									<div class="flex-1 min-w-0">
										<div class="text-sm font-medium text-star-white truncate">
											<span class="font-mono text-star-faint">{a.id}</span> {a.technology}
											{#if a.rulingStatus?.pending?.length}<span class="text-violet-300" title="Owner ruling pending">⧗</span>{/if}
										</div>
										<div class="flex items-center gap-2 mt-0.5 text-xs">
											{#if thread}<span style="color: {thread.color}">{thread.name}</span>{/if}
											<span class="text-star-faint">TRL {fmt(a.currentTRL, a.currentTRLMax)} / {a.targetTRL} · AD² {a.ad2 ? fmt(a.ad2.min, a.ad2.max) : '—'}</span>
										</div>
									</div>
									<div class="text-xs text-star-faint ml-3">{fmt(a.yearsToTarget, a.yearsToTargetMax)} yr</div>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<details class="card-glow p-6 mb-10">
		<summary class="cursor-pointer text-lg font-semibold text-star-white">March 2026 ratings and what replaced them ({LEGACY_TRL_ASSESSMENTS.length})</summary>
		<p class="text-sm text-star-dim mt-3 mb-4">
			The earlier assessment rated {LEGACY_TRL_ASSESSMENTS.length} technologies, several at a scale the revised architecture
			no longer needs. Every row is either replaced by one or more of the technologies above or deferred, with the reason.
		</p>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead><tr class="text-left text-star-faint border-b border-space-500"><th class="py-2 pr-3">March 2026 row</th><th class="py-2 pr-3">TRL then</th><th class="py-2">Now</th></tr></thead>
				<tbody>
					{#each LEGACY_TRL_ASSESSMENTS as l}
						<tr class="border-b border-space-600/60 align-top">
							<td class="py-2 pr-3 text-star-white">{l.technology}</td>
							<td class="py-2 pr-3 text-star-dim">{fmt(l.currentTRL, l.currentTRLMax)} → {l.targetTRL}</td>
							<td class="py-2 text-star-dim">
								{#if l.supersededBy.length}
									Replaced by {#each l.supersededBy as id, i}<a href="#{id}" class="text-cosmic-cyan hover:underline font-mono">{id}</a>{i < l.supersededBy.length - 1 ? ', ' : ''}{/each}
								{:else}
									Deferred to {l.deferredTo}: {l.retiredReason}
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</details>

	<div class="card-glow p-6">
		<h3 class="text-sm font-medium text-star-dim mb-4">Methodology Notes</h3>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
			<div>
				<h4 class="font-medium text-star-white mb-1">Ratings</h4>
				<p class="text-star-dim">
					Each model rated each technology against written exit criteria, at the required scale, environment and duration,
					with cited evidence. The headline TRL and AD² are the envelope across models; the lower bound drives gap
					calculations. Owner rulings set a headline only where recorded, and the panel ratings stay visible.
				</p>
			</div>
			<div>
				<h4 class="font-medium text-star-white mb-1">AD²</h4>
				<p class="text-star-dim">
					Advancement degree of difficulty (Mankins) rates how hard the remaining path is, from 1 (routine engineering)
					to 9 (new science needed). Two technologies at the same TRL can differ sharply in AD².
				</p>
			</div>
			<div>
				<h4 class="font-medium text-star-white mb-1">Risk class</h4>
				<p class="text-star-dim">
					Project-ending: no fallback keeps 0B production viable. Architecture-change: a costed fallback exists but changes
					the design. Where models split, the most severe class is shown until the owner rules
					(<a href="/questions/gate-risk-class-split-technologies" class="text-cosmic-cyan hover:underline">rq-0-65</a>).
				</p>
			</div>
		</div>
	</div>
</div>
