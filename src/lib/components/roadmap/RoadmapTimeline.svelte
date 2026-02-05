<script lang="ts">
	import type { Experiment, RoadmapMilestone } from '$lib/types/roadmap';
	import { experimentStatusColors, experimentStatusLabels } from '$lib/types/roadmap';

	interface Props {
		experiments: Experiment[];
		milestones: RoadmapMilestone[];
		yearRange: { start: number; end: number };
	}

	let { experiments, milestones, yearRange }: Props = $props();

	// SVG dimensions
	const width = 1000;
	const height = 500;
	const padding = { top: 60, right: 40, bottom: 60, left: 40 };
	const innerWidth = width - padding.left - padding.right;
	const innerHeight = height - padding.top - padding.bottom;

	// Calculate positions
	const years = $derived.by(() => {
		const result: number[] = [];
		for (let y = yearRange.start; y <= yearRange.end; y++) {
			result.push(y);
		}
		return result;
	});

	const yearWidth = $derived(innerWidth / (years.length - 1 || 1));

	function getXPosition(dateStr: string): number {
		const year = parseInt(dateStr.split('-')[0], 10);
		const monthStr = dateStr.split('-')[1];
		const month = monthStr ? parseInt(monthStr, 10) - 1 : 6; // Default to mid-year
		const yearIndex = year - yearRange.start;
		const monthFraction = month / 12;
		return padding.left + yearIndex * yearWidth + monthFraction * yearWidth;
	}

	// Group experiments by status for vertical positioning
	const statusOrder: Record<string, number> = {
		'in-progress': 0,
		funded: 1,
		proposed: 2,
		completed: 3,
		cancelled: 4
	};

	const sortedExperiments = $derived(
		[...experiments].sort((a, b) => {
			// Sort by year first, then by status
			const yearA = parseInt(a.targetDate.split('-')[0], 10);
			const yearB = parseInt(b.targetDate.split('-')[0], 10);
			if (yearA !== yearB) return yearA - yearB;
			return statusOrder[a.status] - statusOrder[b.status];
		})
	);

	// Calculate Y positions to avoid overlaps
	const experimentPositions = $derived.by(() => {
		const positions: Map<string, { x: number; y: number }> = new Map();
		const usedSlots: { x: number; y: number; width: number }[] = [];

		const baseY = padding.top + 40;
		const rowHeight = 55;
		const nodeWidth = 180;

		for (const exp of sortedExperiments) {
			const x = getXPosition(exp.targetDate);

			// Find available Y slot
			let y = baseY;
			let slotFound = false;

			for (let row = 0; row < 6 && !slotFound; row++) {
				const testY = baseY + row * rowHeight;
				const overlaps = usedSlots.some(
					(slot) =>
						Math.abs(slot.x - x) < nodeWidth && Math.abs(slot.y - testY) < rowHeight * 0.8
				);

				if (!overlaps) {
					y = testY;
					slotFound = true;
				}
			}

			positions.set(exp.id, { x, y });
			usedSlots.push({ x, y, width: nodeWidth });
		}

		return positions;
	});

	// Milestone positions
	const milestoneY = padding.top + innerHeight - 30;

	// Status color mapping for SVG
	const svgStatusColors: Record<string, { fill: string; stroke: string }> = {
		proposed: { fill: '#374151', stroke: '#6B7280' },
		funded: { fill: '#1e3a5f', stroke: '#22D3EE' },
		'in-progress': { fill: '#5b21b6', stroke: '#A78BFA' },
		completed: { fill: '#166534', stroke: '#4ADE80' },
		cancelled: { fill: '#7f1d1d', stroke: '#F87171' }
	};
</script>

<div class="card-glow p-6 overflow-x-auto">
	<h3 class="text-lg font-semibold text-star-white mb-4">Validation Timeline</h3>

	<svg viewBox="0 0 {width} {height}" class="w-full min-w-[800px]">
		<!-- Background -->
		<rect x="0" y="0" {width} {height} fill="transparent" />

		<!-- Year grid lines -->
		{#each years as year, i}
			<g>
				<line
					x1={padding.left + i * yearWidth}
					y1={padding.top}
					x2={padding.left + i * yearWidth}
					y2={height - padding.bottom}
					stroke="#374151"
					stroke-width="1"
					stroke-dasharray="4,4"
				/>
				<text
					x={padding.left + i * yearWidth}
					y={padding.top - 15}
					text-anchor="middle"
					fill="#9CA3AF"
					font-size="14"
					font-weight="600"
				>
					{year}
				</text>
			</g>
		{/each}

		<!-- Timeline axis -->
		<line
			x1={padding.left}
			y1={milestoneY + 20}
			x2={width - padding.right}
			y2={milestoneY + 20}
			stroke="#4B5563"
			stroke-width="2"
		/>

		<!-- Milestones -->
		{#each milestones as milestone}
			{@const x = getXPosition(milestone.targetDate)}
			<g>
				<!-- Milestone marker -->
				<polygon
					points="{x},{milestoneY + 10} {x - 8},{milestoneY + 25} {x + 8},{milestoneY + 25}"
					fill={milestone.criticalPath ? '#F59E0B' : '#6B7280'}
				/>
				<!-- Milestone label -->
				<text
					x={x}
					y={milestoneY + 45}
					text-anchor="middle"
					fill={milestone.criticalPath ? '#F59E0B' : '#9CA3AF'}
					font-size="10"
					class="select-none"
				>
					{milestone.name.length > 25 ? milestone.name.slice(0, 25) + '...' : milestone.name}
				</text>
			</g>
		{/each}

		<!-- Experiments -->
		{#each sortedExperiments as exp}
			{@const pos = experimentPositions.get(exp.id)}
			{#if pos}
				{@const colors = svgStatusColors[exp.status]}
				<g class="cursor-pointer" role="button" tabindex="0">
					<!-- Connection line to timeline -->
					<line
						x1={pos.x}
						y1={pos.y + 20}
						x2={pos.x}
						y2={milestoneY + 15}
						stroke={colors.stroke}
						stroke-width="1"
						stroke-dasharray="2,2"
						opacity="0.5"
					/>

					<!-- Experiment node -->
					<rect
						x={pos.x - 80}
						y={pos.y - 15}
						width="160"
						height="35"
						rx="4"
						fill={colors.fill}
						stroke={colors.stroke}
						stroke-width="1.5"
					/>

					<!-- Experiment name -->
					<text
						x={pos.x}
						y={pos.y + 5}
						text-anchor="middle"
						fill="#F9FAFB"
						font-size="11"
						class="select-none"
					>
						{exp.name.length > 22 ? exp.name.slice(0, 22) + '...' : exp.name}
					</text>

					<!-- Status indicator -->
					<circle cx={pos.x + 70} cy={pos.y} r="4" fill={colors.stroke} />
				</g>
			{/if}
		{/each}
	</svg>

	<!-- Legend -->
	<div class="mt-4 flex flex-wrap gap-4 justify-center">
		{#each Object.entries(experimentStatusLabels) as [status, label]}
			<div class="flex items-center gap-2">
				<div
					class="w-3 h-3 rounded-full"
					style="background-color: {svgStatusColors[status].stroke}"
				></div>
				<span class="text-xs text-star-dim">{label}</span>
			</div>
		{/each}
		<div class="flex items-center gap-2">
			<div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-sun-gold"></div>
			<span class="text-xs text-star-dim">Critical Milestone</span>
		</div>
	</div>
</div>
