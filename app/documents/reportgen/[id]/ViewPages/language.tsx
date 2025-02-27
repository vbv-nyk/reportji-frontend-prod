import getElementName from "@/app/types/elements";
import {
  ElementParentType,
  ElementType,
  Page,
  Pages,
  PdfElement,
  ScalarElement,
  VectorElement,
} from "@/app/types/types";

function parse_title(
  title: ScalarElement | VectorElement,
  outputFormat: string
): string {
  let markup = `\\section{${title.content}}\n`;
  return markup;
}

function parse_subtitle(
  subtitle: ScalarElement | VectorElement,
  outputFormat: string
) {
  const markup = `\\subsection{${subtitle.content}}\n`;
  return markup;
}

function parse_heading(
  heading: ScalarElement | VectorElement,
  outputFormat: string
) {
  switch (outputFormat) {
    case "IEEE":
      return parse_title(heading, outputFormat);
    default:
      const markup = `\\uppercase{\\chapter{${heading.content}}}\n`;
      return markup;
  }
}

function parse_author(
  author: ScalarElement | VectorElement,
  outputFormat: string
) {
  const markup = `\\hfill \\textbf{${author.content}}\\par\n`;
  return markup;
}
function parse_date(date: ScalarElement | VectorElement, outputFormat: string) {
  const markup = `\\hfill \\textbf{${date.content}}\\par\n`;
  return markup;
}
function parse_paragraphs(
  paragraphs: ScalarElement | VectorElement,
  outputFormat: string
) {
  if (!Array.isArray(paragraphs.content))
    paragraphs.content = paragraphs.content.split("\n");
  const markup = `${paragraphs.content.join("\n\n")}\n`;
  return markup;
}
function parse_code(
  paragraphs: ScalarElement | VectorElement,
  outputFormat: string
) {
  if (!Array.isArray(paragraphs.content))
    paragraphs.content = paragraphs.content.split("\n");
  const content = paragraphs.content.join("\n");
  const markup = `\\begin{lstlisting}\n${content}\n\\end{lstlisting}`;

  return markup;
}
function parse_items(
  items: ScalarElement | VectorElement,
  outputFormat: string
) {
  if (!Array.isArray(items.content)) items.content = [items.content];
  let markup = "\\begin{itemize}\n";
  items.content.map((item) => {
    markup += `\\item ${item}`;
  });
  markup += "\\end{itemize}\n";
  return markup;
}
function parse_figures(
  figures: ScalarElement | VectorElement,
  outputFormat: string
): string {
  let markup = "";
  if (!Array.isArray(figures.content))
    figures.content = figures.content.split("\n");
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
function parse_citations(
  citations: ScalarElement | VectorElement,
  outputFormat: string
): string {
  let markup = "\\begin{thebibliography}{100}\n";

  if (!Array.isArray(citations.content))
    citations.content = citations.content.split("\n");
  for (let i = 0; i < citations.content.length; i++) {
    markup += `\\bibitem{${i}}\n${citations.content[i]}\n`;
  }

  markup += "\\end{thebibliography}\n";
  return markup;
}
function getElementBasedContent(
  element: PdfElement,
  outputFormat: string
): string {
  switch (Number(element.element.type)) {
    case ElementType.TITLE:
      return parse_title(element.element, outputFormat);
    case ElementType.SUBTITLE:
      return parse_subtitle(element.element, outputFormat);
    case ElementType.HEADING:
      return parse_heading(element.element, outputFormat);
    case ElementType.AUTHOR:
      return parse_author(element.element, outputFormat);
    case ElementType.DATE:
      return parse_date(element.element, outputFormat);
    case ElementType.PARAGRAPHS:
      return parse_paragraphs(element.element, outputFormat);
    case ElementType.CODE:
      return parse_code(element.element, outputFormat);
    case ElementType.ITEMS:
      return parse_items(element.element, outputFormat);
    case ElementType.FIGURES:
      return parse_figures(element.element, outputFormat);
    case ElementType.CITATIONS:
      return parse_citations(element.element, outputFormat);
    case ElementType.DIFFERENCES:
      return ``;
    case ElementType.INVALID:
      return ``;
    default:
      return ``;
  }
}
function createChapterHeader(
  output: string[],
  outputFormat: string,
  page: Page
) {
  if (outputFormat == "COLLEGE") {
    output.push("\\newpage");
    output.push(`\\uppercase{\\chapter{${page.name}}}`);
  }
}

export function PageToJi(pages: Pages, outputFormat: string): string {
  const output: string[] = [];

  pages.forEach((page, index) => {
    createChapterHeader(output, outputFormat, page);
    page.elements.forEach((element) => {
      console.log("The content is: ", element.element.content);
      const content = getElementBasedContent(element, outputFormat);
      // console.log(content);
      output.push(content);
    });
  });

  return output.join("\n");
}
