import React, { useState, useRef } from "react";
import AddOption from "./AddOption";

const Form = (props) => {
  const questionInput = useRef();
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const question = questionInput.current.value;

    props.onSubmit(question);
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex flex-col gap-4 font-normal"
    >
      {/* Question Here */}
      <div className="flex flex-col gap-2 ring-2 ring-gray-300 px-4 py-2">
        <label>Type your QUESTION / TITLE of poll</label>
        <input
          ref={questionInput}
          type="text"
          maxLength="20"
          placeholder="here"
          className="bg-transparent placeholder:italic p-2 focus:outline-none focus:border-b-2 "
        />
      </div>

      <AddOption onAddOption={(opt)=>{props.onAddOption(opt)}}/>
      <button type="submit" className="px-4 py-2 bg-slate-300 text-gray-800">Create Poll</button>
    </form>
  );
};

export default Form;
