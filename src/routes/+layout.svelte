<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { initMixpanel, trackPageView, trackTimeOnPage } from '$lib/services/mixpanel';
	import { onMount, untrack } from 'svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	let pageStartTime = 0;
	let currentPath = '';

	// Initialize Mixpanel on mount
	onMount(() => {
		initMixpanel();
	});

	// Only the pathname drives page views; query-string updates (e.g. the
	// explorer's shareable state) must not count as new views.
	const pathname = $derived($page.url.pathname);

	// Track page views and time on page
	$effect(() => {
		const path = pathname;

		// Track time on previous page if exists
		if (currentPath && pageStartTime) {
			const timeSpent = (Date.now() - pageStartTime) / 1000;
			trackTimeOnPage(currentPath, timeSpent);
		}

		// Track new page view
		if (path) {
			trackPageView(path, {
				url: untrack(() => $page.url.href),
				referrer: document.referrer
			});

			currentPath = path;
			pageStartTime = Date.now();
		}

		// Cleanup: track time when user leaves the site
		return () => {
			if (currentPath && pageStartTime) {
				const timeSpent = (Date.now() - pageStartTime) / 1000;
				trackTimeOnPage(currentPath, timeSpent);
			}
		};
	});
</script>

<svelte:head>
	<title>Project Dyson</title>
</svelte:head>

{#if $page.url.pathname.startsWith('/explore')}
	<!-- Full-screen immersive explorer: no site chrome -->
	{@render children()}
{:else}
	<div class="min-h-screen flex flex-col">
		<Header />

		<main class="flex-1 pt-16">
			{@render children()}
		</main>

		<Footer />
	</div>
{/if}
