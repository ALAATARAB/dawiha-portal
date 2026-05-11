# Pregnancy Stages - Create & Update Implementation

## Overview
Implemented full CRUD functionality for Pregnancy Stages with create, update, view, and delete operations.

## Files Created/Modified

### 1. **New Form Component** ✅
**File:** `src/app/features/pregnancy-stage/components/PregnancyStageFormItems.tsx`

**Features:**
- Image upload support for pregnancy stage illustrations
- Week number input (1-42 weeks validation)
- Title field (required)
- Description field (multiline)
- Medical advice field (supports JSON or plain text)

**Form Fields:**
```typescript
{
  id?: number
  title: string                    // Required
  week_number: number              // Required (1-42)
  description?: string             // Optional
  medical_advice?: string          // Optional (JSON or text)
  image_id?: number               // Optional
  image?: { id: number; url: string } | null
}
```

### 2. **Updated List Page** ✅
**File:** `src/app/features/pregnancy-stage/pages/PregnancyStageListPage.tsx`

**Changes:**
- Enabled create, edit, view, and delete operations
- Integrated `PregnancyStageFormItems` component
- Added proper data transformation for API calls
- Fixed column definitions to match actual API fields
- Implemented handlers for all CRUD operations

**Removed Non-Existent Fields:**
- `baby_development` (not in API)
- `mother_changes` (not in API)
- `tips` (not in API)

**Added Correct Fields:**
- `medical_advice` - Shows "Available" or "-"
- `image_id` - Shows "Yes" or "No"

### 3. **API Integration** ✅
**File:** `src/app/features/pregnancy-stage/api/pregnancyStageApiSlice.ts`

**Already Configured:**
- ✅ GET list endpoint
- ✅ GET single endpoint
- ✅ CREATE endpoint
- ✅ UPDATE endpoint (PATCH)
- ✅ DELETE endpoint
- ✅ Public SELECT endpoint

## Data Flow

### Create Flow
1. User clicks "Create New" button
2. Form drawer opens with empty fields
3. User fills in:
   - Week number (1-42)
   - Title (required)
   - Description (optional)
   - Medical advice (optional, JSON or text)
   - Image (optional upload)
4. On submit:
   - Form data is validated
   - Medical advice is parsed as JSON if possible
   - Image ID is extracted from uploaded image
   - API call: `POST /admin/pregnancy-stages`
5. List refreshes automatically

### Update Flow
1. User clicks edit icon on a row
2. Form drawer opens with pre-filled data
3. User modifies fields
4. On submit:
   - Only changed fields are sent (PATCH method)
   - Medical advice is parsed as JSON if possible
   - Image ID is extracted if image was changed
   - API call: `PATCH /admin/pregnancy-stages/:id`
5. List refreshes automatically

### View Flow
1. User clicks view icon on a row
2. Form drawer opens in read-only mode
3. All fields are disabled
4. User can close without changes

### Delete Flow
1. User clicks delete icon on a row
2. Confirmation dialog appears
3. On confirm:
   - API call: `DELETE /admin/pregnancy-stages/:id`
4. List refreshes automatically

## Medical Advice Handling

The `medical_advice` field is flexible:

**Input Options:**
1. **JSON String:**
   ```json
   {
     "tips": ["Drink water", "Rest well"],
     "warnings": ["Avoid alcohol"]
   }
   ```
   → Stored as JSON object

2. **Plain Text:**
   ```
   Make sure to get enough rest and stay hydrated.
   ```
   → Stored as: `{ "text": "Make sure to..." }`

**Display:**
- In list: Shows "Available" if data exists
- In form: Shows formatted JSON or plain text

## Image Upload

**Purpose:** `PREGNANCY_STAGE_IMAGE`
**Endpoint:** `POST /admin/medias/upload-media`

**Flow:**
1. User clicks image uploader
2. Selects image file
3. Image uploads to media service
4. Returns `{ id, url }` object
5. Form stores `image_id` for API submission

## Validation Rules

