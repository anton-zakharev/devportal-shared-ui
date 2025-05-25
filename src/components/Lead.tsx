import {type PropsWithChildren} from "react"
import styles from "./Lead.css"

export function Lead({children}: PropsWithChildren) {
  return <p className={styles.lead}><i>{children}</i></p>
}
