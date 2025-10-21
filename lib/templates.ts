import templateData from '@/data/templates.json';
import { Template, Category, TemplateData } from '@/types';

/**
 * Get all templates
 */
export function getAllTemplates(): Template[] {
  return (templateData as TemplateData).templates;
}

/**
 * Get featured templates
 */
export function getFeaturedTemplates(): Template[] {
  return getAllTemplates().filter(template => template.featured);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): Template | undefined {
  return getAllTemplates().find(template => template.id === id);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): Template[] {
  return getAllTemplates().filter(template =>
    template.category === category || template.categorySlug === category
  );
}

/**
 * Get all categories
 */
export function getAllCategories(): Record<string, Category> {
  return (templateData as TemplateData).categories;
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  const categories = getAllCategories();
  return Object.values(categories).find(cat => cat.slug === slug);
}

/**
 * Search templates by query
 */
export function searchTemplates(query: string): Template[] {
  const lowerQuery = query.toLowerCase();
  return getAllTemplates().filter(template =>
    template.name.toLowerCase().includes(lowerQuery) ||
    template.description.toLowerCase().includes(lowerQuery) ||
    template.category.toLowerCase().includes(lowerQuery) ||
    template.features.some(feature => feature.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Filter templates by tech stack
 */
export function filterByTechStack(tech: string): Template[] {
  return getAllTemplates().filter(template =>
    template.techStack.some(stack =>
      stack.toLowerCase().includes(tech.toLowerCase())
    )
  );
}

/**
 * Get template stats
 */
export function getTemplateStats() {
  const data = templateData as TemplateData;
  return {
    total: data.totalTemplates,
    categories: Object.keys(data.categories).length,
    featured: getFeaturedTemplates().length,
  };
}
