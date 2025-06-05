import {mergeAttributes, Node} from "@tiptap/core"
import {type NodeViewRendererProps, NodeViewWrapper, ReactNodeViewRenderer} from "@tiptap/react"
import {Gallery} from "../components/Gallery"
import {Image} from "../components/Image"

type Attrs = {
  src: string[]
}

function GalleryComponent({node}: NodeViewRendererProps) {
  let {src: sources} = node.attrs as Attrs
  return (
    <NodeViewWrapper>
      <Gallery>
        {sources.map((src, i) => <Image key={i} src={src} />)}
      </Gallery>
    </NodeViewWrapper>
  )
}

export let GalleryNode = Node.create({
  name: "gallery",
  group: "block",
  defining: true,
  atom: true,
  selectable: false,
  draggable: false,
  isolating: true,
  addAttributes() {
    return {
      src: {
        default: [],
        parseHTML: element => {
          let raw = element.getAttribute("data-src")
          return raw ? raw.split(",") : []
        },
        renderHTML: attributes => {
          return {
            "data-src": (attributes.src || []).join(","),
          }
        },
      }
    }
  },
  parseHTML() {
    return [
      {tag: "gallery"},
    ]
  },
  renderHTML({HTMLAttributes}) {
    return ["gallery", mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(GalleryComponent)
  },
})
