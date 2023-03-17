import { navigateToUrl } from 'single-spa';

export default function Root(props) {
  return <section>{props.name} is mounted! this app use react@17. <a href="/react-2" onClick={navigateToUrl}>move to 2</a></section>;
}
