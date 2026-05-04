import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

type Filter = "all" | "original" | "linked";

export function FilterTabs({
  value,
  onChange,
  showNew = false,
  theme = "cream",
}: { value: Filter; onChange: (f: Filter) => void; showNew?: boolean; theme?: "cream" | "navy" }) {
  const tabs: Filter[] = ["all", "original", "linked"];
  const base = theme === "navy"
    ? { active: "bg-cream text-navy", inactive: "border border-cream/30 text-cream hover:bg-cream/10" }
    : { active: "bg-navy text-cream", inactive: "border border-navy/30 text-navy hover:bg-navy/5" };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`font-mono text-xs uppercase tracking-[0.18em] px-5 py-3 transition ${
            value === t ? base.active : base.inactive
          }`}
        >
          {t}
        </button>
      ))}
      {showNew && (
        <Link to="/admin/new" className="navy-pill ml-2">
          <Plus size={14} className="mr-1" /> New Post
        </Link>
      )}
    </div>
  );
}
