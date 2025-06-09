import {type HTMLAttributes, type ReactNode, type Ref} from "react"
import {classNames as cn} from "@vkontakte/vkui"
import {Heading} from "./Heading"
import {Text} from "./Text"
import styles from "../styles/InfoCard.css"

type Props =
  & HTMLAttributes<HTMLDivElement>
  & {
      ref?: Ref<HTMLDivElement | null>
      name: string
      description: string
      button: ReactNode
    }

export function InfoCard({ref, name, description, button, className, ...rest}: Props) {
  return <div ref={ref} className={cn(styles.infoCard, className)} {...rest}>
    <header className={styles.header}>
      <Heading level="h3">{name}</Heading>
      <Text className={styles.description}>{description}</Text>
    </header>
    <footer className={styles.footer}>
      {button}
    </footer>
  </div>
}
