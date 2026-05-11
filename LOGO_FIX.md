# Logo Fix for GitHub Pages

## Problem
The logo wasn't showing on GitHub Pages because the paths were using absolute URLs (`/logo.png`) which don't work with the base path `/dawiha-portal/`.

## Solution
Use Vite's `import.meta.env.BASE_URL` to dynamically construct the correct path for assets in the `public` directory.

## Files Modified

### 1. `src/app/core/Layout/Layout.tsx`
- Changed: `src="/logo.png"`
- To: `src={\`${import.meta.env.BASE_URL}logo.png\`}`

### 2. `src/app/pages/login/Login.tsx`
- Changed: `src="/logo.png"`
- To: `src={\`${import.meta.env.BASE_URL}logo.png\`}`

### 3. `vite.config.ts`
- Added `BASE_URL` to the `define` section
- Ensures `import.meta.env.BASE_URL` is available in the app

### 4. `src/vite-env.d.ts`
- Added `BASE_URL` to the `ImportMetaEnv` interface for TypeScript support

### 5. `index.html`
- Favicon uses `/logo.png` which Vite automatically transforms with the base path

## How It Works

### In Development:
- `import.meta.env.BASE_URL` = `/`
- Logo path: `/logo.png`

### In Production (GitHub Pages):
- `import.meta.env.BASE_URL` = `/dawiha-portal/`
- Logo path: `/dawiha-portal/logo.png`

Vite automatically:
1. Reads the `base` config from `vite.config.ts`
2. Exposes it as `import.meta.env.BASE_URL`
3. Transforms HTML asset paths during build

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
   git commit -m "Fix logo paths using BASE_URL for GitHub Pages"
   git push github main
   ```

2. Wait for GitHub Actions to rebuild and deploy

3. Check your site: https://alaatarab.github.io/dawiha-portal/

The logo should now appear everywhere! 🎉
