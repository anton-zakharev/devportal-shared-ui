import {type HTMLAttributes} from "react"
import cn from "classnames"
import styles from "./Text.css"

type Props = HTMLAttributes<HTMLParagraphElement>

export function Text({className, ...rest}: Props) {
  return <p className={cn(styles.text, className)} {...rest} />
}
