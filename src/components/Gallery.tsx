import {type PropsWithChildren} from "react"
import {type GalleryProps, Gallery as VKUIGallery} from "@vkontakte/vkui"
import styles from "../styles/Gallery.css"

let TSFixMe: any = VKUIGallery

export function Gallery({children, ...rest}: PropsWithChildren<GalleryProps>) {
  return <TSFixMe className={styles.gallery} bullets="dark" showArrows looped {...rest}>
    {children}
  </TSFixMe>
}
