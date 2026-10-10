<script lang="ts">
	import SwarmCloud from './SwarmCloud.svelte';
	import BomMarker from './BomMarker.svelte';
	import { CLOUDS } from '../core/clouds';
	import { PHASE_COLORS } from '../core/theme';
</script>

<SwarmCloud spec={CLOUDS.find((c) => c.bomId === 'bom-2-1')!} color={PHASE_COLORS['phase-2']} />
<BomMarker bomId="bom-2-1" />
