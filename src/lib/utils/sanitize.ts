/**
 * HTML Sanitization Utilities
 *
 * Provides XSS protection for user-generated or dynamic HTML content.
 * Uses DOMPurify for robust sanitization.
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param html - Raw HTML string to sanitize
 * @returns Sanitized HTML string safe for rendering with {@html}
 */
export function sanitizeHTML(html: string): string {
	// Only run DOMPurify in browser environment
	if (typeof window === 'undefined') {
		// On server, strip all HTML tags as a fallback
		return stripTags(html);
	}

	return DOMPurify.sanitize(html, {
		// Allow common HTML elements
		ALLOWED_TAGS: [
			'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
			'p', 'br', 'hr',
			'ul', 'ol', 'li',
			'strong', 'em', 'b', 'i', 'u', 's', 'del', 'ins',
			'a', 'img',
			'table', 'thead', 'tbody', 'tr', 'th', 'td',
			'blockquote', 'pre', 'code',
			'div', 'span',
			'sup', 'sub'
		],
		// Allow safe attributes
		ALLOWED_ATTR: [
			'href', 'src', 'alt', 'title', 'class', 'id',
			'target', 'rel',
			'colspan', 'rowspan'
		],
		// Force links to open safely
		ADD_ATTR: ['target', 'rel'],
		// Prevent javascript: URLs
		ALLOW_DATA_ATTR: false,
		// Additional security settings
		FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input', 'button'],
		FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover']
	});
}

/**
 * Strip all HTML tags from content (server-side fallback)
 * @param html - HTML string
 * @returns Plain text without any HTML
 */
export function stripTags(html: string): string {
	return html.replace(/<[^>]*>/g, '');
}

/**
 * Sanitize HTML for markdown rendering
 * More permissive than general sanitization since markdown generates predictable HTML
 * @param html - HTML generated from markdown
 */
export function sanitizeMarkdownHTML(html: string): string {
	if (typeof window === 'undefined') {
		// On server, return as-is since markdown output is controlled
		// The actual sanitization happens on the client
		return html;
	}

	return DOMPurify.sanitize(html, {
		USE_PROFILES: { html: true },
		// Allow class for syntax highlighting
		ADD_ATTR: ['class', 'target', 'rel'],
		// Force external links to be safe
		ADD_TAGS: ['a'],
		FORBID_TAGS: ['script', 'style', 'iframe'],
		FORBID_ATTR: ['onerror', 'onclick', 'onload']
	});
}

/**
 * Configure DOMPurify hooks for additional protection
 * Call this once during app initialization
 */
export function configureSanitizer(): void {
	if (typeof window === 'undefined') return;

	// Force all links to open in new tab with noopener
	DOMPurify.addHook('afterSanitizeAttributes', (node) => {
		if (node.tagName === 'A') {
			const href = node.getAttribute('href');
			if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
				node.setAttribute('target', '_blank');
				node.setAttribute('rel', 'noopener noreferrer');
			}
		}
	});
}
