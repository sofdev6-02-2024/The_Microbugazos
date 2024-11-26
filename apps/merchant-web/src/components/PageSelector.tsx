"use client"

import {ChevronLeft, ChevronRight} from "lucide-react";
import PageSelectorStyle from "@/styles/components/PageSelector.module.css"

interface Props {
  page: number;
  setPage: (number) => void;
  pages: number;
  maxVisible: number;
}

export default function PageSelector({ page, setPage, pages, maxVisible }: Readonly<Props>) {
  const getVisiblePages = () => {
    const halfVisible = Math.floor(maxVisible / 2);
    let start = Math.max(0, page - halfVisible);
    let end = Math.min(pages, page + halfVisible + 1);

    if (end - start < maxVisible) {
      if (start === 0) {
        end = Math.min(pages, start + maxVisible);
      } else if (end === pages) {
        start = Math.max(0, end - maxVisible);
      }
    }

    return { start, end };
  };

  const { start, end } = getVisiblePages();

  return (
    <div className={PageSelectorStyle.container}>
      <button
        className={PageSelectorStyle.arrowButton}
        onClick={() => setPage(Math.max(0, page - 1))}
      >
        <ChevronLeft />
      </button>

      {start !== 0 && <button key={"dotsLeft"} className={`${PageSelectorStyle.pageButton}`}>...</button>}
      {Array.from({ length: end - start }, (_, index) => {
        const pageIndex = start + index;
        return (
          <button
            className={`${PageSelectorStyle.pageButton} ${
              pageIndex === page ? PageSelectorStyle.selected : ""
            }`}
            key={pageIndex}
            onClick={() => setPage(pageIndex)}
          >
            {pageIndex + 1}
          </button>
        );
      })}
      {end !== pages && <button key={"dotsRight"} className={`${PageSelectorStyle.pageButton}`}>...</button>}

      <button
        className={PageSelectorStyle.arrowButton}
        onClick={() => setPage(Math.min(pages - 1, page + 1))}
      >
        <ChevronRight />
      </button>
    </div>
  );
}