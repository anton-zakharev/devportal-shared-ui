import {type PropsWithChildren, type MouseEvent, useMemo, useState} from "react"
import {classNames as cn, Link, IconButton} from "@vkontakte/vkui"
import {Icon16Like, Icon16LikeOutline, Icon20TrashSimpleOutline, Icon16Block} from "@vkontakte/icons"
import RelativeTime from "@yaireo/relative-time"
import {useMatchMedia} from "../lib/useMatchMedia"
import {UserPicture} from "./UserPicture"
import styles from "../styles/CommentBox.css"

let TSFixMeLink = Link as any
let TSFixMeIconButton = IconButton as any

type Language = "ru" | "en"
type Props = {
  authorId: number
  authorName: string
  authorPicture: string
  date: Date
  repliedTo?: {
    userId: number
    userName: string
  }
  likes: number
  liked: boolean
  language: Language
  replyLabel: string
  onReply(): void
  onLike(): void
  onUnlike(): void
  onAdminRemove?(): void
  onAdminRestore?(): void
  onAdminBlockUser?(): void
}

export function CommentBox({
  authorId,
  authorPicture,
  authorName,
  date,
  repliedTo,
  likes,
  liked,
  children,
  language,
  replyLabel,
  onReply,
  onLike,
  onUnlike,
  onAdminRemove,
  onAdminRestore,
  onAdminBlockUser,
}: PropsWithChildren<Props>) {
  let relativeTime = typeof Intl.RelativeTimeFormat == "function"
     ? new RelativeTime({locale: language})
     : null

  let isMd = useMatchMedia("(max-width: 768px)")

  let [hover, setHover] = useState(false)

  let createdTime = useMemo(
    () => relativeTime ? relativeTime.from(date) : date.toLocaleString(language),
    [date]
  )

  function handleHover() {
    setHover(true)
  }

  function handleBlur() {
    setHover(false)
  }

  function handleLinkClick(e: MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation()
  }

  function handleToggleLike(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()

    if (liked) {
      onUnlike()
    } else {
      onLike()
    }
  }

  function handleReply(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    onReply()
  }

  function handleAdminRemove(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    onAdminRemove?.()
  }

  function handleAdminBlockUser(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    onAdminBlockUser?.()
  }

  return <>
    <article
      className={styles.commentBox}
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
      onClick={handleReply}
    >
      <a
         href={`https://vk.com/id${authorId}`} target="_blank" rel="noopener noreferrer"
         onClickCapture={handleLinkClick}
         className={styles.userPicture}
      >
        <UserPicture src={authorPicture} />
      </a>
      <div className={styles.content}>
        <header className={styles.header}>
          <h4>
            <TSFixMeLink
               href={`https://vk.com/id${authorId}`} target="_blank" rel="noopener noreferrer"
               onClickCapture={handleLinkClick}
               className={styles.name}
            >
              {authorName}
            </TSFixMeLink>
          </h4>
          <time dateTime={date.toISOString()} className={styles.time} title={date.toLocaleString(language)}>
            {createdTime}
          </time>
          {hover && (onAdminRemove || onAdminBlockUser) &&
            <div className={styles.adminActions}>
              {onAdminRemove &&
                <TSFixMeIconButton onClickCapture={handleAdminRemove}>
                  <Icon20TrashSimpleOutline width={16} height={16} />
                </TSFixMeIconButton>
              }
              {onAdminBlockUser &&
                <TSFixMeIconButton onClickCapture={handleAdminBlockUser}>
                  <Icon16Block />
                </TSFixMeIconButton>
              }
            </div>
          }
        </header>
        <p className={styles.text}>
          {repliedTo && <>
            <TSFixMeLink
               href={`https://vk.com/id${repliedTo.userId}`} target="_blank" rel="noopener noreferrer"
               onClick={handleLinkClick}
            >
              {repliedTo.userName}
            </TSFixMeLink>
            ,{' '}
          </>}
          {children}
        </p>
        <footer className={styles.footer}>
          <TSFixMeLink href="#" className={styles.replyButton} onClick={handleReply} title={replyLabel}>
            {replyLabel}
          </TSFixMeLink>
          <button
            type="button"
            className={cn(
              styles.likeButton,
              liked && styles.active,
              (likes > 0 || hover || isMd) && styles.visible,
            )}
            onClickCapture={handleToggleLike}
          >
            {liked ? <Icon16Like /> : <Icon16LikeOutline />}
            {likes > 0 && likes}
          </button>
        </footer>
      </div>
    </article>
  </>
}
