/**
 * Organization Detail Page Load Function
 */

import type { PageLoad, EntryGenerator } from './$types';
import { fetchOrganization, fetchAllOrganizations } from '$lib/services/organizations';
import { error } from '@sveltejs/kit';

// Generate entries for prerendering
export const entries: EntryGenerator = async () => {
	const organizations = await fetchAllOrganizations();
	return organizations.map((org) => ({ slug: org.slug }));
};

export const load: PageLoad = async ({ params }) => {
	const organization = await fetchOrganization(params.slug);

	if (!organization) {
		error(404, {
			message: 'Organization not found'
		});
	}

	return {
		organization
	};
};