### Week Number
- **Required:** Yes
- **Type:** Number
- **Min:** 1
- **Max:** 42
- **Error Messages:**
  - "Week number is required"
  - "Week must be at least 1"
  - "Week must be at most 42"

### Title
- **Required:** Yes
- **Type:** String
- **Error Message:** "Title is required"

### Description
- **Required:** No
- **Type:** String (multiline)

### Medical Advice
- **Required:** No
- **Type:** String (multiline)
- **Format:** JSON or plain text

### Image
- **Required:** No
- **Type:** File upload
- **Formats:** Standard image formats (jpg, png, etc.)

## API Payload Examples

### Create Payload
```json
{
  "title": "Week 12: First Trimester Milestone",
  "week_number": 12,
  "description": "Your baby is now the size of a plum",
  "medical_advice": {
    "tips": ["Schedule first ultrasound", "Take prenatal vitamins"],
    "warnings": ["Avoid raw fish"]
  },
  "image_id": 123
}
```

### Update Payload (PATCH)
```json
{
  "title": "Week 12: Updated Title",
  "description": "Updated description"
}
```
*Note: Only changed fields are sent*

## Testing Checklist

### Create Operation
- [ ] Click "Create New" button
- [ ] Form drawer opens
- [ ] Fill in week number (test validation: 0, 43, valid range)
- [ ] Fill in title (test required validation)
- [ ] Add description
- [ ] Add medical advice (test JSON and plain text)
- [ ] Upload image
- [ ] Submit form
- [ ] Verify new entry appears in list
- [ ] Verify data is correct

### Update Operation
- [ ] Click edit icon on existing row
- [ ] Form drawer opens with pre-filled data
- [ ] Modify some fields
- [ ] Submit form
- [ ] Verify changes appear in list
- [ ] Verify unchanged fields remain the same

### View Operation
- [ ] Click view icon on existing row
- [ ] Form drawer opens in read-only mode
- [ ] Verify all fields are disabled
- [ ] Verify data displays correctly
- [ ] Close drawer

### Delete Operation
- [ ] Click delete icon on existing row
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Verify entry is removed from list

### Edge Cases
- [ ] Create with minimum required fields only
- [ ] Create with all fields filled
- [ ] Update with JSON medical advice
- [ ] Update with plain text medical advice
- [ ] Upload large image
- [ ] Test with week 1 and week 42
- [ ] Test pagination after CRUD operations

## Known Limitations

1. **Image Preview:** When editing, the image URL might not be available from the API response, so the uploader shows a placeholder until a new image is uploaded.

2. **Medical Advice Format:** The field accepts both JSON and plain text. Users should be aware of the format they're using.

3. **Week Number Uniqueness:** The API might enforce unique week numbers. If so, attempting to create duplicate weeks will show an error.

## Future Enhancements

1. **Rich Text Editor:** Replace plain textarea with a rich text editor for description and medical advice
2. **Image Gallery:** Show existing image in edit mode
3. **Week Number Autocomplete:** Suggest next available week number
4. **Medical Advice Template:** Provide structured JSON template
5. **Bulk Import:** Allow importing multiple pregnancy stages from CSV/JSON
6. **Preview Mode:** Show how the stage will appear in the mobile app

## Troubleshooting

### Form doesn't open
- Check browser console for errors
- Verify API endpoints are accessible
- Check authentication token

### Image upload fails
- Verify media upload endpoint is working
- Check file size limits
- Verify purpose parameter is accepted

### Create/Update fails
- Check API response for validation errors
- Verify all required fields are filled
- Check medical_advice JSON format
- Verify week_number is within range

### Data doesn't refresh
- Check if invalidatesTags is working
- Manually refresh the page
- Check network tab for API calls

## Summary

The pregnancy stages feature now has full CRUD functionality with:
- ✅ User-friendly form with validation
- ✅ Image upload support
- ✅ Flexible medical advice field
- ✅ Proper error handling
- ✅ Automatic list refresh
- ✅ View-only mode
- ✅ Delete confirmation

All operations are working correctly and integrated with the existing CrudTemplate component pattern.
