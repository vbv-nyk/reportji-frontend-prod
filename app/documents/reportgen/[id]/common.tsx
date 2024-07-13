import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import getElementName, {
  getElementType,
  getParentType,
} from "../../../types/elements";
import { ElementParentType, ElementType, Page, Pages } from "../../../types/types";
import ButtonYellow2 from "../../../Components/Buttons/ButtonYellow2";
import { CurrentView } from "./types";

export function Common() {
  return (
    <div className="w-full flex flex-col gap-8 items-center">
      <p className="w-full  text-center text-white font-bold">
        Just A Few Steps Away From Getting Your Report Ready !
      </p>
    </div>
  );
}

export function Progress({ pageNumber }: { pageNumber: Number }) {
  let firstCirle,bridge,  secondCircle ; 
  if(pageNumber == CurrentView.ENTER_CHAPTER_VIEW ) {
    firstCirle =  "#6b7280" ;
    secondCircle =  "#6b7280" ;
    bridge =  "#6b7280" ;
  } else if(pageNumber == CurrentView.REPORT_VIEW) {
    firstCirle = "#ffffff";
    secondCircle = "#ffffff";
    bridge = "#ffffff";
  } else if(pageNumber == CurrentView.ENTER_CONTENT_VIEW) {
    firstCirle = "#ffffff";
    secondCircle = "#6b7280";
    bridge = "#ffffff";
  } else if(pageNumber == CurrentView.SHOW_PAGES_VIEW) {
    firstCirle = "#ffffff";
    secondCircle = "#6b7280";
    bridge = "#6b7280";
  }

  return (
    <>
      <button
        style={{ color: firstCirle, borderColor: firstCirle }}
        className="border-gray-500 text-gray-500  font-bold border-2 px-[10px] text-sm py-1 rounded-[100%]"
      >
        1
      </button>
      <div
        style={{ color: bridge, borderColor: bridge }}
        className="w-20 border border-gray-500"
      ></div>
      <button
        style={{ color: secondCircle, borderColor: secondCircle }}
       className="text-gray-500 font-bold border-2 border-gray-500 px-[10px] text-sm py-1 rounded-[100%]">
        2
      </button>
    </>
  );
}

type GetCurrentInputProps = {
  inputElement: RefObject<HTMLInputElement>;
  textAreaElement: RefObject<HTMLTextAreaElement>;
  currentType: string;
  content: string | string[];
};
export function GetCurrentInput(props: GetCurrentInputProps) {
  const { content, currentType, inputElement, textAreaElement } = props;
  switch (currentType) {
    case "Title":
    case "Subtitle":
    case "Heading":
    case "Author":
    case "Date":
      return (
        <div className="w-full">
          <input
            ref={inputElement}
            className="w-full py-4 pl-4 font-semibold placeholder:text-gray-500 rounded-md"
            placeholder="Add Your Text Here......"
            defaultValue={Array.isArray(content) ? content.join("\n") : content}
          />
        </div>
      );
    case "Paragraphs":
    case "Items":
    case "Figures":
    case "Citations":
    case "Code":
      return (
        <div className="w-full flex-grow h-full">
          <textarea
            ref={textAreaElement}
            defaultValue={Array.isArray(content) ? content.join("\n") : content}
            className="w-full h-full font-semibold rounded-lg p-4 resize-none"
            placeholder="Enter your data, every new paragraph/item starts at a new line."
          />
        </div>
      );
  }
}

export type ReportGenCommonProps = {
  currentView: CurrentView;
  setCurrentView: Dispatch<SetStateAction<number>>;
  pages: Pages;
  setPages: Dispatch<SetStateAction<Pages>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  outputData: string;
  setOutputData:  Dispatch<SetStateAction<string>>;
  documentID: number | null;
  setDocumentID: Dispatch<SetStateAction<number | null>>;
};

export type Step2Props = {
  currentPage: number;
  setPage: Dispatch<SetStateAction<Page>>;
  page: Page;
  editIndex: number;
  setEditIndex: Dispatch<SetStateAction<number>>;
  content: string | string[];
  defaultType: string;
  pages: Pages;
  setPages: Dispatch<SetStateAction<Pages>>;
};

