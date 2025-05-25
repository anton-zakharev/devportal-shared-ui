import {type HTMLAttributes} from "react"
import cn from "classnames"
import styles from "./Heading.module.css"

type Props =
  & HTMLAttributes<HTMLHeadingElement>
  & {
      level: "h1" | "h2" | "h3" | "h4"
      as?: "h1" | "h2" | "h3" | "h4"
    }

export function Heading({level, as = level, className, ...rest}: Props) {
  let Tag = as
  return <Tag className={cn(styles[level], className)} {...rest} />
}
