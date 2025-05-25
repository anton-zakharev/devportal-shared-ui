import {type PropsWithChildren} from "react"
import styles from "./Bold.css"

export function Bold({children}: PropsWithChildren) {
  return <b className={styles.bold}>{children}</b>
}
