import { useState } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ResourceDirectory from "./ResourceDirectory";

const COLORS = {
  navy: "#1a2744",
  steel: "#2d4a7a",
  slate: "#3d5a8a",
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

const raceData = [
  { name: "White", value: 57.1, color: "#4a90d9" },
  { name: "Black / AA", value: 14.5, color: "#e8b84b" },
  { name: "Asian", value: 11.0, color: "#27ae60" },
  { name: "Hispanic / Latino", value: 14.6, color: "#e67e22" },
  { name: "Multiracial", value: 11.96, color: "#9b59b6" },
  { name: "Other", value: 1.3, color: "#7f8c8d" },
];

const povertyByRace = [
  { race: "White", rate: 19.0 },
  { race: "Black", rate: 50.7 },
  { race: "Hispanic", rate: 29.4 },
  { race: "Am. Indian", rate: 32.9 },
  { race: "2+ Races", rate: 22.9 },
];

const incomeData = [
  { bracket: "<$25k", pct: 30 },
  { bracket: "$25–50k", pct: 28 },
  { bracket: "$50–75k", pct: 18 },
  { bracket: "$75–100k", pct: 12 },
  { bracket: "$100–150k", pct: 7 },
  { bracket: ">$150k", pct: 9 },
];

const ageData = [
  { group: "<18", pct: 25.2 },
  { group: "18–29", pct: 22.6 },
  { group: "30–44", pct: 21.0 },
  { group: "45–64", pct: 20.1 },
  { group: "65–84", pct: 12.6 },
  { group: "85+", pct: 2.4 },
];

const crimeComparison = [
  { label: "Violent Crime Rate", utica: 568, national: 369, ny: 363 },
  { label: "Property Crime Rate", utica: 3408, national: 1954, ny: 1411 },
];

const employmentSectors = [
  { sector: "Healthcare & Social", workers: 4763 },
  { sector: "Retail Trade", workers: 3521 },
  { sector: "Manufacturing", workers: 2504 },
  { sector: "Education", workers: 2200 },
  { sector: "Accommodation / Food", workers: 1890 },
  { sector: "Public Admin", workers: 1540 },
];

const popTrend = [
  { year: 2000, pop: 60651 },
  { year: 2010, pop: 62235 },
  { year: 2015, pop: 60600 },
  { year: 2020, pop: 65173 },
  { year: 2023, pop: 64440 },
  { year: 2026, pop: 62903 },
];

const TABS = ["Overview", "Race & Ethnicity", "Economy", "Crime", "Demographics", "Resources"];

const KPICard = ({ label, value, sub, accent }) => (
  <div style={{
    background: COLORS.card,
    border: `1px solid ${accent || COLORS.border}`,
    borderRadius: 10,
    padding: "18px 20px",
    flex: 1,
    minWidth: 140,
  }}>
    <div style={{ fontSize: 11, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 700, color: accent || COLORS.gold, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 5 }}>{sub}</div>}
  </div>
);

const SectionTitle = ({ children }) => (
  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 8 }}>
    {children}
  </div>
);

