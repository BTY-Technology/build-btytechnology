# Template Development Guide

## Quick Start: Adding a New Template

### Step 1: Create Template Structure
```bash
./scaffold-template.sh <category-name>
# Example: ./scaffold-template.sh barbershop-templates
```

This creates a new numbered template folder with the base Next.js structure.

### Step 2: Create template.json

In your new template folder, create or update `template.json`:

```json
{
  "id": "unique-template-id",
  "name": "Display Name",
  "category": "category-name",
  "description": "Brief description of the template and its features",
  "version": "1.0.0",
  "featured": true,
  "preview": {
    "thumbnail": "/previews/template-id/thumbnail.jpg",
    "screenshots": [
      "/previews/template-id/screenshot1.jpg",
      "/previews/template-id/screenshot2.jpg"
    ],
    "demoUrl": "https://demo-url.com"
  },
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "techStack": [
    "Next.js 14",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion"
  ],
  "colors": {
    "primary": "#1a1a1a",
    "secondary": "#f5f5f5",
    "accent": "#d4af37"
  },
  "pages": [
    "Home",
    "About",
    "Services",
    "Contact"
  ]
}
```

### Step 3: Build Your Template

Develop your template in the template folder:
- Update `app/page.tsx` for your homepage
- Add components in `components/`
- Add data files in `lib/data/`
- Customize styles in `globals.css` and `tailwind.config.ts`

### Step 4: Test and Update Index

```bash
# Run discovery to update the template index
npm run discover

# Start the showcase site to see your template
npm run dev
```

Your template will now appear on:
- Homepage (if featured: true)
- Browse page
- Its own detail page at `/template/[your-template-id]`

## Template Metadata Schema

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (e.g., "barbershop-001") |
| `name` | string | Display name for the template |
| `category` | string | Category slug (e.g., "barbershop", "restaurant") |
| `description` | string | Brief description of the template |
| `version` | string | Semantic version (e.g., "1.0.0") |
| `featured` | boolean | Show on homepage as featured template |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `preview.thumbnail` | string | Path to thumbnail image |
| `preview.screenshots` | array | Array of screenshot paths |
| `preview.demoUrl` | string | URL to live demo |
| `features` | array | List of template features |
| `techStack` | array | Technologies used |
| `colors` | object | Primary, secondary, and accent colors |
| `pages` | array | List of included pages |

## Category Structure

Templates are organized by category folders:

```
templates/
├── barbershop-templates/
│   ├── 001_template/
│   │   ├── template.json
│   │   ├── package.json
│   │   └── ...
│   └── 002_template/
└── restaurant-templates/
    └── 001_template/
```

### Creating a New Category

1. Create a new folder in `templates/`: `mkdir templates/your-category-templates`
2. Use the scaffold script: `./scaffold-template.sh your-category-templates`
3. The category will automatically appear on the site after running `npm run discover`

## Auto-Discovery System

The discovery script (`scripts/discover-templates.js`):

1. **Scans** all subdirectories in `/templates/`
2. **Finds** all `template.json` files
3. **Validates** the metadata
4. **Generates** `data/templates.json` with:
   - Complete template list
   - Category summaries
   - Template counts
   - Generated timestamp

### When Discovery Runs

- **Automatically**: During `npm run build`
- **Manually**: Run `npm run discover`

### Discovery Output

The generated `data/templates.json` includes:

```json
{
  "generatedAt": "2025-10-17T18:00:00.000Z",
  "totalTemplates": 3,
  "categories": {
    "barbershop": {
      "slug": "barbershop-templates",
      "name": "Barbershop",
      "count": 2,
      "templates": ["barbershop-001", "barbershop-002"]
    }
  },
  "templates": [
    { /* full template metadata */ }
  ]
}
```

## Best Practices

### Template ID Naming
- Use category prefix: `barbershop-001`, `restaurant-001`
- Keep it URL-friendly (lowercase, hyphens)
- Use incremental numbers for versioning

### Categories
- Use plural form with `-templates` suffix
- Examples: `barbershop-templates`, `restaurant-templates`, `ecommerce-templates`

### Descriptions
- Keep under 200 characters
- Highlight key features
- Be specific about the target audience

### Features List
- 5-10 features maximum
- Focus on unique selling points
- Be concise (3-5 words per feature)

### Tech Stack
- List major frameworks/libraries only
- Keep it relevant to potential users
- Order by importance

### Images
- Store preview images in `/public/previews/[template-id]/`
- Use WebP format when possible
- Recommended sizes:
  - Thumbnail: 600x400px
  - Screenshots: 1920x1080px

## Testing Your Template

### Local Development
```bash
# 1. Install dependencies in your template folder
cd templates/your-category/your-template
npm install

# 2. Start the template's dev server
npm run dev
# Opens on http://localhost:3000

# 3. Test in the showcase
cd ../../..
npm run discover
npm run dev
# Opens on http://localhost:3000
```

### Build Testing
```bash
# Test production build
npm run build
npm start
```

## Troubleshooting

### Template Not Appearing

1. Check `template.json` exists and is valid JSON
2. Run `npm run discover` manually
3. Check console output for errors
4. Verify the template folder structure

### Discovery Errors

If you see errors during discovery:
- Verify JSON syntax in `template.json`
- Ensure all required fields are present
- Check file permissions

### Build Failures

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

## Example: Complete Workflow

```bash
# 1. Create new template
./scaffold-template.sh barbershop-templates

# 2. Navigate to new template
cd templates/barbershop-templates/003_template

# 3. Create template.json
cat > template.json << 'EOF'
{
  "id": "barbershop-003",
  "name": "Vintage Barbershop",
  "category": "barbershop",
  "description": "A vintage-inspired barbershop template",
  "version": "1.0.0",
  "featured": false,
  "preview": {
    "thumbnail": "/previews/barbershop-003/thumbnail.jpg",
    "screenshots": [],
    "demoUrl": ""
  },
  "features": ["Classic design", "Booking system"],
  "techStack": ["Next.js 14", "TypeScript"],
  "colors": {
    "primary": "#2c1810",
    "secondary": "#f8f5f0",
    "accent": "#8b4513"
  },
  "pages": ["Home", "Services", "Booking"]
}
EOF

# 4. Build your template (add your code here)

# 5. Return to root and update index
cd ../../..
npm run discover

# 6. Test on showcase site
npm run dev
```

Your template is now live!
