<script lang="ts">
	/**
	 * Scales the opacity of every material below it by `factor`. Child
	 * components may keep changing their own opacity; the group notices and
	 * treats the new value as the base.
	 */
	import { T, useTask } from '@threlte/core';
	import type { Snippet } from 'svelte';
	import type { Group, Material, Object3D } from 'three';

	let { factor, children }: { factor: number; children?: Snippet } = $props();

	let ref = $state.raw<Group>();

	interface Faded {
		base: number;
		applied: number;
		transparent: boolean;
	}
	const seen = new WeakMap<Material, Faded>();

	function apply(m: Material, f: number) {
		let s = seen.get(m);
		if (!s || m.opacity !== s.applied) {
			// First sight, or the owner changed opacity since we last set it
			s = { base: m.opacity, applied: m.opacity, transparent: s?.transparent ?? m.transparent };
			seen.set(m, s);
		}
		const next = s.base * f;
		if (next === s.applied) return;
		const wantTransparent = s.transparent || f < 1;
		if (m.transparent !== wantTransparent) {
			m.transparent = wantTransparent;
			m.needsUpdate = true;
		}
		m.opacity = next;
		s.applied = next;
	}

	useTask(() => {
		if (!ref) return;
		const f = factor;
		ref.traverse((o: Object3D) => {
			const mat = (o as Object3D & { material?: Material | Material[] }).material;
			if (!mat) return;
			if (Array.isArray(mat)) mat.forEach((m) => apply(m, f));
			else apply(mat, f);
		});
	});
</script>

<T.Group bind:ref>
	{@render children?.()}
</T.Group>
