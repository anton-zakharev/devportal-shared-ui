import {type PropsWithChildren} from "react"
import styles from "../styles/ClosingNote.css"

export function ClosingNote({children}: PropsWithChildren) {
  return <p className={styles.closingNote}><i>{children}</i></p>
}
