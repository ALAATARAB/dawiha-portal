#!/bin/bash

# Script to fix TypeScript build errors for GitHub Pages deployment

echo "Fixing Grid component imports and usage..."

# Fix Grid to Grid2 in all modal files
find src/app/components/entity-modals -name "*.tsx" -type f -exec sed -i 's/import.*Grid.*from.*@mui\/material/&\nimport Grid2 from "@mui\/material\/Unstable_Grid2"/g' {} \;
find src/app/components/entity-modals -name "*.tsx" -type f -exec sed -i 's/<Grid container/<Grid2 container/g' {} \;
find src/app/components/entity-modals -name "*.tsx" -type f -exec sed -i 's/<\/Grid>/<\/Grid2>/g' {} \;
find src/app/components/entity-modals -name "*.tsx" -type f -exec sed -i 's/<Grid item xs=\([0-9]*\) sm=\([0-9]*\)>/<Grid2 size={{ xs: \1, sm: \2 }}>/g' {} \;
find src/app/components/entity-modals -name "*.tsx" -type f -exec sed -i 's/<Grid item xs=\([0-9]*\)>/<Grid2 size={{ xs: \1 }}>/g' {} \;

echo "Build error fixes applied!"
echo "Please review the changes and commit them."
