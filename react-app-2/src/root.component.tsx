import { navigateToUrl } from 'single-spa';

export default function Root(props) {
  return <section>{props.name} is mounted! this app use react@18. <a href="/react-1" onClick={navigateToUrl}>move to 1</a></section>;
}
