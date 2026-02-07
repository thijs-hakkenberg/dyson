<script lang="ts">
	import { QuestionDetail, QuestionCard } from '$lib/components/questions';
	import { ValidationStatus, ValidationCard } from '$lib/components/validation';

	let { data } = $props();

	const question = $derived(data.question);
	const relatedQuestions = $derived(data.relatedQuestions);
	const relatedValidations = $derived(data.relatedValidations);
	const discussion = $derived(data.discussion);

	const phaseLabels: Record<string, string> = {
		'phase-0': 'Phase 0',
		'phase-1': 'Phase 1',
		'phase-2': 'Phase 2'
	};
</script>

<svelte:head>
	<title>{question.title} - Research Questions - Project Dyson</title>
	<meta name="description" content={question.description} />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Breadcrumb -->
	<nav class="mb-8">
		<ol class="flex items-center gap-2 text-sm flex-wrap">
			<li><a href="/questions" class="text-star-dim hover:text-cosmic-cyan">Questions</a></li>
			<li class="text-star-faint">/</li>
			<li>
				<a
					href="/questions?phase={question.sourcePhaseId}"
					class="text-star-dim hover:text-cosmic-cyan"
				>
					{phaseLabels[question.sourcePhaseId]}
				</a>
			</li>
			<li class="text-star-faint">/</li>
			<li class="text-star-white truncate max-w-[200px]">{question.title}</li>
		</ol>
	</nav>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Main Content -->
		<div class="lg:col-span-2">
			<QuestionDetail {question} {discussion} />
		</div>

		<!-- Sidebar -->
		<div class="lg:col-span-1 space-y-6">
			<!-- Related Questions -->
			{#if relatedQuestions.length > 0}
				<div class="card-glow p-6">
					<h3 class="text-lg font-bold text-star-white mb-4">Related Questions</h3>
					<div class="space-y-4">
						{#each relatedQuestions as related}
							<a
								href="/questions/{related.slug}"
								class="block p-3 rounded-lg bg-space-700 hover:bg-space-600 transition-colors"
							>
								<h4 class="text-sm font-medium text-star-white line-clamp-2 mb-1">
									{related.title}
								</h4>
								<div class="flex items-center gap-2 text-xs text-star-faint">
									<span class="capitalize">{related.priority}</span>
									<span>-</span>
									<span class="capitalize">{related.status}</span>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Related Validations -->
			{#if relatedValidations.length > 0}
				<div class="card-glow p-6">
					<h3 class="text-lg font-bold text-star-white mb-4">Related Validations</h3>
					<div class="space-y-4">
						{#each relatedValidations.slice(0, 3) as validation}
							<a
								href="/validation/{validation.slug}"
								class="block p-3 rounded-lg bg-space-700 hover:bg-space-600 transition-colors"
							>
								<div class="flex items-center gap-2 mb-2">
									<ValidationStatus status={validation.status} size="sm" showIcon={false} />
								</div>
								<p class="text-sm text-star-white line-clamp-2 mb-1">
									{validation.claim}
								</p>
								<span class="text-xs text-star-faint">
									{validation.validations.length} validation{validation.validations.length !== 1 ? 's' : ''}
								</span>
							</a>
						{/each}
						{#if relatedValidations.length > 3}
							<a
								href="/validation?search={question.id}"
								class="block text-center text-sm text-cosmic-cyan hover:underline py-2"
							>
								View all {relatedValidations.length} validations
							</a>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Navigation -->
			<div class="card-glow p-6">
				<h3 class="text-lg font-bold text-star-white mb-4">Navigation</h3>
				<div class="space-y-3">
					<a
						href="/questions"
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
						All Questions
					</a>
					<a
						href="/plan/{question.sourcePhaseId}/bom/{question.sourceBOMItemSlug}"
						class="flex items-center gap-2 text-cosmic-cyan hover:underline"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
							/>
						</svg>
						View BOM Item
					</a>
					<a
						href="/plan/{question.sourcePhaseId}"
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
					<a
						href="/validation"
						class="flex items-center gap-2 text-cosmic-cyan hover:underline"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Validation Tracking
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
