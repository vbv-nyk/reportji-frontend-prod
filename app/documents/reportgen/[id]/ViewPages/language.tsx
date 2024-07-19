import getElementName from "@/app/types/elements";
import {
  ElementParentType,
  ElementType,
  Pages,
  PdfElement,
} from "@/app/types/types";

function getElementBasedContent(element: PdfElement) {
  switch (element.element.type) {
    case ElementType.TITLE:
    case ElementType.SUBTITLE:
    case ElementType.HEADING:
    case ElementType.AUTHOR:
    case ElementType.DATE:
    case ElementType.PARAGRAPHS:
    case ElementType.CODE:
    case ElementType.ITEMS:
    case ElementType.FIGURES:
    case ElementType.CITATIONS:
    case ElementType.DIFFERENCES:
    case ElementType.INVALID:
      return ``;
  }
}
export function PageToJi(pages: Pages): string {
  const output: string[] = [];

  pages.forEach((page, index) => {
    output.push("\\newpage");
    page.elements.forEach((element) => {
      const content = getElementBasedContent(element);
    });
  });

  return output.join("\n");
}
