import {type PropsWithChildren} from "react"
import styles from "./UnorderedList.css"

export function UnorderedList({children}: PropsWithChildren) {
  return <ul className={styles.list}>
    {children}
  </ul>
}
