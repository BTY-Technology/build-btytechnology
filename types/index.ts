export interface Template {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  version: string;
  featured: boolean;
  preview: {
    thumbnail: string;
    screenshots: string[];
    demoUrl: string;
  };
  features: string[];
  techStack: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  pages: string[];
  path: string;
}

export interface Category {
  slug: string;
  name: string;
  count: number;
  templates: string[];
}

export interface TemplateData {
  generatedAt: string;
  totalTemplates: number;
  categories: Record<string, Category>;
  templates: Template[];
}
