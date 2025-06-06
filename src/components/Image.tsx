import {type HTMLAttributes} from "react"
import styles from "../styles/Image.css"

type Props = HTMLAttributes<HTMLImageElement> & {
  src: string
  caption?: string
}

export function Image({src, caption, ...rest}: Props) {
  return <figure className={styles.figure} {...rest}>
    <img className={styles.image} src={src} alt="." />
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
}
