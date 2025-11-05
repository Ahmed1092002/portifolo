# 🚀 Vercel Deployment Guide

## Quick Deploy via GitHub

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add 3D animations and effects"
git push origin master
```

### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Select your `portifolo` repository
5. Vercel will auto-detect Next.js settings ✅

### Step 3: Configure Environment Variables
In the Vercel dashboard, add these environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_qco4okh` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_55bmak5` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `l4jkIrJ8dO0l7IIHQ` |
| `NEXT_PUBLIC_RESUME_LINK_PDF` | `https://docs.google.com/document/d/1VfRZjbZdR1-BnIt4uKoZ8PoVa2bjSaHI/export?format=pdf` |
| `NEXT_PUBLIC_RESUME_LINK_DOCX` | `https://docs.google.com/document/d/1VfRZjbZdR1-BnIt4uKoZ8PoVa2bjSaHI/export?format=docx` |

### Step 4: Deploy! 🎉
Click "Deploy" and wait for the build to complete (~2-3 minutes)

---

## Alternative: CLI Deployment

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - What's your project's name? portifolo
# - In which directory is your code located? ./
# - Auto-detected settings? Y

# Add environment variables via CLI
vercel env add NEXT_PUBLIC_EMAILJS_SERVICE_ID production
# (paste the value when prompted)

# Or use the dashboard to add all env vars at once
```

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test 3D animations performance
- [ ] Check contact form functionality
- [ ] Test on mobile devices
- [ ] Verify environment variables are working
- [ ] Check resume download links
- [ ] Test language switching
- [ ] Verify theme toggle
- [ ] Test all navigation links
- [ ] Check SEO meta tags

---

## Performance Optimization

Vercel automatically provides:
- ✅ **Edge CDN** - Lightning-fast global delivery
- ✅ **Image Optimization** - Automatic WebP/AVIF conversion
- ✅ **Code Splitting** - Smaller bundle sizes
- ✅ **Compression** - Gzip/Brotli compression
- ✅ **SSL Certificate** - Free HTTPS
- ✅ **Analytics** - Built-in performance monitoring

---

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for propagation (~24-48 hours)

---

## Continuous Deployment

Every push to `master` branch will automatically:
1. Trigger a new deployment
2. Run build checks
3. Deploy if successful
4. Update production URL

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### 3D Animations Not Working
- Check browser console for errors
- Ensure WebGL is supported
- Try different browser/device

### Contact Form Not Working
- Verify EmailJS credentials
- Check CORS settings
- Test EmailJS directly

---

## Useful Commands

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Remove deployment
vercel rm [deployment-name]
```

---

## Environment Variables via vercel.json

The `vercel.json` file is configured, but you still need to set actual values in the dashboard for security.

---

**Your portfolio is ready to go live! 🚀**

Share your live URL with the world!
