import React from "react";

const Checkout = (props) => {
  const PORT = "https://theruknology.github.io/VoteBook/";
  const votelink = PORT + "?votelinkid=" + props.link;
  const reslink = PORT + "?resultlinkid=" + props.link;

  const copyVHandler = () => {
    navigator.clipboard.writeText(votelink);
    alert("link copied to clipboard");
  };
  const copyRHandler = () => {
    navigator.clipboard.writeText(reslink);
    alert("link copied to clipboard");
  };
  return (
    <div className="w-full bg-transparent ring-2 ring-slate-300 p-4">
      <h2>Checkout</h2>
      <p className="text-green-500">
        Your poll was created, here is the link to it:
      </p>
      <div className="flex flex-col gap-2 pt-5">
        <a href={votelink} className="underline text-blue-500">
          Voting Link
        </a>
        <button
          onClick={copyVHandler}
          className="py-2 px-4 bg-slate-300 hover:bg-slate-400 mt-5 text-slate-900 w-fit pb-3"
        >
          Copy Voting Link
        </button>
        <a href={reslink} className="underline text-blue-500 w-fit">
          Results Link
        </a>
        <button
          onClick={copyRHandler}
          className="py-2 px-4 bg-slate-300 hover:bg-slate-400 mt-5 w-fit text-slate-900 pb-3"
        >
          Copy Results Link
        </button>
      </div>
    </div>
  );
};

export default Checkout;
