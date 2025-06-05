/**
 * This module is forked from
 * https://github.com/ueberdosis/tiptap/blob/main/demos/src/Experiments/Figure/Vue/figure.ts
 * */
import {
  findChildrenInRange,
  mergeAttributes,
  Node,
  nodeInputRule,
  Tracker,
} from "@tiptap/core"
import styles from "../styles/Image.css"

export interface FigureOptions {
  HTMLAttributes: Record<string, any>,
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figure: {
      /**
       * Add a figure element
       */
      setFigure: (options: {
        src: string,
        alt?: string,
        title?: string,
        caption?: string,
      }) => ReturnType,

      /**
       * Converts an image to a figure
       */
      imageToFigure: () => ReturnType,

      /**
       * Converts a figure to an image
       */
      figureToImage: () => ReturnType,
    }
  }
}

export let inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)[""](\S+)[""])?\)/

export let FigureNode = Node.create<FigureOptions>({
  name: "figure",

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: "block",

  content: "inline*",

  draggable: false,

  selectable: true,

  isolating: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => element.querySelector("img")?.getAttribute("src"),
      },

      alt: {
        default: null,
        parseHTML: element => element.querySelector("img")?.getAttribute("alt"),
      },

      title: {
        default: null,
        parseHTML: element => element.querySelector("img")?.getAttribute("title"),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "figure",
        contentElement: "figcaption",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure", mergeAttributes({ class: styles.figure }, this.options.HTMLAttributes),
      ["img", mergeAttributes({ class: styles.image }, HTMLAttributes, { draggable: false, contenteditable: false })],
      ["figcaption", { class: styles.caption }, 0],
    ]
  },

  addCommands() {
    return {
      setFigure: ({ caption, ...attrs }) => ({ chain }) => {
        return chain()
          .insertContent({
            type: this.name,
            attrs,
            content: caption
              ? [{ type: "text", text: caption }]
              : [],
          })
          // set cursor at end of caption field
          .command(({ tr, commands }) => {
            let { doc, selection } = tr
            let position = doc.resolve(selection.to - 2).end()

            return commands.setTextSelection(position)
          })
          .run()
      },

      imageToFigure: () => ({ tr, commands }) => {
        let { doc, selection } = tr
        let { from, to } = selection
        let images = findChildrenInRange(doc, { from, to }, node => node.type.name === "image")

        if (!images.length) {
          return false
        }

        let tracker = new Tracker(tr)

        return commands.forEach(images, ({ node, pos }) => {
          let mapResult = tracker.map(pos)

          if (mapResult.deleted) {
            return false
          }

          let range = {
            from: mapResult.position,
            to: mapResult.position + node.nodeSize,
          }

          return commands.insertContentAt(range, {
            type: this.name,
            attrs: {
              src: node.attrs.src,
            },
          })
        })
      },

      figureToImage: () => ({ tr, commands }) => {
        let { doc, selection } = tr
        let { from, to } = selection
        let figures = findChildrenInRange(doc, { from, to }, node => node.type.name === this.name)

        if (!figures.length) {
          return false
        }

        let tracker = new Tracker(tr)

        return commands.forEach(figures, ({ node, pos }) => {
          let mapResult = tracker.map(pos)

          if (mapResult.deleted) {
            return false
          }

          let range = {
            from: mapResult.position,
            to: mapResult.position + node.nodeSize,
          }

          return commands.insertContentAt(range, {
            type: "image",
            attrs: {
              src: node.attrs.src,
            },
          })
        })
      },
    }
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: match => {
          let [, src, alt, title] = match

          return { src, alt, title }
        },
      }),
    ]
  },
})
