import {type HTMLAttributes, type ElementType} from "react"
import {classNames as cn} from "@vkontakte/vkui"
import {Heading} from "./Heading"
import {Text} from "./Text"
import {Tag} from "./Tag"
import styles from "../styles/ArticleCard.css"

let dateFormatter = new Intl.DateTimeFormat("ru", {
  day: "2-digit",
  month: "long",
  year: "numeric",
})

type Props = HTMLAttributes<HTMLElement> & {
  LinkComponent: ElementType
  link: string
  getTagLink: (slug: string) => string
  image: string
  tags: Array<{slug: string, label: string}>
  onClickAtTag?: ()=> void
  date: Date
  heading: string
  description?: string
  lazy?: boolean
}

export function ArticleCard({
  LinkComponent,
  link,
  getTagLink,
  image,
  date,
  tags,
  onClickAtTag,
  heading,
  description,
  lazy,
  className,
  ...rest
}: Props) {
  let imgLazyProps = lazy
    ? {loading: "lazy" as const, fetchPriority: "low" as const, decoding: "async" as const}
    : {}

  return <LinkComponent to={link} tabIndex={-1} className={cn(styles.articleCard, className)} {...rest}>
    <header className={styles.header}>
      <img {...imgLazyProps} src={image} className={styles.image} alt="." />
      <Tag hasHover={false} LinkComponent={LinkComponent} mode="secondary">{dateFormatter.format(date)}</Tag>
    </header>
    {tags.length > 0 && (
      <section aria-label="Tags">
        <ul className={styles.tags}>
          {tags.map(({slug, label}) =>
            <li key={slug} onClick={onClickAtTag}>
              <Tag LinkComponent={LinkComponent} mode="secondary" href={getTagLink(slug)}>{label}</Tag>
            </li>
          )}
        </ul>
      </section>
    )}
    <Heading level="h3" className={styles.heading} title={heading}>{heading}</Heading>
    {description && <Text className={styles.description} title={description}>{description}</Text>}
  </LinkComponent>
}
