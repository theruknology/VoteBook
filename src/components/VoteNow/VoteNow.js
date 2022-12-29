import React, { useEffect, useState } from "react";
import Error from "../UI/Error";
import VoteForm from "./VoteForm";

const VoteNow = (props) => {
  const [givenOptions, setGivenOptions] = useState([]);
  const [givenQuestion, setGivenQuestion] = useState(null);
  const [session, setSession] = useState(false);
  const [error, setError] = useState("Could not find the poll");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getFetchHandler = async (linkId) => {
    setLoading(true);
    const response = await fetch(
      "https://votebook-541b2-default-rtdb.firebaseio.com/polls.json",
      {
        method: "GET",
      }
    );
    const data = await response.json();

    for (const key in data) {
      if (data[key].id == linkId) {
        setGivenQuestion(data[key].question);

        const opts = [];
        data[key].options.map((itm) => {
          opts.push({ id: itm.id, title: itm.title, checked: false });
        });

        setGivenOptions(opts);
        setError("");
        setSession(true);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (props.voteLink !== null) {
      getFetchHandler(props.voteLink);
    }
  }, []);

  const optionCheckHandler = (id) => {
    setGivenOptions((prev) => {
      const newArr = [...prev];
      const toCheck = newArr.find((itm) => itm.id === id);
      toCheck.checked = !toCheck.checked;

      return newArr;
    });
  };

  const submitVoteHandler = (name) => {
    const votedOptions = givenOptions
      .filter((itm) => itm.checked)
      .map((itm) => itm.id);
    const votedData = { id: props.voteLink, name: name, options: votedOptions };
    sendVoteFetch(votedData);
  };

  const sendVoteFetch = async (data) => {
    setLoading(true);
    const response = await fetch(
      "https://votebook-541b2-default-rtdb.firebaseio.com/votes.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      setError("Something went wrong, please try again later!");
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {props.voteLink === null && (
        <p>
          Please request a link for the poll after creation, as a new randomized
          link is provided after every poll initiation.
        </p>
      )}
      {session && (
        <>
          <VoteForm
            question={givenQuestion}
            options={givenOptions}
            onChange={optionCheckHandler}
            onSubmit={submitVoteHandler}
          />
        </>
      )}
      {error !== "" && !loading && props.voteLink !== null && (
        <Error>{error}</Error>
      )}
      {loading && <p>Loading...</p>}
      {submitted && (
        <>
          <p className="text-green-400">Vote has been submitted!</p>
          <a
            className="underline text-blue-500"
            href={
              "https://theruknology.github.io/VoteBook/?resultlinkid=" +
              props.voteLink
            }
          >
            See Results Here
          </a>
        </>
      )}
    </>
  );
};

export default VoteNow;
