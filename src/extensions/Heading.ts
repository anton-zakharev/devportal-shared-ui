import {mergeAttributes} from "@tiptap/core"
import {Heading} from "@tiptap/extension-heading"
import styles from "../styles/Heading.css"

export let HeadingNode = Heading.extend({
  marks: "",
  renderHTML({node, HTMLAttributes}) {
    let {level} = node.attrs
    let tagName = `h${level}`
    return [
      tagName,
      mergeAttributes({class: styles[tagName]}, this.options.HTMLAttributes, HTMLAttributes),
      0
    ]
  },
})
