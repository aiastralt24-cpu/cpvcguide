import type { ReviewThread } from "@/lib/content-schema";

type ReviewCommentWithLabels = ReviewThread & {
  dateLabel: string;
  replyDateLabel?: string;
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} className="flex gap-1 text-[color:var(--accent)]">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < rating ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewComments({ threads }: { threads: ReviewCommentWithLabels[] }) {
  if (threads.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Review comments</p>
          <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl">What readers said and how the team replied</h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-[color:var(--muted)]">
          Feedback here is meant to feel operational: what helped, what was unclear, and how the editorial team responds.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {threads.map((thread) => (
          <article key={`${thread.name}-${thread.topic}`} className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/60 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-semibold">{thread.name}</h3>
                  <span className="text-sm text-[color:var(--muted)]">{thread.role}</span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {thread.topic} • {thread.dateLabel}
                </p>
              </div>
              <StarRow rating={thread.rating} />
            </div>
            <p className="mt-4 text-sm leading-7 text-[color:var(--foreground)]">{thread.comment}</p>

            {thread.reply ? (
              <div className="mt-5 rounded-2xl border border-[color:var(--border)] bg-[rgba(239,224,198,0.4)] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{thread.reply.author}</p>
                  <p className="text-sm text-[color:var(--muted)]">{thread.reply.role}</p>
                  <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {thread.replyDateLabel}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]">{thread.reply.message}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
