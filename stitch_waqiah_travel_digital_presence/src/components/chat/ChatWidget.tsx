import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { MessageCircle, X, Send, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  CHAT_TOPICS,
  WELCOME_QUICK_REPLIES,
  FALLBACK,
  findTopic,
  type QuickReply,
} from "../../data/chatResponses";

type Msg = {
  id: string;
  from: "bot" | "user";
  text: string;
  quickReplies?: QuickReply[];
  isFallback?: boolean;
};

const WELCOME: Msg = {
  id: "welcome",
  from: "bot",
  text: "Assalamu Alaikum! 👋\nHow can I help you today?",
  quickReplies: WELCOME_QUICK_REPLIES,
};

function uid() {
  return Math.random().toString(36).slice(2);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [hasNew, setHasNew] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setHasNew(false);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 50);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs, open]);

  function pushBot(text: string, quickReplies?: QuickReply[], isFallback = false) {
    setMsgs((prev) => [...prev, { id: uid(), from: "bot", text, quickReplies, isFallback }]);
    if (!open) setHasNew(true);
  }

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMsgs((prev) => [...prev, { id: uid(), from: "user", text: trimmed }]);
    setInput("");
    setTimeout(() => {
      const topic = findTopic(trimmed);
      if (topic) {
        pushBot(topic.response, topic.quickReplies);
      } else {
        pushBot(FALLBACK.response, FALLBACK.quickReplies, true);
      }
    }, 350);
  }

  function handleQuickReply(qr: QuickReply) {
    if (qr.link) {
      navigate(qr.link);
      setOpen(false);
      return;
    }

    setMsgs((prev) => [...prev, { id: uid(), from: "user", text: qr.label }]);

    setTimeout(() => {
      if (qr.menu) {
        pushBot(WELCOME.text, WELCOME_QUICK_REPLIES);
        return;
      }
      if (qr.topicId) {
        const topic = CHAT_TOPICS.find((t) => t.id === qr.topicId);
        if (topic) pushBot(topic.response, topic.quickReplies);
      }
    }, 350);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend(input);
  }

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
      {/* Panel */}
      {open && (
        <div className="flex h-[480px] w-[calc(100vw-2rem)] max-w-[340px] flex-col overflow-hidden rounded-xl border border-outline-variant/40 bg-surface shadow-widget animate-scale-in">
          {/* Header */}
          <div className="flex shrink-0 items-center gap-3 bg-navy px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-base leading-none">
              🕌
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-bold text-white leading-none">
                Waqiah Travel
              </p>
              <p className="mt-0.5 text-xs text-white/65">Typically replies instantly</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
            {msgs.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex flex-col", msg.from === "user" && "items-end")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line",
                    msg.from === "bot"
                      ? msg.isFallback
                        ? "rounded-tl-sm border border-warning/25 bg-warning/10 text-warning"
                        : "rounded-tl-sm bg-white text-ink shadow-soft"
                      : "rounded-tr-sm bg-navy text-white"
                  )}
                >
                  {msg.text}
                </div>

                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.quickReplies.map((qr) => (
                      <button
                        key={qr.label}
                        onClick={() => handleQuickReply(qr)}
                        className="rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white active:scale-95"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex shrink-0 items-center gap-2 border-t border-outline-variant/30 bg-white px-3 py-2.5">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type a message…"
              className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted outline-none"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-white transition hover:bg-navy-dark disabled:opacity-40 active:scale-95"
              aria-label="Send"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy text-white shadow-widget transition hover:bg-navy-dark hover:scale-105 active:scale-95"
        aria-label={open ? "Close chat" : "Chat with us"}
      >
        {open ? (
          <ChevronDown className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
        {hasNew && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
            1
          </span>
        )}
      </button>
    </div>
  );
}
