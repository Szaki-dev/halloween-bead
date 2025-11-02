import type { AddressData } from "../types"

const API_URL = "https://retoolapi.dev/X3I3QX/data"

export async function fetchAddresses(): Promise<AddressData[]> {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    const list: AddressData[] = Array.isArray(data) ? data : []
    return list
  } catch (err) {
    console.error("Failed to fetch addresses", err)
    return []
  }
}

export async function createAddress(address: { name: string; address: string; sensitivity: string; hasCandy: boolean }): Promise<AddressData | null> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    })
    if (!res.ok) throw new Error("Failed to create address")
    const data = await res.json()
    return data as AddressData
  } catch (err) {
    console.error("Failed to create address", err)
    return null
  }
}

export async function markElfogyott(id: number | string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hasCandy: false }),
    })
    if (!res.ok) throw new Error("Failed to update address")
    return true
  } catch (err) {
    console.error("Failed to update address", err)
    return false
  }
}