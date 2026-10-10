/**
 * Narrated tours. Every figure in a caption comes from the BOM data, the
 * consensus documents, or a cited physical constant; nothing is invented for
 * the story. Years are derived from the projected timeline so the tours stay
 * consistent if phase durations change.
 */

import type { Tour } from './tour.svelte';
import { phaseWindow } from './timeline';
import { TODAY_YEAR } from './state.svelte';

/** Year at a fraction of a phase's nominal window. */
function at(phaseId: string, f: number): number {
	const w = phaseWindow(phaseId);
	if (!w) throw new Error(`Unknown phase ${phaseId}`);
	return w.start + (w.end - w.start) * f;
}

export const TOURS: Tour[] = [
	{
		id: 'why-swarm',
		title: 'Why build a Dyson swarm?',
		subtitle: 'From one planet’s power budget to the Sun’s — 2 min',
		steps: [
			{
				title: 'Earth, today',
				body: 'All of human civilisation runs on about **19 terawatts** of primary power (2023).',
				duration: 7,
				lens: 'physical',
				workbench: null,
				year: TODAY_YEAR,
				focus: 'earth',
				select: 'earth',
				camera: { distance: 0.00035, polar: 75 }
			},
			{
				title: 'The Sun',
				body: 'The Sun radiates **3.8 × 10²⁶ W** without pause — about **20 trillion times** what we use.',
				duration: 8,
				focus: 'sun',
				select: null,
				camera: { distance: 0.035, polar: 80 }
			},
			{
				title: 'Almost all of it escapes',
				body: 'Earth intercepts less than **one two-billionth** of that output. The rest streams past every planet into deep space.',
				duration: 8,
				focus: 'sun',
				camera: { distance: 2.6, polar: 62 }
			},
			{
				title: 'A swarm, not a shell',
				body: 'A Dyson swarm captures more of it with **independent collectors on their own orbits** — no rigid shell. Phase 1 places the first **1,000**.',
				duration: 9,
				year: { to: at('phase-1', 0.95), over: 5 },
				layers: { divergence: false },
				camera: { distance: 2.2, polar: 58 }
			},
			{
				title: 'Scaling up',
				body: 'Phase 2 grows to **100,000 collector satellites** between 0.5 and 0.8 AU, built largely from asteroid material.',
				duration: 9,
				year: { to: at('phase-2', 0.98), over: 5 },
				camera: { distance: 2.0, polar: 55 }
			},
			{
				title: 'Thinking with starlight',
				body: 'Later, nested **Matrioshka** shells turn sunlight into computation, each layer running on the waste heat of the one inside. How many shells, and where, is still an open question.',
				duration: 10,
				year: { to: at('phase-3a', 0.85), over: 6 },
				camera: { distance: 70, polar: 60 }
			},
			{
				title: 'Moving the Sun',
				body: 'A **stellar engine** — a vast mirror and a thermonuclear jet — would push on the Sun itself. The telemetry panel tracks it: power, compute, thrust, even the Sun’s Δv.',
				duration: 10,
				camera: { distance: 3, polar: 70 }
			},
			{
				title: 'Projections, with their doubts showing',
				body: 'Everything here is generated from **33 bill-of-materials items**, each proposed independently by three AI models. Where they disagree you’ll see **dashed ghosts** in each model’s colour. Explore freely, or continue with the next chapter.',
				duration: 12,
				layers: { divergence: true }
			}
		]
	},
	{
		id: 'asteroid-to-swarm',
		title: 'From asteroid to swarm',
		subtitle: 'Phase 0 → 1, and where the models disagree — 2 min',
		steps: [
			{
				title: 'It starts with rocks',
				body: 'These points are a **synthetic population** of 2,000 near-Earth asteroids, ranked by mining value. Phase 0 begins here.',
				duration: 8,
				lens: 'physical',
				workbench: null,
				year: at('phase-0', 0.01),
				focus: 'sun',
				select: null,
				layers: { nea: true },
				camera: { distance: 2.6, polar: 60 }
			},
			{
				title: 'Prospecting',
				body: '**32 prospecting satellites** each survey 20+ asteroids a year to find the best targets.',
				duration: 8,
				year: { to: at('phase-0', 0.3), over: 3 },
				focus: 'bom-0-1',
				select: 'bom-0-1'
			},
			{
				title: 'Mining',
				body: '**20 mining robots** work the richest asteroids, each excavating **2–5 tonnes per hour**.',
				duration: 8,
				year: { to: at('phase-0', 0.6), over: 3 },
				focus: 'bom-0-2',
				select: 'bom-0-2'
			},
			{
				title: 'Processing at L4',
				body: 'Ore is refined at a **processing station at Sun–Earth L4**, up to 50,000 tonnes a year. The models agree on L4 or L5 — the dashed marker is the L5 option.',
				duration: 9,
				year: { to: at('phase-0', 0.8), over: 3 },
				focus: 'bom-0-3',
				select: 'bom-0-3',
				layers: { divergence: true }
			},
			{
				title: 'The assembly node',
				body: 'Refined metal feeds the **assembly node**, where Phase 1 collectors are built.',
				duration: 8,
				year: { to: at('phase-1', 0.3), over: 4 },
				focus: 'bom-1-4',
				select: 'bom-1-4'
			},
			{
				title: '1,000 collectors — but where?',
				body: 'By the end of Phase 1, **1,000 collectors** orbit at 1 AU. The models don’t agree: the dashed rings are **Claude’s 0.5 AU** and **Gemini’s 0.3 AU** alternatives.',
				duration: 10,
				year: { to: at('phase-1', 0.95), over: 4 },
				focus: 'sun',
				select: 'bom-1-1',
				camera: { distance: 2.4, polar: 55 }
			},
			{
				title: 'Inside one item',
				body: 'Fly into the collector. The **core** is what all models agree on; each **satellite** is one model’s full specification.',
				duration: 9,
				workbench: 'bom-1-1',
				wbSelection: null
			},
			{
				title: 'Where they split',
				body: 'Each **fork** is a disagreement. The biggest is unit size: from GPT’s **40 m² tiles** to Claude’s **10,000 m² sails**. Divergent views are **preserved, not resolved**.',
				duration: 11,
				wbSelection: 'unit-size-power-class'
			},
			{
				title: 'Research decides',
				body: 'Research questions settle these forks. Open the **Knowledge** lens to see what’s answered — and what’s still open.',
				duration: 10,
				wbSelection: null
			}
		]
	}
];

export function getTour(id: string | null | undefined): Tour | undefined {
	return TOURS.find((t) => t.id === id);
}
