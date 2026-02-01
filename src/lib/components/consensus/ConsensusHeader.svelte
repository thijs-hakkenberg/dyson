<script lang="ts">
	interface Props {
		itemName: string;
	}

	let { itemName }: Props = $props();
</script>

<div class="rounded-xl bg-gradient-to-r from-cosmic-blue/30 via-cosmic-purple/20 to-cosmic-cyan/30 p-6 border border-cosmic-cyan/20">
	<div class="flex items-start gap-4">
		<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cosmic-cyan to-cosmic-blue flex items-center justify-center flex-shrink-0">
			<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
			</svg>
		</div>
		<div>
			<h2 class="text-xl font-bold text-star-white mb-2">Multi-Model Consensus Analysis</h2>
			<p class="text-star-dim text-sm">
				This synthesis combines insights from <span class="text-orange-400 font-medium">Claude Opus 4.5</span>,
				<span class="text-purple-400 font-medium">Gemini 3 Pro</span>, and
				<span class="text-green-400 font-medium">GPT-5.2</span> to identify areas of agreement,
				highlight divergent perspectives, and surface open research questions for <span class="text-star-white font-medium">{itemName}</span>.
			</p>
		</div>
	</div>
</div>
