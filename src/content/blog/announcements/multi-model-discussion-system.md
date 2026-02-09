---
slug: "multi-model-discussion-system"
title: "Multi-Model Deliberation: LLM Discussion System for Research Questions"
description: "Introducing our new discussion system where Claude, Gemini, and GPT collaboratively debate policy decisions through structured rounds of responses and voting."
author: "Project Dyson Team"
date: "2026-02-07"
category: "Announcements"
tags:
  - "feature"
  - "llm"
  - "discussion"
  - "consensus"
  - "multi-model"
relatedPhases:
  - "phase-0"
  - "phase-1"
  - "phase-2"
---

# Multi-Model Deliberation: LLM Discussion System for Research Questions

Project Dyson's research questions span multiple types: simulations that need numerical modeling, meta-research requiring literature review, and **discussion questions** that require stakeholder consensus on policy decisions.

For questions like "How should swarm power be distributed?" or "What governance model applies to slot reallocation?", there isn't a single correct answer derivable from physics. These require deliberation—weighing tradeoffs, considering perspectives, and building consensus.

Today we're launching the **Multi-Model Discussion System**: a structured deliberation framework where Claude Opus 4.6, Gemini 3 Pro, and GPT-5.2 engage in rounds of debate, vote on each other's responses, and iterate toward consensus.

## The Problem with Discussion Questions

Our research question taxonomy includes "discussion" type questions for topics that:
- Have multiple valid approaches
- Require weighing subjective tradeoffs
- Need stakeholder input (represented by diverse AI perspectives)
- Don't have a single provably-correct answer

Examples include:
- **[Swarm Power Architecture](/questions/swarm-power-architecture-end-use)** (rq-1-11) - Where does generated power go?
- **[Slot Reallocation Governance](/questions/slot-reallocation-governance)** (rq-1-40) - How to handle failed unit replacement?
- **[Autonomous Assembly Certification](/questions/autonomous-assembly-certification)** (rq-1-16) - What standards apply to robot assembly?

Previously, these questions were flagged but had no mechanism for structured deliberation. Now they do.

## How It Works

### Round Flow

Each discussion round follows this sequence:

\`\`\`
1. All 3 LLMs respond to the question (with thread context)
2. All 3 LLMs vote on all 3 responses (APPROVE/NEUTRAL/REJECT)
3. Highest-scored response becomes "winning reply" for the round
4. All 3 LLMs vote on termination (CONCLUDE vs CONTINUE)
5. If terminated or max rounds reached: generate conclusion
\`\`\`

### Voting Mechanism

Each model votes on every response, including their own:

| Vote | Score | Self-Vote Score |
|------|-------|-----------------|
| APPROVE | 2 | 1 (50% weight) |
| NEUTRAL | 1 | 0.5 |
| REJECT | 0 | 0 |

Self-voting is allowed but discounted—models can endorse their own responses, but external approval matters more.

**Winner Selection**: Highest weighted score wins the round. Tie-breaker: most APPROVE votes from other models.

### Termination Conditions

Discussions end when any condition is met:

1. **Unanimous Conclude** - All 3 models vote to conclude
2. **Consecutive Majority** - 2+ models vote conclude for 2 consecutive rounds
3. **Max Rounds** - Hit the 5-round limit
4. **Convergence** - Same model wins 3 rounds with high scores

When terminated, the winning model generates a synthesis conclusion covering:
- Key points of agreement
- Unresolved questions
- Recommended actions

## Storage Structure

Discussion data lives alongside the question:

\`\`\`
src/content/research-questions/phase-1/
  rq-1-11-swarm-power-architecture-end-use.md
  rq-1-11-swarm-power-architecture-end-use/
    discussion.yaml          # Thread metadata
    round-1/
      claude-opus-4-6.md    # Full response
      gemini-3-pro.md
      gpt-5-2.md
      votes.yaml            # Voting results
    round-2/
      ...
    conclusion.md           # Final synthesis
\`\`\`

## Running a Discussion

Use the CLI script to start or continue discussions:

\`\`\`bash
# Run until termination (auto mode)
node scripts/run-discussion.js --question=swarm-power-architecture-end-use --auto

# Run single round only
node scripts/run-discussion.js --question=swarm-power-architecture-end-use --round=1

# Force conclude and generate summary
node scripts/run-discussion.js --question=swarm-power-architecture-end-use --conclude
\`\`\`

## Viewing Discussions

Discussion threads appear directly on the question detail page for discussion-type questions. The UI shows:

- **Thread Statistics** - Rounds completed, model win rates, approval rates
- **Round-by-Round Details** - All responses, votes, and termination votes
- **Winning Responses** - Highlighted with full content
- **Conclusion** - Synthesized recommendations when concluded

## Why Multi-Model Consensus?

Different AI models have different biases, training data, and reasoning approaches. By having Claude, Gemini, and GPT debate, we:

1. **Surface diverse perspectives** that a single model might miss
2. **Reduce individual model bias** through voting
3. **Generate richer conclusions** from synthesizing multiple viewpoints
4. **Provide transparency** into how decisions were reached

This mirrors Project Dyson's broader multi-model consensus approach for BOM specifications—but applied to policy decisions rather than engineering specs.

## What's Next

- **Run discussions on all open discussion-type questions** across Phase 0-2
- **Refine termination heuristics** based on discussion quality
- **Add human override capability** for cases where AI consensus diverges from project direction
- **Integration with validation system** to track how discussions inform design decisions

## Try It

View a discussion-type question to see the system in action:
- [Swarm Power Architecture](/questions/swarm-power-architecture-end-use) - Critical priority, rich context
- [Slot Reallocation Governance](/questions/slot-reallocation-governance) - High priority governance question
- [Feedstock Acquisition Timeline](/questions/feedstock-acquisition-isru-timeline) - ISRU planning decision

---

*The multi-model discussion system brings structured deliberation to questions where technical specifications alone aren't enough. By making AI debate transparent and traceable, Project Dyson can make better policy decisions for the construction phases ahead.*
