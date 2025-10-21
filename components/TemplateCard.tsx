"use client";

import Link from "next/link";
import { Template } from "@/types";

interface TemplateCardProps {
  template: Template;
  index?: number;
}

export default function TemplateCard({
  template,
  index = 0,
}: TemplateCardProps) {
  return (
    <div className="w-full" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="w-full rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/20 dark:bg-black/20 group flex flex-col transition-all hover:border-black/20 dark:hover:border-white/20">
        {/* Thumbnail */}
        {template.preview?.demoUrl ? (
          <a
            href={template.preview.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="relative overflow-hidden cursor-pointer rounded-t-xl w-full"
              style={{ paddingTop: "75%" }}
            >
              <img
                src={`https://v1.screenshot.11ty.dev/${encodeURIComponent(template.preview.demoUrl)}/medium/1:1/_wait:3/`}
                alt={`Preview of ${template.name}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </a>
        ) : (
          <Link href={`/template/${template.id}`}>
            <div
              className="relative overflow-hidden cursor-pointer rounded-t-xl w-full"
              style={{ paddingTop: "75%" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-6xl font-bold text-neutral-300 dark:text-neutral-700">
                    {template.name.charAt(0)}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Content */}
        <div className="p-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm mt-auto">
          <Link href={`/template/${template.id}`}>
            <h3 className="font-medium text-sm text-black dark:text-white group-hover:text-bty-accent-red dark:group-hover:text-bty-accent-warm transition-colors line-clamp-1">
              {template.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between mt-1.5">
            {/* Category */}
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground capitalize">
                {template.category}
              </span>
            </div>

            {/* Features count */}
            <div className="flex items-center">
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
                className="h-3 w-3 mr-1 text-muted-foreground"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="text-xs text-muted-foreground">
                {template.features.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton loader for template cards
export function TemplateCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <div className="w-full" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="w-full rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/20 dark:bg-black/20 group flex flex-col transition-all">
        <div
          className="relative overflow-hidden cursor-pointer rounded-t-xl w-full"
          style={{ paddingTop: "75%" }}
        >
          <div className="absolute inset-0 bg-neutral-100/80 dark:bg-neutral-800/50 animate-pulse"></div>
        </div>
        <div className="p-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm mt-auto">
          <div className="h-4 w-3/4 bg-neutral-100/80 dark:bg-neutral-800/50 rounded animate-pulse"></div>
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center">
              <div className="h-4 w-4 mr-1.5 bg-neutral-100/80 dark:bg-neutral-800/50 rounded-full animate-pulse"></div>
              <div className="h-2.5 w-16 bg-neutral-100/80 dark:bg-neutral-800/50 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-neutral-100/80 dark:bg-neutral-800/50 rounded-full mr-1 animate-pulse"></div>
              <div className="h-2.5 w-5 bg-neutral-100/80 dark:bg-neutral-800/50 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