const ChartCard = ({ title, children, style }) => (
  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "20px 20px 12px", ...style }}>
    <div style={{ fontSize: 12, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{title}</div>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1e2f50", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "10px 14px" }}>
      <div style={{ color: COLORS.text, fontSize: 12, fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || COLORS.gold, fontSize: 11, marginTop: 3 }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default function UticaDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div style={{
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0f1a2e 100%)`,
        borderBottom: `2px solid ${COLORS.gold}`,
        padding: "24px 32px 0",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 10, color: COLORS.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>
              Oneida County · New York State
            </div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
              Utica, NY
            </h1>
            <div style={{ fontSize: 13, color: COLORS.textDim, marginTop: 4 }}>
              Sociodemographic Intelligence Dashboard · ACS 2023 / FBI UCR 2024
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: COLORS.textDim, marginBottom: 2 }}>Population (2026 est.)</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.gold, fontFamily: "'DM Mono', monospace" }}>62,903</div>
            <div style={{ fontSize: 10, color: "#c0392b", marginTop: 2 }}>▼ −0.6% / yr</div>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0 }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: activeTab === tab ? COLORS.gold : "transparent",
              color: activeTab === tab ? COLORS.navy : COLORS.textDim,
              border: "none",
              padding: "10px 20px",
              fontSize: 12,
              fontWeight: activeTab === tab ? 700 : 500,
              letterSpacing: "0.06em",
              cursor: "pointer",
              borderRadius: "6px 6px 0 0",
              transition: "all 0.15s",
            }}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 32px" }}>

        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <div>
            <SectionTitle>Key Indicators</SectionTitle>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              <KPICard label="Median HH Income" value="$52,484" sub="↑ 6.9% from 2022" accent={COLORS.sage} />
              <KPICard label="Poverty Rate" value="27.5%" sub="vs. 12.6% national" accent={COLORS.rust} />
              <KPICard label="Median Age" value="35.2" sub="vs. 38.8 national" />
              <KPICard label="Foreign-Born" value="21.3%" sub="13.8k residents" accent={COLORS.sky} />
              <KPICard label="Homeownership" value="50%" sub="Median value $133,400" />
              <KPICard label="Unemployment" value="6.3%" sub="~1.5× NY state rate" accent={COLORS.amber} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <ChartCard title="Population Trend (2000–2026)">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={popTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="year" tick={{ fill: COLORS.textDim, fontSize: 11 }} />
                    <YAxis tick={{ fill: COLORS.textDim, fontSize: 11 }} domain={[58000, 68000]} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="pop" stroke={COLORS.gold} strokeWidth={2.5} dot={{ fill: COLORS.gold, r: 4 }} name="Population" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Race / Ethnicity Composition">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={raceData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value" nameKey="name" paddingAngle={2}>
                      {raceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(val) => `${val}%`} contentStyle={{ background: "#1e2f50", border: `1px solid ${COLORS.border}`, fontSize: 12 }} />
                    <Legend iconSize={8} formatter={(val) => <span style={{ color: COLORS.textDim, fontSize: 11 }}>{val}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20 }}>
              <SectionTitle>Context: Utica as a Refugee City</SectionTitle>
              <p style={{ margin: 0, fontSize: 13, color: COLORS.textDim, lineHeight: 1.7 }}>
                Utica has a long, documented history as a significant U.S. refugee resettlement city. Approximately <strong style={{ color: COLORS.text }}>one quarter of the population</strong> is represented by refugee families — communities originally from Bosnia & Herzegovina, Vietnam, Somalia, Myanmar, and others. This explains the city's linguistic diversity (over 20% speak a language other than English at home) and contributes to the younger median age relative to the broader Mohawk Valley region.
              </p>
            </div>
          </div>
        )}

        {/* RACE & ETHNICITY */}
        {activeTab === "Race & Ethnicity" && (
          <div>
            <SectionTitle>Racial & Ethnic Composition (ACS 2019–2023)</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <ChartCard title="Population by Race (%)">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={raceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
                    <XAxis type="number" tick={{ fill: COLORS.textDim, fontSize: 11 }} unit="%" />
                    <YAxis type="category" dataKey="name" tick={{ fill: COLORS.text, fontSize: 11 }} width={90} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="%" radius={[0, 4, 4, 0]}>
                      {raceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Poverty Rate by Race (%)">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={povertyByRace} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
                    <XAxis type="number" tick={{ fill: COLORS.textDim, fontSize: 11 }} unit="%" />
                    <YAxis type="category" dataKey="race" tick={{ fill: COLORS.text, fontSize: 11 }} width={80} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="rate" name="Poverty Rate" radius={[0, 4, 4, 0]}>
                      {povertyByRace.map((entry, i) => (
                        <Cell key={i} fill={entry.rate > 40 ? COLORS.rust : entry.rate > 25 ? COLORS.amber : COLORS.sage} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <KPICard label="White (Non-Hispanic)" value="57.1%" sub="Largest single group" accent={COLORS.sky} />
              <KPICard label="Hispanic / Latino" value="14.6%" sub="52% Puerto Rican origin" accent={COLORS.amber} />
              <KPICard label="Black / African American" value="14.5%" sub="Poverty rate 50.7%" accent={COLORS.rust} />
              <KPICard label="Asian" value="11.0%" sub="Refugee communities incl." accent={COLORS.sage} />
              <KPICard label="Foreign-Born" value="21.3%" sub="90.8% are citizens" accent={COLORS.muted} />
            </div>
          </div>
        )}

        {/* ECONOMY */}
        {activeTab === "Economy" && (
          <div>
            <SectionTitle>Economic Indicators</SectionTitle>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
              <KPICard label="Median HH Income" value="$52,484" sub="↑ 6.9% from 2022" accent={COLORS.sage} />
              <KPICard label="Per Capita Income" value="$41,209" sub="vs. ~$40k national" />
              <KPICard label="Poverty Rate" value="27.5%" sub="23.1% of families" accent={COLORS.rust} />
              <KPICard label="Child Poverty" value="38.0%" sub="Under age 18" accent={COLORS.rust} />
              <KPICard label="Homeownership" value="50%" sub="Median value $133,400" />
              <KPICard label="Avg Commute" value="18.7 min" sub="Most drive alone" accent={COLORS.muted} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <ChartCard title="Household Income Distribution">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={incomeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
                    <XAxis dataKey="bracket" tick={{ fill: COLORS.textDim, fontSize: 10 }} />
                    <YAxis tick={{ fill: COLORS.textDim, fontSize: 11 }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="pct" name="Households %" fill={COLORS.gold} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Top Employment Sectors (workers)">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={employmentSectors} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
                    <XAxis type="number" tick={{ fill: COLORS.textDim, fontSize: 10 }} />
                    <YAxis type="category" dataKey="sector" tick={{ fill: COLORS.text, fontSize: 10 }} width={130} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="workers" name="Workers" fill={COLORS.sky} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20, marginTop: 16 }}>
              <SectionTitle>Gender Wage Gap (Best-Paying Sectors)</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 12 }}>
                <div>
                  <div style={{ color: COLORS.sky, fontWeight: 600, marginBottom: 8 }}>Men — Top Earning Sectors</div>
                  {[["Public Administration", "$68,750"], ["Finance & Insurance", "$60,568"], ["Information", "$60,548"]].map(([s, v]) => (
                    <div key={s} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text }}>
                      <span>{s}</span><span style={{ color: COLORS.gold }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ color: COLORS.amber, fontWeight: 600, marginBottom: 8 }}>Women — Top Earning Sectors</div>
                  {[["Information", "$45,192"], ["Finance & Insurance", "$44,640"], ["Healthcare / Education", "$41,700"]].map(([s, v]) => (
                    <div key={s} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text }}>
                      <span>{s}</span><span style={{ color: COLORS.gold }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CRIME */}
        {activeTab === "Crime" && (
          <div>
            <SectionTitle>Crime Statistics (FBI UCR 2024)</SectionTitle>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
              <KPICard label="Violent Crime Rate" value="568" sub="per 100k — 53.6% above national" accent={COLORS.rust} />
              <KPICard label="Property Crime Rate" value="3,408" sub="per 100k — 74.4% above national" accent={COLORS.amber} />
              <KPICard label="Overall Crime Index" value="289" sub="1.2× U.S. avg (235.3)" accent={COLORS.rust} />
              <KPICard label="Safest in NY" value="Top 3%" sub="Less safe than 97% of NY cities" accent={COLORS.rust} />
              <KPICard label="Homicides (2024)" value="6" sub="↓1 from 2023" accent={COLORS.muted} />
              <KPICard label="Crime Trend" value="↓3%" sub="2024 vs 2023 (overall)" accent={COLORS.sage} />
            </div>

            <ChartCard title="Utica vs. National vs. NY State Crime Rates (per 100k residents)" style={{ marginBottom: 16 }}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={crimeComparison} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: COLORS.text, fontSize: 12 }} />
                  <YAxis tick={{ fill: COLORS.textDim, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={(v) => <span style={{ color: COLORS.textDim, fontSize: 11 }}>{v}</span>} />
                  <Bar dataKey="utica" name="Utica" fill={COLORS.rust} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="national" name="National Avg" fill={COLORS.muted} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ny" name="NY State" fill={COLORS.steel} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.rust}22`, borderRadius: 10, padding: 20 }}>
              <SectionTitle>Context & Trends</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13, color: COLORS.textDim, lineHeight: 1.7 }}>
                <div>
                  <strong style={{ color: COLORS.text }}>Safety Rank:</strong> Utica ranks #388 safest out of 404 NY cities — placing it in the bottom tier statewide. However, the 2024 overall crime rate fell 3% year-over-year, and the last 5 years show a <strong style={{ color: COLORS.sage }}>declining violent crime trend</strong>.
                </div>
                <div>
                  <strong style={{ color: COLORS.text }}>Gun Violence Initiative:</strong> Utica is a Tier I agency in NY State's <em>Gun Involved Violence Elimination (GIVE)</em> program — one of 14 cities statewide focused on reducing shootings and firearm-related fatalities.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DEMOGRAPHICS */}
        {activeTab === "Demographics" && (
          <div>
            <SectionTitle>Population Demographics</SectionTitle>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
              <KPICard label="Median Age" value="35.2" sub="vs. 38.8 national" />
              <KPICard label="Under 18" value="25.2%" sub="vs. 22.5% national" accent={COLORS.sky} />
              <KPICard label="Senior 65+" value="15.0%" sub="vs. 16.0% national" accent={COLORS.muted} />
              <KPICard label="English Only HH" value="67.8%" sub="7.8% Spanish only" accent={COLORS.muted} />
              <KPICard label="Married (15+)" value="45%" sub="45% have children <18" />
              <KPICard label="Pop Density" value="3,587/mi²" sub="39× national avg (91)" accent={COLORS.sky} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <ChartCard title="Age Distribution">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={ageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
                    <XAxis dataKey="group" tick={{ fill: COLORS.textDim, fontSize: 11 }} />
                    <YAxis tick={{ fill: COLORS.textDim, fontSize: 11 }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="pct" name="% of Population" radius={[4, 4, 0, 0]}>
                      {ageData.map((_, i) => <Cell key={i} fill={i < 2 ? COLORS.sky : i < 4 ? COLORS.gold : COLORS.muted} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Education & Language Snapshot">
                <div style={{ fontSize: 13, lineHeight: 1.9, color: COLORS.textDim, marginTop: 8 }}>
                  {[
                    ["Largest University", "Utica University (1,306 degrees/yr)"],
                    ["Community College", "Mohawk Valley Community College"],
                    ["Languages at Home", "20+ languages spoken"],
                    ["Bosnian speakers", "~4.6% (2000 data — likely higher now)"],
                    ["Spanish speakers", "~5%"],
                    ["Vietnamese speakers", "~1.5%"],
                    ["Avg Cars / HH", "2 per household"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${COLORS.border}`, padding: "5px 0" }}>
                      <span>{k}</span>
                      <span style={{ color: COLORS.text, fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20, marginTop: 16 }}>
              <SectionTitle>Housing Snapshot</SectionTitle>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <KPICard label="Median Home Value" value="$133,400" sub="ACS 2023" accent={COLORS.sky} />
                <KPICard label="Homeownership Rate" value="50%" sub="vs. ~66% national" />
                <KPICard label="Housing Units" value="28,166" sub="Density: 1,697/mi²" accent={COLORS.muted} />
                <KPICard label="HH Below $25k" value="30%" sub="High cost burden risk" accent={COLORS.rust} />
              </div>
            </div>
          </div>
        )}

        {/* RESOURCES */}
        {activeTab === "Resources" && <ResourceDirectory />}

      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "14px 32px", display: "flex", justifyContent: "space-between", fontSize: 10, color: COLORS.textDim }}>
        <span>Sources: U.S. Census Bureau ACS 2019–2023 · FBI Uniform Crime Reports 2024 · NY DCJS · DataUSA · World Population Review</span>
        <span>Dashboard built April 2026</span>
      </div>
    </div>
  );
}
