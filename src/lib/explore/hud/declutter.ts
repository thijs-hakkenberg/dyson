/**
 * Screen-space label decluttering for the HTML labels anchored in 3D.
 *
 * Every ~150 ms, label texts are ranked (selected > major > minor/quiet,
 * then nearer-to-centre first) and greedily placed; a label whose text box
 * overlaps one already placed gets `data-occluded`, which fades its text but
 * keeps its reticle so the object stays findable and clickable. Hovering a
 * reticle reveals its label.
 */

const PRIO: Record<string, number> = { selected: 0, major: 1, minor: 2 };

export function startDeclutter(root: HTMLElement): () => void {
	let raf = 0;
	let last = 0;
	const tick = (now: number) => {
		raf = requestAnimationFrame(tick);
		if (now - last < 150) return;
		last = now;
		const cx = window.innerWidth / 2;
		const cy = window.innerHeight / 2;
		const items: { el: HTMLElement; r: DOMRect; p: number; d: number }[] = [];
		for (const el of root.querySelectorAll<HTMLElement>('[data-lbl]')) {
			const txt = el.querySelector<HTMLElement>('.txt');
			if (!txt) continue;
			const r = txt.getBoundingClientRect();
			if (r.width === 0 || r.bottom < 0 || r.top > window.innerHeight) continue;
			items.push({
				el,
				r,
				p: PRIO[el.dataset.lbl ?? 'major'] ?? 1,
				d: Math.hypot(r.left - cx, r.top - cy)
			});
		}
		items.sort((a, b) => a.p - b.p || a.d - b.d);
		const placed: DOMRect[] = [];
		const pad = 2;
		for (const it of items) {
			const hit =
				it.p > 0 &&
				placed.some(
					(q) =>
						it.r.left < q.right + pad &&
						it.r.right > q.left - pad &&
						it.r.top < q.bottom + pad &&
						it.r.bottom > q.top - pad
				);
			if (hit) it.el.setAttribute('data-occluded', '');
			else {
				it.el.removeAttribute('data-occluded');
				placed.push(it.r);
			}
		}
	};
	raf = requestAnimationFrame(tick);
	return () => cancelAnimationFrame(raf);
}
