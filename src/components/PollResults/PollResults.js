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
      console.log("issue");
      return data;
    }

    console.log({ data });
    for (const key in data) {
      if (data[key].id == id) {
        console.log("found one");
        setVoteData((prev) => {
          const newArr = [...prev];
          newArr.push(data[key]);
          console.log({ newArr });
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
    console.log(data);

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

    console.log(question);
    console.log(options);
    setLoading(false);
    return data;
  };

  const voteCounter = () => {
    voteData.map((itm) => {
      itm.options.map((item) => {
        console.log({ item });
        addVoteToOption(item);
      });
    });
  };

  const addVoteToOption = (id) => {
    setOptions((prev) => {
      const newOpts = [...prev];
      const opt = newOpts.find((itm) => itm.id === id);
      console.log(opt);
      opt.votes += 1;

      return newOpts;
    });
  };

  useEffect(() => {
    if (props.resultLink !== null) {
      const dataQ = getQFetchHandler(props.resultLink).then((value) => {
        console.log("loading Results");
        const dataR = getResFetchHandler(props.resultLink).then((value) => {});
        console.log("counting");
      });
    }
  }, []);

  useEffect(() => {
    console.log({ options });
    console.log({ voteData });
    voteCounter();
  }, [voteData]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {props.resultLink == null && (
        <p>
          Please request a link for the poll after creation, as a new randomized
          link is provided after every poll initiation.
        </p>
      )}
      {error !== "" && !loading && <Error>{error}</Error>}
      <h1>{question}</h1>
      {voteData !== null && <PollOverview options={options} />}
    </div>
  );
};

export default PollResults;
