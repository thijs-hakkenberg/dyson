import mixpanel from 'mixpanel-browser';

// Mixpanel configuration
const MIXPANEL_TOKEN = 'ee3a4e61711c373677e15366886acf9e';

let initialized = false;

/**
 * Initialize Mixpanel tracking
 * Should be called once when the app loads
 */
export function initMixpanel() {
	if (initialized || typeof window === 'undefined') return;

	mixpanel.init(MIXPANEL_TOKEN, {
		autocapture: true,
		record_sessions_percent: 100,
		api_host: 'https://api-eu.mixpanel.com',
		track_pageview: false // We'll handle page views manually
	});

	initialized = true;
}

/**
 * Track a page view with metadata
 */
export function trackPageView(pageName: string, properties: Record<string, any> = {}) {
	if (!initialized) return;

	mixpanel.track_pageview({
		page_name: pageName,
		...properties
	});
}

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, properties: Record<string, any> = {}) {
	if (!initialized) return;

	mixpanel.track(eventName, properties);
}

/**
 * Track CTA button clicks
 */
export function trackCTA(ctaName: string, location: string, destination: string) {
	trackEvent('CTA Click', {
		cta_name: ctaName,
		location,
		destination
	});
}

/**
 * Track phase navigation
 */
export function trackPhaseView(phaseId: string, phaseName: string) {
	trackEvent('Phase Viewed', {
		phase_id: phaseId,
		phase_name: phaseName
	});
}

/**
 * Track BOM item views
 */
export function trackBOMItemView(
	phaseId: string,
	itemSlug: string,
	itemName: string,
	itemCost: string
) {
	trackEvent('BOM Item Viewed', {
		phase_id: phaseId,
		item_slug: itemSlug,
		item_name: itemName,
		item_cost: itemCost
	});
}

/**
 * Track model specification views
 */
export function trackModelSpecView(
	itemSlug: string,
	modelId: string,
	viewType: 'individual' | 'comparison' | 'consensus'
) {
	trackEvent('Model Spec Viewed', {
		item_slug: itemSlug,
		model_id: modelId,
		view_type: viewType
	});
}

/**
 * Track research question views
 */
export function trackQuestionView(
	questionSlug: string,
	questionTitle: string,
	questionType: string,
	status: string
) {
	trackEvent('Research Question Viewed', {
		question_slug: questionSlug,
		question_title: questionTitle,
		question_type: questionType,
		status
	});
}

/**
 * Track simulator interactions
 */
export function trackSimulatorRun(
	questionSlug: string,
	simulatorType: string,
	parameters: Record<string, any>
) {
	trackEvent('Simulator Run', {
		question_slug: questionSlug,
		simulator_type: simulatorType,
		...parameters
	});
}

/**
 * Track filter/search interactions
 */
export function trackFilter(
	page: string,
	filterType: string,
	filterValue: string | string[]
) {
	trackEvent('Filter Applied', {
		page,
		filter_type: filterType,
		filter_value: filterValue
	});
}

/**
 * Track research paper interactions
 */
export function trackPaperClick(paperId: string, paperTitle: string, source: string) {
	trackEvent('Research Paper Clicked', {
		paper_id: paperId,
		paper_title: paperTitle,
		source
	});
}

/**
 * Track blog post views
 */
export function trackBlogView(slug: string, title: string, category: string) {
	trackEvent('Blog Post Viewed', {
		blog_slug: slug,
		blog_title: title,
		blog_category: category
	});
}

/**
 * Track organization views
 */
export function trackOrganizationView(slug: string, name: string, type: string) {
	trackEvent('Organization Viewed', {
		org_slug: slug,
		org_name: name,
		org_type: type
	});
}

/**
 * Track validation claim views
 */
export function trackValidationView(slug: string, title: string, status: string) {
	trackEvent('Validation Viewed', {
		validation_slug: slug,
		validation_title: title,
		validation_status: status
	});
}

/**
 * Track discussion/consensus views
 */
export function trackDiscussionView(questionSlug: string, roundNumber: number) {
	trackEvent('Discussion Thread Viewed', {
		question_slug: questionSlug,
		round_number: roundNumber
	});
}

/**
 * Track time on page (call this when user leaves)
 */
export function trackTimeOnPage(pageName: string, timeSpentSeconds: number) {
	if (timeSpentSeconds < 1) return; // Ignore very short visits

	trackEvent('Time on Page', {
		page_name: pageName,
		time_spent_seconds: timeSpentSeconds,
		time_spent_minutes: Math.round(timeSpentSeconds / 60)
	});
}

/**
 * Set user properties
 */
export function setUserProperties(properties: Record<string, any>) {
	if (!initialized) return;

	mixpanel.people.set(properties);
}

/**
 * Identify a user (if you have user accounts in the future)
 */
export function identifyUser(userId: string) {
	if (!initialized) return;

	mixpanel.identify(userId);
}
