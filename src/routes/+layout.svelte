<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Project Dyson</title>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />

	<main class="flex-1 pt-16">
		{@render children()}
	</main>

	<Footer />
</div>
