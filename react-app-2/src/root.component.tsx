import { navigateToUrl } from "single-spa";
import { useCounterCommands, useCounterState } from "./counter";
import { useEffect } from "react";

export default function Root(props) {
  const count = useCounterState();
  const { increment, decrement } = useCounterCommands();

  useEffect(() => {
    const data = { message: `set count ${count} on react-2` };
    const event = new CustomEvent("my-custom-event", { detail: data });
    window.dispatchEvent(event);
  }, [count]);

  return (
    <section style={{ zIndex: 1 }}>
      {props.name} is mounted! this app use react@18.{" "}
      <a href="/react-1" onClick={navigateToUrl}>
        move to 1
      </a>
      <br />
      Count: {count}, <button onClick={increment}>Increment</button>, <button onClick={decrement}>Decrement</button>
    </section>
  );
}
