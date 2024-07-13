import {DifferencesElement, ElementParentType, ElementType, PdfElement, ScalarElement, VectorElement} from "./types";

export function Scalar(input: ScalarElement) : ScalarElement {
    return {...input};
}

export function Vector(input: VectorElement) : VectorElement {
   return {...input};
}

export function Table(input: DifferencesElement) : DifferencesElement {
    return {...input}
}

export function getParentType(input: string) : ElementParentType{
    switch(input) {
       case "Heading":
       case "Title":
       case "Subtitle":
       case "Author":
       case "Date":
            return ElementParentType.SCALAR
       case "Paragraphs":
       case "Items":
       case "Citations":
       case "Code":
            return ElementParentType.VECTOR
       case "Tables":
            return ElementParentType.TABLES
       case "Figures":
            return ElementParentType.FIGURES
    }
    
    return ElementParentType.INVALID;
}

export function getElementType(input: string) : ElementType {
    switch(input) {
       case "Heading":
            return ElementType.HEADING;
       case "Title":
            return ElementType.TITLE;
       case "Subtitle":
            return ElementType.SUBTITLE;
       case "Author":
            return ElementType.AUTHOR;
       case "Date":
            return ElementType.DATE;
       case "Paragraphs":
            return ElementType.PARAGRAPHS;
       case "Items":
            return ElementType.ITEMS;
       case "Figures":
            return ElementType.FIGURES;
       case "Citations":
            return ElementType.CITATIONS;
       case "Table":
            return ElementType.DIFFERENCES;
       case "Code":
            return ElementType.CODE;
    }
    
    return ElementType.INVALID;
   
}

export default function getElementName(type: ElementType) : string {
    switch(type)  {
          case ElementType.AUTHOR: return "Author";
          case ElementType.CITATIONS: return "Citations";
          case ElementType.DATE: return "Date";
          case ElementType.DIFFERENCES: return "Table";
          case ElementType.FIGURES: return "Figures";
          case ElementType.HEADING: return "Heading";
          case ElementType.INVALID: return "Invalid";
          case ElementType.ITEMS: return "Items";
          case ElementType.PARAGRAPHS: return "Paragraphs";
          case ElementType.SUBTITLE: return "Subtitle";
          case ElementType.TITLE: return "Title";
          case ElementType.CODE: return "Code";
          default: return ""
    }
}