# Explorer TODO

## Orrery view (current phase)

- [x] Programme telemetry HUD (spend, power, production, fleet, compute, thrust)
- [x] Planet textures (Solar System Scope, CC BY 4.0)
- [x] Procedural Sun v1 — granulation, solar-cycle sunspots, limb darkening, differential rotation (`sun/`)
- [x] Sun v1.1 — Hα-style false-colour look (default), prominences scaled by solar activity, spicule fringe, corona streamers
- [ ] Expose Sun style toggle (Hα-style ↔ white light) in the Layers panel (`style` option already in `SunSurfaceOptions`)
- [x] Milky Way background sphere (ESO/S. Brunier, CC BY 4.0) in galactic → ecliptic frame
- [x] Superseded phases fade (to 18%) once the next phase is under way; selection restores a phase; toggle in Layers
- [ ] **Prettier UI** — open; user to give feedback on what feels off
- [ ] Crisp point stars from a real catalogue (HYG / Gaia bright stars) layered over the Milky Way image

- [x] Galactic motion: sky re-orients with the Sun's galactic orbit in every view; deep-time projection (0–250 Myr) with/without the stellar engine, galactic inset map

- [x] Logistics lens (L) — mass-flow chains (ore, lunar launch, swarm manufacturing, shell feedstock, stellar fuel) with bottlenecks
- [x] UI polish pass 1 — label declutter, collapsible telemetry, mobile layout, calmer transitions

## Detailed element models (after the remaining views)

- [x] Detailed 3D models for all 30 physical BOM elements (`core/models.ts` data, `scene/models/build.ts`
      nine procedural archetypes) — Workbench consensus core + "3D model" view (M, `?wbv=model`) with
      callouts, metric scale bar and divergent sizes as ghosts at true relative scale (clamped + flagged)
- [x] Tours revisited: up-close model steps in every phase tour + new "The hardware, up close" tour
- [x] Models in the orrery at close range: true-scale near field for point-anchored items (Z / Inspector); surface sites at the north pole
- [ ] Near field for band/shell items (they focus the Sun; would need a representative member to stand on)
- [x] Sun turns into a white star as the view recedes (false colour → white light; star sprite with spikes)
- [ ] Higher-fidelity models for the hero items (assembly node petals, collector sail deployment animation)

## Optimisations / spin-offs

- [ ] **Sun as a separate repo** — extract `src/lib/explore/sun/` into its own package
      (simulation-grade photosphere: granulation evolution, sunspot emergence/decay, faculae,
      chromosphere/corona). The explorer consumes it through the `SunSurfaceFactory` interface
      (`sun/types.ts`), injected via `<ExploreApp sunSurface={…}>`; the in-repo implementation
      stays as the default.

## Later phases (agreed build order)

3. [x] BOM Workbench — consensus core, model satellites, divergence forks, TRL gauges, linked RQs, blueprint hologram
4. [x] Research Nebula — all 142 RQs on a phase axis, status materials, P0 dependency conduits + critical-path artery, decision gates, BOM tracing, cross-links to orrery/workbench, ⌘K search
5. [x] Tour engine + chapters "Why build a Dyson swarm?" and "From asteroid to swarm" (`?tour=` deep links, pause on interaction)
   - [x] "Phase 1 in depth" — all seven P1 items, node forks, hand-off to the nebula
   - [x] In-depth tours for P0, P2, P3a (Matrioshka), P3b (Stellar engine)
6. [x] Gate Tunnel (Gates lens, G) — gates as criteria rings on a P0 month axis, TRL columns at projected arrival, late-dependency links
   - [x] Network Topology (Network lens, N) — P0 ops links, swarm authority → Shepherd hierarchy (consensus ratio), inter-shell trunks; true light-time, pulses at 60× c
   - [x] Risk & Validation lens (R) — heuristic risk halos with breakdown, validation beacons, ranked list, claims
   - [x] Simulation sandboxes (Workbench drawer) — radiation degradation per model orbit, self-replication per model cycle/closure, Shkadov standoff trade; more modules can register in `core/sandboxes.ts`
   - [x] Deliberation Chamber (Consensus lens, C) — 20 discussions replayed round by round: response beams, vote arcs, winners, termination votes, conclusion crystal

## Consensus issues

See [CONSENSUS-ISSUES.md](./CONSENSUS-ISSUES.md) — logged for assessment, not resolved.
- [x] First-visit welcome dialog offering tours; interface tour with HUD spotlight
