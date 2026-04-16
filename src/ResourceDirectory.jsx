import { useState, useMemo } from "react";
import { CATEGORIES, RESOURCES } from "./resources";

const COLORS = {
  navy: "#1a2744",
  steel: "#2d4a7a",
  gold: "#e8b84b",
  amber: "#d4a03a",
  rust: "#c0392b",
  sage: "#27ae60",
  sky: "#2980b9",
  muted: "#8fa8c8",
  bg: "#0f1a2e",
  card: "#162035",
  border: "#243352",
  text: "#c8d8f0",
  textDim: "#6a85a8",
};

const CATEGORY_COLORS = {
  "Food & Nutrition":      "#e8b84b",
  "Housing":               "#2980b9",
  "Healthcare":            "#27ae60",
  "Refugee & Immigration": "#9b59b6",
  "Legal Aid":             "#e67e22",
  "Mental Health":         "#e74c3c",
  "Employment":            "#1abc9c",
  "Youth & Family":        "#3498db",
};

const PhoneIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MapIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

function ResourceCard({ resource }) {
  const accentColor = CATEGORY_COLORS[resource.category] || COLORS.muted;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address)}`;

  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderLeft: `3px solid ${accentColor}`,
      borderRadius: 10,
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      transition: "border-color 0.15s",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{
              background: `${accentColor}22`,
              color: accentColor,
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 20,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              {resource.category}
            </span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, lineHeight: 1.3 }}>
            {resource.name}
          </div>
        </div>
        {resource.website && (
          <a href={resource.website} target="_blank" rel="noopener noreferrer" style={{
            color: COLORS.textDim,
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginTop: 2,
          }}
            onMouseEnter={e => e.currentTarget.style.color = COLORS.gold}
            onMouseLeave={e => e.currentTarget.style.color = COLORS.textDim}
          >
            <LinkIcon /> Website
          </a>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: 12.5, color: COLORS.textDim, lineHeight: 1.65, margin: 0 }}>
        {resource.description}
      </p>

      {/* Meta row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 11.5, color: COLORS.textDim }}>
        {resource.phone && (
          <a href={`tel:${resource.phone}`} style={{ display: "flex", alignItems: "center", gap: 5, color: COLORS.sky, textDecoration: "none" }}>
            <PhoneIcon /> {resource.phone}
          </a>
        )}
        {resource.hours && (
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <ClockIcon /> {resource.hours}
          </span>
        )}
        {resource.address && !resource.address.includes("anywhere") && (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, color: COLORS.textDim, textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.color = COLORS.gold}
            onMouseLeave={e => e.currentTarget.style.color = COLORS.textDim}
          >
            <MapIcon /> {resource.address}
          </a>
        )}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {resource.tags.map(tag => (
          <span key={tag} style={{
            background: "#1e2f50",
            color: COLORS.textDim,
            fontSize: 10,
            padding: "2px 8px",
            borderRadius: 4,
            letterSpacing: "0.04em",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ResourceDirectory() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return RESOURCES.filter(r => {
      const matchCat = activeCategory === "All" || r.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.includes(q)) ||
        r.category.toLowerCase().includes(q)
      );
    });
  }, [search, activeCategory]);

  const counts = useMemo(() => {
    const c = {};
    CATEGORIES.forEach(cat => {
      c[cat] = cat === "All" ? RESOURCES.length : RESOURCES.filter(r => r.category === cat).length;
    });
    return c;
  }, []);

  return (
    <div>
      {/* Header strip */}
      <div style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 10,
        padding: "16px 20px",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>
            Utica Community Resource Directory
          </div>
          <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>
            {RESOURCES.length} organizations · Food, housing, healthcare, legal aid, and more
          </div>
        </div>
        <div style={{ fontSize: 11, color: COLORS.textDim, background: "#1e2f50", padding: "6px 12px", borderRadius: 6 }}>
          ⚠️ Verify hours before visiting — info current as of 2025
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search by name, service, or keyword..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "11px 14px 11px 40px",
            color: COLORS.text,
            fontSize: 13,
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={e => e.target.style.borderColor = COLORS.gold}
          onBlur={e => e.target.style.borderColor = COLORS.border}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", color: COLORS.textDim, cursor: "pointer", fontSize: 16, lineHeight: 1,
          }}>×</button>
        )}
      </div>

      {/* Category filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat;
          const accent = cat === "All" ? COLORS.gold : (CATEGORY_COLORS[cat] || COLORS.muted);
          return (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: isActive ? accent : COLORS.card,
              color: isActive ? (cat === "All" ? COLORS.navy : "#fff") : COLORS.textDim,
              border: `1px solid ${isActive ? accent : COLORS.border}`,
              borderRadius: 20,
              padding: "5px 12px",
              fontSize: 11,
              fontWeight: isActive ? 700 : 400,
              cursor: "pointer",
              letterSpacing: "0.04em",
              transition: "all 0.15s",
            }}>
              {cat} <span style={{ opacity: 0.7 }}>({counts[cat]})</span>
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 14 }}>
        {filtered.length === 0
          ? "No results — try a different search or category"
          : `Showing ${filtered.length} resource${filtered.length !== 1 ? "s" : ""}${search ? ` for "${search}"` : ""}${activeCategory !== "All" ? ` in ${activeCategory}` : ""}`
        }
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 14 }}>
        {filtered.map(r => <ResourceCard key={r.name} resource={r} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: COLORS.textDim, fontSize: 13 }}>
          No resources matched your search.<br />
          <button onClick={() => { setSearch(""); setActiveCategory("All"); }} style={{
            marginTop: 12, background: "none", border: `1px solid ${COLORS.border}`,
            color: COLORS.text, borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontSize: 12,
          }}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
