<script lang="ts">
	/** Deep-time projection: the Sun's galactic orbit with/without the stellar engine. */
	import { deepTime, DEEP_MAX_MYR } from '../core/deeptime.svelte';
	import { explorer } from '../core/state.svelte';
	import { KMS_TO_PC_PER_MYR } from '../core/galactic';
	import { formatSci } from '../core/metrics';

	let open = $state(false);
	$effect(() => {
		if (explorer.deepMyrFromUrl > 0) {
			deepTime.myr = explorer.deepMyrFromUrl;
			open = true;
			explorer.deepMyrFromUrl = 0;
		}
	});

	const t = $derived(deepTime.myr);
	const on = $derived(t > 0 ? deepTime.sampleAt(t, true) : null);
	const off = $derived(t > 0 ? deepTime.sampleAt(t, false) : null);
	const sep = $derived(on && off ? Math.hypot(on.pos[0] - off.pos[0], on.pos[1] - off.pos[1], on.pos[2] - off.pos[2]) : 0);
	const dv = $derived(
		on && off
			? Math.hypot(on.vel[0] - off.vel[0], on.vel[1] - off.vel[1], on.vel[2] - off.vel[2]) / KMS_TO_PC_PER_MYR
			: 0
	);
	const rot = $derived(deepTime.rotation);
	const deg = (r: number) => (r * 180) / Math.PI;
	const arcsec = (r: number) => deg(r) * 3600;

	// Inset: top-down galactic map, GC at centre
	const S = 120;
	const scale = (S / 2 - 6) / 9800;
	const px = (p: number[]) => [S / 2 + p[1] * scale, S / 2 + p[0] * scale];
	const path = (engine: boolean) => {
		if (t <= 0) return '';
		const o = engine ? deepTime.orbits().on : deepTime.orbits().off;
		return o
			.filter((s) => s.tMyr <= t)
			.map((s, i) => {
				const [x, y] = px(s.pos);
				return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
			})
			.join('');
	};
	const pathOn = $derived(path(true));
	const pathOff = $derived(path(false));
	const sun = $derived(px((deepTime.engine ? on : off)?.pos ?? [-8180, 0, 0]));
</script>

<div class="block">
	<button type="button" class="lbl tog" onclick={() => (open = !open)} aria-expanded={open}>
		Deep time · Sun's galactic orbit {open ? '−' : '+'}
	</button>
	{#if open}
		<label class="slider">
			<input type="range" min="0" max={DEEP_MAX_MYR} step="0.5" bind:value={deepTime.myr} aria-label="Million years after build-out" />
			<span>{t > 0 ? `+${t.toFixed(t < 10 ? 1 : 0)} Myr` : 'now'}</span>
		</label>
		<div class="row">
			<label class="chk"><input type="checkbox" bind:checked={deepTime.engine} /> engine running</label>
			{#if t > 0}<button type="button" class="hud-btn" onclick={() => (deepTime.myr = 0)}>reset</button>{/if}
		</div>
		<div class="grid">
			<svg viewBox="0 0 {S} {S}" width={S} height={S} aria-label="Galactic top-down map">
				<circle cx={S / 2} cy={S / 2} r={8180 * scale} class="ring" />
				<circle cx={S / 2} cy={S / 2} r="2.5" fill="#fde68a" />
				<path d={pathOff} class="off" />
				<path d={pathOn} class="on" />
				<circle cx={sun[0]} cy={sun[1]} r="2.5" fill="#fff" />
			</svg>
			<dl>
				{#if t > 0}
					<dt>Δv vs no engine</dt><dd>{dv.toFixed(dv < 1 ? 2 : 1)} km/s</dd>
					<dt>Path separation</dt><dd>{sep < 1000 ? `${sep.toFixed(0)} pc` : `${(sep / 1000).toFixed(2)} kpc`}</dd>
					<dt>Sky turned</dt><dd>{deg(rot.dl).toFixed(1)}° in l</dd>
					<dt>GC latitude</dt><dd>{deg(rot.db) >= 0 ? '+' : ''}{deg(rot.db).toFixed(2)}°</dd>
				{:else}
					<dt>Sky turned since 2000</dt><dd>{arcsec(rot.dl).toFixed(2)}″</dd>
					<dt>Engine accel.</dt><dd>{formatSci(deepTime.fullAccel)} m/s²</dd>
				{/if}
			</dl>
		</div>
		<p class="note">
			Projection past the timeline: the Sun's orbit in a flat-rotation-curve galaxy, engine at full thrust along the
			assumed axis. The background re-orients toward the Galactic Centre; nearby-star parallax isn't modelled. The Solar
			System stays at the construction date.
		</p>
	{/if}
</div>

<style>
	.block {
		margin-top: 10px;
		padding-top: 8px;
		border-top: 1px solid var(--hud-line);
	}
	.lbl {
		font-family: var(--font-cond);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--hud-dim);
	}
	.tog {
		background: none;
		border: 0;
		padding: 0;
		cursor: pointer;
		width: 100%;
		text-align: left;
		color: #fb7185;
	}
	.slider {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 6px;
		font-size: 11px;
	}
	.slider input {
		flex: 1;
		accent-color: #fb7185;
	}
	.slider span {
		min-width: 64px;
		text-align: right;
		color: #fff;
		font-variant-numeric: tabular-nums;
	}
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 4px 0;
	}
	.chk {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 10.5px;
	}
	.chk input {
		accent-color: #fb7185;
	}
	.row .hud-btn {
		font-size: 10px;
		padding: 1px 6px;
	}
	.grid {
		display: flex;
		gap: 8px;
		align-items: center;
	}
	svg {
		flex: none;
	}
	.ring {
		fill: none;
		stroke: rgba(125, 211, 252, 0.2);
		stroke-dasharray: 2 3;
	}
	.on {
		fill: none;
		stroke: #fb7185;
		stroke-width: 1.2;
	}
	.off {
		fill: none;
		stroke: #64748b;
		stroke-width: 1;
		stroke-dasharray: 3 2;
	}
	dl {
		display: grid;
		grid-template-columns: 1fr;
		margin: 0;
		font-size: 10px;
	}
	dt {
		color: var(--hud-dim);
	}
	dd {
		margin: 0 0 3px;
		color: #fff;
		font-variant-numeric: tabular-nums;
	}
	.note {
		margin: 6px 0 0;
		font-size: 9.5px;
		color: var(--hud-faint);
		line-height: 1.4;
	}
</style>
