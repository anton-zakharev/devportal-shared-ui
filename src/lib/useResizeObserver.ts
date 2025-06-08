import {type DependencyList, type RefObject, useLayoutEffect} from "react"

export function useResizeObserver(
  cb: () => unknown,
  elementOrRef: HTMLElement | RefObject<HTMLElement | null>,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    if (!elementOrRef) return

    cb()

    let resizeObserver: ResizeObserver | undefined
    if (typeof resizeObserver != "undefined") {
      resizeObserver = new ResizeObserver(cb)
      resizeObserver.observe(
        elementOrRef instanceof HTMLElement ? elementOrRef : elementOrRef.current!
      )
    } else {
      window.addEventListener("resize", cb)
    }

    return () =>{
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener("resize", cb)
      }
    }
  }, deps)
}
