import React, { useRef, useState } from "react";
import Error from "../UI/Error";

const AddOption = (props) => {
  const [error, setError] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const optionInp = useRef();

  const addOptionHandler = () => {
    if (optionInp.current.value.trim() == "") {
      setError(true);
      optionInp.current.value = "";
      return;
    }

    setError(false);
    props.onAddOption(optionInp.current.value);
    optionInp.current.value = "";
  };

  const optionButton = (
    <button
      type="button"
      className="ring-2 py-2 px-4 w-fit self-end ring-gray-300 hover:bg-gray-700"
      onClick={() => {
        setOptionOpen(true);
      }}
    >
      Add Option
    </button>
  );

  return (
    <>
      <div className="flex gap-2 items-center justify-center">
        {!optionOpen && optionButton}
        {optionOpen && (
          <>
            <input
              type="text"
              className="bg-transparent border-b-2 py-2 px-2 placeholder:italic"
              placeholder="type here"
              ref={optionInp}
            />
            <button
              type="button"
              onClick={addOptionHandler}
              className="ring-2 py-2 px-4 w-fit self-end ring-gray-300 hover:bg-gray-700"
            >
              Add Option
            </button>
          </>
        )}
      </div>
      {error && <Error>Please enter valid option</Error>}
    </>
  );
};

export default AddOption;
