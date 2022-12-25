import React from "react";

const ButtonPill = (props) => {
  const color = props.color;

  return (
    <button
      onClick={props.onClick}
      className={
        props.className +
        ` bg-${color}-500 hover:bg-${color}-600 focus:ring-${color}-200 
      focus:ring-4 focus:outline-none rounded-full py-2 px-6 font-medium`
      }
    >
      {props.children}
    </button>
  );
};

export default ButtonPill;
