import React from "react";

const Window = (props) => {
  const windowTitle = (
    <>
      <span className="font-semibold">{"< "} Votebook Home / </span>
      <span className="font-normal text-gray-400">{props.title}</span>
    </>
  );

  return (
    <div
      id="window-container"
      className="h-screen w-screen bg-slate-900 mx-auto flex flex-col gap-2 p-4 text-gray-200"
    >
      <div
        className="text-left ring-2 ring-gray-400 py-2 px-4 h-fit "
        id="navigation"
      >
        <button
          className="w-fit"
          onClick={() => {
            props.changeView("Home");
          }}
        >
          <span>
            {props.title !== "Home" && windowTitle}
            {props.title === "Home" && "Votebook"}
          </span>
        </button>
      </div>
      <div
        className="ring-2 ring-gray-400 p-4 flex flex-col flex-grow items-center overflow-y-scroll scrolling gap-4 pt-10"
        id="content"
      >
        {props.children}
      </div>
    </div>
  );
};

export default Window;
