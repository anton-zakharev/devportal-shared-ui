import {type ElementType} from "react"
import {type TappableProps, classNames as cn, Tappable} from "@vkontakte/vkui"
import styles from "../styles/Tag.css"

type Props =
  & TappableProps
  & {
      LinkComponent: ElementType
      children: string
      mode: "primary" | "secondary"
    }

export function Tag({LinkComponent, mode, children, href, ...rest}: Props) {
  let noop = () => {}
  let tag = (
    // @ts-ignore
    <Tappable
      Component="span"
      className={cn(styles.tag, styles[mode])}
      hasActive={false} focusVisibleMode="outside"
      title={children}
      {...rest}
      {...(href ? {onClick: noop} : {})}
    >
      {children}
    </Tappable>
  )

  if (href) {
    return <LinkComponent to={href} className={styles.link}>{tag}</LinkComponent>
  } else {
    return tag
  }
}
