import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  scrollTargetId?: string;
}

type PageItem = number | "ellipsis";

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  const siblings = 1;
  const start = Math.max(2, currentPage - siblings);
  const end = Math.min(totalPages - 1, currentPage + siblings);

  const items: PageItem[] = [1];

  if (start > 2) items.push("ellipsis");
  for (let page = start; page <= end; page++) items.push(page);
  if (end < totalPages - 1) items.push("ellipsis");
  if (totalPages > 1) items.push(totalPages);

  return items;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  scrollTargetId,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const hash = scrollTargetId ? `#${scrollTargetId}` : "";
  const buildHref = (page: number) =>
    page <= 1 ? `${basePath}${hash}` : `${basePath}?page=${page}${hash}`;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex flex-wrap items-center justify-center gap-2 md:mt-16"
    >
      {hasPrevious ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="group flex items-center gap-1 rounded-md px-3 py-2 text-sm font-heading text-encre transition-colors duration-300 hover:bg-sand/40"
        >
          <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Précédent
        </Link>
      ) : (
        <span
          aria-disabled
          className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-heading text-encre/30"
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </span>
      )}

      <ul className="flex items-center gap-1">
        {getPageItems(currentPage, totalPages).map((item, index) =>
          item === "ellipsis" ? (
            <li
              key={`ellipsis-${index}`}
              className="px-1 text-encre/50"
              aria-hidden
            >
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={buildHref(item)}
                aria-current={item === currentPage ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-heading transition-colors duration-300 ${
                  item === currentPage
                    ? "bg-rosewood text-paper"
                    : "text-encre hover:bg-sand/40"
                }`}
              >
                {item}
              </Link>
            </li>
          ),
        )}
      </ul>

      {hasNext ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="group flex items-center gap-1 rounded-md px-3 py-2 text-sm font-heading text-encre transition-colors duration-300 hover:bg-sand/40"
        >
          Suivant
          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      ) : (
        <span
          aria-disabled
          className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-heading text-encre/30"
        >
          Suivant
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
