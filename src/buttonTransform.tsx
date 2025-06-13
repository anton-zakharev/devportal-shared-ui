import {type HTMLAttributes, isValidElement} from "react"
import {type ButtonProps} from "@vkontakte/vkui"

// TYPES ===============================================================================================================
export type ApiButton = {
  /**
   * 1) FE-side stage
   *    ^ The identifier can be undefined here if we just built the button
   *      and are preparing to send it to the backend
   * 2) BE-side stage
   *    ^ Always UUID
   * */
  id?: string
  text: string
  href: string
  target: string
  appearance: "ACCENT" | "POSITIVE" | "NEGATIVE" | "NEUTRAL" | "OVERLAY" | "ACCENT_INVARIABLE"
  mode: "PRIMARY" | "SECONDARY" | "TERTIARY" | "OUTLINE" | "LINK"
  size: "SMALL" | "MEDIUM" | "LARGE"
  align: "LEFT" | "CENTER" | "RIGHT"
  sizeY: "COMPACT" | "REGULAR"
  rounded: boolean
  stretched: boolean
  disabled: boolean
  index: number
  afterIcon?: string
  beforeIcon?: string
}

export type UiButton = Omit<ButtonProps, "children" | "href"> & {
  children: string
  href: string
  /* BE-side identifier */
  "data-backend-id"?: string
}

// HELPERS =============================================================================================================
let toLowerKebab = (snakeCase: string): string => {
  return snakeCase.toLowerCase().replace("_", "-")
}

let toUpperSnake = (kebabCase: string): string => {
  return kebabCase.toUpperCase().replace("-", "_")
}

let toLowerInitial = (str: string): string => {
  return str.charAt(0).toLowerCase()
}

let toLowerCase = (str: string): string => {
  return str.toLowerCase()
}

let toUpperCase = (str: string): string => {
  return str.toUpperCase()
}

let toApiSize = (str: string): ApiButton["size"] => {
  if (str == "s") return "SMALL"
  if (str == "m") return "MEDIUM"
  if (str == "l") return "LARGE"

  throw new Error(`Unsupported size ${str}`)
}

// CORE ================================================================================================================
export let toApiButton = (uiButton: UiButton, index: number): ApiButton => {
  let beforeIcon = isValidElement(uiButton.before)
    ? (uiButton.before?.props as HTMLAttributes<HTMLElement> | null)?.id
    : undefined
  let afterIcon = isValidElement(uiButton.after)
    ? (uiButton.after?.props as HTMLAttributes<HTMLElement> | null)?.id
    : undefined

  let apiButton: ApiButton = {
    text: uiButton.children,
    href: uiButton.href,
    target: uiButton.target || "_self",
    appearance: toUpperSnake(uiButton.appearance || "accent") as ApiButton["appearance"], // stricter types?
    mode: toUpperCase(uiButton.mode || "primary") as ApiButton["mode"],
    size: toApiSize(uiButton.size || "s"),
    align: toUpperCase(uiButton.align || "center") as ApiButton["align"],
    sizeY: "REGULAR", // const
    rounded: uiButton.rounded || false,
    stretched: uiButton.stretched || false,
    disabled: uiButton.disabled || false,
    beforeIcon,
    afterIcon,
    index,
  }

  if (uiButton["data-backend-id"]) {
    apiButton.id = uiButton["data-backend-id"]
  }

  return apiButton
}

export let toUiButton = (apiButton: ApiButton): UiButton => {
  let uiButton: UiButton = {
    children: apiButton.text,
    href: apiButton.href,
    target: apiButton.target,
    appearance: toLowerKebab(apiButton.appearance) as UiButton["appearance"], // stricter types?
    size: toLowerInitial(apiButton.size) as UiButton["size"],
    align: toLowerCase(apiButton.align) as UiButton["align"],
    mode: toLowerCase(apiButton.mode) as UiButton["mode"],
    rounded: apiButton.rounded,
    stretched: apiButton.stretched,
    disabled: apiButton.disabled,
    before: apiButton.beforeIcon ? <img src={apiButton.beforeIcon} alt="." /> : null,
    after: apiButton.afterIcon ? <img src={apiButton.afterIcon} alt="." /> : null,
  }

  if (apiButton.id) {
    uiButton["data-backend-id"] = apiButton.id
  }

  return uiButton
}
