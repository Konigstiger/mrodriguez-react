# mrodriguez-react — Personal Portfolio

This repository contains the source code for my personal portfolio website, built with React, TypeScript, Vite, and TailwindCSS.  
The site is deployed on Azure Static Web Apps and uses Azure Functions to fetch profile data, projects, articles, and static files (such as the CV) from Azure Blob Storage.


## Features

### Frontend
- React + TypeScript + Vite
- TailwindCSS styling
- Fully responsive layout (desktop and mobile)
- Reusable BehanceEmbed component for visual project previews
- Projects and Articles sections
- Profile data loaded dynamically from Blob Storage
- Cloudflare Turnstile integration for human verification

### Backend (Azure Functions)
- Serves profile.json from Blob Storage
- Serves project and article JSON data
- Serves downloadable files (example: CV.pdf)
- Requires proper CORS configuration for custom domains

### Storage
- Azure Blob Storage container holds:
  - profile.json
  - downloadable files (CV)

## Azure Backend Setup
### API endpoints:
- GET /api/profile
- GET /api/cv

### Notes and Known Issues
- Behance embeds may fail if Behance’s CDN blocks cross-origin previews.
- Azure SWA can reject deploys if too many staging environments exist.
- Cloudflare may automatically wrap TXT values in quotes when validating domains.

### Future Improvements
- Unified ProjectCard component for both Behance and internal projects
