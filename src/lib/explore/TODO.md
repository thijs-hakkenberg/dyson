# Explorer TODO

## Orrery view (current phase)

- [x] Programme telemetry HUD (spend, power, production, fleet, compute, thrust)
- [x] Planet textures (Solar System Scope, CC BY 4.0)
- [x] Procedural Sun v1 — granulation, solar-cycle sunspots, limb darkening, differential rotation (`sun/`)
- [x] Sun v1.1 — Hα-style false-colour look (default), prominences scaled by solar activity, spicule fringe, corona streamers
- [ ] Expose Sun style toggle (Hα-style ↔ white light) in the Layers panel (`style` option already in `SunSurfaceOptions`)
- [x] Milky Way background sphere (ESO/S. Brunier, CC BY 4.0) in galactic → ecliptic frame
- [ ] **Prettier UI** — open; user to give feedback on what feels off
- [ ] Crisp point stars from a real catalogue (HYG / Gaia bright stars) layered over the Milky Way image

## Optimisations / spin-offs

- [ ] **Sun as a separate repo** — extract `src/lib/explore/sun/` into its own package
      (simulation-grade photosphere: granulation evolution, sunspot emergence/decay, faculae,
      chromosphere/corona). The explorer consumes it through the `SunSurfaceFactory` interface
      (`sun/types.ts`), injected via `<ExploreApp sunSurface={…}>`; the in-repo implementation
      stays as the default.

## Later phases (agreed build order)

3. [x] BOM Workbench — consensus core, model satellites, divergence forks, TRL gauges, linked RQs, blueprint hologram
4. [x] Research Nebula — all 142 RQs on a phase axis, status materials, P0 dependency conduits + critical-path artery, decision gates, BOM tracing, cross-links to orrery/workbench, ⌘K search
5. Tour engine + first two chapters
6. Gate Tunnel, Topology, Risk lens, sim sandboxes, Deliberation Chamber

## Consensus issues

See [CONSENSUS-ISSUES.md](./CONSENSUS-ISSUES.md) — logged for assessment, not resolved.
