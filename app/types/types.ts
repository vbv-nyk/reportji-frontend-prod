export enum ElementType {
    TITLE,
    SUBTITLE,
    HEADING,
    AUTHOR,
    DATE,
    PARAGRAPHS,
    CODE,
    ITEMS,
    FIGURES,
    CITATIONS,
    DIFFERENCES,
    INVALID,
}

export enum ElementParentType {
    SCALAR,
    VECTOR,
    TABLES,
    FIGURES,
    INVALID
}


export type DifferencesElement = {
    type: ElementType,
    content: string[][]
}


export type ScalarElement = {
    type: ElementType,
    content: string
}

export type VectorElement = {
    type: ElementType,
    content: string[]
}

export type PdfElement = {
    type: ElementParentType,
    element: ScalarElement | VectorElement
}

export type Page = {
    name: string,
    elements: PdfElement[]
}


export type Pages = Page[]

