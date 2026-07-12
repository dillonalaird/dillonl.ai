export default function SiteFooter() {
  return (
    <footer className="border-t border-ink/10">
      <div className="px-6 md:px-12 py-8 flex flex-col md:flex-row gap-2 justify-between text-[11px] uppercase tracking-[0.25em] text-black/40">
        <span>© 2026 Dillon Laird</span>
        <a href="/feed.xml" className="hover:text-ink transition-colors">
          RSS
        </a>
      </div>
    </footer>
  );
}
