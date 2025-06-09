import {isValidElement} from "react"
import {type ButtonProps} from "@vkontakte/vkui"
import {type Props as ButtonIconProps, ButtonIcon} from "./components/ButtonIcon"

// TYPES ===============================================================================================================
export type ApiButton = {
  text: string
  href: string
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
    ? (uiButton.before?.props as ButtonIconProps | null)?.id
    : undefined
  let afterIcon = isValidElement(uiButton.after)
    ? (uiButton.after?.props as ButtonIconProps | null)?.id
    : undefined

  let apiButton: ApiButton = {
    text: uiButton.children,
    href: uiButton.href,
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

  return apiButton
}

export let toUiButton = (apiButton: ApiButton): UiButton => {
  let uiButton: UiButton = {
    children: apiButton.text,
    href: apiButton.href,
    appearance: toLowerKebab(apiButton.appearance) as UiButton["appearance"], // stricter types?
    size: toLowerInitial(apiButton.size) as UiButton["size"],
    align: toLowerCase(apiButton.align) as UiButton["align"],
    mode: toLowerCase(apiButton.mode) as UiButton["mode"],
    rounded: apiButton.rounded,
    stretched: apiButton.stretched,
    disabled: apiButton.disabled,
    before: apiButton.beforeIcon ? <ButtonIcon src={apiButton.beforeIcon} /> : null,
    after: apiButton.afterIcon ? <ButtonIcon src={apiButton.afterIcon} /> : null,
  }

  return uiButton
}
