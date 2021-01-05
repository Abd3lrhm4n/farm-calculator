import { React, useEffect, useState } from "react";
import "./Outputs.css";

function Outputs({ title, data }) {
  let [innerData, setInnerData] = useState([]);
  useEffect(() => {
    if (data) {
      innerData = setInnerData(data);
    }
  }, [data]);

  return (
    <div className="outputs-grid">
      <div>
        <h3>{title}</h3>
      </div>
      <div className="outputs-rows">
        {innerData.map((item, index) => {
          return <OutputsBody key={index} name={item.name} value={item.value.toFixed(2)} />;
        })}
      </div>
    </div>
  );
}

function OutputsBody({ name, value }) {
  return (
    <div className="outputs-row">
      <p>{name} : {value}</p>
    </div>
  );
}

export default Outputs;
