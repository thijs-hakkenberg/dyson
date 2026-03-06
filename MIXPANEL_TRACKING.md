# Mixpanel Tracking Implementation

This document outlines the comprehensive Mixpanel tracking implementation for Project Dyson.

## Configuration

**Mixpanel Token:** `ee3a4e61711c373677e15366886acf9e`
**API Host:** `https://api-eu.mixpanel.com`
**Session Recording:** 100% of sessions
**Autocapture:** Enabled

## Implementation Files

### Core Service
- **File:** `src/lib/services/mixpanel.ts`
- **Purpose:** Centralized Mixpanel SDK wrapper with typed tracking functions

### Initialization
- **File:** `src/routes/+layout.svelte`
- **Features:**
  - Automatic Mixpanel initialization on app mount
  - Automatic page view tracking on route changes
  - Automatic time-on-page tracking with cleanup

## Tracked Events

### 1. Page Views
**Event:** Automatic via `track_pageview()`
**Triggered:** On every route change
**Properties:**
- `page_name`: Current page path
- `url`: Full URL
- `referrer`: Document referrer

**Tracked Pages:**
- All pages automatically via root layout

---

### 2. Time on Page
**Event:** `Time on Page`
**Triggered:** When user navigates away or closes page
**Properties:**
- `page_name`: Page path
- `time_spent_seconds`: Duration in seconds
- `time_spent_minutes`: Duration in minutes (rounded)

---

### 3. CTA Clicks
**Event:** `CTA Click`
**Tracked on:**
- Home page CTAs (Explore the Plan, Learn More, etc.)
- All major call-to-action buttons

**Properties:**
- `cta_name`: Button text (e.g., "Explore the Plan")
- `location`: Section where button appears (e.g., "Hero", "Multi-LLM Consensus")
- `destination`: Target URL

**Locations Tracked:**
- Hero section: "Explore the Plan", "Learn More"
- What is Dyson Swarm: "Learn More About Approach"
- Phased Approach: "View Full Plan"
- Multi-LLM Consensus: "View Phase 0 LLM Analysis"
- Research section: "Browse Research Hub"
- Join Mission: "Get Involved", "Support Us"

---

### 4. Phase Views
**Event:** `Phase Viewed`
**Tracked on:** `/plan/[phase]`
**Properties:**
- `phase_id`: Phase identifier (e.g., "phase-0")
- `phase_name`: Human-readable phase name

---

### 5. BOM Item Views
**Event:** `BOM Item Viewed`
**Tracked on:** `/plan/[phase]/bom/[item]`
**Properties:**
- `phase_id`: Parent phase identifier
- `item_slug`: URL slug of the item
- `item_name`: Human-readable item name
- `item_cost`: Budget allocation

---

### 6. Model Specification Views
**Event:** `Model Spec Viewed`
**Tracked on:** Tab changes in BOM item detail page
**Properties:**
- `item_slug`: BOM item identifier
- `model_id`: Model identifier (e.g., "claude-opus-4-5", "gemini-3-pro", "gpt-5-2")
- `view_type`: "consensus", "individual", or "comparison"

**Tracked tabs:**
- Consensus view
- Claude Opus 4.5/4.6 specs
- Gemini 3 Pro specs
- GPT-5.2 specs

---

### 7. Research Question Views
**Event:** `Research Question Viewed`
**Tracked on:** `/questions/[slug]`
**Properties:**
- `question_slug`: Question identifier
- `question_title`: Full question title
- `question_type`: Type (e.g., "simulation", "meta-research", "discussion")
- `status`: Current status (e.g., "open", "answered", "investigating")

---

### 8. Simulator Interactions
**Event:** `Simulator Run`
**Tracked on:** Simulator execution
**Properties:**
- `question_slug`: Related research question
- `simulator_type`: Type of simulator (e.g., "constellation", "isru", "swarm-dynamics")
- Additional properties specific to each simulator (parameters used)

**Tracked Simulators:**

1. **Constellation Coverage Simulator**
   - `constellation_size`: Number of satellites (20-70)
   - `mission_duration`: Mission duration in years (5-10)
   - `failure_rate`: Annual failure rate (0-0.10)
   - `propulsion_type`: Propulsion system type (electric/chemical/hybrid)
   - `monte_carlo_runs`: Number of Monte Carlo trials (100-1000)
   - `nea_population`: NEA population size (~2000)

2. **ISRU Economics Simulator**
   - `mode`: "single" or "comparison"
   - `target_deployment_units`: Total units to produce
   - `launch_cost_range`: Launch cost range (low-high)
   - `isru_capital_cost_range`: ISRU capital cost range (low-high)
   - `earth_production_rate`: Earth production rate (units/year)
   - `isru_max_production`: ISRU max production rate

**Future Simulators to Add:**
- Swarm Dynamics Simulator
- Depot Logistics Simulator
- Fleet Coordination Simulator
- Orbital Trade Simulator
- All other question-specific simulators

---

### 9. Filter/Search Interactions
**Event:** `Filter Applied`
**Tracked on:** Question list filters
**Properties:**
- `page`: "questions"
- `filter_type`: Type of filter (e.g., "phase", "type", "status", "priority", "resolution", "sort")
- `filter_value`: Selected filter value

**Tracked Filters:**
- Phase filter
- Question type filter
- Status filter
- Priority filter
- Resolution status filter
- Sort option

---

