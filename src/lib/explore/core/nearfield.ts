/**
 * Near field: the focused BOM item's detailed model drawn in the orrery at
 * true scale (metres → AU). Only items with a point anchor qualify — bands
 * and shells focus the Sun, so there is no single place to stand.
 */

import { elementModel, type ElementModel } from './models';
import { getEntity } from './registry';
import { AU_M } from './units';

const POINT_ANCHORS = new Set(['lagrange', 'body', 'nea', 'cap', 'axis']);

export function nearFieldModel(id: string | null | undefined): ElementModel | null {
	const e = getEntity(id);
	if (!e || e.kind !== 'bom') return null;
	const kind = e.placement?.anchor?.kind;
	if (!kind || !POINT_ANCHORS.has(kind)) return null;
	return elementModel(e.id);
}

/** Model size in scene units (AU). */
export const sizeAU = (m: ElementModel) => m.params.size / AU_M;

/** Camera distance that frames the model. */
export const hardwareDistance = (m: ElementModel) => sizeAU(m) * 2.4;

/** Closest the camera may come. */
export const hardwareMinDistance = (m: ElementModel) => sizeAU(m) * 0.35;

/** Below this camera distance the model is resolved and its label takes over from the marker. */
export const nearFieldResolved = (m: ElementModel, cameraDistance: number) => cameraDistance < sizeAU(m) * 40;
