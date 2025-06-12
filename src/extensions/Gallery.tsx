import {type MouseEvent, useEffect} from "react"
import {mergeAttributes, Node} from "@tiptap/core"
import {type NodeViewRendererProps, NodeViewWrapper, ReactNodeViewRenderer} from "@tiptap/react"
import {Gallery} from "../components/Gallery"
import {Image} from "../components/Image"

type Attrs = {
  src: string[]
}

function GalleryComponent({node, getPos, editor}: NodeViewRendererProps) {
  let {src: sources} = node.attrs as Attrs

  useEffect(() => {
    let times = [250, 500, 750, 1000, 3000, 5000]

    for (let time of times) {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"))
      }, time)
    }
  }, [])

  function handleClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    editor.chain().focus().run()
    const pos = getPos()
    editor.chain().focus().setNodeSelection(pos).run()
  }

  return (
    <NodeViewWrapper contentEditable={false} onClick={handleClick}>
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
  selectable: true,
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
    return ["div", mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(GalleryComponent, {
      stopEvent: () => false,
    })
  },
})
