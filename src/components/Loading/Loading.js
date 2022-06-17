import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function Loading() {
  let { isLoading } = useSelector((state) => state.LoadingReducer);
  return (
    <Fragment>
      {isLoading ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-70 z-10 flex justify-center items-center">
          <div className="text-white text-7xl">Loading...</div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
