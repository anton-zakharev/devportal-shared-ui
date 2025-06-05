import {Paragraph} from "@tiptap/extension-paragraph"
import {mergeAttributes} from "@tiptap/core"
import styles from "../styles/Paragraph.css"

export let ParagraphNode = Paragraph.extend({
  renderHTML({HTMLAttributes}) {
    return [
      "p",
      mergeAttributes({class: styles.paragraph}, this.options.HTMLAttributes, HTMLAttributes),
      0
    ]
  },
})
