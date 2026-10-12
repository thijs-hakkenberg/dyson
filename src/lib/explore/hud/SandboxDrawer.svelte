<script lang="ts">
	/** Simulation sandbox drawer in the Workbench: one series per model position. */
	import { explorer } from '../core/state.svelte';
	import { sandboxesFor, type SandboxResult } from '../core/sandboxes';
	import { MODEL_COLORS } from '../core/theme';

	const list = $derived(explorer.workbenchId ? sandboxesFor(explorer.workbenchId) : []);
	let activeId = $state<string | null>(null);
	const sb = $derived(list.find((s) => s.id === activeId) ?? list[0]);
	let params = $state<Record<string, string>>({});
	let result = $state.raw<SandboxResult | null>(null);
	let running = $state(false);
	let error = $state('');

	// Reset when the item or sandbox changes
	let resetFor = '';
	$effect(() => {
		const key = `${explorer.workbenchId}:${sb?.id}`;
		if (key === resetFor) return;
		resetFor = key;
		params = { ...(sb?.defaults ?? {}) };
		result = null;
		error = '';
	});

	// Tours ask for a run once the drawer shows a sandbox
	let ranSeq = 0;
	$effect(() => {
		const seq = explorer.sandboxRunSeq;
		if (seq > ranSeq && explorer.sandboxOpen && sb && !running) {
			ranSeq = seq;
			void run();
		}
	});

	async function run() {
		if (!sb) return;
		running = true;
		error = '';
		try {
			result = await sb.run({ ...params });
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
		} finally {
			running = false;
		}
	}

	// ── Chart ────────────────────────────────────────────────────────────
	const Wd = 520,
		Ht = 190,
		PL = 56,
		PB = 26,
		PT = 16,
		PR = 10;
	const chart = $derived.by(() => {
		if (!result) return null;
		const all = result.series.flatMap((s) => [
			...s.points,
			...(s.band ?? []).flatMap((b) => [[b[0], b[1]] as [number, number], [b[0], b[2]] as [number, number]])
		]);
		const xs = all.map((p) => p[0]);
		const ys = all.map((p) => p[1]).filter((y) => !result!.logY || y > 0);
		const x0 = Math.min(...xs),
			x1 = Math.max(...xs);
		const fy = (y: number) => (result!.logY ? Math.log10(Math.max(y, 1e-300)) : y);
		const y0 = Math.min(...ys.map(fy)),
			y1 = Math.max(...ys.map(fy));
		const sx = (x: number) => PL + ((x - x0) / (x1 - x0 || 1)) * (Wd - PL - PR);
		const sy = (y: number) => Ht - PB - ((fy(y) - y0) / (y1 - y0 || 1)) * (Ht - PB - PT);
		const path = (pts: [number, number][]) =>
			pts.map((p, i) => `${i ? 'L' : 'M'}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join('');
		const bandPath = (b: [number, number, number][]) =>
			b.map((p, i) => `${i ? 'L' : 'M'}${sx(p[0]).toFixed(1)},${sy(p[2]).toFixed(1)}`).join('') +
			[...b].reverse().map((p) => `L${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join('') +
			'Z';
		const fmtY = (v: number) => {
			const y = result!.logY ? 10 ** v : v;
			const tight = Math.abs(y1 - y0) < 1;
			if (Math.abs(y) >= 1e4 || (Math.abs(y) < 0.01 && y !== 0)) return y.toExponential(tight ? 2 : 0);
			return y.toFixed(y < 10 ? 1 : 0);
		};
		const ticksY = [0, 0.5, 1].map((k) => ({ v: fmtY(y0 + (y1 - y0) * k), y: Ht - PB - k * (Ht - PB - PT) }));
		const ticksX = [0, 0.5, 1].map((k) => ({ v: (x0 + (x1 - x0) * k).toFixed(x1 - x0 < 5 ? 1 : 0), x: PL + k * (Wd - PL - PR) }));
		return {
			lines: result.series.map((s, i) => ({
				d: path(s.points),
				band: s.band ? bandPath(s.band) : null,
				color: s.model ? MODEL_COLORS[s.model] : i ? '#34d399' : '#7dd3fc',
				label: s.label
			})),
			markers: (result.markers ?? []).map((m) => ({ x: sx(m.x), label: m.label, color: m.model ? MODEL_COLORS[m.model] : '#94a3b8' })),
			ticksX,
			ticksY
		};
	});
</script>

{#if list.length}
	<section class="sbx panel" class:open={explorer.sandboxOpen} aria-label="Simulation sandbox">
		<header>
			<button type="button" class="tog eyebrow" onclick={() => (explorer.sandboxOpen = !explorer.sandboxOpen)} aria-expanded={explorer.sandboxOpen}>
				⚗ Simulation sandbox {explorer.sandboxOpen ? '−' : '+'}
			</button>
			{#if explorer.sandboxOpen && list.length > 1}
				<nav>
					{#each list as s (s.id)}
						<button type="button" class="hud-btn" class:on={s.id === sb?.id} onclick={() => (activeId = s.id)}>{s.title}</button>
					{/each}
				</nav>
			{/if}
		</header>
		{#if explorer.sandboxOpen && sb}
			<div class="body">
				<div class="left">
					<h3>{sb.title}</h3>
					<p class="q">{sb.question}</p>
					{#each sb.params as p (p.id)}
						<label>
							<span>{p.label}</span>
							<select bind:value={params[p.id]}>
								{#each p.options as o (o.value)}<option value={o.value}>{o.label}</option>{/each}
							</select>
						</label>
					{/each}
					<button type="button" class="hud-btn on run" onclick={run} disabled={running}>
						{running ? 'Running…' : result ? '↻ Re-run' : '▶ Run Monte Carlo'}
					</button>
					<a class="out" href={sb.simulatorHref}>Full simulator / question →</a>
				</div>
				<div class="right">
					{#if chart && result}
						<svg viewBox="0 0 {Wd} {Ht}" role="img" aria-label="{result.yLabel} vs {result.xLabel}">
							{#each chart.ticksY as t (t.y)}
								<line x1={PL} x2={Wd - PR} y1={t.y} y2={t.y} class="grid" />
								<text x={PL - 6} y={t.y + 3} text-anchor="end">{t.v}</text>
							{/each}
							{#each chart.ticksX as t (t.x)}<text x={t.x} y={Ht - 8} text-anchor="middle">{t.v}</text>{/each}
							{#each chart.markers as m (m.label)}
								<line x1={m.x} x2={m.x} y1={PT} y2={Ht - PB} stroke={m.color} stroke-dasharray="4 3" />
								<text x={m.x + 4} y={PT + 10} fill={m.color}>{m.label}</text>
							{/each}
							{#each chart.lines as l (l.label)}
								{#if l.band}<path d={l.band} fill={l.color} opacity="0.12" />{/if}
								<path d={l.d} fill="none" stroke={l.color} stroke-width="2" />
							{/each}
							<text x={PL} y={Ht - 8} class="ax" text-anchor="start" dx="-48">{result.xLabel}</text>
						</svg>
						<div class="ylab">{result.yLabel}{result.logY ? ' (log)' : ''}</div>
						<ul class="facts">
							{#each result.facts as f (f.label)}
								<li><b style="color:{f.model ? MODEL_COLORS[f.model] : '#cbd5e1'}">{f.label}</b> {f.text}</li>
							{/each}
						</ul>
						<p class="src">{sb.source}. Simulation, not a prediction.</p>
					{:else if error}
						<p class="err">{error}</p>
					{:else}
						<p class="dim">Runs the project's Monte Carlo model once per model position — each curve in that model's colour.</p>
					{/if}
				</div>
			</div>
		{/if}
	</section>
{/if}

<style>
	.sbx {
		position: absolute;
		left: 290px;
		right: 424px;
		bottom: 16px;
		padding: 6px 12px;
		z-index: 4;
	}
	header {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}
	.tog {
		background: none;
		border: 0;
		padding: 2px 0;
		cursor: pointer;
		color: var(--hud-accent);
	}
	nav {
		display: flex;
		gap: 4px;
	}
	nav .hud-btn {
		font-size: 10px;
		padding: 2px 6px;
	}
	.body {
		display: grid;
		grid-template-columns: 190px 1fr;
		gap: 14px;
		margin-top: 6px;
	}
	h3 {
		margin: 0 0 4px;
		font-family: var(--font-cond);
		font-size: 15px;
		color: #fff;
	}
	.q {
		margin: 0 0 8px;
		font-size: 10.5px;
		color: var(--hud-dim);
		line-height: 1.4;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 2px;
		font-size: 10px;
		color: var(--hud-dim);
		margin-bottom: 6px;
	}
	select {
		background: #0b1422;
		color: var(--hud-text);
		border: 1px solid var(--hud-line);
		font-family: inherit;
		font-size: 11px;
		padding: 3px;
	}
	.run {
		width: 100%;
		margin-top: 4px;
	}
	.out {
		display: block;
		margin-top: 8px;
		font-size: 10px;
		color: var(--hud-accent);
	}
	.right {
		position: relative;
		min-width: 0;
	}
	svg {
		width: 100%;
		height: auto;
		display: block;
	}
	svg text {
		fill: #64748b;
		font-size: 9px;
		font-family: var(--font-mono);
	}
	svg .grid {
		stroke: rgba(125, 211, 252, 0.1);
	}
	.ylab {
		position: absolute;
		top: -2px;
		left: 56px;
		font-size: 9px;
		color: var(--hud-dim);
	}
	.facts {
		list-style: none;
		padding: 0;
		margin: 4px 0 0;
		font-size: 10.5px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2px 12px;
	}
	.facts b {
		font-weight: 500;
		display: block;
	}
	.src,
	.dim {
		margin: 4px 0 0;
		font-size: 9.5px;
		color: var(--hud-faint);
	}
	.err {
		color: var(--hud-bad);
		font-size: 11px;
	}
	@media (max-width: 1200px) {
		.sbx {
			right: 12px;
			left: 12px;
		}
	}
</style>
