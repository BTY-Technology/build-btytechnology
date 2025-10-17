#!/bin/bash

# scaffold-template.sh
# Creates a new template skeleton with auto-incremented numbering
# Usage: ./scaffold-template.sh <category-name>
# Example: ./scaffold-template.sh barbershop-templates

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if category argument is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Template category required${NC}"
    echo "Usage: ./scaffold-template.sh <category-name>"
    echo "Example: ./scaffold-template.sh barbershop-templates"
    exit 1
fi

CATEGORY=$1
TEMPLATES_DIR="templates/${CATEGORY}"

# Check if category directory exists
if [ ! -d "$TEMPLATES_DIR" ]; then
    echo -e "${RED}Error: Category directory '${TEMPLATES_DIR}' does not exist${NC}"
    echo "Available categories:"
    ls -d templates/*/ 2>/dev/null | xargs -n 1 basename || echo "  (none found)"
    exit 1
fi

# Find the next available template number
NEXT_NUM=1
for dir in "${TEMPLATES_DIR}"/[0-9][0-9][0-9]_template; do
    if [ -d "$dir" ]; then
        NUM=$(basename "$dir" | cut -d'_' -f1)
        NUM=$((10#$NUM)) # Remove leading zeros for arithmetic
        if [ $NUM -ge $NEXT_NUM ]; then
            NEXT_NUM=$((NUM + 1))
        fi
    fi
done

# Format number with leading zeros (e.g., 001, 002, 003)
TEMPLATE_NUM=$(printf "%03d" $NEXT_NUM)
TEMPLATE_NAME="${TEMPLATE_NUM}_template"
TEMPLATE_PATH="${TEMPLATES_DIR}/${TEMPLATE_NAME}"

# Confirm with user
echo -e "${YELLOW}Creating new template: ${TEMPLATE_PATH}${NC}"
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

# Create template directory
echo -e "${GREEN}Creating directory structure...${NC}"
mkdir -p "$TEMPLATE_PATH"

# Create top-level directories
mkdir -p "$TEMPLATE_PATH/app"
mkdir -p "$TEMPLATE_PATH/components"
mkdir -p "$TEMPLATE_PATH/lib"
mkdir -p "$TEMPLATE_PATH/public"
mkdir -p "$TEMPLATE_PATH/types"
mkdir -p "$TEMPLATE_PATH/utils"

# Create package.json (minimal/empty structure)
cat > "$TEMPLATE_PATH/package.json" << 'EOF'
{
  "name": "",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {},
  "devDependencies": {}
}
EOF

# Create next.config.js (generic)
cat > "$TEMPLATE_PATH/next.config.js" << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
EOF

# Create tailwind.config.ts (generic)
cat > "$TEMPLATE_PATH/tailwind.config.ts" << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
EOF

# Create tsconfig.json
cat > "$TEMPLATE_PATH/tsconfig.json" << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/app/*": ["./app/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"],
      "@/utils/*": ["./utils/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Create .eslintrc.json
cat > "$TEMPLATE_PATH/.eslintrc.json" << 'EOF'
{
  "extends": "next/core-web-vitals"
}
EOF

# Create postcss.config.js
cat > "$TEMPLATE_PATH/postcss.config.js" << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Create .env.local.example
cat > "$TEMPLATE_PATH/.env.local.example" << 'EOF'
# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Business Contact Information
NEXT_PUBLIC_BUSINESS_EMAIL=
NEXT_PUBLIC_BUSINESS_PHONE=
NEXT_PUBLIC_BUSINESS_ADDRESS=

# API Keys (if needed)
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
EOF

# Create .gitignore
cat > "$TEMPLATE_PATH/.gitignore" << 'EOF'
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode
.idea
EOF

# Create README.md (generic template)
cat > "$TEMPLATE_PATH/README.md" << 'EOF'
# [Business Name] - Next.js Template

A modern, fully-responsive website template built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✨ **Modern Design**: Clean, professional design with smooth animations
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ⚡ **Next.js 14 App Router**: Latest Next.js features with server-side rendering
- 🎨 **Tailwind CSS**: Utility-first CSS for rapid UI development
- 📝 **TypeScript**: Type-safe code for better development experience
- ♿ **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- 🔍 **SEO Optimized**: Proper meta tags, structured data, and semantic HTML

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Create environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration.

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
template/
├── app/                      # Next.js 14 App Router
├── components/              # React components
├── lib/                     # Library code
├── types/                   # TypeScript type definitions
├── utils/                   # Utility functions
├── public/                  # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Content

Add your business-specific content in the `app/` directory.

## Building for Production

```bash
npm run build
npm start
```

## Deployment

Deploy to [Vercel](https://vercel.com), [Netlify](https://www.netlify.com/), or your preferred hosting platform.

## License

This project is licensed under the MIT License.

---

Built with ❤️ by BTY Technology
EOF

echo -e "${GREEN}✓ Template created successfully!${NC}"
echo -e "${GREEN}✓ Location: ${TEMPLATE_PATH}${NC}"
echo ""
echo "Next steps:"
echo "  1. cd ${TEMPLATE_PATH}"
echo "  2. Install dependencies: npm install (or bun install)"
echo "  3. Start customizing your template!"
