/**
 * Narrated tours. Every figure in a caption comes from the BOM data, the
 * consensus documents, or a cited physical constant; nothing is invented for
 * the story. Years are derived from the projected timeline so the tours stay
 * consistent if phase durations change.
 */

import type { Tour } from './tour.svelte';
import { phaseWindow } from './timeline';
import { TODAY_YEAR } from './state.svelte';
import { PHASES } from '$lib/services/content';
import { formatUSD } from './units';

/** Phase facts for captions, derived from content.ts and the timeline. */
function phaseFacts(id: string) {
	const p = PHASES.find((x) => x.id === id)!;
	const w = phaseWindow(id)!;
	return {
		items: p.bom.length,
		cost: formatUSD(p.bom.reduce((s, b) => s + b.totalCost, 0)),
		years: Math.round(w.end - w.start),
		start: Math.round(w.start),
		end: Math.round(w.end)
	};
}
const F1 = phaseFacts('phase-1');
const F0 = phaseFacts('phase-0');
const F2 = phaseFacts('phase-2');
const F3A = phaseFacts('phase-3a');
const F3B = phaseFacts('phase-3b');

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
	},
	{
		id: 'phase-1',
		title: 'Phase 1 in depth',
		subtitle: 'Seven BOM items that build the first swarm — 3 min',
		steps: [
			{
				title: 'Phase 1 · Initial swarm deployment',
				body: `Seven bill-of-materials items, about **${F1.cost}** and **~${F1.years} years** (nominal) to put the first collectors in orbit. Here is how they fit together.`,
				duration: 9,
				lens: 'physical',
				workbench: null,
				year: at('phase-1', 0.02),
				focus: 'sun',
				select: 'phase-1',
				layers: { divergence: true },
				camera: { distance: 2.4, polar: 60 }
			},
			{
				title: 'The assembly node',
				body: 'First comes the **assembly node**: a modular hub of 120–450 t with 1.5–2 MW of power and 4–8 robot arms. It is shown at Sun–Earth L1 (Claude’s choice); Gemini prefers Mercury’s L1, GPT a 0.7–1.0 AU orbit.',
				duration: 11,
				year: { to: at('phase-1', 0.12), over: 3 },
				focus: 'bom-1-4',
				select: 'bom-1-4'
			},
			{
				title: 'Mass drivers on the Moon',
				body: 'Feedstock leaves the Moon on **mass drivers**: coilguns with 650 m–3.4 km tracks, accelerating cargo at 100–1,000 g. How often they fire is disputed — from 5 launches an hour (Claude) to 6 a minute (Gemini).',
				duration: 11,
				year: { to: at('phase-1', 0.22), over: 3 },
				focus: 'bom-1-5',
				select: 'bom-1-5',
				camera: { distance: 0.004, polar: 65 }
			},
			{
				title: 'Orbital tugs',
				body: '**20 orbital tugs** — 50 kW solar-electric craft with Hall thrusters — haul 2–8 t payloads from the catch points to the node.',
				duration: 9,
				year: { to: at('phase-1', 0.3), over: 3 },
				focus: 'earth',
				select: 'bom-1-6',
				camera: { distance: 0.02, polar: 60 }
			},
			{
				title: 'Assembly robots',
				body: 'At the node, **assembly robots** in specialised classes — heavy manipulators down to ±0.1 mm precision assemblers — build the collectors. How many are needed is wide open: the BOM lists 50, Claude 350, Gemini 10,000 a month at full rate.',
				duration: 11,
				focus: 'bom-1-3',
				select: 'bom-1-3'
			},
			{
				title: 'Collectors roll out',
				body: 'Finished **collector units** are released at 1 AU, at 1–1.7 MW of collecting capacity per month. The consensus: start at 1 AU to limit thermal and radiation risk, move inward in Phase 2.',
				duration: 11,
				year: { to: at('phase-1', 0.6), over: 4 },
				focus: 'sun',
				select: 'bom-1-1',
				camera: { distance: 2.2, polar: 58 }
			},
			{
				title: 'PV blanket arrays',
				body: 'Each collector carries **PV blankets**: 35–50 g/m² thin film, unrolled by spin or booms, 15–28% efficient, with segment-level fault isolation so a hit dims a patch, not the unit.',
				duration: 10,
				select: 'bom-1-2'
			},
			{
				title: 'Swarm control',
				body: 'The **swarm control system** ties it together: node → cluster → swarm authority, 1550 nm laser links, under 20 W of control power per satellite. Even the swarm’s size is disputed — 1,000 (GPT) or 10,000 (Claude, Gemini).',
				duration: 11,
				select: 'bom-1-7'
			},
			{
				title: 'End of Phase 1',
				body: 'By the end of the phase the telemetry panel shows the result: spend, power, production and fleet counts, all derived from these seven items.',
				duration: 9,
				year: { to: at('phase-1', 0.99), over: 4 },
				select: null,
				camera: { distance: 2.6, polar: 60 }
			},
			{
				title: 'Inside the node',
				body: 'Fly into the assembly node. Six forks mark where the models split — starting with **where to put it**.',
				duration: 10,
				workbench: 'bom-1-4',
				wbSelection: 'orbital-location'
			},
			{
				title: 'Nuclear or solar?',
				body: 'Claude proposes **four 500 kW Kilopower-derived reactors**; Gemini solar PV plus concentrators near Mercury; GPT **1.5 MW of solar PV** at 1 AU. All three positions are kept on record.',
				duration: 11,
				wbSelection: 'primary-power-source'
			},
			{
				title: 'What would settle it',
				body: 'Phase 1 has **51 research questions** behind these choices. The Knowledge lens shows which are answered — and lights up the ones behind the node.',
				duration: 11,
				workbench: null,
				lens: 'knowledge',
				select: 'bom-1-4'
			}
		]
	},
	{
		id: 'phase-0',
		title: 'Phase 0 in depth',
		subtitle: 'Space resource processing: the industrial base — 2½ min',
		steps: [
			{
				title: 'Phase 0 · Space resource processing',
				body: `${F0.items} items, **${F0.cost}**, ~${F0.years} years (start year assumed). Before any collector flies, the project needs an industry in space.`,
				duration: 9,
				lens: 'physical',
				workbench: null,
				year: at('phase-0', 0.02),
				focus: 'sun',
				select: 'phase-0',
				layers: { nea: true, divergence: true },
				camera: { distance: 2.4, polar: 60 }
			},
			{
				title: 'Prospecting satellites',
				body: '80–120 kg spacecraft with **visible/near-IR spectrometers (0.4–2.5 μm)** and 30 days of autonomy. The BOM funds 32; the consensus text says 50 (logged as CI-16).',
				duration: 10,
				year: { to: at('phase-0', 0.25), over: 3 },
				focus: 'bom-0-1',
				select: 'bom-0-1'
			},
			{
				title: 'Mining robots',
				body: '**20 robots** of 2.5–3.5 t on multiple legs, anchored to low-gravity rock, concentrating ore on board. How to anchor is a **critical** open fork.',
				duration: 10,
				year: { to: at('phase-0', 0.5), over: 3 },
				focus: 'bom-0-2',
				select: 'bom-0-2'
			},
			{
				title: 'Transport vehicles',
				body: 'Ion-propelled freighters with **150–250 t** payloads and 6–10 km/s of Δv carry ore inward. Fleet size differs again: 10 in the consensus, 15 in the BOM (CI-17).',
				duration: 10,
				select: 'bom-0-4'
			},
			{
				title: 'Material processing station',
				body: 'One modular station at **Sun–Earth L4**, 400–500 t growing to ~1,000 t, refining **50,000 t a year** on 1–2.5 MW of solar power.',
				duration: 10,
				year: { to: at('phase-0', 0.8), over: 3 },
				focus: 'bom-0-3',
				select: 'bom-0-3'
			},
			{
				title: 'Power and propellant',
				body: '**100 MW** of triple-junction arrays (32–36% efficient) power the base, and **ISPP** modules of ~250 kWe each turn water ice into 100–120 t of propellant a year.',
				duration: 10,
				focus: 'earth',
				select: 'bom-0-6',
				camera: { distance: 0.03, polar: 65 }
			},
			{
				title: 'Where the processing happens',
				body: 'Inside the station, the models split on smelting technology, silicon processing and whether to send a crew at all.',
				duration: 10,
				workbench: 'bom-0-3',
				wbSelection: 'smelting-technology'
			},
			{
				title: 'The open questions',
				body: 'Phase 0 has **49 research questions** and five decision gates — the most mature graph in the project. The red artery is its critical path.',
				duration: 11,
				workbench: null,
				lens: 'knowledge',
				select: null
			}
		]
	},
	{
		id: 'phase-2',
		title: 'Phase 2 in depth',
		subtitle: 'From a thousand collectors to a hundred thousand — 2 min',
		steps: [
			{
				title: 'Phase 2 · Swarm expansion',
				body: `${F2.items} items, **${F2.cost}**, ~${F2.years} years (${F2.start}–${F2.end}, nominal). The swarm grows a hundredfold.`,
				duration: 9,
				lens: 'physical',
				workbench: null,
				year: at('phase-2', 0.02),
				focus: 'sun',
				select: 'phase-2',
				layers: { divergence: true },
				camera: { distance: 2.2, polar: 58 }
			},
			{
				title: 'Self-replicating factories',
				body: '**5 manufacturing nodes** of ~2,400 t each aim to copy themselves every **18–24 months** with 90–94% of their mass from local material, turning out 10–25 t of metal a day.',
				duration: 11,
				year: { to: at('phase-2', 0.3), over: 4 },
				select: 'bom-2-3'
			},
			{
				title: 'Collector satellites',
				body: '**100,000 satellites** of 1,000–5,000 m² thin film, 25–42% efficient, at 0.5–0.8 AU. The recommended start is GPT’s 5,000 m² class at ~1.3 MW each.',
				duration: 11,
				year: { to: at('phase-2', 0.75), over: 5 },
				select: 'bom-2-1',
				camera: { distance: 1.8, polar: 55 }
			},
			{
				title: 'Earlier phases recede',
				body: 'Phase 1 hardware fades as Phase 2 takes over, so the new swarm stays readable. Select any earlier item to bring its phase back.',
				duration: 9,
				select: null
			},
			{
				title: 'Maintenance drones',
				body: '**5,000 drones** keep the swarm alive: 14–52 kg inspectors and 180–320 kg servicers working out of regional depots.',
				duration: 10,
				select: 'bom-2-2'
			},
			{
				title: 'Inside a collector',
				body: 'The collector’s forks: where to orbit, how to convert power, how big each unit should be — from a **5,000 m²** panel to a **1 km²** sail.',
				duration: 11,
				year: { to: at('phase-2', 0.98), over: 3 },
				workbench: 'bom-2-1',
				wbSelection: 'unit-scale'
			},
			{
				title: 'What Phase 2 still needs to know',
				body: '**32 research questions** sit behind Phase 2 — most still open.',
				duration: 10,
				workbench: null,
				lens: 'knowledge',
				select: 'bom-2-1'
			}
		]
	},
	{
		id: 'phase-3a',
		title: 'Matrioshka Brain in depth',
		subtitle: 'Nested shells that compute with starlight — 2½ min',
		steps: [
			{
				title: 'Phase 3a · Matrioshka Brain',
				body: `${F3A.items} items, **${F3A.cost}**, ~${F3A.years} years. Phase 2 and earlier fade back so the shells are visible.`,
				duration: 9,
				lens: 'physical',
				workbench: null,
				year: at('phase-3a', 0.05),
				focus: 'sun',
				select: 'phase-3a',
				layers: { divergence: true, fade: true },
				camera: { distance: 70, polar: 62 }
			},
			{
				title: 'A temperature ladder',
				body: 'Shells step down from **800–1200 K** to **10–20 K**. Each one runs on the infrared waste heat of the shell inside it. Colours below 1000 K are **false colour**.',
				duration: 11,
				year: { to: at('phase-3a', 0.5), over: 6 },
				select: 'bom-3a-3',
				camera: { distance: 32, polar: 58 }
			},
			{
				title: 'Computational tiles',
				body: '**10¹² hexagonal tiles**, each a stack: energy harvester → heat spreader → compute → spectrally tuned radiator. 25–60 PFLOPS per tile.',
				duration: 11,
				select: 'bom-3a-1',
				camera: { distance: 8, polar: 60 }
			},
			{
				title: 'Foundries that copy themselves',
				body: '**1,000 seed foundries** of ~50,000 t, ≥96% built from local material, each producing a daughter every **12–18 months**.',
				duration: 11,
				year: { to: at('phase-3a', 0.7), over: 4 },
				select: 'bom-3a-4',
				camera: { distance: 9, polar: 60 }
			},
			{
				title: 'Light between layers',
				body: 'Shells talk over a **1550 nm** optical backbone: tile-embedded transceivers, sector routers, and ~500 kg trunk relays with 1 m apertures.',
				duration: 10,
				select: 'bom-3a-2'
			},
			{
				title: 'Compute, live',
				body: 'The telemetry panel now tracks **Matrioshka compute** in FLOPS alongside power. Its range spans the models’ tile designs.',
				duration: 9,
				year: { to: at('phase-3a', 0.95), over: 4 },
				select: null,
				camera: { distance: 70, polar: 62 }
			},
			{
				title: 'Where the shells really are',
				body: 'Shell radii and count are **unresolved**: the dashed rings are Gemini’s and GPT’s alternatives to the baseline five shells.',
				duration: 10,
				select: 'bom-3a-1'
			},
			{
				title: 'Inside a foundry',
				body: 'The foundry’s forks: how to make chips in space, how to damp vibration, how to power it and shed its heat.',
				duration: 11,
				workbench: 'bom-3a-4',
				wbSelection: 'semiconductor-fabrication-strategy'
			}
		]
	},
	{
		id: 'phase-3b',
		title: 'Stellar Engine in depth',
		subtitle: 'Turning the Sun into a rocket — 2½ min',
		steps: [
			{
				title: 'Phase 3b · Stellar engine',
				body: `${F3B.items} items, **${F3B.cost}**, built in parallel with the Matrioshka Brain. The aim: push the whole Solar System.`,
				duration: 9,
				lens: 'physical',
				workbench: null,
				year: at('phase-3b', 0.05),
				focus: 'sun',
				select: 'phase-3b',
				layers: { divergence: true, fade: true },
				camera: { distance: 3, polar: 70 }
			},
			{
				title: 'The Shkadov mirror',
				body: 'A cap of **independent reflective statites** (R ≥ 0.95) bounces sunlight back on one side. The imbalance yields **10¹⁷–10¹⁸ N** — a backup, always-on thrust.',
				duration: 11,
				year: { to: at('phase-3b', 0.4), over: 5 },
				select: 'bom-3b-1',
				camera: { distance: 0.6, polar: 72 }
			},
			{
				title: 'Lifting the Sun’s own mass',
				body: '**Mass-lifting stations** close to the Sun draw plasma off its surface magnetically. How close is a fork: from 3–5 solar radii (Claude) to 0.05 AU (Gemini).',
				duration: 11,
				select: 'bom-3b-4',
				camera: { distance: 0.35, polar: 70 }
			},
			{
				title: 'Sorting the fuel',
				body: '**Helium separation plants** split the lifted stream: hydrogen returns to the Sun, helium becomes exhaust. Their power draw is disputed — petawatts to exawatts.',
				duration: 10,
				select: 'bom-3b-5'
			},
			{
				title: 'Accelerators and the jet',
				body: 'Electromagnetic accelerators drive the helium to **~0.01c (3,000 km/s)**; the thermonuclear jet adds ~**3×10¹⁸ N**.',
				duration: 11,
				year: { to: at('phase-3b', 0.9), over: 5 },
				select: 'bom-3b-2',
				camera: { distance: 3, polar: 65 }
			},
			{
				title: 'Thrust, live',
				body: 'The telemetry panel shows total thrust, the Sun’s acceleration, and the **Δv and distance** it has gained. Tiny per year, decisive over millennia.',
				duration: 10,
				select: null
			},
			{
				title: 'Keeping it pointed',
				body: '**Thrust stabilisation** keeps the vector true to microradians, using quasar astrometry and pulsar timing as reference.',
				duration: 10,
				select: 'bom-3b-8'
			},
			{
				title: 'The biggest open choice',
				body: 'Inside the mirror: where to put it. Claude and Gemini say **0.1 AU**, GPT **1 AU** — a decision that reshapes area, mass and heat.',
				duration: 11,
				workbench: 'bom-3b-1',
				wbSelection: 'standoff-distance-heliocentric-radius'
			}
		]
	}
];

export function getTour(id: string | null | undefined): Tour | undefined {
	return TOURS.find((t) => t.id === id);
}
