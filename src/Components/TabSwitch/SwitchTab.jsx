/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Style.scss";

function SwitchTab({ data, onTabChange }) {
  const [selected, setSelected] = useState(0);
  const [left, setLeft] = useState(0);
  const activeTab = (tab, i) => {
    setLeft(i * 100);
    setTimeout(() => {
      setSelected(i);
    }, 300);
    onTabChange(tab, i);
  };

  return (
    <div className="switchingtab">
      <div className="tabItems">
        {data.map((tab, i) => (
          <div
            className={`tabItem ${selected === i ? "active" : ""}`}
            key={i}
            onClick={() => activeTab(tab, i)}
          >
            {tab}
          </div>
        ))}
        <span className="moviebg" style={{left}}></span>
      </div>
    </div>
  );
}

export default SwitchTab;
