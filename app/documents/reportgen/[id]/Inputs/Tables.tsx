import { useState } from "react";

export default function Tables() {
    const [rows, setRows] = useState(1);
    const [cols, setCols] = useState(2);
    
    return (<div>
          <div className="flex gap-2">          
            <div className="flex gap-2 items-start">
              <div>Number of rows</div>
              <input type="number" max={10} maxLength={2}/>
            </div>
            <div className="flex gap-1">
              <div>Number of columns</div>
              <input type="number" max={10}/>
            </div>
          </div>
        </div>)
}