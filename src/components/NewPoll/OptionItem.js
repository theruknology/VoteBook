import React from "react";

const OptionItem = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <p>{props.name}</p>
      <button onClick={()=>{props.onDelete()}} className="w-fit text-red-400">Remove</button>
    </div>
  );
};

export default OptionItem;
