import React, { useMemo } from "react";
import StatBar from "./StatBar";

const PollOverview = (props) => {
  const sum = useMemo(() => {
    const votes = props.options.map((itm) => itm.votes);
    return votes.reduce((partialSum, a) => partialSum + a, 0);
  }, [props.options]);

  return (
    <div className="w-full">
      <h1 className="font-bold text-gray-400 mb-3">RESULTS:</h1>
      <div className="flex flex-col gap-2">
        {props.options.map((itm) => {
          return (
            <StatBar key={itm.id} percentFull={(itm.votes / sum) * 100} votes={itm.votes} name={itm.title} />
          );
        })}
      </div>
    </div>
  );
};

export default PollOverview;
