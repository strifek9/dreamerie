export default function App() {
  return (
    <div className="dreamerie-shell">
      <header className="masthead">
        <p className="wordmark">Dreamerie</p>
      </header>

      <main className="introduction">
        <div className="night-mark" aria-hidden="true">
          <span className="moon" />
          <span className="star star-one" />
          <span className="star star-two" />
          <span className="star star-three" />
        </div>
        <p className="eyebrow">A quiet place for shared dreams</p>
        <h1>A new Dreamerie begins.</h1>
        <p className="invitation">
          How well do you understand the way your friends see the world?
        </p>
        <div className="closing-note">
          <span className="divider" aria-hidden="true" />
          <p>The first dreams are still taking shape.</p>
        </div>
      </main>

      <footer className="footer">
        <p>Local prototype · 0.1</p>
      </footer>
    </div>
  )
}
