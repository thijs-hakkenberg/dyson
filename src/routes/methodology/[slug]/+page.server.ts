import type { PageServerLoad, EntryGenerator } from './$types';
import { error } from '@sveltejs/kit';
import { getMethodologyDocs, getMethodologyDoc, critiqueRoundsFor } from '$lib/services/methodology';

export const entries: EntryGenerator = () => getMethodologyDocs().map(({ slug }) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
	const doc = getMethodologyDoc(params.slug);
	if (!doc) error(404, { message: 'Methodology document not found' });
	const { body: _body, ...rest } = doc;
	return { doc: rest, rounds: critiqueRoundsFor(doc.sha) };
};