### 10. Blog Post Views
**Event:** `Blog Post Viewed`
**Tracked on:** `/blog/[slug]`
**Properties:**
- `blog_slug`: Post identifier
- `blog_title`: Post title
- `blog_category`: Post category

---

### 11. Organization Views
**Event:** `Organization Viewed`
**Tracked on:** `/organizations/[slug]`
**Properties:**
- `org_slug`: Organization identifier
- `org_name`: Organization name
- `org_type`: Organization category

---

### 12. Research Paper Clicks
**Event:** `Research Paper Clicked`
**Tracked on:** Paper title and PDF links in ArxivSearch results
**Properties:**
- `paper_id`: arXiv paper ID
- `paper_title`: Paper title
- `source`: "arXiv" or "arXiv PDF"

**Locations Tracked:**
- Paper title links
- PDF download links

---

### 13. Validation Views
**Event:** `Validation Viewed`
**Tracked on:** `/validation/[slug]`
**Properties:**
- `validation_slug`: Validation claim identifier
- `validation_title`: Claim title
- `validation_status`: Current validation status

---

### 14. Discussion Thread Views
**Event:** `Discussion Thread Viewed`
**Tracked on:** Discussion questions with active threads
**Properties:**
- `question_slug`: Related question identifier
- `round_number`: Number of discussion rounds

---

### 15. Roadmap Experiment Interactions
**Event:** `Experiment Link Clicked`
**Tracked on:** ExperimentCard "Learn more" links
**Properties:**
- `experiment_name`: Name of the experiment
- `organization`: Conducting organization
- `status`: Experiment status
- `estimated_cost`: Cost estimate
- `reference_url`: External reference URL

---

## Integration Checklist

### ✅ Completed
- [x] Mixpanel SDK installed
- [x] Core service created (`mixpanel.ts`)
- [x] Root layout initialization
- [x] Automatic page view tracking
- [x] Automatic time-on-page tracking
- [x] Home page CTA tracking
- [x] Phase view tracking
- [x] BOM item view tracking
- [x] Model spec tab tracking
- [x] Research question view tracking
- [x] Constellation simulator tracking
- [x] ISRU Economics simulator tracking (single & comparison modes)
- [x] Question filter tracking
- [x] Blog post view tracking
- [x] Organization view tracking
- [x] Organization filter tracking
- [x] Research paper click tracking (arXiv papers & PDFs)
- [x] Validation claim view tracking
- [x] Discussion thread view tracking
- [x] Roadmap experiment link tracking

### ⏳ Pending Integration
- [ ] Additional simulator tracking (Swarm Dynamics, Fleet Coordination, etc.)
- [ ] Analysis page interactions
- [ ] Additional CTA tracking across more pages

## Usage Examples

### Track a custom event
```typescript
import { trackEvent } from '$lib/services/mixpanel';

trackEvent('Custom Event Name', {
  property1: 'value1',
  property2: 123
});
```

### Track a CTA click
```typescript
import { trackCTA } from '$lib/services/mixpanel';

<a
  href="/destination"
  onclick={() => trackCTA('Button Text', 'Section Name', '/destination')}
>
  Button Text
</a>
```

### Track a filter change
```typescript
import { trackFilter } from '$lib/services/mixpanel';

function handleFilterChange(filterType: string, value: string) {
  trackFilter('page-name', filterType, value);
  // ... other logic
}
```

## Key Metrics to Monitor

### User Engagement
- Pages per session
- Time on page by content type
- Most viewed phases and BOM items
- Most popular research questions

### Content Performance
- CTA click-through rates by location
- Model spec preferences (Claude vs Gemini vs GPT)
- Blog post engagement
- Simulator usage by question type

### User Journey
- Navigation patterns (Home → Plan → BOM Item)
- Research question exploration patterns
- Filter usage patterns
- Time spent in different phases

### Technical Adoption
- Simulator run frequency
- Parameter combinations used
- Filter combinations
- Search query patterns

## Privacy & Compliance

- No personally identifiable information (PII) is tracked
- Session recording captures user interactions for UX improvements
- All tracking is anonymous
- Token is client-side visible (standard for Mixpanel web implementation)

## Future Enhancements

1. **User Cohorts**: Track returning vs new visitors
2. **Funnel Analysis**: Track conversion paths (e.g., Home → Plan → BOM Item → Model Spec)
3. **A/B Testing**: Track different UI variations
4. **Error Tracking**: Track client-side errors with context
5. **Performance Metrics**: Track page load times and component render times
6. **Download Tracking**: If PDFs or data exports are added
7. **Form Submissions**: If contact or feedback forms are added
8. **Social Share Tracking**: If social sharing is added

## Testing

To verify tracking is working:

1. **Open Mixpanel Debugger**: In browser console, run `mixpanel.get_property('$device_id')`
2. **Check Live View**: Go to Mixpanel dashboard → Events → Live View
3. **Test Event Firing**: Navigate the site and verify events appear in Live View
4. **Validate Properties**: Ensure all custom properties are captured correctly

## Troubleshooting

### Events not appearing in Mixpanel
- Check browser console for errors
- Verify Mixpanel token is correct
- Ensure `initMixpanel()` is called before tracking
- Check that ad blockers aren't blocking Mixpanel

### Missing properties
- Verify component state is available when tracking
- Check $effect dependencies
- Ensure property values are defined before tracking

### Duplicate events
- Check for multiple $effect calls
- Verify component mounting/unmounting behavior
- Consider debouncing rapid filter changes
