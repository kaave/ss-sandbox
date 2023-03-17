import { registerApplication, start, LifeCycles } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import<LifeCycles>(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "@kaave/react-app-1",
  app: () =>
    System.import<LifeCycles>(
      "http://localhost:8500/kaave-react-app-1.js"
    ),
  activeWhen: ["/react-1"],
});

registerApplication({
  name: "@kaave/react-app-2",
  app: () =>
    System.import<LifeCycles>(
      "http://localhost:8501/kaave-react-app-2.js"
    ),
  activeWhen: ["/react-2"],
});

start({
  urlRerouteOnly: true,
});
