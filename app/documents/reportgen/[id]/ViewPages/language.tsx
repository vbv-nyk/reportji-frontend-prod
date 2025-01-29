import getElementName from "@/app/types/elements";
import {
  ElementParentType,
  ElementType,
  Pages,
  PdfElement,
  ScalarElement,
  VectorElement,
} from "@/app/types/types";

function parse_title(title: ScalarElement | VectorElement): string {
  let markup = `\\uppercase{${title.content}}\n`;
  return markup;
}

function parse_subtitle(subtitle: ScalarElement | VectorElement) {
  const markup = `\\title{${subtitle.content}}\n`;
  return markup;
}

function parse_heading(heading: ScalarElement | VectorElement) {
  const markup = `\\uppercase{\\chapter{${heading.content}}}\n`;
  return markup;
}

function parse_author(author: ScalarElement | VectorElement) {
  const markup = `\\hfill \\textbf{${author.content}}\\par\n`;
  return markup;
}
function parse_date(date: ScalarElement | VectorElement) {
  const markup = `\\hfill \\textbf{${date.content}}\\par\n`;
  return markup;
}
function parse_paragraphs(paragraphs: ScalarElement | VectorElement) {
  const markup = `${paragraphs.content}\n`;
  return markup;
}
function parse_code(paragraphs: ScalarElement | VectorElement) {
  if (!Array.isArray(paragraphs.content)) return ``;
  const content = paragraphs.content.join("\n");
  const markup = `\\begin{lstlisting}\n${content}\n\\end{lstlisting}`;

  return markup;
}
function parse_items(items: ScalarElement | VectorElement) {
  let markup = "\\begin{itemize}\n";
  markup += `\\item ${items.content}\n`;
  markup += "\\end{itemize}\n";
  return markup;
}
function parse_figures(figures: ScalarElement | VectorElement): string {
  let markup = "";
  if (!Array.isArray(figures.content)) return "";
  if (figures.content.length > 1) {
    markup += "\\begin{figure}[h]\n\\centering\n";
    for (let i = 0; i < figures.content.length; i++) {
      markup += `\\begin{subfigure}[b]{0.45\\textwidth}\n\\centering\n\\includegraphics{sample.png}\n\\caption{${figures.content[i]}}\n\\end{subfigure}\n`;
    }
    markup += `\\caption{${figures.content[0]}}\n`;
    markup += "\\end{figure}\n";
  } else {
    markup += "\\begin{figure}[h]\n\\centering\n";
    markup += `\\centering\n\\includegraphics{sample.png}\n\\caption{${figures.content[0]}}\n`;
    markup += "\\end{figure}\n";
  }

  return markup;
}
function parse_citations(citations: ScalarElement | VectorElement): string {
  let markup = "\\begin{thebibliography}{100}\n";

  if (!Array.isArray(citations.content)) return "";
  for (let i = 0; i < citations.content.length; i++) {
    markup += `\\bibitem{${i}}\n${citations.content[i]}\n`;
  }

  markup += "\\end{thebibliography}\n";
  return markup;
}
function getElementBasedContent(element: PdfElement): string {
  switch (Number(element.element.type)) {
    case ElementType.TITLE:
      return parse_title(element.element);
    case ElementType.SUBTITLE:
      return parse_subtitle(element.element);
    case ElementType.HEADING:
      return parse_heading(element.element);
    case ElementType.AUTHOR:
      return parse_author(element.element);
    case ElementType.DATE:
      return parse_date(element.element);
    case ElementType.PARAGRAPHS:
      return parse_paragraphs(element.element);
    case ElementType.CODE:
      return parse_code(element.element);
    case ElementType.ITEMS:
      return parse_items(element.element);
    case ElementType.FIGURES:
      return parse_figures(element.element);
    case ElementType.CITATIONS:
      return parse_citations(element.element);
    case ElementType.DIFFERENCES:
      return ``;
    case ElementType.INVALID:
      return ``;
    default:
      return ``;
  }
}
export function PageToJi(pages: Pages): string {
  const output: string[] = [];

  pages.forEach((page, index) => {
    output.push("\\newpage");
    output.push(`\\uppercase{\\chapter{${page.name}}}`);
    page.elements.forEach((element) => {
      const content = getElementBasedContent(element);
      console.log(content);
      output.push(content);
    });
  });

  return output.join("\n");
}
