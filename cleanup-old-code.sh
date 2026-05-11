#!/bin/bash

# Script to clean up old code from dawiha-portal
# This removes all old features that are no longer needed

set -e

echo "🧹 Cleaning up old dawiha-portal code..."
echo ""

# Backup warning
echo "⚠️  WARNING: This will permanently delete old code!"
echo "   Make sure you have committed your changes first."
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "Starting cleanup..."
echo ""

# Remove old feature directories
echo "📁 Removing old feature directories..."

OLD_FEATURES=(
    "task"
    "request"
    "plan"
    "subscription"
    "service"
    "product"
    "family"
    "area"
    "price-list"
    "weekly-meal"
    "third-party"
    "review"
    "care-option"
    "option-list"
    "purchased-service"
    "family-member"
)

for feature in "${OLD_FEATURES[@]}"; do
    if [ -d "src/app/features/$feature" ]; then
        echo "  ✓ Removing src/app/features/$feature"
        rm -rf "src/app/features/$feature"
    fi
done

# Remove old page directories
echo ""
echo "📄 Removing old page directories..."

OLD_PAGES=(
    "tasks"
    "requests"
    "plans"
    "subscriptions"
    "services"
    "products"
    "families"
    "family-members"
    "areas"
    "price-lists"
    "weekly-meals"
    "third-parties"
    "reviews"
    "care-options"
    "purchased-services"
    "calendar"
)

for page in "${OLD_PAGES[@]}"; do
    if [ -d "src/app/pages/$page" ]; then
        echo "  ✓ Removing src/app/pages/$page"
        rm -rf "src/app/pages/$page"
    fi
done

# Remove old entity directories (if they conflict)
echo ""
echo "🗂️  Checking for old entity directories..."

OLD_ENTITIES=(
    "plan"
    "service"
    "product"
    "family"
    "area"
    "price-list"
    "weekly-meal"
    "third-party"
    "review"
    "care-option"
    "option-list"
    "purchased-service"
    "task"
    "request"
    "subscription"
)

for entity in "${OLD_ENTITIES[@]}"; do
    if [ -d "src/app/common/entities/$entity" ]; then
        echo "  ✓ Removing src/app/common/entities/$entity"
        rm -rf "src/app/common/entities/$entity"
    fi
done

# Remove old DTO directories (if they conflict)
echo ""
echo "📝 Checking for old DTO directories..."

for dto in "${OLD_ENTITIES[@]}"; do
    if [ -d "src/app/common/dtos/$dto" ]; then
        echo "  ✓ Removing src/app/common/dtos/$dto"
        rm -rf "src/app/common/dtos/$dto"
    fi
done

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📊 Summary:"
echo "  - Removed ${#OLD_FEATURES[@]} old feature directories"
echo "  - Removed ${#OLD_PAGES[@]} old page directories"
echo "  - Cleaned up old entities and DTOs"
echo ""
echo "🔍 Next steps:"
echo "  1. Run: npm run lint"
echo "  2. Fix any import errors"
echo "  3. Run: npm run dev"
echo "  4. Test the application"
echo ""
echo "💡 Tip: If you need to restore anything, use git:"
echo "   git checkout HEAD -- src/app/features/[feature-name]"
echo ""
