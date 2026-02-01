<script lang="ts">
	import {
		phaseStatusColors,
		phaseStatusLabels,
		campaignStatusColors,
		campaignStatusLabels,
		activityStatusColors,
		activityStatusTextColors,
		researchQuestionStatusColors,
		researchQuestionStatusLabels,
		priorityColors,
		priorityLabels,
		type PhaseStatus,
		type CampaignStatus,
		type ActivityStatus,
		type ResearchQuestionStatus,
		type Priority
	} from '$lib/utils/status';

	type StatusType = 'phase' | 'campaign' | 'activity' | 'research' | 'priority';
	type StatusValue = PhaseStatus | CampaignStatus | ActivityStatus | ResearchQuestionStatus | Priority;

	interface Props {
		type: StatusType;
		status: StatusValue;
		size?: 'sm' | 'md' | 'lg';
		showLabel?: boolean;
		class?: string;
	}

	let { type, status, size = 'md', showLabel = true, class: className = '' }: Props = $props();

	const sizeClasses = {
		sm: 'px-1.5 py-0.5 text-xs',
		md: 'px-2 py-0.5 text-xs',
		lg: 'px-3 py-1 text-sm'
	};

	function getColorClasses(): string {
		switch (type) {
			case 'phase':
				return phaseStatusColors[status as PhaseStatus] || '';
			case 'campaign':
				return campaignStatusColors[status as CampaignStatus] || '';
			case 'activity':
				return `${activityStatusColors[status as ActivityStatus]} ${activityStatusTextColors[status as ActivityStatus]}`;
			case 'research':
				return researchQuestionStatusColors[status as ResearchQuestionStatus] || '';
			case 'priority':
				return priorityColors[status as Priority] || '';
			default:
				return 'bg-space-600 text-star-dim';
		}
	}

	function getLabel(): string {
		switch (type) {
			case 'phase':
				return phaseStatusLabels[status as PhaseStatus] || status;
			case 'campaign':
				return campaignStatusLabels[status as CampaignStatus] || status;
			case 'activity':
				return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
			case 'research':
				return researchQuestionStatusLabels[status as ResearchQuestionStatus] || status;
			case 'priority':
				return priorityLabels[status as Priority] || status;
			default:
				return status;
		}
	}

	const colorClasses = $derived(getColorClasses());
	const label = $derived(getLabel());
</script>

<span class="rounded {sizeClasses[size]} {colorClasses} {className}">
	{#if showLabel}
		{label}
	{:else}
		<span class="sr-only">{label}</span>
	{/if}
</span>
