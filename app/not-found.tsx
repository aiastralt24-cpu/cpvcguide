import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-6 py-20 md:px-10">
      <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">404</p>
      <h1 className="mt-4 font-[family-name:var(--font-serif)] text-5xl">Page not found.</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
        The requested page is not part of the current content graph. Start from the homepage or move into one of the
        main CPVC content categories.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white"
      >
        Return home
      </Link>
    </div>
  );
}
