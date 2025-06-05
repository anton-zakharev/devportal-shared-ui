import {mergeAttributes} from "@tiptap/core"
import {Bold} from "@tiptap/extension-bold"
import styles from "../styles/Bold.css"

export let BoldMark = Bold.extend({
  renderHTML({HTMLAttributes}) {
    return [
      "strong",
      mergeAttributes({class: styles.bold}, this.options.HTMLAttributes, HTMLAttributes),
      0
    ]
  },
})
