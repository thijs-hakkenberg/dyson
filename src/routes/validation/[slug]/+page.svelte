<script lang="ts">
	import { ValidationStatus, ValidationHistory, ValidationCard } from '$lib/components/validation';

	let { data } = $props();

	const claim = $derived(data.claim);
	const relatedValidations = $derived(data.relatedValidations);

	const phaseLabels: Record<string, string> = {
		'phase-0': 'Phase 0 - Resource Acquisition',
		'phase-1': 'Phase 1 - Initial Swarm Deployment',
		'phase-2': 'Phase 2 - Swarm Expansion'
	};

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{claim.claim.slice(0, 60)}... - Validation - Project Dyson</title>
	<meta name="description" content="Validation tracking for: {claim.claim}" />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Breadcrumb -->
	<nav class="mb-8">
		<ol class="flex items-center gap-2 text-sm flex-wrap">
			<li><a href="/validation" class="text-star-dim hover:text-cosmic-cyan">Validation</a></li>
			<li class="text-star-faint">/</li>
			<li class="text-star-white truncate max-w-[300px]">{claim.claim.slice(0, 50)}...</li>
		</ol>
	</nav>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Main Content -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Claim Card -->
			<div class="card-glow p-6 md:p-8">
				<!-- Status -->
				<div class="flex justify-between items-start mb-4">
					<ValidationStatus status={claim.status} size="lg" />
					<span class="text-sm text-star-faint">
						Last updated: {formatDate(claim.lastUpdated)}
					</span>
				</div>

				<!-- Claim Text -->
				<h1 class="text-xl md:text-2xl font-bold text-star-white mb-4 leading-relaxed">
					{claim.claim}
				</h1>

				<!-- Tags -->
				<div class="flex flex-wrap gap-2 mb-6">
					{#each claim.tags as tag}
						<span class="px-2 py-1 text-sm rounded bg-space-600 text-star-faint">
							{tag}
						</span>
					{/each}
				</div>

				<!-- Source Info -->
				<div class="p-4 rounded-lg bg-space-700 border-l-4 border-cosmic-cyan">
					<div class="text-xs text-star-faint uppercase tracking-wider mb-1">Original Source</div>
					<p class="text-star-dim">{claim.claimSource}</p>
				</div>
			</div>

			<!-- Validation History -->
			<div class="card-glow p-6 md:p-8">
				<h2 class="text-lg font-bold text-star-white mb-6">Validation History</h2>
				<ValidationHistory validations={claim.validations} showAll={true} />
			</div>
		</div>

		<!-- Sidebar -->
		<div class="lg:col-span-1 space-y-6">
			<!-- Metadata -->
			<div class="card-glow p-6">
				<h3 class="text-lg font-bold text-star-white mb-4">Details</h3>

				<dl class="space-y-4">
					<!-- Phase -->
					{#if claim.phaseId}
						<div>
							<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Phase</dt>
							<dd>
								<a
									href="/plan/{claim.phaseId}"
									class="text-cosmic-cyan hover:underline"
								>
									{phaseLabels[claim.phaseId] || claim.phaseId}
								</a>
							</dd>
						</div>
					{/if}

					<!-- BOM Item -->
					{#if claim.bomItemId}
						<div>
							<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Related BOM Item</dt>
							<dd>
								<span class="px-2 py-1 text-sm rounded bg-cosmic-blue/20 text-cosmic-cyan font-mono">
									{claim.bomItemId}
								</span>
							</dd>
						</div>
					{/if}

					<!-- Research Question -->
					{#if claim.questionId}
						<div>
							<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Related Question</dt>
							<dd>
								<a
									href="/questions?search={claim.questionId}"
									class="px-2 py-1 text-sm rounded bg-purple-500/20 text-purple-400 inline-block hover:bg-purple-500/30 transition-colors"
								>
									{claim.questionId}
								</a>
							</dd>
						</div>
					{/if}

					<!-- Claim ID -->
					<div>
						<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Claim ID</dt>
						<dd class="font-mono text-star-dim">{claim.id}</dd>
					</div>

					<!-- Validation Count -->
					<div>
						<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Validations</dt>
						<dd class="text-star-white">{claim.validations.length}</dd>
					</div>
				</dl>
			</div>

			<!-- Navigation -->
			<div class="card-glow p-6">
				<h3 class="text-lg font-bold text-star-white mb-4">Navigation</h3>
				<div class="space-y-3">
					<a
						href="/validation"
						class="flex items-center gap-2 text-cosmic-cyan hover:underline"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						All Validations
					</a>
					{#if claim.phaseId}
						<a
							href="/plan/{claim.phaseId}"
							class="flex items-center gap-2 text-cosmic-cyan hover:underline"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							View Phase
						</a>
					{/if}
					<a
						href="/questions"
						class="flex items-center gap-2 text-cosmic-cyan hover:underline"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Research Questions
					</a>
				</div>
			</div>

			<!-- Related Validations -->
			{#if relatedValidations.length > 0}
				<div class="card-glow p-6">
					<h3 class="text-lg font-bold text-star-white mb-4">Related Claims</h3>
					<div class="space-y-3">
						{#each relatedValidations as related}
							<a
								href="/validation/{related.slug}"
								class="block p-3 rounded-lg bg-space-700 hover:bg-space-600 transition-colors"
							>
								<div class="flex items-center gap-2 mb-1">
									<ValidationStatus status={related.status} size="sm" showIcon={false} />
								</div>
								<p class="text-sm text-star-white line-clamp-2">
									{related.claim}
								</p>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
