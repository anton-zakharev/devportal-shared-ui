import {type PropsWithChildren} from "react"
import {Gallery as VKUIGallery} from "@vkontakte/vkui"
import styles from "../styles/Gallery.css"

let TSFixMe: any = VKUIGallery

export function Gallery({children}: PropsWithChildren) {
  return <TSFixMe className={styles.gallery} bullets="dark" showArrows looped>
    {children}
  </TSFixMe>
}
