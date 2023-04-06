import { registerApplication, start, LifeCycles } from "single-spa";

registerApplication({
  name: "@kaave/react-app-common",
  app: () =>
    System.import<LifeCycles>(
      "http://localhost:7500/kaave-react-app-common.js"
    ),
  activeWhen: ["/"],
});

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
