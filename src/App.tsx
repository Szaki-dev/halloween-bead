import { useEffect, useState } from "react"
import Summary from "./components/Summary"
import AddressCard from "./components/Address"
import Footer from "./components/Footer"
import NewAddress from "./components/NewAddress"
import type { AddressData } from "./types"
import { fetchAddresses } from "./lib/api"



function App() {
  const [addresses, setAddresses] = useState<AddressData[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchData() {
    setLoading(true)
    try {
      const list = await fetchAddresses()

      // ahol elfogyott a cukor az menjen a vegere
      list.sort((a, b) => {
        if (a.hasCandy === b.hasCandy) return 0
        if (a.hasCandy && !b.hasCandy) return -1
        return 1
      })

      setAddresses(list)
    } catch (err) {
      console.error("Failed to fetch addresses", err)
      setAddresses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAddressChange = async () => {
    await fetchData()
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <header className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-5">Halloween Trick-or-Treat lista</h1>
      </header>

      <main className="max-w-3xl mx-auto space-y-4">
        <Summary addresses={addresses} />

        <section className="flex flex-col gap-3">
          <NewAddress onNewAddress={handleAddressChange} />

          {loading ? (
            <div className="flex justify-center py-8">
              <span className="animate-pulse">Betöltés...</span>
            </div>
          ) : (
            <div className="grid gap-3">
              {addresses.map((addr) => (
                <AddressCard
                  key={String(addr.id)}
                  data={addr}
                  onAddressChanged={handleAddressChange}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
