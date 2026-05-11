# Logo Fix for GitHub Pages

## Problem
The logo wasn't showing on GitHub Pages because the paths were using absolute URLs (`/logo.png`) which don't work with the base path `/dawiha-portal/`.

## Solution
Changed logo references to use Vite's module import system with relative paths from the src directory.

## Files Modified

### 1. `src/app/core/Layout/Layout.tsx`
- Added: `import logoImage from '../../../../public/logo.png'`
- Changed: `src="/logo.png"` → `src={logoImage}`

### 2. `src/app/pages/login/Login.tsx`
- Added: `import logoImage from '../../../public/logo.png'`
- Changed: `src="/logo.png"` → `src={logoImage}`

### 3. `src/vite-env.d.ts`
- Added TypeScript declarations for image module imports (*.png, *.jpg, *.svg, etc.)

### 4. `index.html`
- Added script to dynamically fix favicon path for GitHub Pages
- The favicon will now work with the `/dawiha-portal/` base path

## How It Works

When you import an asset from the public directory in Vite:
```typescript
import logoImage from '../../../public/logo.png'
```

Vite automatically:
1. Processes the image during build
2. Adds the correct base path (`/dawiha-portal/`)
3. Returns the full URL: `/dawiha-portal/logo.png`

## Testing

### Local Development:
```bash
npm run dev
```
Logo should show at: `http://localhost:5173/`

### Production Build:
```bash
npm run build:prod:skip-check
npm run preview
```
Logo should show at: `http://localhost:4173/dawiha-portal/`

### GitHub Pages:
After deployment, logo should show at: `https://alaatarab.github.io/dawiha-portal/`

## Next Steps

1. Commit these changes:
   ```bash
   git add .
   git commit -m "Fix logo paths for GitHub Pages deployment"
   git push github main
   ```

2. Wait for GitHub Actions to rebuild and deploy

3. Check your site: https://alaatarab.github.io/dawiha-portal/

The logo should now appear everywhere! 🎉
