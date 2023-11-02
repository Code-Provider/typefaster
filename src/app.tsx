import { useEffect, useRef, useState } from "preact/hooks"
import "./app.css"
import quotes from "./assets/quotes.json"


export function App() {
  const textBoxRef = useRef<HTMLTextAreaElement>(null)
  const [snippet, setSnippet] = useState(quotes[Math.floor(Math.random() * quotes.length)])
  const [typed, setTyped] = useState("")
  const [startTime, setStartTime] = useState(0)

  useEffect(() => {
    textBoxRef.current?.focus()
  }, [])

  useEffect(() => {
    // set start time when typed text is empty and started typing.
    if(typed == '') {
      setStartTime(Date.now())
    }
  }, [typed])

  const words = snippet.split(" ")
  const wordsTyped = typed === "" ? [] : typed.split(" ")

  const finished = snippet === typed
  const timeElapsedInMinutes = (Date.now() - startTime) / (1000 * 60) 
  const wpm = Math.round(wordsTyped.length / timeElapsedInMinutes)


  const restartGame = () => {
    setSnippet(quotes[Math.floor(Math.random() * quotes.length)])
    setTyped("")
    textBoxRef.current?.focus()
  }
  
  return (
    <>
      <div className="container">
        <textarea className="template-box" value={snippet} />
        <textarea
          className="text-box"
          value={typed}
          onInput={(e) =>
            setTyped((e.target as HTMLTextAreaElement).value)
          }
          readOnly={finished}
          ref={textBoxRef}
        />
        <div className="utils">
        <button onClick={restartGame} className="restart-button">Restart</button>
        <div className="counter">{Math.min(wordsTyped.length, words.length)}/{words.length} {finished ? `(wpm : ${wpm})` : ''}</div>
        </div>
      </div>
    </>
  )
}
