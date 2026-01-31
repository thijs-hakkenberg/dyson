<script lang="ts">
	import type { TimelineNode, PhaseDependencyGraph } from '$lib/types';

	interface Props {
		graph: PhaseDependencyGraph;
		onNodeClick?: (node: TimelineNode) => void;
	}

	let { graph, onNodeClick }: Props = $props();

	// Calculate layout positions for nodes
	function calculateLayout(nodes: TimelineNode[]) {
		const maxMonth = Math.max(...nodes.map((n) => n.endMonth));
		const rows: TimelineNode[][] = [];

		// Sort nodes by start month
		const sortedNodes = [...nodes].sort((a, b) => a.startMonth - b.startMonth);

		// Assign rows to avoid overlaps
		for (const node of sortedNodes) {
			let placed = false;
			for (let i = 0; i < rows.length; i++) {
				const row = rows[i];
				const lastInRow = row[row.length - 1];
				if (lastInRow.endMonth < node.startMonth) {
					row.push(node);
					placed = true;
					break;
				}
			}
			if (!placed) {
				rows.push([node]);
			}
		}

		return { rows, maxMonth };
	}

	const layout = $derived(calculateLayout(graph.nodes));

	const nodeTypeIcons: Record<string, string> = {
		milestone: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		activity:
			'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
		decision:
			'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
	};

	const statusColors: Record<string, string> = {
		pending: 'bg-space-600 border-space-500',
		'in-progress': 'bg-cosmic-blue/20 border-cosmic-cyan',
		completed: 'bg-green-500/20 border-green-400'
	};

	const statusTextColors: Record<string, string> = {
		pending: 'text-star-faint',
		'in-progress': 'text-cosmic-cyan',
		completed: 'text-green-400'
	};

	function getNodePosition(node: TimelineNode, rowIndex: number) {
		const left = (node.startMonth / layout.maxMonth) * 100;
		const width = ((node.endMonth - node.startMonth) / layout.maxMonth) * 100;
		return { left: `${left}%`, width: `${Math.max(width, 8)}%`, top: `${rowIndex * 60 + 40}px` };
	}

	function handleNodeClick(node: TimelineNode) {
		if (onNodeClick) {
			onNodeClick(node);
		}
	}

	let hoveredNode: TimelineNode | null = $state(null);
</script>

