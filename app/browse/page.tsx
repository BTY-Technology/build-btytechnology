"use client";

import { useState, useMemo } from "react";
import { getAllTemplates, getAllCategories } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";
import Header from "@/components/Header";

export default function BrowsePage() {
  const templates = getAllTemplates();
  const categories = getAllCategories();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let filtered = templates;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.features.some((f) => f.toLowerCase().includes(query)),
      );
    }

    // Sort templates
    if (sortBy === "popular") {
      // Sort by featured first, then by name
      filtered = filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      });
    } else {
      // Recent: reverse order (newest first)
      filtered = [...filtered].reverse();
    }

    return filtered;
  }, [templates, selectedCategory, searchQuery, sortBy]);

  // Get actual categories from the templates
  const categoryButtons = Object.entries(categories).map(([key, cat]) => ({
    key,
    name: cat.name,
    count: cat.count,
  }));

  return (
    <div className="min-h-screen flex flex-col overflow-hidden my-24">
      <Header />

      <main className="flex-grow w-full">
        <div className="flex justify-center overflow-hidden border-b border-black/5 dark:border-white/5 w-full">
          <div className="flex justify-center w-full max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] 2xl:max-w-[80%]">
            <div className="relative inline-block p-2 bg-neutral-50 dark:bg-black/20 w-full">
              {/* Decorative borders */}
              <div
                className="absolute h-0 border-t border-black/5 dark:border-white/5 top-0 left-0 right-0 pointer-events-none"
                style={{ width: "4000px", marginLeft: "-2000px" }}
              ></div>
              <div
                className="absolute h-0 border-b border-black/5 dark:border-white/5 bottom-0 left-0 right-0 pointer-events-none"
                style={{ width: "4000px", marginLeft: "-2000px" }}
              ></div>
              <div
                className="absolute w-0 border-l border-black/5 dark:border-white/5 top-0 bottom-0 left-0 pointer-events-none"
                style={{ height: "4000px", marginTop: "-2000px" }}
              ></div>
              <div
                className="absolute w-0 border-r border-black/5 dark:border-white/5 top-0 bottom-0 right-0 pointer-events-none"
                style={{ height: "4000px", marginTop: "-2000px" }}
              ></div>

              <div className="relative pointer-events-auto">
                <section className="w-full bg-gradient-to-b from-neutral-50 to-neutral-50 dark:from-neutral-900 dark:to-neutral-900 border border-black/5 dark:border-white/5 rounded-2xl mx-0">
                  <div className="mx-auto w-full p-2 md:p-4 lg:p-6">
                    <div className="flex flex-col gap-6 items-center">
                      <div className="w-full">
                        <div className="flex gap-4">
                          <div className="flex-1 space-y-4 transition-all duration-300 ml-0 w-full">
                            {/* Search and Sort Bar */}
                            <div className="w-full relative z-10">
                              <div className="flex flex-col sm:flex-row items-center gap-1.5 p-2 bg-white/70 dark:bg-black/30 backdrop-blur-sm rounded-xl border border-black/5 dark:border-white/5">
                                <div className="relative flex-grow w-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500"
                                  >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                  </svg>
                                  <input
                                    type="text"
                                    placeholder="Search websites..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                      setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-9 pr-4 py-1.5 bg-neutral-100 dark:bg-black/50 border border-black/5 dark:border-white/10 rounded-lg text-sm text-black dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
                                  />
                                </div>

                                <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto self-end">
                                  <button
                                    onClick={() => setSortBy("popular")}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs border border-black/5 dark:border-white/10 transition-all flex-1 sm:flex-initial justify-center sm:justify-start ${
                                      sortBy === "popular"
                                        ? "bg-neutral-100 dark:bg-white/10 text-black dark:text-white"
                                        : "text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                                    }`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-3 w-3"
                                    >
                                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                                      <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    <span>Popular</span>
                                  </button>
                                  <button
                                    onClick={() => setSortBy("recent")}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs border border-black/5 dark:border-white/10 transition-all flex-1 sm:flex-initial justify-center sm:justify-start ${
                                      sortBy === "recent"
                                        ? "bg-neutral-100 dark:bg-white/10 text-black dark:text-white"
                                        : "text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                                    }`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-3 w-3"
                                    >
                                      <path d="M8 2v4"></path>
                                      <path d="M16 2v4"></path>
                                      <rect
                                        width="18"
                                        height="18"
                                        x="3"
                                        y="4"
                                        rx="2"
                                      ></rect>
                                      <path d="M3 10h18"></path>
                                    </svg>
                                    <span>Recent</span>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Category Filters */}
                            <div className="w-full">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex flex-wrap gap-1.5">
                                  <button
                                    onClick={() => setSelectedCategory("all")}
                                    className={`px-2.5 py-1.5 rounded-xl text-xs border transition-colors capitalize ${
                                      selectedCategory === "all"
                                        ? "bg-black/5 dark:bg-white/10 text-black dark:text-white border-black/10 dark:border-white/20"
                                        : "text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 border-black/5 dark:border-white/5"
                                    }`}
                                  >
                                    All ({templates.length})
                                  </button>
                                  {categoryButtons.map((cat) => (
                                    <button
                                      key={cat.key}
                                      onClick={() =>
                                        setSelectedCategory(cat.key)
                                      }
                                      className={`px-2.5 py-1.5 rounded-xl text-xs border transition-colors capitalize ${
                                        selectedCategory === cat.key
                                          ? "bg-black/5 dark:bg-white/10 text-black dark:text-white border-black/10 dark:border-white/20"
                                          : "text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 border-black/5 dark:border-white/5"
                                      }`}
                                    >
                                      {cat.name} ({cat.count})
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Templates Grid */}
                            <div className="flex justify-center mb-0 min-h-[300px]">
                              <div className="w-full">
                                {filteredTemplates.length > 0 ? (
                                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-2 gap-y-4 sm:gap-3 md:gap-4 w-full">
                                    {filteredTemplates.map(
                                      (template, index) => (
                                        <TemplateCard
                                          key={template.id}
                                          template={template}
                                          index={index}
                                        />
                                      ),
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-center py-20">
                                    <p className="text-muted-foreground text-lg">
                                      No websites found.
                                    </p>
                                    <button
                                      onClick={() => {
                                        setSelectedCategory("all");
                                        setSearchQuery("");
                                      }}
                                      className="mt-4 text-bty-accent-red hover:text-bty-accent-warm transition-colors text-sm"
                                    >
                                      Clear filters
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
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
      <footer className="bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-100 dark:border-neutral-800 py-12 md:py-16 m-4 rounded-2xl relative">
        <div className="container px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 md:mb-12">
            <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-3">
                <img
                  src="/btyfavi.svg"
                  alt="BTY Technology Logo"
                  className="h-16 w-16"
                />
              </div>
              <p className="text-muted-foreground text-sm text-center md:text-left max-w-sm">
                Professional websites built with modern technologies. Building
                Better Than Yesterday.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-12 text-sm">
              <div className="flex flex-col items-start">
                <h3 className="text-muted-foreground mb-3 text-[10px] text-neutral-500 max-w-sm">
                  PRODUCT
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a
                      href="/browse"
                      className="hover:text-foreground transition-colors"
                    >
                      Websites
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-muted-foreground mb-3 text-[10px] text-neutral-500 max-w-sm">
                  CONNECT
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a
                      href="https://btytechnology.com/resources/about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-neutral-500">
              © 2025 BTY Technology. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
