import {type ReactNode, type CSSProperties, type HTMLAttributes, useRef} from "react"
import {Icon24ChevronCompactRight} from "@vkontakte/icons"
import cn from "classnames"
import {useMatchMedia} from "../lib/use-match-media"
import {useResizeObserver} from "../lib/use-resize-observer"
import {Heading} from "./Heading"
import {Text} from "./Text"
import styles from "./Card.module.css"

type Props =
  & HTMLAttributes<HTMLDivElement>
  & {
      title: string
      description?: string
      svg?: {
        originalWidth: number
        originalHeight: number
        pathData: string[]
      }
      colSpan?: {
        md: number /* <= 768px */
        xl: number /*  > 768px */
      }
      brandColor?: CSSProperties["backgroundColor"]
      buttons: ReactNode
      href?: string
    }

export function Card({
  title,
  description,
  svg,
  colSpan,
  brandColor,
  buttons,
  className,
  href,
  ...rest
}: Props) {
  let maskRef = useRef<HTMLCanvasElement>(null)
  let cardRef = useRef<HTMLDivElement>(null)

  let isMd = useMatchMedia("(max-width: 768px)")

  // Draw mask
  useResizeObserver(() => {
    if (!cardRef.current || !maskRef.current || !svg || !colSpan) return

    let {pathData, originalWidth, originalHeight} = svg

    let canvasWidth = cardRef.current.offsetWidth
    let canvasHeight = cardRef.current.offsetHeight

    let targetWidth = originalWidth
    let scale = 1
    let targetHeight = originalHeight

    if (isMd && colSpan.md <= 6) {
      targetWidth = canvasWidth - 40
      scale = targetWidth / originalWidth
      targetHeight = originalHeight * scale
    } else if (isMd && colSpan.md == 12) {
      targetHeight = originalHeight - 50
      scale = targetHeight / originalHeight
      targetWidth = originalWidth * scale
    }

    let offsetX = getOffsetX(canvasWidth, targetWidth, isMd, colSpan.md, colSpan.xl)
    let offsetY = getOffsetY(canvasHeight, targetHeight, isMd, colSpan.md)

    let canvas = maskRef.current
    let ctx = canvas.getContext("2d")!

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.translate(offsetX, offsetY)
    ctx.scale(scale, scale)

    ctx.globalCompositeOperation = "destination-out"
    pathData.forEach(d => ctx.fill(new Path2D(d)))
  }, cardRef, [isMd, svg])

  function handleClick() {
    if (href) window.open(href, "_blank")
  }

  let hasMask = Boolean(svg)
  let hasHref = typeof href == "string"
  return <div
    ref={cardRef}
    className={cn(
      styles.card,
      hasMask && styles.hasMask,
      hasHref && styles.hasHref,
      className,
    )}
    {...rest}
    onClick={handleClick}
  >
    {hasMask && <canvas ref={maskRef} aria-hidden="true" className={styles.mask} />}
    <div className={styles.content}>
      <header className={styles.header}>
        {brandColor && <span className={styles.brandColor} style={{"--brand-color": brandColor} as CSSProperties} />}
        <Heading level="h3" className={styles.heading}>
          {title}
        </Heading>
        {hasHref && <Icon24ChevronCompactRight width={16} style={{marginLeft: 4}} />}
      </header>
      {description && <Text className={styles.description}>{description}</Text>}
      <footer className={styles.footer}>
        {buttons}
      </footer>
    </div>
  </div>
}

// -- HELPERS
function getOffsetX(
  canvasWidth: number,
  targetWidth: number,
  isMd: boolean,
  colSpanMd: number,
  colSpanXl: number,
): number {
  if (isMd) {
    if (colSpanMd == 12) {
      let visibleWidth = 93
      return canvasWidth - visibleWidth
    } else {
      return (canvasWidth - targetWidth) / 2
    }
  } else {
    let visibleWidth = 0
    if (colSpanXl >= 5) {
      visibleWidth = 163
    } else if (colSpanXl == 4) {
      visibleWidth = 180
    } else if (colSpanXl <= 3) {
      visibleWidth = 100
    }
    return canvasWidth - visibleWidth
  }
}

function getOffsetY(
  canvasHeight: number,
  targetHeight: number,
  isMd: boolean,
  colSpanMd: number,
): number {
  if (isMd) {
    if (colSpanMd <= 6) {
      let visibleHeight = 78
      return canvasHeight - visibleHeight
    } else {
      return 23
    }
  } else {
    return (canvasHeight - targetHeight) / 2
  }
}
