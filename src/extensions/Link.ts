import {mergeAttributes} from "@tiptap/core"
import {Link, isAllowedUri} from "@tiptap/extension-link"
import styles from "@vkontakte/vkui/dist/cssm/components/Link/Link.module.css"

export let LinkNode = Link.extend({
  renderHTML({HTMLAttributes}) {
    let attrs = {
      class: styles.Link,
    }

    // Prevent XSS attacks
    if (
      !this.options.isAllowedUri(HTMLAttributes.href, {
        defaultValidate: href => !!isAllowedUri(href, this.options.protocols),
        protocols: this.options.protocols,
        defaultProtocol: this.options.defaultProtocol,
      })
    ) {
      // Strip out the href
      return [
        "a",
        mergeAttributes(attrs, this.options.HTMLAttributes, { ...HTMLAttributes, href: '' }),
        0,
      ]
    }

    return ["a", mergeAttributes(attrs, this.options.HTMLAttributes, HTMLAttributes), 0]
  },
})
