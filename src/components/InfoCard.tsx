import {type HTMLAttributes, type ReactNode} from "react"
import cn from "classnames"
import {Heading} from "./Heading"
import {Text} from "./Text"
import styles from "./InfoCard.module.css"

type Props =
  & HTMLAttributes<HTMLDivElement>
  & {
      name: string
      description: string
      button: ReactNode
    }

export function InfoCard({name, description, button, className, ...rest}: Props) {
  return <div className={cn(styles.infoCard, className)} {...rest}>
    <header className={styles.header}>
      <Heading level="h3">{name}</Heading>
      <Text className={styles.description}>{description}</Text>
    </header>
    <footer className={styles.footer}>
      {button}
    </footer>
  </div>
}
