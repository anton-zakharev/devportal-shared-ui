import {mergeAttributes} from "@tiptap/core"
import {Image} from "@tiptap/extension-image"
import styles from "../styles/Image.css"

export let ImageNode = Image.extend({
  draggable: true,
  renderHTML({HTMLAttributes}) {
    return [
      "img",
      mergeAttributes({class: styles.image}, this.options.HTMLAttributes, HTMLAttributes)
    ]
  },
})
