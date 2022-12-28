import React, { useEffect, useState } from "react";

const VoteNow = () => {
  const [givenOptions, setGivenOptions] = useState([]);
  const [givenQuestion, setGivenQuestion] = useState();
  const [session, setSession] = useState(false);

  const getFetchHandler = async (linkId) => {
    const response = await fetch(
      "https://votebook-541b2-default-rtdb.firebaseio.com/polls.json",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);

    for (const key in data) {
      if (data[key].id == linkId) {
        setGivenQuestion(data[key].question);
        setGivenOptions(data[key].options);
        console.log("setem up");
        console.log(key);

        setSession(true);
      }
    }
  };

  useEffect(() => {
    getFetchHandler("0fb212d0-3c6e-4e60-9c56-9c58448bf27d");
  }, []);

  return (
    <>
      {session && (
        <>
          <p>Question: {givenQuestion}</p>
          <p>Options: </p>
          {givenOptions.map((itm) => {
            return <p key={itm.id}>{itm.title}</p>;
          })}
        </>
      )}
    </>
  );
};

export default VoteNow;