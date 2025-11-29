import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../../styles/chat.css";

type Msg = { id: string; role: "user" | "assistant"; text: string };

// TODO: set this to your real backend endpoint
const API_ENDPOINT = "http://localhost:5001/api/chat";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "m1", role: "assistant", text: "Hi! How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Focus the input when opening
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Body class toggle when chat is open
  useEffect(() => {
    if (open) {
      document.body.classList.add("chat-open");
    } else {
      document.body.classList.remove("chat-open");
    }
    return () => document.body.classList.remove("chat-open");
  }, [open]);

  const send = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text };
    setMsgs((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Call your backend
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      // Adjust this based on your API response shape
      const replyText: string =
        data.reply ?? data.message ?? "Sorry, I couldn't parse the response.";

      const assistantMsg: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: replyText,
      };

      setMsgs((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat API error:", err);
      const errorMsg: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "Sorry, something went wrong talking to the server.",
      };
      setMsgs((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Floating button (bottom-right, above BookFab)
  const fab = !open ? (
    <button
      className="chat-fab"
      aria-haspopup="dialog"
      aria-controls="chat-panel"
      aria-expanded={open}
      onClick={() => setOpen(true)}
      title="Open chat"
    >
      Chat
    </button>
  ) : null;

  // The panel uses a portal so it overlays the app cleanly.
  const panel = open
    ? createPortal(
        <div className="chat-overlay" aria-hidden={!open}>
          <section
            id="chat-panel"
            className="chat-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Chat"
            ref={panelRef}
          >
            <header className="chat-header">
              <strong>Chat</strong>
              <button
                className="chat-close"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </header>

            <div className="chat-messages" role="log" aria-live="polite">
              {msgs.map((m) => (
                <div key={m.id} className={`chat-bubble ${m.role}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <form className="chat-inputrow" onSubmit={send}>
              <input
                ref={inputRef}
                className="chat-input"
                type="text"
                placeholder="Type a message…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button className="chat-send" type="submit" disabled={loading}>
                {loading ? "..." : "Send"}
              </button>
            </form>
          </section>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {fab}
      {panel}
    </>
  );
}
