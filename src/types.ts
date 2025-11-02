export const SENSITIVITIES: string[] = [
  "none",
  "laktóz",
  "glutén",
  "mogyoró",
  "tojás",
]

export const SENS_ICON: Record<string, string> = {
  //tudom tudom, ekezetes karakterek kodban nem jo otlet, de nincs kedvem atirni a retoolt
  none: "❎",
  laktóz: "🥛",
  glutén: "🍞",
  mogyoró: "🥜",
  tojás: "🍳"
}

export interface AddressData {
  id?: number | string
  name: string
  address?: string
  sensitivity?: string
  hasCandy: boolean
}