import styles from "../styles/Image.css"

type Props = {
  src: string
  caption?: string
}

export function Image({src, caption}: Props) {
  return <figure className={styles.figure}>
    <img className={styles.image} src={src} alt="." />
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
}
