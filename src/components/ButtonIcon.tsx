import {ImageBase} from "@vkontakte/vkui"
import styles from "../styles/ButtonIcon.css"

export type Props = {
  src: string
}

export function ButtonIcon({src}: Props) {
  return <ImageBase className={styles.buttonIcon} src={src} noBorder />
}
