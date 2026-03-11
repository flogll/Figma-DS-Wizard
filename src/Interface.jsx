import { useState } from "react";
import {
  MONO, SANS,
  COMPONENT_CATALOG, DEFAULT_CONFIG,
  buildTodoItems, generateJSON, generateSpecsMd, generateTodoMd,
  getContrastRatio, getClosestAAAColor
} from "./logic.js";

// ─── UI HELPERS ───────────────────────────────────────────────────────────────

/** Base style object for text inputs */
const inp = (extra = {}) => ({
  fontFamily: MONO, fontSize: 12, padding: "6px 10px",
  borderRadius: 6, border: "1.5px solid #e5e7eb",
  background: "#fff", color: "#1a1a2e", outline: "none",
  boxSizing: "border-box", ...extra,
});

// ─── REUSABLE UI COMPONENTS ───────────────────────────────────────────────────

const BtnPrimary = ({ onClick, disabled, children, style = {} }) => (
  <button onClick={onClick} disabled={disabled} style={{
    fontFamily: SANS, padding: "10px 18px", borderRadius: 8, border: "none",
    background: disabled ? "#e5e7eb" : "#4f46e5",
    color: disabled ? "#9ca3af" : "#fff",
    fontSize: 13, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", ...style,
  }}>{children}</button>
);

