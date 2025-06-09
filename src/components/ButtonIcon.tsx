import {ImageBase} from "@vkontakte/vkui"
import styles from "../styles/ButtonIcon.css"

export type Props = {
  id?: string
  src: string
}

export function ButtonIcon({id: _, src}: Props) {
  return <ImageBase className={styles.buttonIcon} src={src} noBorder />
}
