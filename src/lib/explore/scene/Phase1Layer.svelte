<script lang="ts">
	import SwarmCloud from './SwarmCloud.svelte';
	import BomMarker from './BomMarker.svelte';
	import Traffic from './Traffic.svelte';
	import { CLOUDS } from '../core/clouds';
	import { lagrangePosition, moonPosition } from '../core/ephemeris';
	import { itemProgress } from '../core/progress';
	import { explorer } from '../core/state.svelte';
	import { PHASE_COLORS } from '../core/theme';

	const color = PHASE_COLORS['phase-1'];
	const tugs = $derived(itemProgress('bom-1-6', 'phase-1', explorer.year));
	const routes = [{ from: moonPosition, to: (y: number) => lagrangePosition('earth', 'L1', y) }];
</script>

<SwarmCloud spec={CLOUDS.find((c) => c.bomId === 'bom-1-1')!} {color} />
<Traffic {routes} {color} packets={4} active={tugs} />
<BomMarker bomId="bom-1-1" />
<BomMarker bomId="bom-1-4" />
<BomMarker bomId="bom-1-5" />
