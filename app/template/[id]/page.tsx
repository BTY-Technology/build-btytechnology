import { notFound } from 'next/navigation';
import { getTemplateById, getAllTemplates } from '@/lib/templates';
import Link from 'next/link';
import Header from '@/components/Header';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const templates = getAllTemplates();
  return templates.map((template) => ({
    id: template.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const template = getTemplateById(params.id);

  if (!template) {
    return {
      title: 'Template Not Found',
    };
  }

  return {
    title: `${template.name} - ${template.category.charAt(0).toUpperCase() + template.category.slice(1)} Website`,
    description: template.description,
    openGraph: {
      title: template.name,
      description: template.description,
      type: 'website',
      url: `https://build.btytechnology.com/template/${template.id}`,
      images: template.preview?.demoUrl ? [
        {
          url: `https://v1.screenshot.11ty.dev/${encodeURIComponent(template.preview.demoUrl)}/opengraph/_wait:3/`,
          width: 1200,
          height: 630,
          alt: `Preview of ${template.name}`,
        }
      ] : [],
    },
  };
}

export default function TemplatePage({ params }: { params: { id: string } }) {
  const template = getTemplateById(params.id);

  if (!template) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: template.name,
    description: template.description,
    applicationCategory: 'WebApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: template.features,
    programmingLanguage: template.techStack,
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden my-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="flex-grow w-full">
        <div className="flex justify-center overflow-hidden border-b border-black/5 dark:border-white/5 w-full">
          <div className="flex justify-center w-full mx-0 lg:mx-4">
            <div className="relative inline-block p-2 bg-neutral-50 dark:bg-black/20">
              {/* Decorative borders */}
              <div className="absolute h-0 border-t border-black/5 dark:border-white/5 top-0 left-0 right-0 pointer-events-none" style={{ width: '4000px', marginLeft: '-2000px' }}></div>
              <div className="absolute h-0 border-b border-black/5 dark:border-white/5 bottom-0 left-0 right-0 pointer-events-none" style={{ width: '4000px', marginLeft: '-2000px' }}></div>
              <div className="absolute w-0 border-l border-black/5 dark:border-white/5 top-0 bottom-0 left-0 pointer-events-none" style={{ height: '4000px', marginTop: '-2000px' }}></div>
              <div className="absolute w-0 border-r border-black/5 dark:border-white/5 top-0 bottom-0 right-0 pointer-events-none" style={{ height: '4000px', marginTop: '-2000px' }}></div>

              <div className="relative pointer-events-auto">
                <section className="w-full bg-gradient-to-b from-neutral-50 to-neutral-50 dark:from-neutral-900 dark:to-neutral-900 border border-black/5 dark:border-white/5 rounded-2xl mx-0">
                  <div className="mx-auto max-w-[1200px] p-6 md:p-8 lg:p-12 w-full">
                    {/* Back Button */}
                    <Link
                      href="/browse"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
                    >
                      ← Back to Gallery
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12">
                      {/* Left Column - Info */}
                      <div className="space-y-8">
                        {/* Header */}
                        <div>
                          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            {template.name}
                          </h1>
                          <p className="text-muted-foreground uppercase tracking-wide text-sm">
                            {template.category} Website
                          </p>
                        </div>

                        {/* Description */}
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-3">Description</h2>
                          <p className="text-muted-foreground leading-relaxed">{template.description}</p>
                        </div>

                        {/* Features */}
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-4">Features</h2>
                          <ul className="grid grid-cols-1 gap-3">
                            {template.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mt-0.5 text-bty-accent-green flex-shrink-0">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Pages */}
                        {template.pages.length > 0 && (
                          <div>
                            <h2 className="text-xl font-bold text-foreground mb-4">Included Pages</h2>
                            <div className="flex flex-wrap gap-2">
                              {template.pages.map((page) => (
                                <span
                                  key={page}
                                  className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md text-sm text-muted-foreground"
                                >
                                  {page}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Color Palette */}
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-4">Color Palette</h2>
                          <div className="flex gap-4">
                            <div className="space-y-2">
                              <div
                                className="w-16 h-16 rounded-lg border border-black/5 dark:border-white/10"
                                style={{ backgroundColor: template.colors.primary }}
                              />
                              <p className="text-xs text-muted-foreground text-center">Primary</p>
                            </div>
                            <div className="space-y-2">
                              <div
                                className="w-16 h-16 rounded-lg border border-black/5 dark:border-white/10"
                                style={{ backgroundColor: template.colors.secondary }}
                              />
                              <p className="text-xs text-muted-foreground text-center">Secondary</p>
                            </div>
                            <div className="space-y-2">
                              <div
                                className="w-16 h-16 rounded-lg border border-black/5 dark:border-white/10"
                                style={{ backgroundColor: template.colors.accent }}
                              />
                              <p className="text-xs text-muted-foreground text-center">Accent</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Preview */}
                      <div className="space-y-6 lg:sticky lg:top-32 self-start">
                        {/* Preview */}
                        <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-xl border border-black/5 dark:border-white/10 overflow-hidden">
                          {template.preview?.demoUrl ? (
                            <div className="relative w-full" style={{ paddingTop: '66.67%' }}>
                              <img
                                src={`https://v1.screenshot.11ty.dev/${encodeURIComponent(template.preview.demoUrl)}/large/1:1/_wait:3/`}
                                alt={`Preview of ${template.name}`}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="p-12 h-96 flex items-center justify-center">
                              <div className="text-center space-y-4">
                                <div className="text-8xl font-bold text-neutral-300 dark:text-neutral-700">
                                  {template.name.charAt(0)}
                                </div>
                                <p className="text-muted-foreground">Preview coming soon</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          {template.preview?.demoUrl && (
                            <a
                              href={template.preview.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-bty-accent-red hover:bg-red-600 text-white rounded-xl font-medium transition-all"
                            >
                              Preview Website →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-100 dark:border-neutral-800 py-12 m-4 rounded-2xl">
        <div className="container px-6 text-center">
          <p className="text-xs text-neutral-500">© 2025 BTY Technology. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
