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

## Detailed element models (after the remaining views)

- [ ] Detailed 3D models for BOM elements (collector units/satellites, assembly node, processing station,
      mass drivers, tugs, foundries, mirror statites, …) shown at close range / in the Workbench,
      built from the consensus specs (dimensions, masses) with divergent variants as ghosts
- [ ] **Then revisit all tours** to fly up to these models — more cinematic and engaging

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
   - [ ] Network Topology
   - [ ] Risk & Validation lens
   - [ ] Simulation sandboxes
   - [ ] Deliberation Chamber

## Consensus issues

See [CONSENSUS-ISSUES.md](./CONSENSUS-ISSUES.md) — logged for assessment, not resolved.
