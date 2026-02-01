<script lang="ts">
	import type { NEA } from '$lib/services/simulation';
	import { generateNEAPopulation, calculateAccessibility } from '$lib/services/simulation';

	interface Props {
		neaCount?: number;
		highlightReachable?: boolean;
		maxDeltaV?: number;
	}

	let { neaCount = 500, highlightReachable = true, maxDeltaV = 8 }: Props = $props();

	// Generate sample NEA population
	const neas = $derived(generateNEAPopulation(neaCount, 12345));

	// Chart dimensions
	const size = 400;
	const center = size / 2;
	const maxRadius = size / 2 - 20;

	// Convert AU to pixel coordinates (max shown is ~4 AU)
	const auToPixel = (au: number): number => (au / 4) * maxRadius;

	// Convert orbital elements to 2D position (simplified top-down view)
	function getPosition(nea: NEA): { x: number; y: number } {
		// Use mean anomaly as angle for visualization
		const angle = (nea.orbital.M + nea.orbital.omega) * (Math.PI / 180);
		// Use semi-major axis as radius
		const r = auToPixel(nea.orbital.a);
		return {
			x: center + r * Math.cos(angle),
			y: center + r * Math.sin(angle)
		};
	}

	// Get color based on reachability
	function getColor(nea: NEA): string {
		if (!highlightReachable) {
			// Color by type
			const typeColors: Record<string, string> = {
				'M': 'var(--color-sun-gold)',
				'C': 'var(--color-cosmic-cyan)',
				'S': 'var(--color-cosmic-purple)',
				'X': 'var(--color-star-dim)'
			};
			return typeColors[nea.type] || 'var(--color-star-faint)';
		}

		// Color by accessibility
		const accessibility = calculateAccessibility(nea.orbital);
		const reachable = accessibility * 10 <= maxDeltaV;

		if (reachable) {
			// High-value reachable = gold, others = cyan
			return nea.miningValue >= 0.5
				? 'var(--color-sun-gold)'
				: 'var(--color-cosmic-cyan)';
		}
		return 'var(--color-space-500)';
	}

	// Orbit circles (AU)
	const orbitCircles = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5];
</script>

<div class="card-glow p-6">
	<div class="flex items-center justify-between mb-4">
		<h3 class="text-lg font-bold text-star-white">NEA Distribution</h3>
		<div class="text-xs text-star-faint">
			{neas.length} objects
		</div>
	</div>

	<div class="flex justify-center">
		<svg viewBox="0 0 {size} {size}" class="w-full max-w-[400px] h-auto">
			<!-- Background -->
			<rect x="0" y="0" width={size} height={size} fill="var(--color-space-800)" rx="8" />

			<!-- Orbit circles -->
			{#each orbitCircles as au}
				<circle
					cx={center}
					cy={center}
					r={auToPixel(au)}
					fill="none"
					stroke="var(--color-space-600)"
					stroke-width="1"
					stroke-dasharray="4,4"
				/>
				{#if au === 1.0}
					<text
						x={center + auToPixel(au) + 5}
						y={center - 5}
						class="text-[10px] fill-star-faint"
					>
						Earth
					</text>
				{/if}
			{/each}

			<!-- Sun -->
			<circle
				cx={center}
				cy={center}
				r="8"
				fill="var(--color-sun-gold)"
				class="drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
			/>

			<!-- Earth orbit marker -->
			<circle
				cx={center + auToPixel(1.0)}
				cy={center}
				r="4"
				fill="var(--color-cosmic-blue)"
			/>

			<!-- NEAs -->
			{#each neas as nea}
				{@const pos = getPosition(nea)}
				{@const color = getColor(nea)}
				<circle
					cx={pos.x}
					cy={pos.y}
					r={Math.max(1.5, nea.miningValue * 3)}
					fill={color}
					opacity={highlightReachable && color === 'var(--color-space-500)' ? 0.3 : 0.8}
				/>
			{/each}

			<!-- Scale indicator -->
			<g transform="translate(20, {size - 30})">
				<line x1="0" y1="0" x2={auToPixel(1)} y2="0" stroke="var(--color-star-dim)" stroke-width="1" />
				<line x1="0" y1="-5" x2="0" y2="5" stroke="var(--color-star-dim)" stroke-width="1" />
				<line x1={auToPixel(1)} y1="-5" x2={auToPixel(1)} y2="5" stroke="var(--color-star-dim)" stroke-width="1" />
				<text x={auToPixel(0.5)} y="15" text-anchor="middle" class="text-[10px] fill-star-dim">1 AU</text>
			</g>
		</svg>
	</div>

	<!-- Legend -->
	<div class="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
		{#if highlightReachable}
			<div class="flex items-center gap-1.5">
				<div class="w-3 h-3 rounded-full bg-sun-gold"></div>
				<span class="text-star-dim">High-value reachable</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-3 h-3 rounded-full bg-cosmic-cyan"></div>
				<span class="text-star-dim">Reachable</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-3 h-3 rounded-full bg-space-500 opacity-30"></div>
				<span class="text-star-dim">Out of reach</span>
			</div>
		{:else}
			<div class="flex items-center gap-1.5">
				<div class="w-3 h-3 rounded-full bg-sun-gold"></div>
				<span class="text-star-dim">M-type (metallic)</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-3 h-3 rounded-full bg-cosmic-cyan"></div>
				<span class="text-star-dim">C-type (carbonaceous)</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-3 h-3 rounded-full bg-cosmic-purple"></div>
				<span class="text-star-dim">S-type (silicaceous)</span>
			</div>
		{/if}
	</div>
</div>
