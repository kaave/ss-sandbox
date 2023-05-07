import 'systemjs-webpack-interop/auto-public-path';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import { Root as rootComponent } from './bootstrap';
// import type { LifeCycleFn } from "single-spa";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const developmentMode = process.env['NODE_ENV'] === 'development';

if (developmentMode) {
  // @todo Dynamic import を行うと URL が不正な値になるため、やむなく require を使用
  // import(/* webpackChunkName: "msw-browser" */ './mocks/browser').then(({ worker }) => worker.start());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires, unicorn/prefer-module
  const { worker } = require(/* webpackChunkName: "msw-browser" */ './mocks/browser');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  worker.start();
}

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
