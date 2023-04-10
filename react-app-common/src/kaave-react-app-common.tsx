import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import rootComponent from "./bootstrap";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent,
  errorBoundary: (_err, _info, _props) => <div>Error</div>,
});

export const { bootstrap, mount, unmount } = lifecycles;