<div class="card-glow p-6">
	<div class="flex items-center justify-between mb-6">
		<h3 class="text-xl font-bold text-star-white">Activity Timeline</h3>
		<div class="flex items-center gap-4 text-sm">
			<span class="text-star-faint">Critical Path: </span>
			<span class="text-cosmic-cyan font-semibold">{graph.criticalPathDuration} months</span>
		</div>
	</div>

	<!-- Legend -->
	<div class="flex flex-wrap gap-4 mb-6 text-xs">
		<div class="flex items-center gap-2">
			<div class="w-4 h-4 rounded bg-cosmic-cyan/30 border border-cosmic-cyan"></div>
			<span class="text-star-dim">In Progress</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="w-4 h-4 rounded bg-green-500/30 border border-green-400"></div>
			<span class="text-star-dim">Completed</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="w-4 h-4 rounded bg-space-600 border border-space-500"></div>
			<span class="text-star-dim">Pending</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="w-8 h-1 bg-sun-gold rounded"></div>
			<span class="text-star-dim">Critical Path</span>
		</div>
	</div>

	<!-- Timeline Container -->
	<div class="relative overflow-x-auto">
		<div class="min-w-[800px]" style="height: {layout.rows.length * 60 + 80}px;">
			<!-- Month markers -->
			<div class="flex justify-between text-xs text-star-faint border-b border-space-600 pb-2">
				{#each Array(Math.ceil(layout.maxMonth / 12) + 1) as _, i}
					<span class="absolute" style="left: {(i * 12 / layout.maxMonth) * 100}%">
						Year {i}
					</span>
				{/each}
			</div>

			<!-- Grid lines -->
			<div class="absolute inset-0 top-8">
				{#each Array(Math.ceil(layout.maxMonth / 12) + 1) as _, i}
					<div
						class="absolute h-full w-px bg-space-600/50"
						style="left: {(i * 12 / layout.maxMonth) * 100}%"
					></div>
				{/each}
			</div>

			<!-- Dependency lines -->
			<svg
				class="absolute inset-0 top-8 pointer-events-none"
				style="height: {layout.rows.length * 60 + 40}px"
			>
				{#each graph.nodes as node}
					{#each node.dependencies as depId}
						{@const depNode = graph.nodes.find((n) => n.id === depId)}
						{#if depNode}
							{@const depRowIndex = layout.rows.findIndex((row) => row.includes(depNode))}
							{@const nodeRowIndex = layout.rows.findIndex((row) => row.includes(node))}
							{@const x1 = (depNode.endMonth / layout.maxMonth) * 100}
							{@const x2 = (node.startMonth / layout.maxMonth) * 100}
							{@const y1 = depRowIndex * 60 + 60}
							{@const y2 = nodeRowIndex * 60 + 60}
							<line
								x1="{x1}%"
								{y1}
								x2="{x2}%"
								{y2}
								stroke={node.criticalPath && depNode.criticalPath
									? 'rgb(251 191 36)'
									: 'rgb(75 85 99)'}
								stroke-width={node.criticalPath && depNode.criticalPath ? '2' : '1'}
								stroke-dasharray={node.criticalPath && depNode.criticalPath ? '' : '4'}
								marker-end="url(#arrowhead)"
							/>
						{/if}
					{/each}
				{/each}
				<defs>
					<marker
						id="arrowhead"
						markerWidth="10"
						markerHeight="7"
						refX="9"
						refY="3.5"
						orient="auto"
					>
						<polygon points="0 0, 10 3.5, 0 7" fill="rgb(107 114 128)" />
					</marker>
				</defs>
			</svg>

			<!-- Nodes -->
			{#each layout.rows as row, rowIndex}
				{#each row as node}
					{@const pos = getNodePosition(node, rowIndex)}
					<button
						class="absolute rounded-lg border-2 px-3 py-2 transition-all hover:scale-105 cursor-pointer {statusColors[node.status]} {node.criticalPath ? 'ring-2 ring-sun-gold/50' : ''}"
						style="left: {pos.left}; width: {pos.width}; top: {pos.top}; min-width: 120px;"
						onclick={() => handleNodeClick(node)}
						onmouseenter={() => (hoveredNode = node)}
						onmouseleave={() => (hoveredNode = null)}
					>
						<div class="flex items-center gap-2">
							<svg
								class="w-4 h-4 flex-shrink-0 {statusTextColors[node.status]}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d={nodeTypeIcons[node.type]}
								/>
							</svg>
							<span class="text-xs font-medium text-star-white truncate">{node.name}</span>
						</div>
						{#if node.criticalPath}
							<div class="absolute -top-1 -right-1 w-2 h-2 bg-sun-gold rounded-full"></div>
						{/if}
					</button>
				{/each}
			{/each}
		</div>
	</div>

	<!-- Hover tooltip -->
	{#if hoveredNode}
		<div
			class="fixed z-50 bg-space-700 border border-space-500 rounded-lg p-4 shadow-xl max-w-xs pointer-events-none"
			style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
		>
			<h4 class="font-semibold text-star-white mb-2">{hoveredNode.name}</h4>
			<div class="space-y-1 text-sm">
				<p class="text-star-dim">
					<span class="text-star-faint">Type:</span>
					{hoveredNode.type}
				</p>
				<p class="text-star-dim">
					<span class="text-star-faint">Duration:</span>
					Month {hoveredNode.startMonth} - {hoveredNode.endMonth}
				</p>
				<p class="text-star-dim">
					<span class="text-star-faint">Status:</span>
					<span class={statusTextColors[hoveredNode.status]}>{hoveredNode.status}</span>
				</p>
				{#if hoveredNode.criticalPath}
					<p class="text-sun-gold text-xs mt-2">On Critical Path</p>
				{/if}
				{#if hoveredNode.dependencies.length > 0}
					<p class="text-star-faint text-xs mt-2">
						Depends on: {hoveredNode.dependencies.join(', ')}
					</p>
				{/if}
			</div>
		</div>
	{/if}
</div>
