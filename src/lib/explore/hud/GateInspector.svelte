<script lang="ts">
	/** Reader for a selected gate or technology in the Gate Tunnel. */
	import { explorer, TODAY_YEAR } from '../core/state.svelte';
	import { layoutTunnel, phase0MonthToYear } from '../core/gates';
	import { getQuestion } from '$lib/services/critical-path';
	import { RISK_LABELS, TRL_LABELS, AGREEMENT_LABELS, type RulingStatus } from '$lib/services/trl-assessment';
	import { gateWindow, GATE_TYPE_LABELS } from '$lib/services/decision-gates';
	import { getEntity } from '../core/registry';
	import { RQ_STATUS_COLORS } from '../core/theme';

	const L = layoutTunnel(TODAY_YEAR);
	const g = $derived(L.gates.find((x) => x.gate.id === explorer.gateSel));
	const t = $derived(
		explorer.gateSel?.startsWith('trl:') ? L.techs.find((x) => `trl:${x.trl.id}` === explorer.gateSel) : undefined
	);
	const feeds = $derived(t ? L.gates.filter((x) => x.gate.relatedTRLIds.includes(t.trl.id)) : []);
	const yr = (m: number) => Math.round(phase0MonthToYear(m));
	const fmt = (min: number, max?: number | null) => (max != null && max !== min ? `${min}–${max}` : `${min}`);
	const statusText = (s: RulingStatus | null | undefined) =>
		[
			...(s?.decided ?? []).map((d) => `✓ ${d}`),
			...(s?.interim ?? []).map((d) => `◐ ${d} interim`),
			...(s?.panel ? [`≠ ${s.panel}`] : [])
		].join(' · ');
</script>

