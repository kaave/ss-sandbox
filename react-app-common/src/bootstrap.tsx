import { useEffect, useState } from "react";
import { navigateToUrl } from "single-spa";

export default function Root() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const eventDetail = [
      "my-custom-event",
      (event: { detail: { message: string } }) => {
        const data = event.detail;
        console.log(data.message);
        setMessage(data.message);
      },
    ] as const;

    window.addEventListener(...eventDetail);

    return () => {
      window.removeEventListener(...eventDetail);
    };
  }, [setMessage]);

  return (
    <div
      style={{
        top: 0,
        left: 0,
        width: "100vw",
        height: "30vh",
        background: "#eeffcc",
        zIndex: 0,
      }}
    >
      Root. {message ? <span>Got message: {message}</span> : null}
      <ul>
        <li>
          <a href="/react-1" onClick={navigateToUrl}>
            move to 1
          </a>
        </li>
        <li>
          <a href="/react-2" onClick={navigateToUrl}>
            move to 2
          </a>
        </li>
      </ul>
    </div>
  );
}

// @todo 別のファイルへ切り出す
declare global {
  interface WindowEventMap {
    "my-custom-event": CustomEvent<{ message: string }>;
  }
}
