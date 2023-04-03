import { useEffect, useState } from "react";

export default function Root() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const eventDetail = [
      "my-custom-event",
      (event) => {
        const data = event.detail;
        console.log(data.message)
        setMessage(data.message);
      },
    ] as const;

    window.addEventListener(...eventDetail);

    return () => {
      window.removeEventListener(...eventDetail)
    }
  }, [setMessage]);

  return (
    <div style={{ top: 0, left: 0, width: '100vw', height: '30vh', background: '#eeffcc', zIndex: 0 }}>
      Root. {message ? <span>Got message: {message}</span> : null}
    </div>
  );
}
