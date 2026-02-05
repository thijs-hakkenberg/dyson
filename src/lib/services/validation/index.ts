/**
 * Validation Services Module
 *
 * Re-exports all validation-related functionality for convenient imports.
 */

// Service exports (fetching and filtering)
export {
	fetchAllValidations,
	getValidationStatus,
	getValidationBySlug,
	getValidationsForBOMItem,
	getValidationsForQuestion,
	filterByStatus,
	filterBySource,
	filterValidations,
	computeValidationStats,
	getRecentValidations,
	getValidationsFromLastDays,
	extractAllTags,
	getLatestValidationEntry,
	clearValidationsCache
} from './validation-service';
