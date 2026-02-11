<script lang="ts">
	import { isTagMapped, resolveTagsToTopics } from '$lib/services/ontology';

	interface Props {
		tag: string;
		linked?: boolean;
	}

	let { tag, linked = true }: Props = $props();

	let topics = $derived(resolveTagsToTopics([tag]));
	let mapped = $derived(topics.length > 0);
	let topicId = $derived(mapped ? topics[0].id : null);
</script>

{#if mapped && linked && topicId}
	<a
		href="/topics/{topicId}"
		class="inline-flex items-center px-2 py-0.5 text-xs rounded-full
			bg-cosmic-blue/20 text-cosmic-cyan hover:bg-cosmic-blue/30 transition-colors"
	>
		{tag}
	</a>
{:else if mapped}
	<span
		class="inline-flex items-center px-2 py-0.5 text-xs rounded-full
			bg-cosmic-blue/20 text-cosmic-cyan"
	>
		{tag}
	</span>
{:else}
	<span
		class="inline-flex items-center px-2 py-0.5 text-xs rounded-full
			bg-space-600 text-star-faint"
	>
		{tag}
	</span>
{/if}
