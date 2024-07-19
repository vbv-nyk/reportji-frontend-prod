import { useState } from "react";

export default function Tables() {

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2">
        <div className="flex gap-2 items-start">
          <div>Number of items</div>
          <select>
            <option selected={true}>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
      <div className="flex justify-start flex-wrap w-full">
        
      </div>
    </div>
  );
}
