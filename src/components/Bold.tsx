import {type PropsWithChildren} from "react"
import styles from "../styles/Bold.css"

export function Bold({children}: PropsWithChildren) {
  return <strong className={styles.bold}>{children}</strong>
}
