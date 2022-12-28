import React, { useState } from "react";
import OptionItem from "./OptionItem";
import Form from "./Form";
import Checkout from "./Checkout";
import Error from "../UI/Error";

const NewPoll = () => {
  const [checkout, setCheckout] = useState(false);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");

  const addOption = (option) => {
    const givenOption = { id: crypto.randomUUID().toString(), title: option };
    // setOptions((prev) => prev.push(givenOption));
    setOptions((prev) => {
      const updated = [...prev, givenOption];
      return updated;
    });
  };

  const deleteOption = (id) => {
    setOptions((prev) => {
      const result = prev.filter((itm) => itm.id !== id);
      return result;
    });
  };

  const formSubmitHandler = (question) => {
    if (options.length < 2 || question.length < 2) {
      setError("You need more than 1 option, and a VALID question");
      return;
    }
    setError(false);
    const givenData = {
      id: crypto.randomUUID(),
      question: question,
      options: options,
    };

    submitFetchHandler(givenData).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  };

  const submitFetchHandler = async (data) => {
    const response = await fetch(
      "https://votebook-541b2-default-rtdb.firebaseio.com/polls.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  };

  return (
    <>
      <p className="italic text-gray-500">
        Please don't refresh or go back before completion
      </p>
      <Form onSubmit={formSubmitHandler} onAddOption={addOption} />

      {options.length > 0 && (
        <div className="flex flex-col gap-3 bg-gray-300 p-4 text-gray-700">
          <h2>Given Options: {options.length}</h2>
          {options.map((itm) => (
            <OptionItem
              key={itm.id}
              onDelete={() => {
                deleteOption(itm.id);
              }}
              name={itm.title}
            />
          ))}
        </div>
      )}
      {error.length > 0 && <Error>{error}</Error>}
      {checkout && <Checkout />}
    </>
  );
};

export default NewPoll;
