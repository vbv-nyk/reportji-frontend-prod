import getElementName from "@/app/types/elements";
import { ElementParentType, ElementType, Pages } from "@/app/types/types";

type OutputMarkup = {
  name: string;
  elements: string[];
};

function returnBlankSpace(times: number): string {
  let output = "";

  for (let i = 0; i < times; i++) {
    output += "     ";
  }

  return output;
}

function replaceBracesWithContainers(content: string) {
  content = content.replace(/(\{|\})/g, (match) => {
    if (match === "{") {
      return "\\ocurly ";
    } else if (match === "}") {
      return "\\ccurly ";
    }
    return match;
  });
  content = content.replaceAll(/\[/g, (match) => `\\osquare `);
  content = content.replaceAll(/\]/g, (match) => `\\csquare `);
  content = content.replaceAll(/\"/g, (match) => `\\quotes `);
  content = content.replaceAll(/\(/g, (match) => `\\oround `);
  content = content.replaceAll(/\)/g, (match) => `\\cround `);
  content = content.replaceAll("%", "\\%");
  content = content.replaceAll("$", "\\$");
  content = content.replaceAll("#", "\\#");
  content = content.replaceAll("&", "\\&");
  content = content.replaceAll("_", "\\_");
  return content;
}

function replaceBracesWithContainersCODE(content: string) {
  content = content.replace(/(\{|\})/g, (match) => {
    if (match === "{") {
      return "|\\ocurly |";
    } else if (match === "}") {
      return "|\\ccurly |";
    }
    return match;
  });
  content = content.replaceAll(/\[/g, (match) => `|\\osquare |`);
  content = content.replaceAll(/\]/g, (match) => `|\\csquare |`);
  content = content.replaceAll(/\"/g, (match) => `|\\quotes |`);
  content = content.replaceAll(/\(/g, (match) => `|\\oround |`);
  content = content.replaceAll(/\)/g, (match) => `|\\cround |`);
  // content = content.replaceAll("%", "\\%");
  // content = content.replaceAll("$", "\\$");
  // content = content.replaceAll("#", "\\#");
  // content = content.replaceAll("&", "\\&");
  // content = content.replaceAll("_", "\\_");
  return content;
}
export function PageToJi(pages: Pages): string {
  const output: OutputMarkup[] = [];

  pages.forEach((page, index) => {
    const outputPage: OutputMarkup = {
      name: `page${index}`,
      elements: [],
    };
    const heading = `${returnBlankSpace(1)}heading: "${page.name}";`;
    outputPage.elements.push(heading);
    page.elements.forEach((element, eleIndex) => {
      let name = getElementName(element.element.type);
      name = name[0].toLowerCase() + name.substring(1);
      if (
        element.type == ElementParentType.SCALAR &&
        !Array.isArray(element.element.content)
      ) {
        let content = replaceBracesWithContainers(element.element.content);
        console.log(content);
        content = content
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        console.log(content);
        const currentElement = `${returnBlankSpace(1)}${name}: "${content}";`;
        outputPage.elements.push(currentElement);
      } else if (
        element.type == ElementParentType.VECTOR &&
        Array.isArray(element.element.content)
      ) {
        if (element.element.type == ElementType.CODE) {
          const nonEmptyParagraph = element.element.content.filter((line) => {
            return line !== "";
          });
          const paragraphs = nonEmptyParagraph.map((line, index) => {
            let content = replaceBracesWithContainersCODE(line);
            return `${returnBlankSpace(2)}"${content}",`;
          });
          const total = paragraphs.length;
          paragraphs[0] = `${returnBlankSpace(2)}"\\begin{lstlisting}${paragraphs[0].slice(
            paragraphs[0].indexOf('"') + 1
          )}`;
          const last_line_length = paragraphs[total - 1].length;
          paragraphs[total - 1] = `${paragraphs[total - 1].substring(
            0,
            last_line_length - 2
          )}\n\\end{lstlisting}"`;
          console.log(paragraphs.join("\n"));
          outputPage.elements.push(
            `${returnBlankSpace(1)}paragraphs: [\n${paragraphs.join("\n")}\n];`
          );
        } else {
          const nonEmptyParagraph = element.element.content.filter((line) => {
            return line !== "";
          });
          const paragraphs = nonEmptyParagraph.map((line, index) => {
            let content = replaceBracesWithContainers(line);
            return `${returnBlankSpace(2)}"${content}",`;
          });
          console.log(paragraphs.join("\n"));
          outputPage.elements.push(
            `${returnBlankSpace(1)}${name}: [\n${paragraphs.join("\n")}\n];`
          );
        }
      } else if (
        element.type == ElementParentType.FIGURES &&
        Array.isArray(element.element.content)
      ) {
        const figures = element.element.content.map((figure, index) => {
          let content = replaceBracesWithContainers(figure);
          if (index == element.element.content.length - 1)
            return `${returnBlankSpace(
              2
            )}{ src: "input_file.png", caption: "${content}" }`;
          else
            return `${returnBlankSpace(
              2
            )}{ src: "input_file.png", caption: "${content}" },`;
        });
        outputPage.elements.push(
          `${returnBlankSpace(1)}${name}: [\n${figures.join(
            "\n"
          )}\n${returnBlankSpace(1)}];`
        );
      }
    });

    output.push(outputPage);
  });
  const outputPages = output
    .map((page) => {
      const content = page.elements.join("\n");
      const placeholder = `${page.name} = page {
${content}
}`;

      return placeholder;
    })
    .join("\n");

  return outputPages;
}
