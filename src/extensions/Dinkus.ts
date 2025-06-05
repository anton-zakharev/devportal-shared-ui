import {mergeAttributes} from "@tiptap/core"
import {HorizontalRule} from "@tiptap/extension-horizontal-rule"
import styles from "../styles/Dinkus.css"

export let DinkusNode = HorizontalRule.extend({
  renderHTML({HTMLAttributes}) {
    return [
      "hr",
      mergeAttributes({class: styles.dinkus}, this.options.HTMLAttributes, HTMLAttributes)
    ]
  },
})