{#if g || t}
	<aside class="gi panel" aria-label="Gate details">
		<button type="button" class="close" onclick={() => (explorer.gateSel = null)} aria-label="Close">×</button>
		{#if g}
			<header>
				<div class="eyebrow">{GATE_TYPE_LABELS[g.gate.type ?? 'review']} · {gateWindow(g.gate)} (~{yr(g.gate.decisionMonth)}–{yr(g.gate.decisionMonthMax ?? g.gate.decisionMonth)})</div>
				<h2>{g.gate.name}</h2>
				<div class="dim">{g.gate.status} · {g.readiness}% of criteria met{g.gate.disputed ? ' · the panel disputes parts' : ''}</div>
			</header>
			<div class="body">
				<p>{g.gate.description}</p>
				<h3>Criteria</h3>
				<ul class="crit">
					{#each g.gate.criteria as c (c.id)}
						<li class:met={c.met}>
							<b>{c.met ? '✓' : '○'} {c.description}</b>
							<span>{c.trlRequired ? `TRL ${c.trlRequired}. ` : ''}{c.threshold ?? c.metric}</span>
							{#if statusText(c.rulingStatus)}<i>{statusText(c.rulingStatus)}</i>{/if}
							{#each c.rulingStatus?.pending ?? [] as p (p.question)}
								<button type="button" class="pend" onclick={() => explorer.showQuestion(p.question)}>⧗ ruling pending: {p.question.toUpperCase()} · evidence {p.evidence.join(', ').toUpperCase()}</button>
							{/each}
							{#if c.currentEvidence}<i>Evidence: {c.currentEvidence}</i>{/if}
						</li>
					{/each}
				</ul>
				{#if g.gate.relatedTRLIds.length}
					<h3>Technologies it depends on</h3>
					<ul class="links">
						{#each g.gate.relatedTRLIds as id (id)}
							{@const tt = L.techs.find((x) => x.trl.id === id)}
							{#if tt}
								<li>
									<button type="button" onclick={() => (explorer.gateSel = `trl:${id}`)}>
										<span class:late={g.late.includes(id)} class:atrisk={g.atRisk.includes(id)}>{tt.trl.id} {tt.trl.technology}</span>
										<span class="dim">TRL {fmt(tt.trl.currentTRL, tt.trl.currentTRLMax)}→{tt.trl.targetTRL} · ~{yr(tt.arrival)}{g.late.includes(id) ? ' · late' : g.atRisk.includes(id) ? ' · inside window' : ''}</span>
									</button>
								</li>
							{/if}
						{/each}
					</ul>
				{/if}
				{#if g.gate.relatedQuestionIds.length}
					<h3>Evidence from research questions</h3>
					<ul class="links">
						{#each g.gate.relatedQuestionIds as qid (qid)}
							{@const q = getQuestion(qid)}
							<li>
								<button type="button" onclick={() => explorer.showQuestion(qid)}>
									<span><i class="dot" style="background:{RQ_STATUS_COLORS[q?.status ?? 'open']}"></i>{qid.toUpperCase()} {q?.title ?? ''}</span>
								</button>
							</li>
						{/each}
					</ul>
				{/if}
				<h3>If it passes</h3>
				<p>{g.gate.passOutcome}</p>
				<h3>If it fails</h3>
				<p>{g.gate.failOutcome}</p>
			</div>
		{:else if t}
			<header>
				<div class="eyebrow" style="color:{t.threadColor}">Technology readiness · {t.trl.id}</div>
				<h2>{t.trl.technology}</h2>
				<div class="dim">
					TRL {fmt(t.trl.currentTRL, t.trl.currentTRLMax)} → {t.trl.targetTRL}
					{#if t.trl.ad2}· AD² {fmt(t.trl.ad2.min, t.trl.ad2.max)}{/if}
					{#if t.trl.phaseNeed}· needed in {Array.isArray(t.trl.phaseNeed) ? t.trl.phaseNeed.join('/') : t.trl.phaseNeed}{/if} ·
					target ~{yr(t.arrival)}{t.arrivalMax > t.arrival ? `–${yr(t.arrivalMax)}` : ''}
					· <span style="color:{RISK_LABELS[t.trl.riskIfFail]?.color}">if it fails: {RISK_LABELS[t.trl.riskIfFail]?.label}</span>
				</div>
			</header>
			<div class="body">
				<p><span class="dim">Required:</span> {t.trl.description}</p>
				<p class="dim">Now: {TRL_LABELS[t.trl.currentTRL]}. Target: {TRL_LABELS[t.trl.targetTRL]}.</p>
				{#if t.trl.panelRatings}
					<h3>Panel · {AGREEMENT_LABELS[t.trl.agreement ?? 'agree']}</h3>
					<ul class="plain">
						{#each t.trl.panelRatings as r (r.model)}
							<li>{r.name}: TRL {fmt(r.currentTRL.min, r.currentTRL.max)}→{r.targetTRL} · AD² {r.ad2} · {RISK_LABELS[r.riskIfFail]?.label ?? r.riskIfFail}</li>
						{/each}
					</ul>
				{/if}
				{#each t.trl.rulingStatus?.pending ?? [] as p (p.question)}
					<button type="button" class="pend" onclick={() => explorer.showQuestion(p.question)}>⧗ owner ruling pending: {p.question.toUpperCase()} · evidence {p.evidence.join(', ').toUpperCase()}</button>
				{/each}
				<h3>Where the evidence stands</h3>
				<p>{t.trl.evidence}</p>
				{#if t.trl.experimentsNeeded.length}
					<h3>Development path</h3>
					<ul class="plain">{#each t.trl.experimentsNeeded as x (x)}<li>{x}</li>{/each}</ul>
				{/if}
				{#if feeds.length}
					<h3>Feeds gates</h3>
					<ul class="links">
						{#each feeds as f (f.gate.id)}
							<li>
								<button type="button" onclick={() => (explorer.gateSel = f.gate.id)}>
									<span class:late={f.late.includes(t.trl.id)}>{f.gate.name}</span>
									<span class="dim">decides ~{yr(f.gate.decisionMonth)}–{yr(f.gate.decisionMonthMax ?? f.gate.decisionMonth)}{f.late.includes(t.trl.id) ? ' · this tech is late' : f.atRisk.includes(t.trl.id) ? ' · lands inside the window' : ''}</span>
								</button>
							</li>
						{/each}
					</ul>
				{/if}
				{#if t.trl.relatedBOMIds.length}
					<h3>BOM items</h3>
					<ul class="links">
						{#each t.trl.relatedBOMIds as b (b)}
							<li><button type="button" onclick={() => explorer.openWorkbench(b)}><span>{getEntity(b)?.name ?? b}</span><span class="dim">workbench →</span></button></li>
						{/each}
					</ul>
				{/if}
				{#if t.trl.fallbackApproach}<h3>Fallback</h3><p>{t.trl.fallbackApproach}</p>{/if}
			</div>
		{/if}
	</aside>
{/if}

<style>
	.gi {
		position: absolute;
		top: 92px;
		right: 12px;
		bottom: 24px;
		width: 400px;
		display: flex;
		flex-direction: column;
	}
	.close {
		position: absolute;
		top: 8px;
		right: 10px;
		background: none;
		border: 0;
		color: var(--hud-dim);
		font-size: 18px;
		cursor: pointer;
		z-index: 1;
	}
	header {
		padding: 12px 14px 10px;
		border-bottom: 1px solid var(--hud-line);
	}
	h2 {
		margin: 4px 24px 4px 0;
		font-family: var(--font-cond);
		font-size: 19px;
		font-weight: 600;
		line-height: 1.15;
		color: #fff;
	}
	h3 {
		margin: 14px 0 4px;
		font-family: var(--font-cond);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--hud-accent);
	}
	.dim {
		color: var(--hud-dim);
		font-size: 10.5px;
	}
	.body {
		padding: 10px 14px 14px;
		overflow-y: auto;
		scrollbar-width: thin;
		font-family: system-ui, sans-serif;
		font-size: 12.5px;
		line-height: 1.5;
		color: #c9d6e3;
	}
	p {
		margin: 0 0 6px;
	}
	.crit {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.crit li {
		display: flex;
		flex-direction: column;
		gap: 2px;
		border-left: 2px solid #475569;
		padding: 2px 8px;
		margin: 6px 0;
	}
	.crit li.met {
		border-left-color: #34d399;
	}
	.crit b {
		font-weight: 600;
		color: #e2e8f0;
	}
	.crit span {
		font-size: 11.5px;
	}
	.crit i {
		font-size: 11px;
		color: var(--hud-dim);
	}
	.links,
	.plain {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.plain li {
		padding: 2px 0 2px 8px;
		border-left: 2px solid var(--hud-line);
		margin: 3px 0;
	}
	.links button {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		background: none;
		border: 0;
		padding: 3px 0;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}
	.links button:hover {
		color: #fff;
	}
	.atrisk {
		color: var(--hud-warn);
	}
	.pend {
		display: block;
		margin: 4px 0;
		padding: 2px 8px;
		border-radius: 10px;
		border: 1px solid rgba(167, 139, 250, 0.4);
		background: rgba(167, 139, 250, 0.12);
		color: #ddd6fe;
		font: inherit;
		font-size: 0.85em;
		text-align: left;
		cursor: pointer;
	}
	.late {
		color: var(--hud-bad);
	}
	.dot {
		display: inline-block;
		width: 7px;
		height: 7px;
		margin-right: 6px;
		transform: rotate(45deg);
	}
	@media (max-width: 900px) {
		.gi {
			top: auto;
			left: 12px;
			right: 12px;
			width: auto;
			bottom: 12px;
			max-height: 45vh;
		}
	}
</style>
