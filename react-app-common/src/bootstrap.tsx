import { useCallback, useEffect, useState } from 'react';
import { navigateToUrl } from 'single-spa';
import { createPromiseClient } from '@bufbuild/connect';
import { createConnectTransport } from '@bufbuild/connect-web';
import { HelloWorldService } from '../gen/schemas/v1/example_connect';
import { HelloType } from '../gen/schemas/v1/example_pb';
import styles from './bootstrap.module.css';

const transport = createConnectTransport({ baseUrl: 'http://localhost:3000' });
const client = createPromiseClient(HelloWorldService, transport);

/** Root Component。よく `App` って名前になるやつ。 */
export const Root = (): JSX.Element => {
  const [message, setMessage] = useState('');

  const sendMessageHandler = useCallback(async () => {
    await client.sendMessage({
      sentence: 'Hello',
      email: 'mail@add.ress',
      type: HelloType.BAR,
    });
  }, []);

  const getMessageHandler = useCallback(async () => {
    const message = await client.getMessage({});
    console.log(message);
  }, []);

  useEffect(() => {
    const eventDetail = [
      'my-custom-event',
      (event: {
        detail: {
          message: string;
        };
      }) => {
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
      <button type="button" onClick={sendMessageHandler}>
        Send
      </button>
      <button type="button" onClick={getMessageHandler}>
        Get
      </button>
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
