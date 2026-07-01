import { useState } from "react";
import { Bot, User, UserPlus, CheckCircle2, MessageSquareText } from "lucide-react";
import { useAdmin } from "../../admin/store";
import { cn } from "../../lib/utils";
import { Card, PageHeader, StatCard, formatDateTime } from "../../components/admin/ui";

export default function ChatHistory() {
  const { chatThreads, convertChatToInquiry, showToast } = useAdmin();
  const sorted = [...chatThreads].sort((a, b) => +new Date(b.startedAt) - +new Date(a.startedAt));
  const [openId, setOpenId] = useState<string | null>(sorted[0]?.id ?? null);
  const active = chatThreads.find((c) => c.id === openId) ?? null;

  const convertedCount = chatThreads.filter((c) => c.converted).length;

  return (
    <div>
      <PageHeader
        title="AI Chat History"
        subtitle="Conversations captured by the website assistant. Convert promising chats into leads."
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Total conversations" value={String(chatThreads.length)} deltaTone="neutral" icon={<MessageSquareText className="h-4 w-4" />} />
        <StatCard label="Converted to leads" value={String(convertedCount)} deltaTone="neutral" icon={<UserPlus className="h-4 w-4" />} />
        <StatCard
          label="Conversion rate"
          value={`${chatThreads.length ? Math.round((convertedCount / chatThreads.length) * 100) : 0}%`}
          deltaTone="neutral"
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
        {/* Thread list */}
        <Card className="overflow-hidden">
          <ul className="max-h-[560px] divide-y divide-outline-variant/30 overflow-y-auto">
            {sorted.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setOpenId(c.id)}
                  className={cn(
                    "w-full px-4 py-3 text-left transition-colors",
                    openId === c.id ? "bg-primary-50" : "hover:bg-surface-container/40"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-semibold text-ink">{c.visitor}</p>
                    {c.converted && (
                      <span className="shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success">
                        Lead
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-muted">{c.topic}</p>
                  <p className="mt-0.5 text-xs text-muted/80">{formatDateTime(c.startedAt)} · {c.messages.length} messages</p>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Transcript */}
        <Card className="flex flex-col overflow-hidden">
          {active ? (
            <>
              <div className="flex items-center justify-between border-b border-outline-variant/40 px-5 py-4">
                <div>
                  <p className="font-display font-bold text-navy">{active.visitor}</p>
                  <p className="text-xs text-muted">{active.topic} · {formatDateTime(active.startedAt)}</p>
                </div>
                <button
                  disabled={active.converted}
                  onClick={() => {
                    convertChatToInquiry(active.id);
                    showToast("Chat converted to inquiry");
                  }}
                  className={cn(
                    "inline-flex min-h-[40px] items-center gap-2 rounded-md px-4 text-sm font-bold transition",
                    active.converted
                      ? "cursor-default bg-success/10 text-success"
                      : "bg-primary text-white shadow-soft hover:bg-primary-dark"
                  )}
                >
                  {active.converted ? <CheckCircle2 className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                  {active.converted ? "Converted" : "Convert to lead"}
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto bg-surface-container/30 px-5 py-6">
                {active.messages.map((m, idx) => (
                  <div key={idx} className={cn("flex gap-2.5", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full",
                        m.role === "user" ? "bg-navy text-white" : "bg-primary text-white"
                      )}
                    >
                      {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </span>
                    <div className={cn("max-w-[78%]", m.role === "user" ? "text-right" : "text-left")}>
                      <div
                        className={cn(
                          "inline-block whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm shadow-soft",
                          m.role === "user"
                            ? "rounded-tr-sm bg-navy text-white"
                            : "rounded-tl-sm bg-white text-ink"
                        )}
                      >
                        {m.text}
                      </div>
                      <p className="mt-1 text-[11px] text-muted">{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="grid flex-1 place-items-center p-12 text-muted">Select a conversation to read it.</div>
          )}
        </Card>
      </div>
    </div>
  );
}
