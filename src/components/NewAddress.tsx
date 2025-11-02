import React, { useState } from "react"
import { SENSITIVITIES } from "../types"
import { Button } from "./ui/button"
import {
  Field,
  FieldContent,
  FieldLabel,
} from "./ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Input } from "./ui/input"
import { createAddress } from "../lib/api"


export default function NewAddress({ onNewAddress }: { onNewAddress: () => void }) {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [selected, setSelected] = useState<string>("")
  const [saving, setSaving] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await createAddress({
        name,
        address,
        sensitivity: selected || "none",
        hasCandy: true,
      })
      setName("")
      setAddress("")
      setSelected("")

      onNewAddress()
    } catch (err) {
      console.error("Failed to create address", err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-card p-3 rounded-md">
      <div className="flex flex-col sm:flex-row gap-2">
        <Field className="flex-1">
          <FieldLabel>Név</FieldLabel>
          <FieldContent>
            <Input
              className="w-full"
              placeholder="Név"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
            />
          </FieldContent>
        </Field>

        <Field className="flex-1">
          <FieldLabel>Cím</FieldLabel>
          <FieldContent>
            <Input
              className="w-full"
              placeholder="Cím"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>setAddress(e.target.value)}
            />
          </FieldContent>
        </Field>

        <Field className="flex-1">
          <FieldLabel>Érzékenység</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={setSelected}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Válassz érzékenységet" />
              </SelectTrigger>
              <SelectContent>
                {SENSITIVITIES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>
        <div className="flex items-end">
          <Button className="mx-auto w-48 sm:w-20" type="submit" size="sm" disabled={saving}>
            Hozzáad
          </Button>
        </div>
      </div>
    </form>
  )
}
