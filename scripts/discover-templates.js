#!/usr/bin/env node

/**
 * Template Auto-Discovery Script
 * Scans the /templates directory and generates a JSON file with all template metadata
 * Run during build time to automatically detect new templates
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'templates.json');

/**
 * Recursively scans the templates directory for template.json files
 */
function discoverTemplates() {
  const templates = [];
  const categories = fs.readdirSync(TEMPLATES_DIR);

  categories.forEach(category => {
    const categoryPath = path.join(TEMPLATES_DIR, category);

    // Skip if not a directory
    if (!fs.statSync(categoryPath).isDirectory()) {
      return;
    }

    // Skip git directories and hidden files
    if (category.startsWith('.')) {
      return;
    }

    const templateDirs = fs.readdirSync(categoryPath);

    templateDirs.forEach(templateDir => {
      const templatePath = path.join(categoryPath, templateDir);

      // Skip if not a directory
      if (!fs.statSync(templatePath).isDirectory()) {
        return;
      }

      // Skip hidden directories
      if (templateDir.startsWith('.')) {
        return;
      }

      const templateJsonPath = path.join(templatePath, 'template.json');

      // Check if template.json exists
      if (fs.existsSync(templateJsonPath)) {
        try {
          const templateData = JSON.parse(fs.readFileSync(templateJsonPath, 'utf-8'));

          // Add path information
          templateData.path = `templates/${category}/${templateDir}`;
          templateData.categorySlug = category;

          templates.push(templateData);
          console.log(`✓ Discovered: ${templateData.name} (${templateData.id})`);
        } catch (error) {
          console.error(`✗ Error reading ${templateJsonPath}:`, error.message);
        }
      } else {
        console.warn(`⚠ Missing template.json in ${templatePath}`);
      }
    });
  });

  return templates;
}

/**
 * Generates category summary
 */
function generateCategorySummary(templates) {
  const categories = {};

  templates.forEach(template => {
    const cat = template.category;
    if (!categories[cat]) {
      categories[cat] = {
        slug: template.categorySlug,
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        count: 0,
        templates: []
      };
    }
    categories[cat].count++;
    categories[cat].templates.push(template.id);
  });

  return categories;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Scanning templates directory...\n');

  // Discover all templates
  const templates = discoverTemplates();

  // Generate category summary
  const categories = generateCategorySummary(templates);

  // Create output data
  const output = {
    generatedAt: new Date().toISOString(),
    totalTemplates: templates.length,
    categories,
    templates
  };

  // Ensure data directory exists
  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write output file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\n✅ Discovery complete!`);
  console.log(`📊 Found ${templates.length} templates across ${Object.keys(categories).length} categories`);
  console.log(`📁 Output saved to: ${OUTPUT_FILE}\n`);

  // Print summary
  Object.entries(categories).forEach(([key, cat]) => {
    console.log(`   ${cat.name}: ${cat.count} template(s)`);
  });
}

// Run the script
main();
