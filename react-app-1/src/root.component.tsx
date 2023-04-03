import { navigateToUrl } from "single-spa";
import { useCounterCommands, useCounterState } from "./counter";

export default function Root(props) {
  const count = useCounterState();
  const { increment, decrement } = useCounterCommands();

  return (
    <section style={{ zIndex: 1 }}>
      {props.name} is mounted! this app use react@17. <a href="/react-2" onClick={navigateToUrl}>move to 2</a>
      <br />
      Count: {count}, <button onClick={increment}>Increment</button>, <button onClick={decrement}>Decrement</button>
    </section>
  );
}
