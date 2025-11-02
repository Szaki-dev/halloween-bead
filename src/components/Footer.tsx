export default function Footer() {
  return (
    <footer className="max-w-3xl mx-auto mt-8 py-6 text-sm text-muted-foreground">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <div>
          Fejlesztő: <a className="underline" href="https://github.com/Szaki-dev" target="_blank" rel="noreferrer">Szaki-dev</a>
        </div>
        <div>
          Adatvédelmi nyilatkozat: <a className="underline" href="https://example.com" target="_blank" rel="noreferrer">example.com</a>
        </div>
      </div>
    </footer>
  )
}
