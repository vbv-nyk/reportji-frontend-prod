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
  content = content.replaceAll(/\{/g, (match) => `\\ocurly{}`);
  content = content.replaceAll(/\}/g, (match) => `\\ccurly{}`);
  content = content.replaceAll(/\[/g, (match) => `\\osquare{}`);
  content = content.replaceAll(/\]/g, (match) => `\\csquare{}`);
  content = content.replaceAll(/\"/g, (match) => `\\quotes{}`);
  content = content.replaceAll(/\(/g, (match) => `\\oround{}`);
  content = content.replaceAll(/\)/g, (match) => `\\cround{}`);
  content = content.replaceAll("%", "\\%");
  content = content.replaceAll("$", "\\$");
  content = content.replaceAll("#", "\\#");
  content = content.replaceAll("&", "\\&");
  content = content.replaceAll("_", "\\_");
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
        const currentElement = `${returnBlankSpace(1)}${name}: "${content}";`;
        outputPage.elements.push(currentElement);
      } else if (
        element.type == ElementParentType.VECTOR &&
        Array.isArray(element.element.content)
      ) {
        if (element.element.type == ElementType.CODE) {
          const paragraphs = element.element.content.map((line, index) => {
            let content = replaceBracesWithContainers(line);
            if (line != "") return `${returnBlankSpace(2)}"|${content}|",`;
          });
          const verbatim = `${returnBlankSpace(
            2
          )}"\\begin{lstlisting}\n${paragraphs}\n${returnBlankSpace(
            2
          )}\\end{lstlisting}"`;
          outputPage.elements.push(
            `${returnBlankSpace(1)}paragraphs: [\n${verbatim}\n];`
          );
          outputPage.elements.push(
            `${returnBlankSpace(1)}${name}: [\n${paragraphs.join("\n")}\n];`
          );
        } else {
          const paragraphs = element.element.content.map((line, index) => {
            let content = replaceBracesWithContainers(line);
            if (line != "") return `${returnBlankSpace(2)}"${content}",`;
          });
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
