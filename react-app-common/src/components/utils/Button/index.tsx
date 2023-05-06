import styles from './index.module.css';

type Props = {
  children: string;
  onClick: () => void;
} & JSX.IntrinsicElements['button'];

export const Button = ({ children: text, ...rest }: Props) => <button type="button" className={styles.root} {...rest}>{text}</button>
