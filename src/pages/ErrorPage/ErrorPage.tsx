import React from "react";
import { useRouteError } from "react-router-dom";
import "./ErrorPage.scss";

export const ErrorPage: React.FC = () => {


  return (
    <div className="ErrorPage">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};
