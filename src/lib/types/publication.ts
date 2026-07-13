export type PublicationStatus = 'scaffold' | 'draft' | 'submitted' | 'published';

export interface Publication {
	number: string;
	slug: string;
	title: string;
	venue: string;
	status: PublicationStatus;
	doi: string | null;
	blogSlug: string | null;
}
