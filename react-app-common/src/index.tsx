import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import { Root as rootComponent } from './bootstrap';
// import type { LifeCycleFn } from "single-spa";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent,
  errorBoundary: (_err, _info, _props) => <div>Error</div>,
});

export const { bootstrap, mount, unmount } = lifecycles;

// const bootstrap: Record<'bootstrap' | 'mount' | 'unmount', LifeCycleFn<{}>> = {
//   bootstrap: (props) => {
//     return lifecycles.bootstrap(props);
//   },
//   mount: (props) => {
//     return lifecycles.mount(props);
//   },
//   unmount: (props) => {
//     return lifecycles.unmount(props);
//   },
// };

// export default bootstrap;
