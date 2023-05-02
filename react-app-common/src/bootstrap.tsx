import { useEffect, useState } from 'react';
import { navigateToUrl } from 'single-spa';
import styles from './bootstrap.module.css';

export const Root = (): JSX.Element => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const eventDetail = [
      'my-custom-event',
      (event: { /**
                 *
                 */
      detail: { /**
                 *
                 */
      message: string } }) => {
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
    <div className={styles.root}>
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
};

// @todo 別のファイルへ切り出す
declare global {
  interface WindowEventMap {
    'my-custom-event': CustomEvent<{ message: string }>;
  }
}
