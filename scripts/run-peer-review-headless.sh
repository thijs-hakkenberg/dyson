#!/bin/bash
# Headless Peer Review Runner
# Runs 3 AI peer reviews (Claude, Gemini, GPT) in parallel
# Usage: ./scripts/run-peer-review-headless.sh --paper=02 --version=cf

set -euo pipefail

# Default values
PAPER=""
VERSION=""
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --paper=*)
      PAPER="${1#*=}"
      shift
      ;;
    --version=*)
      VERSION="${1#*=}"
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 --paper=<paper-number> --version=<version-code>"
      exit 1
      ;;
  esac
done

# Validate required arguments
if [[ -z "$PAPER" || -z "$VERSION" ]]; then
  echo "Error: Both --paper and --version are required"
  echo "Usage: $0 --paper=<paper-number> --version=<version-code>"
  exit 1
fi

# Print header
echo "════════════════════════════════════════════════════════════"
echo "  Headless Peer Review Runner"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Paper:   $PAPER"
echo "Version: $VERSION"
echo ""

# Load environment
if [[ -f "$PROJECT_ROOT/.env" ]]; then
  echo "Loading environment from .env..."
  set -a
  source "$PROJECT_ROOT/.env"
  set +a
  echo "✓ Environment loaded"
  echo ""
else
  echo "⚠️  Warning: .env file not found at $PROJECT_ROOT/.env"
  echo "   DATABRICKS_TOKEN and DATABRICKS_WORKSPACE may not be set"
  echo ""
fi

# Models to review
MODELS=("claude-opus-4-6" "gemini-3-pro" "gpt-5-2")
MODEL_NAMES=("Claude Opus 4.6" "Gemini 3 Pro" "GPT-5.2")

# Track process IDs and output files
declare -a PIDS
declare -a OUTPUT_FILES

# Start time
START_TIME=$(date +%s)

echo "────────────────────────────────────────────────────────────"
echo "Starting parallel reviews (3 models)..."
echo "────────────────────────────────────────────────────────────"
echo ""

# Launch reviews in parallel
for i in "${!MODELS[@]}"; do
  MODEL="${MODELS[$i]}"
  MODEL_NAME="${MODEL_NAMES[$i]}"
  OUTPUT_FILE="/tmp/peer-review-$MODEL-$$.log"

  # Launch in background
  (
    cd "$PROJECT_ROOT"
    node scripts/run-peer-review.js --paper="$PAPER" --version="$VERSION" --model="$MODEL" > "$OUTPUT_FILE" 2>&1
  ) &

  PID=$!
  PIDS[$i]=$PID
  OUTPUT_FILES[$i]=$OUTPUT_FILE

  echo "  [$((i+1))/${#MODELS[@]}] $MODEL_NAME started (PID $PID)"
done

echo ""
echo "Waiting for all reviews to complete..."
echo "(This typically takes 5-7 minutes)"
echo ""

# Wait for all processes
FAILED=0
for i in "${!PIDS[@]}"; do
  PID="${PIDS[$i]}"
  MODEL="${MODELS[$i]}"

  if wait $PID; then
    echo "  ✓ ${MODEL_NAMES[$i]} completed"
  else
    EXIT_CODE=$?
    echo "  ✗ ${MODEL_NAMES[$i]} failed (exit code $EXIT_CODE)"
    FAILED=1
  fi
done

# Calculate duration
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
MINUTES=$((DURATION / 60))
SECONDS=$((DURATION % 60))

echo ""
echo "────────────────────────────────────────────────────────────"
echo "All reviews completed"
echo "────────────────────────────────────────────────────────────"
echo ""
echo "Duration: ${MINUTES}m ${SECONDS}s"
echo ""

