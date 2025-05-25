import {type PropsWithChildren} from "react"
import styles from "./Paragraph.css"

export function Paragraph({children}: PropsWithChildren) {
  return <p className={styles.paragraph}>{children}</p>
}
