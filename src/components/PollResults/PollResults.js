import React, { useEffect, useState } from "react";
import Error from "../UI/Error";
import PollOverview from "./PollOverview";

const PollResults = (props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [voteData, setVoteData] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);

  const getResFetchHandler = async (id) => {
    setLoading(true);
    const response = await fetch(
      "https://votebook-541b2-default-rtdb.firebaseio.com/votes.json"
    );

    const data = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError("Found no poll");
      return data;
    }

    for (const key in data) {
      if (data[key].id == id) {
        setVoteData((prev) => {
          const newArr = [...prev];
          newArr.push(data[key]);
          return newArr;
        });
      }
    }
    setLoading(false);
    return data;
  };

  const getQFetchHandler = async (linkId) => {
    setLoading(true);
    const response = await fetch(
      "https://votebook-541b2-default-rtdb.firebaseio.com/polls.json",
      {
        method: "GET",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      setError("Found no polls");
      return;
    }

    for (const key in data) {
      if (data[key].id == linkId) {
        setQuestion(data[key].question);

        const opts = [];
        data[key].options.map((itm) => {
          opts.push({ id: itm.id, title: itm.title, votes: 0 });
        });

        setOptions(opts);
      }
    }

    setLoading(false);
    return data;
  };

  const voteCounter = () => {
    voteData.map((itm) => {
      itm.options.map((item) => {
        addVoteToOption(item);
      });
    });
  };

  const addVoteToOption = (id) => {
    setOptions((prev) => {
      const newOpts = [...prev];
      const opt = newOpts.find((itm) => itm.id === id);
      opt.votes += 1;

      return newOpts;
    });
  };

  useEffect(() => {
    if (props.resultLink !== null) {
      const dataQ = getQFetchHandler(props.resultLink).then((value) => {
        const dataR = getResFetchHandler(props.resultLink).then((value) => {});
      });
    }
  }, []);

  useEffect(() => {
    voteCounter();
  }, [voteData]);

  return (
    <div className="w-full p-4">
      {loading && <p>Loading...</p>}
      {props.resultLink == null && (
        <p>
          Please request a link for the poll after creation, as a new randomized
          link is provided after every poll initiation.
        </p>
      )}
      {options.length == 0 && !loading && (
        <Error>Something went wrong, please try again later!</Error>
      )}
      {voteData.length == 0 && options.length !== 0 && !loading && (
        <Error>No votes yet!</Error>
      )}
      {voteData.length !== 0 && !loading && (
        <>
          <h1 className="font-bold text-gray-400">QUESTION:</h1>
          <h2 className="pb-5">{question}</h2>
          <PollOverview options={options} />
        </>
      )}
    </div>
  );
};

export default PollResults;