# Show output from each review
if [[ $FAILED -eq 1 ]]; then
  echo "Errors occurred. Review output:"
  echo ""
  for i in "${!MODELS[@]}"; do
    MODEL="${MODELS[$i]}"
    MODEL_NAME="${MODEL_NAMES[$i]}"
    OUTPUT_FILE="${OUTPUT_FILES[$i]}"

    echo "────────────────────────────────────────────────────────────"
    echo "$MODEL_NAME output:"
    echo "────────────────────────────────────────────────────────────"
    cat "$OUTPUT_FILE"
    echo ""
  done
fi

# Parse and display recommendations
echo "Exit statuses:"
for i in "${!MODELS[@]}"; do
  MODEL="${MODELS[$i]}"
  MODEL_NAME="${MODEL_NAMES[$i]}"
  OUTPUT_FILE="${OUTPUT_FILES[$i]}"

  if grep -q "Review complete" "$OUTPUT_FILE" 2>/dev/null; then
    echo "  ✓ $MODEL_NAME completed"
  else
    echo "  ✗ $MODEL_NAME failed"
  fi
done

echo ""

# Extract recommendations from YAML frontmatter
REVIEW_DIR="$PROJECT_ROOT/publications/drafts/$(printf "%02d" "$PAPER")-*/reviews/version-$VERSION"
REVIEW_FILES=($(find $PROJECT_ROOT/publications/drafts -type f -path "*reviews/version-$VERSION/*.md" 2>/dev/null | sort))

if [[ ${#REVIEW_FILES[@]} -gt 0 ]]; then
  echo "────────────────────────────────────────────────────────────"
  echo "Recommendations:"
  echo "────────────────────────────────────────────────────────────"

  for REVIEW_FILE in "${REVIEW_FILES[@]}"; do
    FILENAME=$(basename "$REVIEW_FILE" .md)

    # Map filename to display name
    case $FILENAME in
      claude-opus-4-6)
        DISPLAY_NAME="Claude Opus 4.6"
        ;;
      gemini-3-pro)
        DISPLAY_NAME="Gemini 3 Pro"
        ;;
      gpt-5-2)
        DISPLAY_NAME="GPT-5.2"
        ;;
      *)
        DISPLAY_NAME="$FILENAME"
        ;;
    esac

    # Extract recommendation from YAML frontmatter
    RECOMMENDATION=$(grep "^recommendation:" "$REVIEW_FILE" | head -1 | sed 's/recommendation: *//' | tr -d '"')

    if [[ -z "$RECOMMENDATION" ]]; then
      RECOMMENDATION="(not found)"
      SYMBOL="?"
    else
      case "$RECOMMENDATION" in
        *"Accept"*)
          SYMBOL="✓"
          ;;
        *"Reject"*)
          SYMBOL="✗"
          ;;
        *"Major"*)
          SYMBOL="⚠"
          ;;
        *)
          SYMBOL="○"
          ;;
      esac
    fi

    echo "  $SYMBOL $DISPLAY_NAME: $RECOMMENDATION"
  done

  echo ""
  echo "════════════════════════════════════════════════════════════"

  if [[ $FAILED -eq 0 ]]; then
    echo "✅ All reviews completed successfully"
  else
    echo "⚠️  Some reviews failed (see errors above)"
  fi

  echo ""
  echo "Next steps:"
  echo "  1. Read review files in: ${REVIEW_DIR}"
  echo "  2. Synthesize feedback and plan next version"
  echo "  3. Run: /revise --paper=$PAPER --from-version=$VERSION --to-version=<next>"
else
  echo "⚠️  No review files found in expected location"
  echo "   Expected: $REVIEW_DIR"
  echo ""

  if [[ $FAILED -eq 0 ]]; then
    echo "Review processes completed, but output files not found."
    echo "Check the review script output above for errors."
  fi
fi

# Cleanup temp files
for OUTPUT_FILE in "${OUTPUT_FILES[@]}"; do
  rm -f "$OUTPUT_FILE"
done

# Exit with failure if any reviews failed
exit $FAILED
