import React, { useRef, useState } from "react";
import Error from "../UI/Error";

const VoteForm = (props) => {
  const enteredName = useRef();
  const [error, setError] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredName.current.value.trim() === "") {
      setError((prev) => prev + " name");
      return;
    }
    if (props.options.filter((itm) => itm.checked).length == 0) {
      setError((prev) => prev + " options");
      return;
    }

    setError("");
    props.onSubmit(enteredName.current.value);
  };

  return (
    <form className="w-full flex flex-col gap-2 p-4" onSubmit={submitHandler}>
      <h2 className="text-gray-400 font-bold">QUESTION: </h2>
      <p className="pb-5 text-2xl">{props.question}</p>
      <h2 className="text-gray-400 font-bold">OPTIONS: </h2>
      <div className="flex flex-col gap-4 pb-5">
        {props.options.map((itm) => {
          return (
            <div key={itm.id} className="flex w-max justify-between gap-4">
              <input
                type="checkbox"
                onChange={() => {
                  props.onChange(itm.id);
                }}
              />
              <label>{itm.title}</label>
            </div>
          );
        })}
      </div>
      <label className="text-gray-400 font-bold">YOUR NAME:</label>
      <input
        type="text"
        ref={enteredName}
        placeholder="type here"
        className="bg-transparent hover:bg-gray-800 focus:outline-none focus:bg-slate-700 p-2 border-b-2 "
      />
      {error.includes("name") && <Error>Enter Valid Name</Error>}
      {error.includes("options") && (
        <Error>Please select at least one option</Error>
      )}
      <button
        className="w-fit py-2 px-4 bg-slate-600 hover:bg-slate-500 mt-5"
        type="submit"
      >
        Submit Vote
      </button>
    </form>
  );
};

export default VoteForm;
