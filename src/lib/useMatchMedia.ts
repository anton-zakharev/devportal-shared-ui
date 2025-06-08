import {useMemo, useState, useEffect} from "react"

export function useMatchMedia(query: string): boolean {
  let queryList = useMemo(() => window.matchMedia(query), [query])
  let [matches, setMatches] = useState(queryList.matches)

  useEffect(() => {
    function handleChange({matches}: MediaQueryListEvent) {
      setMatches(matches)
    }

    queryList.addEventListener("change", handleChange)
    return () => queryList.removeEventListener("change", handleChange)
  }, [])

  return matches
}