export function TakeInput(props: Step2Props) {
  const { setPage, currentPage, page, content, editIndex, defaultType, setEditIndex, pages, setPages} =
    props;
  const inputElement = useRef<HTMLInputElement>(null);
  const textAreaElement = useRef<HTMLTextAreaElement>(null);
  const [currentType, setCurrentType] = useState(defaultType);
  const changeType = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentType(e.target.value);
  };
  
  
  useEffect(() => {
    const pagesClone = pages.map(page => page);
    pagesClone[currentPage] = page; 
    localStorage.setItem("pages", JSON.stringify(pagesClone));
  }, [page])

  const addElement = (editIndex: number) => {
    let elementType = getElementType(currentType);
    let content: string;
    const parentType = getParentType(currentType);

    if (inputElement != null && parentType == ElementParentType.SCALAR) {
      if (inputElement.current) {
        content = inputElement.current.value;
        if (content === "") return;
        if (editIndex === -1) {
          setPage({
            name: page.name,
            elements: [
              ...page.elements,
              { type: parentType, element: { content, type: elementType } },
            ],
          });
        } else {
          const newElements = page.elements.map((element, index) => {
            if (index === editIndex) {
              element.element.content = content;
              element.element.type = elementType;
              element.type = parentType;
              return element;
            } else {
              return element;
            }
          });
          setPage({ name: page.name, elements: newElements });
          setEditIndex(-1);
          console.log(newElements);
        }
        inputElement.current.value = "";
      }
      
      
    }

    if (textAreaElement != null && parentType == ElementParentType.VECTOR) {
      if (textAreaElement.current) {
        content = textAreaElement.current.value;
        if (content === "") return;
        let lines =  content.split('\n');
        console.log(lines);
        if (editIndex === -1) {
          setPage({
            name: page.name,
            elements: [
              ...page.elements,
              { type: parentType, element: { content: lines, type: elementType } },
            ],
          });
        } else {
          const newElements = page.elements.map((element, index) => {
            if (index === editIndex) {
              element.element.content = content.split("\n");
              element.element.type = elementType;
              element.type = parentType;
              return element;
            } else {
              return element;
            }
          });
          setPage({ name: page.name, elements: newElements });
          setEditIndex(-1);
          console.log(newElements);
        }
        textAreaElement.current.value = "";
      }
    }

    if (textAreaElement != null && parentType == ElementParentType.FIGURES) {
      if (textAreaElement.current) {
      content = textAreaElement.current.value;
        if (content === "") return;
        let lines =  content.split('\n');
        console.log(lines);
        if (editIndex === -1) {
          setPage({
            name: page.name,
            elements: [
              ...page.elements,
              { type: parentType, element: { content: lines, type: elementType } },
            ],
          });
        } else {
          const newElements = page.elements.map((element, index) => {
            if (index === editIndex) {
              element.element.content = content.split("\n");
              element.element.type = elementType;
              element.type = parentType;
              return element;
            } else {
              return element;
            }
          });
          setPage({ name: page.name, elements: newElements });
          setEditIndex(-1);
          console.log(newElements);
        }
        textAreaElement.current.value = "";
      }
    }
    
  };

  const deleteElement = (editIndex: number) => {
    const newElements = page.elements.filter((element, index) => {
      return index != editIndex;
    });
    setPage({ name: page.name, elements: newElements });
    setEditIndex(-1);
  };
  return (
    <div className="flex  flex-col px-8 py-4 rounded-lg gap-4 h-max bg-gray-300 w-full">
      <div className="flex flex-col gap-4 justify-between">
        <select
          id="types"
          name="types"
          className="bg-white font-bold flex-grow w-fit rounded-md pl-3 pr-4 py-3"
          onChange={changeType}
          defaultValue={currentType}
        >
          <option value="Title">Title</option>
          <option value="Subtitle">Subtitle</option>
          <option value="Heading">Heading</option>
          <option value="Author">Author</option>
          <option value="Date">Date</option>
          <option value="Paragraphs">Paragraphs</option>
          <option value="Items">Items</option>
          <option value="Figures">Figures</option>
          <option value="Citations">Citations</option>
          <option value="Differences">Differences</option>
          <option value="Code">Code</option>
        </select>
        {
          <GetCurrentInput
            content={content}
            currentType={currentType}
            inputElement={inputElement}
            textAreaElement={textAreaElement}
          />
        }
        <div className="self-start">
          {editIndex === -1 && (
            <ButtonYellow2
              onClick={() => addElement(editIndex)}
              content={"Add Element"}
            />
          )}
          {editIndex !== -1 && (
            <div className="flex gap-4">
              <ButtonYellow2
                onClick={() => addElement(editIndex)}
                content={"Update"}
              />
              <ButtonYellow2
                onClick={() => deleteElement(editIndex)}
                content={"Delete"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
