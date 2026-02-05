<script lang="ts">
	import { QuestionsList } from '$lib/components/organizations';

	let { data } = $props();

	const org = $derived(data.organization);

	const categoryLabels: Record<string, string> = {
		'space-agency': 'Space Agency',
		'propulsion-lab': 'Propulsion Lab',
		'pv-research': 'PV Research',
		manufacturing: 'Manufacturing',
		university: 'University',
		'standards-body': 'Standards Body'
	};
</script>

<svelte:head>
	<title>{org.shortName || org.name} - Organizations - Project Dyson</title>
	<meta name="description" content={org.description} />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Breadcrumb -->
	<nav class="mb-8">
		<ol class="flex items-center gap-2 text-sm">
			<li>
				<a href="/organizations" class="text-star-dim hover:text-cosmic-cyan">Organizations</a>
			</li>
			<li class="text-star-faint">/</li>
			<li class="text-star-white">{org.shortName || org.name}</li>
		</ol>
	</nav>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Main Content -->
		<div class="lg:col-span-2 space-y-8">
			<!-- Header -->
			<div class="card-glow p-6">
				<div class="flex items-start justify-between gap-4 mb-4">
					<div>
						<span class="text-xs text-star-faint">{categoryLabels[org.category]}</span>
						<h1 class="text-2xl md:text-3xl font-bold text-star-white">
							{org.shortName || org.name}
						</h1>
						{#if org.shortName}
							<p class="text-star-dim">{org.name}</p>
						{/if}
					</div>
					<a
						href={org.website}
						target="_blank"
						rel="noopener noreferrer"
						class="text-cosmic-cyan hover:underline text-sm flex items-center gap-1"
					>
						Website
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				</div>

				<p class="text-star-dim mb-4">{org.description}</p>

				<!-- Domains -->
				<div class="flex flex-wrap gap-2">
					{#each org.relevantDomains as domain}
						<span class="px-2 py-1 text-xs rounded bg-space-600 text-star-faint">
							{domain}
						</span>
					{/each}
				</div>
			</div>

			<!-- Questions Section -->
			<div>
				<h2 class="text-xl font-bold text-star-white mb-4">
					Outreach Questions ({org.questions.length})
				</h2>
				<QuestionsList questions={org.questions} />
			</div>
		</div>

		<!-- Sidebar -->
		<div class="lg:col-span-1 space-y-6">
			<!-- Stats -->
			<div class="card-glow p-6">
				<h3 class="text-lg font-bold text-star-white mb-4">Question Status</h3>
				<div class="space-y-2">
					{#each Object.entries(org.questionStats.byStatus) as [status, count]}
						{#if count > 0}
							<div class="flex justify-between items-center">
								<span class="text-star-dim text-sm capitalize"
									>{status.replace('-', ' ')}</span
								>
								<span class="text-star-white font-medium">{count}</span>
							</div>
						{/if}
					{/each}
				</div>

				{#if org.lastContact}
					<div class="mt-4 pt-4 border-t border-space-500">
						<p class="text-xs text-star-faint">Last Contact</p>
						<p class="text-star-white">{org.lastContact}</p>
					</div>
				{/if}
			</div>

			<!-- Contacts -->
			{#if org.contacts.length > 0}
				<div class="card-glow p-6">
					<h3 class="text-lg font-bold text-star-white mb-4">Contacts</h3>
					<div class="space-y-4">
						{#each org.contacts as contact}
							<div class="p-3 rounded bg-space-700">
								<p class="text-star-white font-medium">{contact.name}</p>
								<p class="text-xs text-star-dim">{contact.role}</p>
								{#if contact.department}
									<p class="text-xs text-star-faint">{contact.department}</p>
								{/if}
								{#if contact.notes}
									<p class="text-xs text-star-faint mt-2 italic">{contact.notes}</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Navigation -->
			<div class="card-glow p-6">
				<h3 class="text-lg font-bold text-star-white mb-4">Navigation</h3>
				<div class="space-y-3">
					<a
						href="/organizations"
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
						All Organizations
					</a>
					<a href="/questions" class="flex items-center gap-2 text-cosmic-cyan hover:underline">
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
		</div>
	</div>
</div>
