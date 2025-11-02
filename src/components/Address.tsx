import type { AddressData } from "../types"
import { Button } from "./ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "./ui/item"
import { SENS_ICON } from "../types"
import { markElfogyott } from "../lib/api"

export default function AddressCard({
  data,
  onAddressChanged,
}: {
  data: AddressData
  onAddressChanged: () => void
}) {
  const sens = data.sensitivity ? data.sensitivity : "none"

  async function _markElfogyott() {
    try {
      await markElfogyott(data.id!)
      onAddressChanged()
    } catch (err) {
      console.error("Failed to update address", err)
    }
  }

  const locationText = data.address ? data.address : "Nincs megadva cím"

  return (
    <Item
      variant="outline"
      className={`${data.hasCandy ? "" : "opacity-60 grayscale"}`}
    >
      <ItemContent>
        <ItemTitle>{data.name}</ItemTitle>
        <ItemDescription>{locationText}</ItemDescription>
      </ItemContent>

      <ItemActions>
        <Button
          size="sm"
          disabled={!data.hasCandy}
          onClick={() => _markElfogyott()}
        >
          Elfogyott az édesség
        </Button>
      </ItemActions>
      <ItemFooter>
        <div className="flex gap-2 items-center">
          {SENS_ICON[sens]}
          <span className="text-muted-foreground">{sens}</span>
        </div>
      </ItemFooter>
    </Item>
  )
}
