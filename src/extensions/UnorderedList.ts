import {mergeAttributes} from "@tiptap/core"
import {BulletList} from "@tiptap/extension-bullet-list"
import styles from "../styles/UnorderedList.css"

export let UnorderedListNode = BulletList.extend({
  renderHTML({HTMLAttributes}) {
    return [
      "ul",
      mergeAttributes({class: styles.list}, this.options.HTMLAttributes, HTMLAttributes),
      0
    ]
  },
})
