import {type HTMLAttributes} from "react"
import {classNames as cn} from "@vkontakte/vkui"
import styles from "../styles/Text.css"

type Props = HTMLAttributes<HTMLParagraphElement>

export function Text({className, ...rest}: Props) {
  return <p className={cn(styles.text, className)} {...rest} />
}
