<script lang="ts">
	/** A group whose position follows a time-dependent function each frame. */
	import { T, useTask } from '@threlte/core';
	import type { Group } from 'three';
	import type { Snippet } from 'svelte';
	import { explorer } from '../core/state.svelte';
	import type { Vec3 } from '../core/registry';

	let { position, children }: { position: (year: number) => Vec3; children?: Snippet } = $props();

	let ref = $state.raw<Group>();

	useTask(() => {
		if (!ref) return;
		const p = position(explorer.year);
		ref.position.set(p[0], p[1], p[2]);
	});
</script>

<T.Group bind:ref>
	{@render children?.()}
</T.Group>
