import type { AddressData } from "../types"
import { SENSITIVITIES } from "../types"
import { SENS_ICON } from "../types"

type Props = {
  addresses: AddressData[]
}

export default function Summary({ addresses }: Props) {
  const total = addresses.length
  const withCandy = addresses.filter((a) => a.hasCandy).length

  const sensitivityCounts: Record<string, number> = {}
  SENSITIVITIES.forEach((s) => {
    sensitivityCounts[s] = 0
  })

  addresses.forEach((a) => {
    if (!a.sensitivity) return
    sensitivityCounts[a.sensitivity]++
  })

  return (
    <section className="bg-card p-4 rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Címek összesen</div>
          <div className="text-xl font-semibold">{total}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">Még van édesség</div>
          <div className="text-xl font-semibold">{withCandy}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {Object.entries(sensitivityCounts).map(([s, cnt]) => (
          <div
            key={s}
            className="flex items-center gap-2 bg-background/30 p-2 rounded"
          >
            <span className="text-lg">{SENS_ICON[s]}</span>
            <div className="text-sm">
              <div className="font-medium">{s}</div>
              <div className="text-muted-foreground text-xs">{cnt}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
