import React from "react";

export default function Loader() {
  return (
    <div className="d-flex vw-100 vh-100 justify-content-center align-items-center">
      <div className=" spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