const BtnSecondary = ({ onClick, disabled, children, style = {} }) => (
  <button onClick={onClick} disabled={disabled} style={{
    fontFamily: SANS, padding: "10px 18px", borderRadius: 8,
    border: "1.5px solid #e5e7eb", background: "#fff",
    color: disabled ? "#d1d5db" : "#374151",
    fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", ...style,
  }}>{children}</button>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

const StepDots = ({ current, total, onClick }) => (
  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 24 }}>
    {Array.from({ length: total }).map((_, i) => (
      <button key={i} onClick={() => onClick(i)} style={{
        width: i === current ? 24 : 8, height: 8, borderRadius: 999, border: "none",
        background: i < current ? "#1a1a2e" : i === current ? "#4f46e5" : "#e5e7eb",
        cursor: "pointer", transition: "all 0.2s", padding: 0,
      }} />
    ))}
    <span style={{ fontFamily: SANS, fontSize: 11, color: "#9ca3af", marginLeft: 4 }}>Étape {current + 1}/{total}</span>
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("variables");
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [variablesConfigured, setVariablesConfigured] = useState(false);
  const [componentsConfirmed, setComponentsConfirmed] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState(() => {
    const i = {}; Object.keys(COMPONENT_CATALOG).forEach(g => { i[g] = []; }); return i;
  });
  const [todoChecked, setTodoChecked] = useState({});
  const [todoCategoryIdx, setTodoCategoryIdx] = useState(0);

  const totalSelected = Object.values(selectedComponents).flat().length;
  const allComps = Object.values(COMPONENT_CATALOG).flat();
  const GROUPS = Object.keys(COMPONENT_CATALOG);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const toggleComponent = (group, id) => {
    setSelectedComponents(prev => ({
      ...prev,
      [group]: prev[group].includes(id) ? prev[group].filter(x => x !== id) : [...prev[group], id],
    }));
  };

  const toggleSelectAll = (group) => {
    const all = COMPONENT_CATALOG[group].map(c => c.id);
    const current = selectedComponents[group] || [];
    const allSelected = all.every(id => current.includes(id));
    setSelectedComponents(prev => ({ ...prev, [group]: allSelected ? [] : all }));
  };

  const toggleSelectAllGlobal = () => {
    const allIds = Object.entries(COMPONENT_CATALOG).reduce((acc, [g, comps]) => ({ ...acc, [g]: comps.map(c => c.id) }), {});
    const currentTotal = Object.values(selectedComponents).flat().length;
    const totalAll = allComps.length;
    if (currentTotal === totalAll) {
      const empty = {}; GROUPS.forEach(g => { empty[g] = []; }); setSelectedComponents(empty);
    } else {
      setSelectedComponents(allIds);
    }
  };

  const handleDownload = (content, filename, mime) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const el = document.createElement("a"); el.href = url; el.download = filename; el.click();
    URL.revokeObjectURL(url);
  };

  // ── Variables Steps ────────────────────────────────────────────────────────

  const STEPS = ["Fonds & couleurs neutres", "Palettes d'accent", "Typographie", "Résumé & Export"];

  const renderStep0 = () => (
    <div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {[
        { 
          label: "Normal", 
          bgKey: "bgLight", fgKey: "ink", 
          bgLabel: "Background Light", fgLabel: "Text (ink)",
          targetLead: 4.5, targetBody: 7 
        },
        { 
          label: "Reverse", 
          bgKey: "bgDark", fgKey: "paper", 
          bgLabel: "Background Dark", fgLabel: "Text inverse (paper)",
          targetLead: 4.5, targetBody: 7 
        }
      ].map((mode) => (
        <div key={mode.label}>
          <Section title={mode.label}>
            {/* Sélecteurs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              {[
                { key: mode.bgKey, label: mode.bgLabel },
                { key: mode.fgKey, label: mode.fgLabel }
              ].map(({ key, label }) => (
                <div key={key}>
                  <label style={{ fontFamily: SANS, fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>{label}</label>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="color" value={config[key]} onChange={e => setConfig(p => ({ ...p, [key]: e.target.value }))}
                      style={{ width: 36, height: 34, border: "none", borderRadius: 6, cursor: "pointer", padding: 2, flexShrink: 0 }} />
                    <input type="text" value={config[key]} onChange={e => setConfig(p => ({ ...p, [key]: e.target.value }))} style={inp({ flex: 1 })} />
                  </div>
                </div>
              ))}
            </div>

            {/* Previews verticalement */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Lead Preview */}
              {(() => {
                const fg = config[mode.fgKey];
                const bg = config[mode.bgKey];
                const ratio = getContrastRatio(fg, bg);
                const isOk = ratio >= mode.targetLead;
                const suggested = isOk ? null : getClosestAAAColor(fg, bg, mode.targetLead);
                const tooltip = isOk 
                  ? `Contraste AAA conforme : ${ratio.toFixed(2)}:1` 
                  : `⚠️ Insuffisant : ${ratio.toFixed(2)}:1. Suggéré : ${suggested}`;
                
                return (
                  <div title={tooltip} style={{ 
                    padding: 16, background: bg, borderRadius: 8, display: "flex", flexDirection: "column", gap: 6,
                    border: `2px solid ${isOk ? "transparent" : "#ef4444"}`,
                    transition: "all 0.2s"
                  }}>
                    <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: fg, opacity: 0.5, textTransform: "uppercase" }}>Lead</div>
                    <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 400, color: fg, lineHeight: 1.2 }}>Texte Lead principal</div>
                    <div style={{ fontFamily: SANS, fontSize: 11, color: fg, opacity: 0.8 }}>{`AAA 4.5:1 (${ratio.toFixed(2)}:1)`}</div>
                  </div>
                );
              })()}

              {/* Body Preview */}
              {(() => {
                const fg = config[mode.fgKey];
                const bg = config[mode.bgKey];
                const ratio = getContrastRatio(fg, bg);
                const isOk = ratio >= mode.targetBody;
                const suggested = isOk ? null : getClosestAAAColor(fg, bg, mode.targetBody);
                const tooltip = isOk 
                  ? `Contraste AAA conforme : ${ratio.toFixed(2)}:1` 
                  : `⚠️ Insuffisant : ${ratio.toFixed(2)}:1. Suggéré : ${suggested}`;

                return (
                  <div title={tooltip} style={{ 
                    padding: 16, background: bg, borderRadius: 8, display: "flex", flexDirection: "column", gap: 6,
                    border: `2px solid ${isOk ? "transparent" : "#ef4444"}`,
                    transition: "all 0.2s"
                  }}>
                    <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: fg, opacity: 0.5, textTransform: "uppercase" }}>Body</div>
                    <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: fg }}>Texte principal du corps</div>
                    <div style={{ fontFamily: SANS, fontSize: 13, color: fg, opacity: 0.9 }}>Texte secondaire (90%)</div>
                    <div style={{ fontFamily: SANS, fontSize: 12, color: fg, opacity: 0.8 }}>Texte tertiaire (80%)</div>
                    <div style={{ fontFamily: SANS, fontSize: 11, color: fg, opacity: 0.8, marginTop: 4 }}>{`AAA 7:1 (${ratio.toFixed(2)}:1)`}</div>
                  </div>
                );
              })()}
            </div>
          </Section>
        </div>
      ))}
    </div>
    </div>
  );

  const renderStep1 = () => (
    <div>
      <Section title="Palettes d'accent">
        {config.accents.map((acc, ai) => (
          <div key={ai} style={{ marginBottom: 14, padding: 16, borderRadius: 10, border: "1.5px solid #e5e7eb" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <input type="text" value={acc.name} onChange={e => { const a = [...config.accents]; a[ai] = { ...a[ai], name: e.target.value }; setConfig(p => ({ ...p, accents: a })); }} style={inp({ fontWeight: 700, fontSize: 13, width: 130 })} />
              {config.accents.length > 1 && (
                <button onClick={() => setConfig(p => ({ ...p, accents: p.accents.filter((_, i) => i !== ai) }))}
                  style={{ fontFamily: SANS, marginLeft: "auto", padding: "3px 10px", borderRadius: 6, border: "1px solid #fecaca", background: "#fef2f2", color: "#dc2626", fontSize: 11, cursor: "pointer" }}>
                  Supprimer
                </button>
              )}
            </div>
            {/* Colonnes Normal vs Reverse */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { label: "Normal", field: "shades", bg: config.bgLight, targetLead: 4.5, targetBody: 7 },
                { label: "Reverse", field: "reverseShades", bg: config.bgDark, targetLead: 4.5, targetBody: 7 }
              ].map((mode) => (
                <div key={mode.field}>
                  {/* Titre de colonne */}
                  <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>{mode.label}</div>
                  
                  {/* Sélecteurs */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                    {["100", "500", "900"].map(shade => (
                      <div key={shade}>
                        <div style={{ fontFamily: SANS, fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>Teinte {shade}</div>
                        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                          <input type="color" value={acc[mode.field][shade]} onChange={e => {
                            const a = [...config.accents]; a[ai] = { ...a[ai], [mode.field]: { ...a[ai][mode.field], [shade]: e.target.value } }; setConfig(p => ({ ...p, accents: a }));
                          }} style={{ width: 30, height: 28, border: "none", borderRadius: 4, cursor: "pointer", padding: 2, flexShrink: 0 }} />
                          <input type="text" value={acc[mode.field][shade]} onChange={e => {
                            const a = [...config.accents]; a[ai] = { ...a[ai], [mode.field]: { ...a[ai][mode.field], [shade]: e.target.value } }; setConfig(p => ({ ...p, accents: a }));
                          }} style={inp({ flex: 1, fontSize: 11 })} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Previews verticalement */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                     {/* Lead Preview */}
                     {(() => {
                        const fg = acc[mode.field]["500"];
                        const bg = mode.bg;
                        const ratio = getContrastRatio(fg, bg);
                        const isOk = ratio >= mode.targetLead;
                        const suggested = isOk ? null : getClosestAAAColor(fg, bg, mode.targetLead);
                        const tooltip = isOk 
                          ? `Contraste AAA conforme : ${ratio.toFixed(2)}:1` 
                          : `⚠️ Insuffisant : ${ratio.toFixed(2)}:1. Suggéré : ${suggested}`;
                        
                        return (
                          <div title={tooltip} style={{ 
                            padding: 16, background: bg, borderRadius: 8, display: "flex", flexDirection: "column", gap: 6,
                            border: `2px solid ${isOk ? "transparent" : "#ef4444"}`,
                            transition: "all 0.2s"
                          }}>
                            <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: fg, opacity: 0.5, textTransform: "uppercase" }}>Lead</div>
                            <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 400, color: fg, lineHeight: 1.2 }}>Lead accent</div>
                            <div style={{ fontFamily: SANS, fontSize: 11, color: fg, opacity: 0.8 }}>{`AAA 4.5:1 (${ratio.toFixed(2)}:1)`}</div>
                          </div>
                        );
                     })()}

                     {/* Body Preview */}
                     {(() => {
                        const bg = acc[mode.field]["100"];
                        const fg = acc[mode.field]["900"];
                        const ratio = getContrastRatio(fg, bg);
                        const isOk = ratio >= mode.targetBody;
                        const suggested = isOk ? null : getClosestAAAColor(fg, bg, mode.targetBody);
                        const tooltip = isOk 
                          ? `Contraste AAA conforme : ${ratio.toFixed(2)}:1` 
                          : `⚠️ Insuffisant : ${ratio.toFixed(2)}:1. Suggéré : ${suggested}`;

                        return (
                          <div title={tooltip} style={{ 
                            padding: 16, background: bg, borderRadius: 8, display: "flex", flexDirection: "column", gap: 6,
                            border: `2px solid ${isOk ? "transparent" : "#ef4444"}`,
                            transition: "all 0.2s"
                          }}>
                            <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: fg, opacity: 0.5, textTransform: "uppercase" }}>Body</div>
                            <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: fg }}>Texte on-brand body</div>
                            <div style={{ fontFamily: SANS, fontSize: 11, color: fg, opacity: 0.8 }}>{`AAA 7:1 (${ratio.toFixed(2)}:1)`}</div>
                          </div>
                        );
                     })()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={() => setConfig(p => ({ ...p, accents: [...p.accents, { name: `accent${p.accents.length + 1}`, shades: { 100: "#E0E7FF", 500: "#6366F1", 900: "#1E1B4B" }, reverseShades: { 100: "#1E1B4B", 500: "#6366F1", 900: "#E0E7FF" } }] }))}
          style={{ fontFamily: SANS, width: "100%", padding: "10px", borderRadius: 8, border: "1.5px dashed #d1d5db", background: "transparent", fontSize: 13, color: "#6b7280", cursor: "pointer" }}>
          + Ajouter une palette
        </button>
      </Section>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <Section title="Polices de caractères">
        {[["heading", "Heading"], ["lead", "Lead"], ["body", "Body regular"], ["body-serif", "Body serif (optionnel)"], ["small", "Small & Meta"]].map(([key, label]) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <label style={{ fontFamily: SANS, fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4 }}>{label}</label>
            <input type="text" value={config.fonts[key] || ""} onChange={e => setConfig(p => ({ ...p, fonts: { ...p.fonts, [key]: e.target.value } }))}
              placeholder={key === "body-serif" ? "Laisser vide si non utilisé" : ""} style={inp({ width: "100%" })} />
          </div>
        ))}
      </Section>
      <Section title="Aperçu Normal / Reverse">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: 10, overflow: "hidden", border: "1px solid #e5e7eb" }}>
          {[{ bg: config.bgLight, fg: config.ink, label: "Normal" }, { bg: config.bgDark, fg: config.paper, label: "Reverse" }].map(({ bg, fg, label }) => (
            <div key={label} style={{ padding: 18, background: bg }}>
              <div style={{ fontFamily: SANS, fontSize: 9, fontWeight: 700, color: fg, opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{label}</div>
              {config.fonts.heading && <div style={{ fontFamily: config.fonts.heading, fontSize: 20, color: fg, marginBottom: 5, lineHeight: 1.2 }}>Heading</div>}
              {config.fonts.lead && <div style={{ fontFamily: config.fonts.lead, fontSize: 14, color: fg, opacity: 0.85, marginBottom: 4 }}>Lead</div>}
              {config.fonts.body && <div style={{ fontFamily: config.fonts.body, fontSize: 12, color: fg, opacity: 0.7, marginBottom: 4 }}>Body regular</div>}
              {config.fonts["body-serif"] && <div style={{ fontFamily: config.fonts["body-serif"], fontSize: 12, color: fg, opacity: 0.7, marginBottom: 4, fontStyle: "italic" }}>Body serif</div>}
              {config.fonts.small && <div style={{ fontFamily: config.fonts.small, fontSize: 10, color: fg, opacity: 0.5 }}>Small & Meta</div>}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <Section title="Typographie">
        <div style={{ padding: 14, borderRadius: 10, border: "1.5px solid #e5e7eb", marginBottom: 16 }}>
          {Object.entries(config.fonts).map(([role, val]) => val ? (
            <div key={role} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, fontSize: 12 }}>
              <span style={{ fontFamily: SANS, color: "#6b7280", textTransform: "capitalize" }}>{role}</span>
              <span style={{ fontFamily: MONO, color: "#1a1a2e", fontWeight: 600, fontSize: 12 }}>{val}</span>
            </div>
          ) : null)}
        </div>
      </Section>
      <Section title="Collections générées">
        <div style={{ padding: 14, borderRadius: 10, border: "1.5px solid #e5e7eb", marginBottom: 16 }}>
          {[["01 – Primitives", "~150 variables", "Value"], ["02 – Sémantique", "~90 variables", "Normal / Reverse"], ["03 – Composants", "~40 variables", "Normal / Reverse"], ["04 – Responsive", "~70 variables", "Desktop / Tablette / Mobile / Slides"]].map(([name, count, modes]) => (
            <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>{name}</span>
              <span style={{ fontFamily: SANS, fontSize: 11, color: "#6b7280" }}>{count} · {modes}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Accents">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {config.accents.map(acc => (
            <div key={acc.name} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fafafa" }}>
              <div style={{ display: "flex", gap: 2 }}>{["100", "500", "900"].map(s => <div key={s} style={{ width: 10, height: 10, borderRadius: 2, background: acc.shades[s] }} />)}</div>
              <span style={{ fontFamily: SANS, fontSize: 12, color: "#374151" }}>{acc.name}</span>
            </div>
          ))}
        </div>
      </Section>
      <div style={{ display: "flex", gap: 10 }}>
        <BtnPrimary onClick={() => { setVariablesConfigured(true); setTab("composants"); }} style={{ flex: 1 }}>
          Enregistrer et passer aux composants →
        </BtnPrimary>
        <BtnSecondary onClick={() => {
          const json = generateJSON(config);
          handleDownload(JSON.stringify(json, null, 2), "figma-variables.json", "application/json");
          setVariablesConfigured(true);
        }}>
          ↓ Exporter JSON
        </BtnSecondary>
      </div>
    </div>
  );

  // ── Composants ─────────────────────────────────────────────────────────────

  const renderComposants = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <p style={{ fontFamily: SANS, fontSize: 13, color: "#6b7280", margin: 0 }}>Sélectionnez les composants à documenter et à inclure dans la to-do.</p>
        <button onClick={toggleSelectAllGlobal} style={{ fontFamily: SANS, padding: "4px 12px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fafafa", fontSize: 11, color: "#374151", cursor: "pointer", whiteSpace: "nowrap" }}>
          {Object.values(selectedComponents).flat().length === allComps.length ? "Tout désélectionner" : "Tout sélectionner"}
        </button>
      </div>
      {GROUPS.map(group => {
        const comps = COMPONENT_CATALOG[group];
        const sel = selectedComponents[group] || [];
        const allSel = comps.every(c => sel.includes(c.id));
        return (
          <div key={group} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", gap: 6, alignItems: "center" }}>
                {group}<span style={{ fontWeight: 400, color: "#d1d5db" }}>{sel.length}/{comps.length}</span>
              </div>
              <button onClick={() => toggleSelectAll(group)} style={{ fontFamily: SANS, padding: "2px 10px", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", fontSize: 10, color: "#6b7280", cursor: "pointer" }}>
                {allSel ? "Tout désélectionner" : "Tout sélectionner"}
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
              {comps.map(comp => {
                const active = sel.includes(comp.id);
                return (
                  <button key={comp.id} onClick={() => toggleComponent(group, comp.id)} style={{
                    padding: "10px 12px", borderRadius: 10, border: "1.5px solid", textAlign: "left", cursor: "pointer",
                    background: active ? "#f0f0ff" : "#fafafa", borderColor: active ? "#4f46e5" : "#e5e7eb", transition: "all 0.12s",
                  }}>
                    <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: active ? "#4f46e5" : "#1a1a2e", marginBottom: 2 }}>{active ? "✓ " : ""}{comp.name}</div>
                    <div style={{ fontFamily: SANS, fontSize: 11, color: "#9ca3af" }}>{comp.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <div style={{ position: "sticky", bottom: 0, background: "#f9fafb", paddingTop: 12, borderTop: "1px solid #e5e7eb", marginTop: 8, display: "flex", gap: 10 }}>
        <BtnPrimary onClick={() => { setComponentsConfirmed(true); setTab("todo"); }} disabled={totalSelected === 0} style={{ flex: 1 }}>
          Enregistrer et ouvrir la to-do ({totalSelected}) →
        </BtnPrimary>
        <BtnSecondary onClick={() => handleDownload(generateSpecsMd(config, selectedComponents), "composants-specs.md", "text/markdown")} disabled={totalSelected === 0}>
          ↓ Specs MD
        </BtnSecondary>
      </div>
    </div>
  );

  // ── Todo ────────────────────────────────────────────────────────────────────

  const renderTodo = () => {
    const flatSelected = GROUPS.flatMap(g => (selectedComponents[g] || []).map(id => ({ group: g, id })));

    if (flatSelected.length === 0) return (
      <div style={{ textAlign: "center", padding: "40px 20px", color: "#9ca3af" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>☐</div>
        <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Aucun composant sélectionné</div>
        <div style={{ fontFamily: SANS, fontSize: 12 }}>Allez dans <strong>Composants</strong> pour faire votre sélection.</div>
      </div>
    );

    if (!variablesConfigured || !componentsConfirmed) return (
      <div style={{ borderRadius: 10, border: "1.5px solid #fde68a", background: "#fffbeb", padding: 16 }}>
        <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>⚠️ Configuration incomplète</div>
        <div style={{ fontFamily: SANS, fontSize: 12, color: "#78350f", marginBottom: 12 }}>
          {!variablesConfigured && "Les variables n'ont pas été générées. "}
          {!componentsConfirmed && "Les composants n'ont pas été confirmés. "}
          Les tokens affichés seront ceux du modèle par défaut.
        </div>
        <BtnPrimary onClick={() => { setVariablesConfigured(true); setComponentsConfirmed(true); }}>Continuer avec le modèle par défaut</BtnPrimary>
      </div>
    );

    const groupsWithComps = GROUPS.map(g => ({
      group: g,
      comps: (selectedComponents[g] || []).map(id => allComps.find(c => c.id === id)).filter(Boolean),
    })).filter(({ comps }) => comps.length > 0);

    if (groupsWithComps.length === 0) return null;

    const catIdx = Math.min(todoCategoryIdx, groupsWithComps.length - 1);
    const { group: currentGroup, comps: currentComps } = groupsWithComps[catIdx];

    const categoryItems = currentComps.flatMap(comp => buildTodoItems(comp));
    const catChecked = categoryItems.filter(it => todoChecked[it.id]).length;
    const catTotal = categoryItems.length;
    const catDone = catChecked === catTotal && catTotal > 0;

    const categoryProgress = groupsWithComps.map(({ group: g, comps: cs }) => {
      const items = cs.flatMap(comp => buildTodoItems(comp));
      const done = items.filter(it => todoChecked[it.id]).length;
      return { group: g, done, total: items.length };
    });
    const globalDone = categoryProgress.filter(cp => cp.done === cp.total && cp.total > 0).length;

    return (
      <div>
        {/* Global progress bar */}
        <div style={{ padding: "12px 16px", borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#374151" }}>Progression globale</span>
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#4f46e5" }}>{globalDone}/{groupsWithComps.length} catégories</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {groupsWithComps.map(({ group: g }, i) => {
              const cp = categoryProgress[i];
              const isDone = cp.done === cp.total && cp.total > 0;
              const isActive = i === catIdx;
              return (
                <button key={g} onClick={() => setTodoCategoryIdx(i)} title={g} style={{
                  flex: 1, height: 6, borderRadius: 999, border: "none", cursor: "pointer", padding: 0,
                  background: isDone ? "#16a34a" : isActive ? "#4f46e5" : "#e5e7eb",
                  outline: isActive ? "2px solid #818cf8" : "none", outlineOffset: 2,
                  transition: "all 0.2s",
                }} />
              );
            })}
          </div>
        </div>

        {/* Category header */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <h2 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 800, color: catDone ? "#16a34a" : "#1a1a2e", margin: 0 }}>{currentGroup}</h2>
            <span style={{ fontFamily: SANS, fontSize: 12, color: "#6b7280" }}>{catChecked} / {catTotal} propriétés cochées</span>
          </div>
          {catDone && <div style={{ fontFamily: SANS, fontSize: 12, color: "#16a34a", marginTop: 4 }}>✓ Catégorie complète</div>}
        </div>

        {/* Category nav pills */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
          {groupsWithComps.map(({ group: g }, i) => {
            const cp = categoryProgress[i];
            const isDone = cp.done === cp.total && cp.total > 0;
            return (
              <button key={g} onClick={() => setTodoCategoryIdx(i)} style={{
                fontFamily: SANS, padding: "4px 12px", borderRadius: 999, border: "1.5px solid",
                fontSize: 11, fontWeight: 600, cursor: "pointer",
                background: i === catIdx ? "#1a1a2e" : "transparent",
                color: i === catIdx ? "#fff" : isDone ? "#16a34a" : "#6b7280",
                borderColor: i === catIdx ? "#1a1a2e" : isDone ? "#86efac" : "#e5e7eb",
              }}>
                {isDone ? "✓ " : ""}{g}
              </button>
            );
          })}
        </div>

        {/* Components in current category */}
        {currentComps.map(comp => {
          const items = buildTodoItems(comp);
          const compDone = items.filter(it => todoChecked[it.id]).length;
          const isCompDone = compDone === items.length;
          return (
            <div key={comp.id} style={{ marginBottom: 12, borderRadius: 10, border: `1.5px solid ${isCompDone ? "#bbf7d0" : "#e5e7eb"}`, overflow: "hidden", background: isCompDone ? "#f0fdf4" : "#fff" }}>
              <div style={{ padding: "10px 14px", borderBottom: `1px solid ${isCompDone ? "#bbf7d0" : "#f3f4f6"}`, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 18, height: 18, borderRadius: 999, border: "2px solid", borderColor: isCompDone ? "#16a34a" : "#d1d5db", background: isCompDone ? "#16a34a" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", flexShrink: 0 }}>
                  {isCompDone ? "✓" : ""}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{comp.name}</div>
                  <div style={{ fontFamily: SANS, fontSize: 11, color: "#6b7280" }}>{compDone}/{items.length} propriétés</div>
                </div>
                <button onClick={() => {
                  const all = !items.every(it => todoChecked[it.id]);
                  const next = { ...todoChecked };
                  items.forEach(it => { next[it.id] = all; });
                  setTodoChecked(next);
                }} style={{ fontFamily: SANS, padding: "3px 10px", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", fontSize: 10, color: "#6b7280", cursor: "pointer" }}>
                  {items.every(it => todoChecked[it.id]) ? "Tout décocher" : "Tout cocher"}
                </button>
              </div>
              <div style={{ padding: "10px 14px" }}>
                {items.map(item => {
                  const done = !!todoChecked[item.id];
                  const isL2 = item.level === 2;
                  return (
                    <label key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7, cursor: "pointer", paddingLeft: isL2 ? 24 : 0 }}>
                      <input type="checkbox" checked={done} onChange={() => setTodoChecked(p => ({ ...p, [item.id]: !p[item.id] }))}
                        style={{ accentColor: "#4f46e5", flexShrink: 0, width: 14, height: 14 }} />
                      <span style={{ fontFamily: isL2 ? MONO : SANS, fontSize: isL2 ? 11 : 12, fontWeight: item.isState ? 700 : 400, color: done ? "#9ca3af" : "#1a1a2e", textDecoration: done ? "line-through" : "none", lineHeight: 1.3 }}>
                        {item.label}
                        {item.var && <span style={{ fontFamily: MONO, fontSize: 10, color: "#9ca3af", marginLeft: 8 }}>→ {item.var}</span>}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Nav prev/next + export */}
        <div style={{ display: "flex", gap: 10, marginTop: 8, alignItems: "center" }}>
          <BtnSecondary onClick={() => setTodoCategoryIdx(i => Math.max(0, i - 1))} disabled={catIdx === 0} style={{ padding: "8px 14px" }}>← Préc.</BtnSecondary>
          <BtnPrimary onClick={() => setTodoCategoryIdx(i => Math.min(groupsWithComps.length - 1, i + 1))} disabled={catIdx === groupsWithComps.length - 1} style={{ flex: 1 }}>
            Suivant : {catIdx < groupsWithComps.length - 1 ? groupsWithComps[catIdx + 1].group : "—"} →
          </BtnPrimary>
          <BtnSecondary onClick={() => handleDownload(generateTodoMd(selectedComponents, todoChecked), "todo-composants.md", "text/markdown")} style={{ padding: "8px 14px" }}>
            ↓ MD
          </BtnSecondary>
        </div>
      </div>
    );
  };

  // ── Shell ───────────────────────────────────────────────────────────────────

  const TABS = [{ id: "variables", label: "Variables" }, { id: "composants", label: "Composants" }, { id: "todo", label: "To-do" }];

  return (
    <div style={{ fontFamily: SANS, minHeight: "100vh", background: "#f9fafb", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ background: "#1a1a2e", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 52, flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Figma DS Generator</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Design System Wizard</div>
        </div>
        <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: 3 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              fontFamily: SANS, padding: "5px 16px", borderRadius: 7, border: "none", cursor: "pointer",
              fontSize: 12, fontWeight: 600,
              background: tab === t.id ? "#fff" : "transparent",
              color: tab === t.id ? "#1a1a2e" : "rgba(255,255,255,0.55)",
              transition: "all 0.15s",
            }}>
              {t.label}
              {t.id === "todo" && totalSelected > 0 && (
                <span style={{ marginLeft: 5, background: tab === "todo" ? "#4f46e5" : "rgba(255,255,255,0.15)", color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 999 }}>{totalSelected}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "20px 16px" }}>
          {tab === "variables" && (
            <>
              <StepDots current={step} total={STEPS.length} onClick={setStep} />
              <div style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e5e7eb", padding: 22, marginBottom: 14 }}>
                <h2 style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 4px" }}>{STEPS[step]}</h2>
                <div style={{ height: 2, width: 28, background: "#4f46e5", borderRadius: 2, marginBottom: 18 }} />
                {step === 0 && renderStep0()}
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <BtnSecondary onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>← Précédent</BtnSecondary>
                {step < STEPS.length - 1 && <BtnPrimary onClick={() => setStep(s => s + 1)}>Suivant →</BtnPrimary>}
              </div>
            </>
          )}
          {tab === "composants" && renderComposants()}
          {tab === "todo" && renderTodo()}
        </div>
      </div>
    </div>
  );
}
