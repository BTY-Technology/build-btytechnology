# BTY Technology - Template Showcase

Mono repo for the build.btytechnology.com site - A template showcase platform that automatically discovers and displays website templates.

## Features

- 🔍 **Auto-Discovery**: Automatically detects templates from the `/templates/` directory
- 🎨 **BTY Branding**: Dark theme with BTY Technology colors and styling
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Next.js 14**: Built with the latest Next.js App Router
- 🔎 **Search & Filter**: Browse templates by category and search
- 🎯 **Template Details**: Detailed pages for each template with features, tech stack, and previews

## Project Structure

```
build-btytechnology/
├── app/                      # Next.js App Router pages
│   ├── browse/              # Browse all templates
│   ├── template/[id]/       # Individual template detail pages
│   └── page.tsx             # Homepage
├── components/              # React components
│   └── TemplateCard.tsx    # Template card component
├── data/                    # Generated data (auto-created)
│   └── templates.json      # Auto-generated template index
├── lib/                     # Utility functions
│   └── templates.ts        # Template data helpers
├── scripts/                 # Build scripts
│   └── discover-templates.js # Template discovery script
├── templates/               # Template source files
│   ├── barbershop-templates/
│   └── restaurant-templates/
└── types/                   # TypeScript definitions
```

## Adding New Templates

1. Navigate to the appropriate category folder in `/templates/` (e.g., `barbershop-templates`)
2. Run the scaffold script to create a new template:
   ```bash
   ./scaffold-template.sh barbershop-templates
   ```
3. Add a `template.json` file with metadata:
   ```json
   {
     "id": "unique-id",
     "name": "Template Name",
     "category": "category-name",
     "description": "Template description",
     "featured": false,
     "preview": {
       "thumbnail": "/previews/template-id/thumbnail.jpg",
       "screenshots": [],
       "demoUrl": ""
     },
     "features": ["Feature 1", "Feature 2"],
     "techStack": ["Next.js 14", "TypeScript", "Tailwind CSS"],
     "colors": {
       "primary": "#000000",
       "secondary": "#ffffff",
       "accent": "#ff0000"
     },
     "pages": ["Home", "About", "Contact"]
   }
   ```
4. Build your template
5. Run `npm run discover` to update the template index
6. The template will automatically appear on the site!

## Development

```bash
# Install dependencies
npm install

# Run discovery script to index templates
npm run discover

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Template Discovery

The auto-discovery system:
- Scans the `/templates/` directory for all `template.json` files
- Generates a `data/templates.json` file with all template metadata
- Runs automatically during the build process (`npm run build`)
- Can be run manually with `npm run discover`

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## License

MIT License - Built with ❤️ by BTY Technology
