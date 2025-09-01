import styles from "../styles/UserPicture.css"

type Props = {
  src: string
}

export function UserPicture({src}: Props) {
  return <img className={styles.image} width={36} height={36} src={src} alt="." />
}
