<script lang="ts">
	let { open = $bindable(false) }: { open?: boolean } = $props();
	const GROUPS: [string, [string, string][]][] = [
		[
			'Navigate',
			[
				['⌘K  /', 'Go to body, phase, BOM item, research question'],
				['Esc', 'Back out / clear selection'],
				['F', 'Focus selected'],
				['Home', 'Back to today'],
				['H', 'Hide / show HUD']
			]
		],
		[
			'Time',
			[
				['Space', 'Play / pause construction time (pause/resume a tour)'],
				['[  ]', 'Slower / faster'],
				['← →', 'Previous / next tour step']
			]
		],
		[
			'Views',
			[
				['W', 'Open selected BOM item in the Workbench'],
				['M', 'Detailed 3D model of the item (toggle in the Workbench)'],
				['K', 'Knowledge · Research Nebula'],
				['G', 'Gates · Gate Tunnel'],
				['N', 'Network · topology & light-time'],
				['L', 'Logistics · mass flow & bottlenecks'],
				['R', 'Risk & validation'],
				['C', 'Consensus · Deliberation Chamber']
			]
		]
	];
</script>

{#if open}
	<div class="scrim" role="presentation" onclick={() => (open = false)}></div>
	<div class="help panel" role="dialog" aria-label="Keyboard shortcuts">
		<div class="eyebrow">Keyboard shortcuts <button type="button" class="x" onclick={() => (open = false)} aria-label="Close">✕</button></div>
		<div class="cols">
			{#each GROUPS as [title, rows] (title)}
				<section>
					<h3>{title}</h3>
					<dl>
						{#each rows as [k, d] (k)}<dt><kbd>{k}</kbd></dt><dd>{d}</dd>{/each}
					</dl>
				</section>
			{/each}
		</div>
	</div>
{/if}

<style>
	.scrim {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 30;
	}
	.help {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: min(760px, calc(100vw - 32px));
		padding: 14px 18px 18px;
		z-index: 31;
	}
	.eyebrow {
		display: flex;
		justify-content: space-between;
	}
	.x {
		background: none;
		border: 0;
		color: var(--hud-dim);
		cursor: pointer;
	}
	.cols {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
		gap: 18px;
		margin-top: 8px;
	}
	h3 {
		margin: 0 0 6px;
		font-family: var(--font-cond);
		font-size: 12px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--hud-accent);
	}
	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 5px 10px;
		margin: 0;
		font-size: 11px;
	}
	dd {
		margin: 0;
		color: #c9d6e3;
	}
	kbd {
		font-family: var(--font-mono);
		font-size: 10px;
		border: 1px solid var(--hud-line-strong);
		padding: 1px 5px;
		white-space: pre;
		color: #fff;
	}
</style>
