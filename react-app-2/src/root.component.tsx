import { navigateToUrl } from "single-spa";
import { useCounterCommands, useCounterState } from "./counter";

export default function Root(props) {
  const count = useCounterState();
  const { increment, decrement } = useCounterCommands();

  return (
    <section>
      {props.name} is mounted! this app use react@18.{" "}
      <a href="/react-1" onClick={navigateToUrl}>
        move to 1
      </a>
      <br />
      Count: {count}, <button onClick={increment}>Increment</button>, <button onClick={decrement}>Decrement</button>
    </section>
  );
}
