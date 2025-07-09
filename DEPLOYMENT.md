# Deployment Guide

## Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click 'New Project'
4. Import your repository: Walmart-sparkathon
5. Configure:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
6. Click Deploy

## Deploy Backend to Render

1. Go to https://render.com
2. Sign in with GitHub
3. Click 'New +'
4. Select 'Web Service'
5. Connect your repository
6. Configure:
   - Name: walmart-sparkathon-backend
   - Environment: Node
   - Build Command: cd backend && npm install
   - Start Command: cd backend && npm start
   - Auto-Deploy: Yes

## Environment Variables (if needed)
- Add any required environment variables in the dashboard

