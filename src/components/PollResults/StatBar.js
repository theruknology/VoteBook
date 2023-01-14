import React from "react";

const StatBar = (props) => {
  const simplePercent = props.percentFull.toFixed(2);

  return (
    <div className="bg-slate-600 p-2 flex flex-col gap-2">
      <div className="flex w-full justify-between">
        <p className="w-1/2">{props.name}</p>
        <p>{props.votes}</p>
        <p>{simplePercent}%</p>
      </div>
      <div className="w-full h-2 bg-slate-400">
        <div className={"h-full bg-slate-200"} style={{width: simplePercent + "%"}}></div>
      </div>
    </div>
  );
};

export default StatBar;
