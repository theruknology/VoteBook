import React from "react";

export const Home = (props) => {
  return (
    <div className="text-center w-fit flex flex-col gap-4 px-4 pb-20">
      <h1 className="font-bold text-lg">Welcome to VoteBook</h1>
      <p>Quickest way to create voting polls and share to friends</p>
      <button
        className="ring-2 ring-white py-2 hover:bg-gray-200 hover:text-black transition-colors"
        onClick={() => {
          props.changeView("New Poll");
        }}
      >
        Create Poll
      </button>
      <button
        className="ring-2 ring-white py-2 hover:bg-gray-200 hover:text-black transition-colors"
        onClick={() => {
          props.changeView("Vote Now");
        }}
      >
        Vote Now
      </button>
      <button
        className="ring-2 ring-white py-2 hover:bg-gray-200 hover:text-black transition-colors"
        onClick={() => {
          props.changeView("See Results");
        }}
      >
        See Results
      </button>
    </div>
  );
};
