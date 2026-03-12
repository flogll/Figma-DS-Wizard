// ─── CONSTANTS ────────────────────────────────────────────────────────────────
export const MONO = "'SF Mono','Fira Code','Fira Mono','Roboto Mono',monospace";
export const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif";

export const SPACING_SCALE = {
  "0":0,"px":1,"0.5":2,"1":4,"1.5":6,"2":8,"2.5":10,"3":12,"3.5":14,
  "4":16,"5":20,"6":24,"7":28,"8":32,"9":36,"10":40,"11":44,"12":48,
  "14":56,"16":64,"20":80,"24":96,"28":112,"32":128,"36":144,"40":160,
  "44":176,"48":192,"52":208,"56":224,"60":240,"64":256,"72":288,"80":320,"96":384
};

export const RADIUS_SCALE = { none:0,sm:2,base:4,md:6,lg:8,xl:12,"2xl":16,"3xl":24,full:9999 };

// ─── COMPONENT CATALOG ────────────────────────────────────────────────────────
// isComplex = has both variants AND states → generates L1/L2 todo structure
export const COMPONENT_CATALOG = {
  "Fondamentaux": [
    { id:"button", name:"Button", desc:"Action principale de l'interface",
      variants:["Primary","Secondary","Ghost","Destructive","Link"],
      sizes:["sm","md","lg"], states:["Default","Hover","Focus","Disabled","Loading"],
      isComplex:true,
      tokens:[
        {prop:"background", var:"component/button/{variant}/background", stateProps:{Default:["background","foreground","border"],Hover:["background","foreground","border"],Focus:["background","foreground","border","outline"],Disabled:["background","foreground","border","opacity"],Loading:["background","spinner-color"]}},
        {prop:"foreground", var:"component/button/{variant}/foreground"},
        {prop:"border", var:"component/button/{variant}/border"},
        {prop:"padding-x", var:"button/padding-x/{size}"},
        {prop:"padding-y", var:"button/padding-y/{size}"},
        {prop:"height", var:"button/height/{size}"},
        {prop:"border-radius", var:"radius/md"},
      ]},
    { id:"icon-button", name:"Icon Button", desc:"Bouton icône seul",
      variants:["Primary","Secondary","Ghost"],
      sizes:["sm","md","lg"], states:["Default","Hover","Focus","Disabled"],
      isComplex:true,
      tokens:[
        {prop:"background", var:"component/button/{variant}/background"},
        {prop:"icon-size", var:"icon/size/{size}"},
        {prop:"border-radius", var:"radius/md"},
      ]},
    { id:"input", name:"Input", desc:"Champ de saisie texte",
      variants:["Default","Error","Success","Disabled"],
      sizes:["sm","md","lg"], states:["Default","Focus","Filled","Error","Disabled"],
      isComplex:true,
      tokens:[
        {prop:"background", var:"component/input/background"},
        {prop:"border", var:"component/input/border/{state}"},
        {prop:"foreground", var:"component/input/foreground"},
        {prop:"placeholder", var:"component/input/placeholder"},
        {prop:"height", var:"input/height/{size}"},
        {prop:"border-radius", var:"radius/md"},
      ]},
    { id:"badge", name:"Badge", desc:"Étiquette informative (non interactive)",
      variants:["Blue","Yellow","Orange","Green","Gray","Red"],
      sizes:["sm","md"], states:["Default"],
      isComplex:false,
      tokens:[
        {prop:"background", var:"component/badge/{color}/background"},
        {prop:"foreground", var:"component/badge/{color}/foreground"},
        {prop:"padding-x", var:"tag/padding-x/{size}"},
        {prop:"padding-y", var:"tag/padding-y/{size}"},
        {prop:"border-radius", var:"radius/full"},
      ]},
    { id:"tag", name:"Tag", desc:"Étiquette interactive (sélectionnable)",
      variants:["Blue","Yellow","Orange","Green","Gray","Red"],
      sizes:["sm","md"], states:["Idle","Hover","Selected","Focus","Disabled"],
      isComplex:true,
      tokens:[
        {prop:"background (idle)", var:"semantic/background/surface"},
        {prop:"background (selected)", var:"component/badge/{color}/background"},
        {prop:"foreground (idle)", var:"semantic/text/secondary"},
        {prop:"foreground (selected)", var:"component/badge/{color}/foreground"},
        {prop:"border (idle)", var:"semantic/border/default"},
        {prop:"border (selected)", var:"semantic/accent/{color}/default"},
        {prop:"padding-x", var:"tag/padding-x/{size}"},
        {prop:"padding-y", var:"tag/padding-y/{size}"},
        {prop:"border-radius", var:"radius/full"},
      ]},
  ],
  "Navigation": [
    { id:"navbar", name:"Navbar", desc:"Barre de navigation principale",
      variants:["Default","Compact","Transparent"],
      sizes:["default","compact"], states:["Default","Scrolled"],
      isComplex:true, deviceVariants:true, deviceNote:"Structure change : menu hamburger sur Mobile",
      tokens:[
        {prop:"background", var:"component/nav/background"},
        {prop:"border", var:"component/nav/border"},
        {prop:"height", var:"nav/height/{size}"},
        {prop:"max-width", var:"container/max-width/page"},
        {prop:"item-foreground (default)", var:"component/nav/item/foreground/default"},
        {prop:"item-foreground (active)", var:"component/nav/item/foreground/active"},
        {prop:"item-background (active)", var:"component/nav/item/background/active"},
      ]},
    { id:"tabs", name:"Tabs", desc:"Navigation par onglets",
      variants:["Underline","Pill","Card"],
      sizes:["sm","md","lg"], states:["Default","Active","Hover","Disabled"],
      isComplex:true,
      tokens:[
        {prop:"active-background", var:"semantic/accent/{color}/on-brand/background"},
        {prop:"active-foreground", var:"semantic/text/primary"},
        {prop:"default-foreground", var:"semantic/text/secondary"},
        {prop:"gap", var:"space/sm"},
      ]},
    { id:"breadcrumb", name:"Breadcrumb", desc:"Fil d'Ariane",
      variants:["Default"], sizes:["sm","md"], states:["Default","Current"],
      isComplex:false,
      tokens:[
        {prop:"foreground", var:"semantic/text/secondary"},
        {prop:"current-foreground", var:"semantic/text/primary"},
        {prop:"font-size", var:"font/size/sm"},
      ]},
    { id:"pagination", name:"Pagination", desc:"Navigation paginée",
      variants:["Default","Compact"], sizes:["sm","md"], states:["Default","Active","Hover","Disabled"],
      isComplex:true,
      tokens:[
        {prop:"background", var:"component/button/secondary/background"},
        {prop:"active-background", var:"semantic/accent/{color}/default"},
        {prop:"gap", var:"space/xs"},
      ]},
  ],
  "Contenu": [
    { id:"heading", name:"Titre", desc:"Composant typographique de titre (H1–H6)",
      variants:["H1","H2","H3","H4","H5","H6"], sizes:[], states:["Default"],
      isComplex:false,
      tokens:[
        {prop:"font-family", var:"semantic/text-style/heading/font-family"},
        {prop:"font-size (H1)", var:"heading/h1/size"},
        {prop:"font-size (H2)", var:"heading/h2/size"},
        {prop:"font-size (H3)", var:"heading/h3/size"},
        {prop:"font-size (H4)", var:"heading/h4/size"},
        {prop:"font-size (H5)", var:"heading/h5/size"},
        {prop:"font-size (H6)", var:"heading/h6/size"},
        {prop:"line-height (H1)", var:"heading/h1/line-height"},
        {prop:"letter-spacing (H1)", var:"heading/h1/letter-spacing"},
        {prop:"color", var:"semantic/text/primary"},
      ]},
    { id:"body-text", name:"Corps de texte", desc:"Lead, regular, small, meta",
      variants:["Lead","Regular","Small","Meta"], sizes:[], states:["Default"],
      isComplex:false,
      tokens:[
        {prop:"font-family (lead)", var:"semantic/text-style/lead/font-family"},
        {prop:"font-family (regular)", var:"semantic/text-style/body/font-family"},
        {prop:"font-family (small/meta)", var:"semantic/text-style/small/font-family"},
        {prop:"font-size (lead)", var:"semantic/text-style/lead/size"},
        {prop:"font-size (regular)", var:"semantic/text-style/body/size"},
        {prop:"font-size (small)", var:"semantic/text-style/small/size"},
        {prop:"font-size (meta)", var:"semantic/text-style/meta/size"},
        {prop:"line-height", var:"semantic/text-style/{variant}/line-height"},
        {prop:"color (primary)", var:"semantic/text/primary"},
        {prop:"color (secondary)", var:"semantic/text/secondary"},
        {prop:"color (tertiary)", var:"semantic/text/tertiary"},
      ]},
    { id:"card", name:"Card", desc:"Conteneur de contenu structuré",
      variants:["Default","Elevated","Outlined","Interactive"],
      sizes:["sm","md","lg"], states:["Default","Hover"],
      isComplex:true,
      tokens:[
        {prop:"background", var:"component/card/background"},
        {prop:"border", var:"component/card/border"},
        {prop:"border-radius", var:"component/card/radius"},
        {prop:"padding", var:"card/padding/{size}"},
      ]},
    { id:"avatar", name:"Avatar", desc:"Photo de profil ou initiales",
      variants:["Image","Initials","Icon"],
      sizes:["xs","sm","md","lg","xl"], states:["Default","Online","Offline","Away"],
      isComplex:true,
      tokens:[
        {prop:"size", var:"avatar/size/{size}"},
        {prop:"border-radius", var:"radius/full"},
        {prop:"background (initials)", var:"semantic/accent/{color}/subtle"},
      ]},
    { id:"accordion-text", name:"Accordéon de texte", desc:"FAQ ou description dépliable",
      variants:["Outlined","Filled","Chevron","Plus/Minus"],
      sizes:["sm","md","lg"], states:["Closed","Open"],
      isComplex:true,
      tokens:[
        {prop:"background (filled)", var:"semantic/background/surface"},
        {prop:"border", var:"semantic/border/default"},
        {prop:"header-foreground", var:"semantic/text/primary"},
        {prop:"body-foreground", var:"semantic/text/secondary"},
        {prop:"icon-color", var:"semantic/text/tertiary"},
        {prop:"padding", var:"card/padding/{size}"},
        {prop:"border-radius", var:"radius/lg"},
        {prop:"gap (entre items)", var:"space/xs"},
        {prop:"font-size (header)", var:"semantic/text-style/body/size"},
        {prop:"font-size (body)", var:"semantic/text-style/body/size"},
      ]},
    { id:"accordion-title", name:"Accordéon de titre", desc:"Section dépliable à titre H2 — contient d'autres composants",
      variants:["Outlined","Filled","Chevron","Plus/Minus"],
      sizes:["sm","md","lg"], states:["Closed","Open"],
      isComplex:true,
      tokens:[
        {prop:"background (filled)", var:"semantic/background/surface"},
        {prop:"border", var:"semantic/border/default"},
        {prop:"header-foreground", var:"semantic/text/primary"},
        {prop:"icon-color", var:"semantic/text/tertiary"},
        {prop:"padding", var:"card/padding/{size}"},
        {prop:"border-radius", var:"radius/lg"},
        {prop:"gap (entre items)", var:"space/sm"},
        {prop:"font-size (header H2)", var:"heading/h2/size"},
        {prop:"line-height (header)", var:"heading/h2/line-height"},
        {prop:"content-padding", var:"space/md"},
      ]},
    { id:"tooltip", name:"Tooltip", desc:"Info-bulle contextuelle",
      variants:["Dark","Light"], sizes:["sm","md"], states:["Default"],
      isComplex:false,
      tokens:[
        {prop:"background (dark)", var:"color/gray/900"},
        {prop:"background (light)", var:"color/white"},
        {prop:"foreground", var:"color/white"},
        {prop:"padding", var:"space/xs"},
        {prop:"border-radius", var:"radius/md"},
        {prop:"font-size", var:"font/size/xs"},
      ]},
    { id:"divider", name:"Divider", desc:"Séparateur visuel",
      variants:["Horizontal","Vertical","With label"], sizes:["default"], states:["Default"],
      isComplex:false,
      tokens:[
        {prop:"color", var:"semantic/border/default"},
        {prop:"label-foreground", var:"semantic/text/tertiary"},
      ]},
    { id:"image", name:"Image", desc:"Composant image avec états de chargement",
      variants:["Default","Rounded","Circle","With caption"],
      sizes:["sm","md","lg","full"], states:["Loading","Loaded","Error"],
      isComplex:true,
      tokens:[
        {prop:"border-radius (rounded)", var:"radius/lg"},
        {prop:"border-radius (circle)", var:"radius/full"},
        {prop:"background (loading)", var:"semantic/background/overlay"},
        {prop:"caption-foreground", var:"semantic/text/tertiary"},
        {prop:"caption-font-size", var:"semantic/text-style/meta/size"},
      ]},
    { id:"gallery", name:"Galerie d'images", desc:"Grille d'images multiples",
      variants:["Grid 2-col","Grid 3-col","Masonry","Avec légendes"],
      sizes:["sm","md","lg"], states:["Default","Item hover"],
      isComplex:true, deviceVariants:true, deviceNote:"Structure change : 1 colonne sur Mobile",
      tokens:[
        {prop:"gap", var:"space/sm"},
        {prop:"border-radius", var:"radius/lg"},
        {prop:"overlay-background (hover)", var:"color/gray/900"},
        {prop:"caption-foreground", var:"semantic/text/tertiary"},
      ]},
    { id:"carousel", name:"Carousel", desc:"Défilement horizontal de contenu",
      variants:["Flèches","Dots","Flèches + Dots"],
      sizes:["sm","md","lg"], states:["Default","Slide active","Slide inactive"],
      isComplex:true, deviceVariants:true, deviceNote:"1 item plein écran sur Mobile, multi-items sur Desktop",
      tokens:[
        {prop:"background", var:"semantic/background/page"},
        {prop:"dot-active", var:"semantic/accent/{color}/default"},
        {prop:"dot-inactive", var:"semantic/border/default"},
        {prop:"arrow-background", var:"component/button/secondary/background"},
        {prop:"arrow-foreground", var:"semantic/text/primary"},
        {prop:"gap (entre items)", var:"space/md"},
        {prop:"padding", var:"section/padding-y/sm"},
        {prop:"arrow-size", var:"icon/size/lg"},
      ]},
  ],
  "Feedback": [
    { id:"alert", name:"Alert / Banner", desc:"Message d'information ou d'alerte",
      variants:["Info","Success","Warning","Error"],
      sizes:["sm","md"], states:["Default","Dismissible"],
      isComplex:true,
      tokens:[
        {prop:"background", var:"semantic/status/{type}/subtle"},
        {prop:"border", var:"semantic/status/{type}/default"},
        {prop:"foreground", var:"semantic/text/primary"},
        {prop:"icon-color", var:"semantic/status/{type}/default"},
        {prop:"padding", var:"space/md"},
        {prop:"border-radius", var:"radius/lg"},
      ]},
    { id:"toast", name:"Toast / Notification", desc:"Message temporaire flottant",
      variants:["Info","Success","Warning","Error"],
      sizes:["md"], states:["Entering","Default","Leaving"],
      isComplex:true,
      tokens:[
        {prop:"background", var:"component/card/background"},
        {prop:"border-left", var:"semantic/status/{type}/default"},
        {prop:"foreground", var:"semantic/text/primary"},
        {prop:"padding", var:"space/md"},
        {prop:"border-radius", var:"radius/lg"},
      ]},
    { id:"spinner", name:"Spinner / Loader", desc:"Indicateur de chargement",
      variants:["Circular","Dots","Bar"], sizes:["sm","md","lg"], states:["Loading"],
      isComplex:false,
      tokens:[
        {prop:"color", var:"semantic/accent/{color}/default"},
        {prop:"size", var:"icon/size/{size}"},
      ]},
    { id:"progress", name:"Progress Bar", desc:"Barre de progression",
      variants:["Default","Striped"], sizes:["sm","md","lg"], states:["Default","Complete"],
      isComplex:true,
      tokens:[
        {prop:"fill", var:"semantic/accent/{color}/default"},
        {prop:"track", var:"semantic/background/overlay"},
        {prop:"border-radius", var:"radius/full"},
        {prop:"height", var:"space/xs"},
      ]},
  ],
  "Formulaires": [
    { id:"select", name:"Select / Dropdown", desc:"Liste déroulante de sélection",
      variants:["Default","Error","Disabled"],
      sizes:["sm","md","lg"], states:["Default","Open","Selected","Error","Disabled"],
      isComplex:true,
      tokens:[
        {prop:"background", var:"component/input/background"},
        {prop:"border", var:"component/input/border/default"},
        {prop:"border (focus)", var:"component/input/border/focus"},
        {prop:"foreground", var:"component/input/foreground"},
        {prop:"height", var:"input/height/{size}"},
        {prop:"border-radius", var:"radius/md"},
        {prop:"dropdown-background", var:"component/card/background"},
        {prop:"option-hover", var:"semantic/background/overlay"},
      ]},
    { id:"checkbox", name:"Checkbox", desc:"Case à cocher",
      variants:["Default","Error"], sizes:["sm","md"],
      states:["Unchecked","Checked","Indeterminate","Disabled"],
      isComplex:true,
      tokens:[
        {prop:"checked-background", var:"semantic/accent/{color}/default"},
        {prop:"border", var:"component/input/border/default"},
        {prop:"border-radius", var:"radius/sm"},
        {prop:"gap (label)", var:"space/xs"},
      ]},
    { id:"radio", name:"Radio Button", desc:"Bouton radio",
      variants:["Default","Error"], sizes:["sm","md"],
      states:["Unselected","Selected","Disabled"],
      isComplex:true,
      tokens:[
        {prop:"selected-fill", var:"semantic/accent/{color}/default"},
        {prop:"border", var:"component/input/border/default"},
        {prop:"border-radius", var:"radius/full"},
      ]},
    { id:"toggle", name:"Toggle / Switch", desc:"Interrupteur on/off",
      variants:["Default"], sizes:["sm","md","lg"], states:["Off","On","Disabled"],
      isComplex:true,
      tokens:[
        {prop:"track (on)", var:"semantic/accent/{color}/default"},
        {prop:"track (off)", var:"color/gray/300"},
        {prop:"thumb", var:"color/white"},
        {prop:"border-radius", var:"radius/full"},
        {prop:"thumb-size", var:"icon/size/sm"},
      ]},
    { id:"textarea", name:"Textarea", desc:"Zone de texte multilignes",
      variants:["Default","Error","Disabled"],
      sizes:["sm","md","lg"], states:["Default","Focus","Error","Disabled"],
      isComplex:true,
      tokens:[
        {prop:"background", var:"component/input/background"},
        {prop:"border", var:"component/input/border/default"},
        {prop:"border (focus)", var:"component/input/border/focus"},
        {prop:"foreground", var:"component/input/foreground"},
        {prop:"placeholder", var:"component/input/placeholder"},
        {prop:"padding", var:"space/sm"},
        {prop:"border-radius", var:"radius/md"},
      ]},
  ],
  "Mise en page": [
    { id:"modal", name:"Modal / Dialog", desc:"Fenêtre de dialogue superposée",
      variants:["Default","Alert","Fullscreen"],
      sizes:["sm","md","lg"], states:["Default"],
      isComplex:false,
      tokens:[
        {prop:"background", var:"component/card/background"},
        {prop:"padding", var:"modal/padding/{size}"},
        {prop:"border-radius", var:"radius/2xl"},
        {prop:"overlay", var:"color/gray/900"},
        {prop:"max-width", var:"container/max-width/narrow"},
      ]},
    { id:"drawer", name:"Drawer / Sidebar", desc:"Panneau latéral coulissant",
      variants:["Left","Right","Bottom"], sizes:["sm","md","lg"], states:["Closed","Open"],
      isComplex:true,
      tokens:[
        {prop:"background", var:"component/card/background"},
        {prop:"padding", var:"modal/padding/md"},
        {prop:"border", var:"semantic/border/default"},
      ]},
    { id:"section", name:"Section de page", desc:"Bloc de contenu pleine largeur",
      variants:["Default","Accent","Dark"], sizes:["sm","md","lg"], states:["Default"],
      isComplex:false,
      tokens:[
        {prop:"background", var:"semantic/background/page"},
        {prop:"padding-y", var:"section/padding-y/{size}"},
        {prop:"content-max-width", var:"container/max-width/page"},
      ]},
    { id:"grid", name:"Grid / Layout", desc:"Grille de mise en page responsive",
      variants:["2-col","3-col","4-col","Asymétrique"], sizes:["default"], states:["Default"],
      isComplex:false, deviceVariants:true, deviceNote:"Structure change : 1 colonne sur Mobile",
      tokens:[
        {prop:"max-width", var:"container/max-width/page"},
        {prop:"gap", var:"space/lg"},
        {prop:"padding-x", var:"space/md"},
      ]},
  ],
};

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────
export const DEFAULT_CONFIG = {
  bgLight:"#F7F4F0", bgDark:"#2B2738", ink:"#2B2738", paper:"#F7F4F0",
  accents:[
    {name:"blue",  shades:{100:"#9BC3FA",500:"#5A9AF2",900:"#0A2E5E"},reverseShades:{100:"#0A2E5E",500:"#5A9AF2",900:"#9BC3FA"}},
    {name:"yellow",shades:{100:"#FCE2A2",500:"#F9CC5F",900:"#422F01"},reverseShades:{100:"#5F4401",500:"#F9CC5F",900:"#FCE2A2"}},
    {name:"orange",shades:{100:"#FFC4B2",500:"#FF8A67",900:"#6B2813"},reverseShades:{100:"#6B2813",500:"#FF8A67",900:"#FFC4B2"}},
    {name:"green", shades:{100:"#B9EBE6",500:"#52CBC0",900:"#224D48"},reverseShades:{100:"#224D48",500:"#52CBC0",900:"#B9EBE6"}},
  ],
  fonts:{heading:"Sfizia",lead:"Sfizia",body:"Syne","body-serif":"","small":"Syne"},
};

// ─── PURE FUNCTIONS ───────────────────────────────────────────────────────────

/**
 * Build flat todo items from a component.
 * - Simple component (isComplex=false): flat list of tokens
 * - Complex component (isComplex=true): L1 = state, L2 = token per state
 */
export function buildTodoItems(comp) {
  if (!comp.isComplex) {
    return comp.tokens.map((t, i) => ({ id: `${comp.id}-t${i}`, level: 1, label: t.prop, var: t.var }));
  }
  const items = [];
  comp.states.forEach((state, si) => {
    items.push({ id: `${comp.id}-s${si}`, level: 1, label: `État : ${state}`, var: null, isState: true });
    comp.tokens.forEach((t, ti) => {
      items.push({ id: `${comp.id}-s${si}-t${ti}`, level: 2, label: t.prop, var: t.var });
    });
  });
  return items;
}

/**
 * Generate the full Figma variables JSON from the given config.
 */
export function generateJSON(config) {
  const prim=[], sem=[], compVars=[], resp=[];
  prim.push({name:"color/neutral/background-light",type:"COLOR",values:{Value:config.bgLight}});
  prim.push({name:"color/neutral/background-dark",type:"COLOR",values:{Value:config.bgDark}});
  prim.push({name:"color/neutral/ink",type:"COLOR",values:{Value:config.ink}});
  prim.push({name:"color/neutral/paper",type:"COLOR",values:{Value:config.paper}});
  const grays={50:"#F8FAFC",100:"#F1F5F9",200:"#E2E8F0",300:"#CBD5E1",400:"#94A3B8",500:"#64748B",600:"#475569",700:"#334155",800:"#1E293B",900:"#0F172A",950:"#020617"};
  const reds={50:"#FEF2F2",100:"#FEE2E2",200:"#FECACA",300:"#FCA5A5",400:"#F87171",500:"#EF4444",600:"#DC2626",700:"#B91C1C",800:"#991B1B",900:"#7F1D1D",950:"#450A0A"};
  Object.entries(grays).forEach(([s,h])=>prim.push({name:`color/gray/${s}`,type:"COLOR",values:{Value:h}}));
  Object.entries(reds).forEach(([s,h])=>prim.push({name:`color/red/${s}`,type:"COLOR",values:{Value:h}}));
  config.accents.forEach(acc=>Object.entries(acc.shades).forEach(([s,h])=>prim.push({name:`color/${acc.name}/${s}`,type:"COLOR",values:{Value:h}})));
  prim.push({name:"color/white",type:"COLOR",values:{Value:"#FFFFFF"}});
  prim.push({name:"color/black",type:"COLOR",values:{Value:"#000000"}});
  [0,5,10,20,25,30,40,50,60,70,75,80,90,95,100].forEach(p=>prim.push({name:`opacity/${p}`,type:"NUMBER",values:{Value:p/100},description:`${p}%`}));
  Object.entries(SPACING_SCALE).forEach(([k,v])=>prim.push({name:`spacing/${k}`,type:"NUMBER",values:{Value:v},description:`${v}px`}));
  Object.entries(RADIUS_SCALE).forEach(([k,v])=>prim.push({name:`radius/${k}`,type:"NUMBER",values:{Value:v},description:`${v}px`}));
  ["heading","lead","body","body-serif","small"].forEach(r=>prim.push({name:`font/family/${r}`,type:"STRING",values:{Value:config.fonts[r]||"Inter"}}));
  const fsizes={xs:12,sm:14,base:16,lg:18,xl:20,"2xl":24,"3xl":30,"4xl":36,"5xl":48,"6xl":60,"7xl":72,"8xl":96,"9xl":128};
  Object.entries(fsizes).forEach(([k,v])=>prim.push({name:`font/size/${k}`,type:"NUMBER",values:{Value:v},description:`${v}px`}));
  const weights={thin:100,extralight:200,light:300,normal:400,medium:500,semibold:600,bold:700,extrabold:800,black:900};
  Object.entries(weights).forEach(([k,v])=>prim.push({name:`font/weight/${k}`,type:"NUMBER",values:{Value:v}}));
  const lhs={none:1,tight:1.25,snug:1.375,normal:1.5,relaxed:1.625,loose:2};
  Object.entries(lhs).forEach(([k,v])=>prim.push({name:`font/line-height/${k}`,type:"NUMBER",values:{Value:v}}));
  const ls={tighter:-0.8,tight:-0.4,normal:0,wide:0.4,wider:0.8,widest:1.6};
  Object.entries(ls).forEach(([k,v])=>prim.push({name:`font/letter-spacing/${k}`,type:"NUMBER",values:{Value:v}}));
  [{k:"sm",v:640},{k:"md",v:768},{k:"lg",v:1024},{k:"xl",v:1280},{k:"2xl",v:1536}].forEach(({k,v})=>prim.push({name:`breakpoint/${k}`,type:"NUMBER",values:{Value:v},description:`${v}px`}));

  const N="01 – Primitives", S="02 – Sémantique";
  const al=(col,name)=>({type:"VARIABLE_ALIAS",id:name});
  const hexA=(hex,op)=>hex.toUpperCase();
  const fa=config.accents[0]?.name||"blue";
  sem.push({name:"semantic/background/page",type:"COLOR",values:{Normal:al(N,"color/neutral/background-light"),Reverse:al(N,"color/neutral/background-dark")}});
  sem.push({name:"semantic/background/surface",type:"COLOR",values:{Normal:al(N,"color/white"),Reverse:al(N,"color/gray/800")}});
  sem.push({name:"semantic/background/overlay",type:"COLOR",values:{Normal:al(N,"color/gray/100"),Reverse:al(N,"color/gray/700")}});
  sem.push({name:"semantic/text/primary",type:"COLOR",values:{Normal:al(N,"color/neutral/ink"),Reverse:al(N,"color/neutral/paper")}});
  sem.push({name:"semantic/text/secondary",type:"COLOR",values:{Normal:hexA(config.ink,0.9),Reverse:hexA(config.paper,0.9)},description:"90% opacity"});
  sem.push({name:"semantic/text/tertiary",type:"COLOR",values:{Normal:hexA(config.ink,0.8),Reverse:hexA(config.paper,0.8)},description:"80% opacity"});
  sem.push({name:"semantic/text/disabled",type:"COLOR",values:{Normal:al(N,"color/gray/400"),Reverse:al(N,"color/gray/600")}});
  sem.push({name:"semantic/text/on-accent",type:"COLOR",values:{Normal:al(N,"color/white"),Reverse:al(N,"color/gray/900")}});
  sem.push({name:"semantic/border/default",type:"COLOR",values:{Normal:al(N,"color/gray/200"),Reverse:al(N,"color/gray/700")}});
  sem.push({name:"semantic/border/strong",type:"COLOR",values:{Normal:al(N,"color/gray/400"),Reverse:al(N,"color/gray/500")}});
  sem.push({name:"semantic/border/focus",type:"COLOR",values:{Normal:al(N,`color/${fa}/500`),Reverse:al(N,`color/${fa}/500`)}});
  config.accents.forEach(acc=>{
    const n=acc.name;
    sem.push({name:`semantic/accent/${n}/default`,type:"COLOR",values:{Normal:al(N,`color/${n}/500`),Reverse:al(N,`color/${n}/500`)}});
    sem.push({name:`semantic/accent/${n}/subtle`,type:"COLOR",values:{Normal:al(N,`color/${n}/100`),Reverse:al(N,`color/${n}/900`)}});
    sem.push({name:`semantic/accent/${n}/strong`,type:"COLOR",values:{Normal:al(N,`color/${n}/900`),Reverse:al(N,`color/${n}/100`)}});
    sem.push({name:`semantic/accent/${n}/on-brand/background`,type:"COLOR",values:{Normal:al(N,`color/${n}/100`),Reverse:al(N,`color/${n}/900`)}});
    sem.push({name:`semantic/accent/${n}/on-brand/foreground`,type:"COLOR",values:{Normal:al(N,`color/${n}/900`),Reverse:al(N,`color/${n}/100`)}});
  });
  [{s:"error",c:"red"},{s:"success",c:"green"},{s:"warning",c:"yellow"},{s:"info",c:fa}].forEach(({s,c})=>{
    const shade=c==="red"?"600":"500";
    sem.push({name:`semantic/status/${s}/default`,type:"COLOR",values:{Normal:al(N,`color/${c}/${shade}`),Reverse:al(N,`color/${c}/400`)}});
    sem.push({name:`semantic/status/${s}/subtle`,type:"COLOR",values:{Normal:al(N,`color/${c}/100`),Reverse:al(N,`color/${c}/900`)}});
  });
  ["heading","lead","body","body-serif","small"].forEach(r=>sem.push({name:`semantic/text-style/${r}/font-family`,type:"STRING",values:{Normal:al(N,`font/family/${r}`),Reverse:al(N,`font/family/${r}`)}}));
  ["heading/h1","heading/h2","heading/h3","heading/h4","heading/h5","heading/h6","lead","body","body-serif","small","meta"].forEach(style=>
    ["size","line-height","letter-spacing","paragraph-space"].forEach(prop=>
      sem.push({name:`semantic/text-style/${style}/${prop}`,type:"NUMBER",values:{Normal:0,Reverse:0},description:"À compléter dans Figma"})
    )
  );

  const cv=[
    ...["primary","secondary","ghost","destructive"].flatMap(v=>{
      const bgN={primary:al(S,`semantic/accent/${fa}/default`),secondary:al(N,"color/white"),ghost:al(N,"color/gray/100"),destructive:al(S,"semantic/status/error/default")};
      const bgR={primary:al(S,`semantic/accent/${fa}/default`),secondary:al(N,"color/gray/800"),ghost:al(N,"color/gray/700"),destructive:al(S,"semantic/status/error/default")};
      const fg={primary:al(N,"color/white"),secondary:al(S,"semantic/text/primary"),ghost:al(S,"semantic/text/primary"),destructive:al(N,"color/white")};
      return[{name:`component/button/${v}/background`,type:"COLOR",values:{Normal:bgN[v],Reverse:bgR[v]}},{name:`component/button/${v}/foreground`,type:"COLOR",values:{Normal:fg[v],Reverse:fg[v]}},{name:`component/button/${v}/border`,type:"COLOR",values:{Normal:v==="secondary"?al(S,"semantic/border/default"):bgN[v],Reverse:v==="secondary"?al(S,"semantic/border/default"):bgR[v]}}];
    }),
    {name:"component/button/radius",type:"NUMBER",values:{Normal:al(N,"radius/md"),Reverse:al(N,"radius/md")}},
    {name:"component/button/padding-x",type:"NUMBER",values:{Normal:al("04 – Responsive / Headings","button/padding-x/md"),Reverse:al("04 – Responsive / Headings","button/padding-x/md")}},
    {name:"component/button/padding-y",type:"NUMBER",values:{Normal:al("04 – Responsive / Headings","button/padding-y/md"),Reverse:al("04 – Responsive / Headings","button/padding-y/md")}},
    {name:"component/input/background",type:"COLOR",values:{Normal:al(N,"color/white"),Reverse:al(N,"color/gray/800")}},
    {name:"component/input/border/default",type:"COLOR",values:{Normal:al(S,"semantic/border/default"),Reverse:al(S,"semantic/border/default")}},
    {name:"component/input/border/focus",type:"COLOR",values:{Normal:al(S,"semantic/border/focus"),Reverse:al(S,"semantic/border/focus")}},
    {name:"component/input/border/error",type:"COLOR",values:{Normal:al(S,"semantic/status/error/default"),Reverse:al(S,"semantic/status/error/default")}},
    {name:"component/input/foreground",type:"COLOR",values:{Normal:al(S,"semantic/text/primary"),Reverse:al(S,"semantic/text/primary")}},
    {name:"component/input/placeholder",type:"COLOR",values:{Normal:al(S,"semantic/text/tertiary"),Reverse:al(S,"semantic/text/tertiary")}},
    {name:"component/input/radius",type:"NUMBER",values:{Normal:al(N,"radius/md"),Reverse:al(N,"radius/md")}},
    {name:"component/card/background",type:"COLOR",values:{Normal:al(S,"semantic/background/surface"),Reverse:al(S,"semantic/background/surface")}},
    {name:"component/card/border",type:"COLOR",values:{Normal:al(S,"semantic/border/default"),Reverse:al(S,"semantic/border/default")}},
    {name:"component/card/radius",type:"NUMBER",values:{Normal:al(N,"radius/xl"),Reverse:al(N,"radius/xl")}},
    {name:"component/card/padding",type:"NUMBER",values:{Normal:al("04 – Responsive / Headings","card/padding/md"),Reverse:al("04 – Responsive / Headings","card/padding/md")}},
    ...config.accents.flatMap(acc=>[
      {name:`component/badge/${acc.name}/background`,type:"COLOR",values:{Normal:al(S,`semantic/accent/${acc.name}/on-brand/background`),Reverse:al(S,`semantic/accent/${acc.name}/on-brand/background`)}},
      {name:`component/badge/${acc.name}/foreground`,type:"COLOR",values:{Normal:al(S,`semantic/accent/${acc.name}/on-brand/foreground`),Reverse:al(S,`semantic/accent/${acc.name}/on-brand/foreground`)}},
    ]),
    {name:"component/badge/radius",type:"NUMBER",values:{Normal:al(N,"radius/full"),Reverse:al(N,"radius/full")}},
    {name:"component/nav/background",type:"COLOR",values:{Normal:al(S,"semantic/background/surface"),Reverse:al(S,"semantic/background/surface")}},
    {name:"component/nav/border",type:"COLOR",values:{Normal:al(S,"semantic/border/default"),Reverse:al(S,"semantic/border/default")}},
    {name:"component/nav/item/foreground/default",type:"COLOR",values:{Normal:al(S,"semantic/text/secondary"),Reverse:al(S,"semantic/text/secondary")}},
    {name:"component/nav/item/foreground/active",type:"COLOR",values:{Normal:al(S,"semantic/text/primary"),Reverse:al(S,"semantic/text/primary")}},
    {name:`component/nav/item/background/active`,type:"COLOR",values:{Normal:al(S,`semantic/accent/${fa}/subtle`),Reverse:al(S,`semantic/accent/${fa}/subtle`)}},
  ];

  const na=(name,d,t,m,sl,desc="")=>({name,type:"NUMBER",description:desc,values:{Desktop:al(N,d),Tablette:al(N,t),Mobile:al(N,m),Slides:sl}});
  const hd={h1:{d:72,t:56,m:40,sl:96},h2:{d:60,t:48,m:36,sl:80},h3:{d:48,t:36,m:30,sl:64},h4:{d:36,t:30,m:24,sl:48},h5:{d:30,t:24,m:20,sl:40},h6:{d:24,t:20,m:18,sl:32}};
  const hlh={h1:{d:1.1,t:1.15,m:1.2,sl:1.05},h2:{d:1.15,t:1.2,m:1.25,sl:1.1},h3:{d:1.2,t:1.25,m:1.3,sl:1.15},h4:{d:1.25,t:1.3,m:1.35,sl:1.2},h5:{d:1.3,t:1.35,m:1.4,sl:1.25},h6:{d:1.35,t:1.4,m:1.45,sl:1.3}};
  const hls={h1:{d:-1.4,t:-1.1,m:-0.8,sl:-2},h2:{d:-1.2,t:-0.9,m:-0.6,sl:-1.6},h3:{d:-0.8,t:-0.6,m:-0.4,sl:-1.2},h4:{d:-0.4,t:-0.3,m:-0.2,sl:-0.8},h5:{d:-0.2,t:-0.1,m:0,sl:-0.4},h6:{d:0,t:0,m:0,sl:-0.2}};
  Object.entries(hd).forEach(([h,v])=>{
    resp.push({name:`heading/${h}/size`,type:"NUMBER",values:{Desktop:v.d,Tablette:v.t,Mobile:v.m,Slides:v.sl}});
    resp.push({name:`heading/${h}/line-height`,type:"NUMBER",values:{Desktop:hlh[h].d,Tablette:hlh[h].t,Mobile:hlh[h].m,Slides:hlh[h].sl}});
    resp.push({name:`heading/${h}/letter-spacing`,type:"NUMBER",values:{Desktop:hls[h].d,Tablette:hls[h].t,Mobile:hls[h].m,Slides:hls[h].sl}});
  });
  const sp=[{k:"xs",d:"spacing/2",t:"spacing/1.5",m:"spacing/1",sl:16},{k:"sm",d:"spacing/4",t:"spacing/3",m:"spacing/2",sl:24},{k:"md",d:"spacing/6",t:"spacing/5",m:"spacing/4",sl:32},{k:"lg",d:"spacing/8",t:"spacing/6",m:"spacing/5",sl:48},{k:"xl",d:"spacing/12",t:"spacing/10",m:"spacing/8",sl:64},{k:"2xl",d:"spacing/16",t:"spacing/14",m:"spacing/12",sl:96},{k:"3xl",d:"spacing/24",t:"spacing/20",m:"spacing/16",sl:128},{k:"4xl",d:"spacing/32",t:"spacing/24",m:"spacing/20",sl:192}];
  sp.forEach(({k,d,t,m,sl})=>resp.push(na(`space/${k}`,d,t,m,sl)));
  const cr=[{n:"card/padding/sm",d:"spacing/4",t:"spacing/3",m:"spacing/2",sl:32},{n:"card/padding/md",d:"spacing/6",t:"spacing/5",m:"spacing/4",sl:48},{n:"card/padding/lg",d:"spacing/10",t:"spacing/8",m:"spacing/6",sl:64},{n:"button/padding-x/sm",d:"spacing/3",t:"spacing/3",m:"spacing/2.5",sl:24},{n:"button/padding-x/md",d:"spacing/4",t:"spacing/4",m:"spacing/3",sl:32},{n:"button/padding-x/lg",d:"spacing/6",t:"spacing/5",m:"spacing/4",sl:48},{n:"button/padding-y/sm",d:"spacing/1.5",t:"spacing/1.5",m:"spacing/1",sl:12},{n:"button/padding-y/md",d:"spacing/2",t:"spacing/2",m:"spacing/1.5",sl:16},{n:"button/padding-y/lg",d:"spacing/3",t:"spacing/2.5",m:"spacing/2",sl:20},{n:"button/height/sm",d:"spacing/8",t:"spacing/8",m:"spacing/7",sl:48},{n:"button/height/md",d:"spacing/10",t:"spacing/10",m:"spacing/9",sl:56},{n:"button/height/lg",d:"spacing/12",t:"spacing/11",m:"spacing/10",sl:72},{n:"input/height/sm",d:"spacing/8",t:"spacing/8",m:"spacing/7",sl:48},{n:"input/height/md",d:"spacing/10",t:"spacing/10",m:"spacing/9",sl:56},{n:"input/height/lg",d:"spacing/12",t:"spacing/11",m:"spacing/10",sl:72},{n:"avatar/size/xs",d:"spacing/6",t:"spacing/6",m:"spacing/5",sl:40},{n:"avatar/size/sm",d:"spacing/8",t:"spacing/8",m:"spacing/7",sl:56},{n:"avatar/size/md",d:"spacing/10",t:"spacing/10",m:"spacing/9",sl:72},{n:"avatar/size/lg",d:"spacing/14",t:"spacing/12",m:"spacing/10",sl:96},{n:"avatar/size/xl",d:"spacing/20",t:"spacing/16",m:"spacing/14",sl:128},{n:"icon/size/sm",d:"spacing/4",t:"spacing/4",m:"spacing/3.5",sl:24},{n:"icon/size/md",d:"spacing/5",t:"spacing/5",m:"spacing/4",sl:32},{n:"icon/size/lg",d:"spacing/6",t:"spacing/6",m:"spacing/5",sl:40},{n:"icon/size/xl",d:"spacing/8",t:"spacing/8",m:"spacing/6",sl:56},{n:"tag/padding-x/sm",d:"spacing/2",t:"spacing/2",m:"spacing/1.5",sl:16},{n:"tag/padding-x/md",d:"spacing/3",t:"spacing/2.5",m:"spacing/2",sl:24},{n:"tag/padding-y/sm",d:"spacing/0.5",t:"spacing/0.5",m:"spacing/0.5",sl:8},{n:"tag/padding-y/md",d:"spacing/1",t:"spacing/1",m:"spacing/1",sl:12},{n:"modal/padding/sm",d:"spacing/6",t:"spacing/5",m:"spacing/4",sl:48},{n:"modal/padding/md",d:"spacing/8",t:"spacing/6",m:"spacing/5",sl:64},{n:"modal/padding/lg",d:"spacing/12",t:"spacing/10",m:"spacing/8",sl:96},{n:"section/padding-y/sm",d:"spacing/16",t:"spacing/12",m:"spacing/10",sl:96},{n:"section/padding-y/md",d:"spacing/24",t:"spacing/16",m:"spacing/12",sl:128},{n:"section/padding-y/lg",d:"spacing/32",t:"spacing/24",m:"spacing/16",sl:192},{n:"form/gap/sm",d:"spacing/4",t:"spacing/3",m:"spacing/3",sl:24},{n:"form/gap/md",d:"spacing/6",t:"spacing/5",m:"spacing/4",sl:32},{n:"form/gap/lg",d:"spacing/8",t:"spacing/6",m:"spacing/6",sl:48},{n:"nav/height/default",d:"spacing/16",t:"spacing/14",m:"spacing/14",sl:80},{n:"nav/height/compact",d:"spacing/12",t:"spacing/12",m:"spacing/12",sl:64}];
  cr.forEach(({n,d,t,m,sl})=>resp.push(na(n,d,t,m,sl)));
  [{n:"narrow",d:672,t:672,m:375,sl:960},{n:"content",d:1024,t:768,m:375,sl:1280},{n:"page",d:1280,t:1024,m:375,sl:1920},{n:"wide",d:1536,t:1280,m:375,sl:1920}].forEach(({n,d,t,m,sl})=>resp.push({name:`container/max-width/${n}`,type:"NUMBER",values:{Desktop:d,Tablette:t,Mobile:m,Slides:sl}}));

  return {version:"1.0",collections:[
    {name:"01 – Primitives",modes:["Value"],variables:prim},
    {name:"02 – Sémantique",modes:["Normal","Reverse"],variables:sem},
    {name:"03 – Composants",modes:["Normal","Reverse"],variables:cv},
    {name:"04 – Responsive / Headings",modes:["Desktop","Tablette","Mobile","Slides"],variables:resp},
  ]};
}



// ─── COLOR UTILITIES ──────────────────────────────────────────────────────────

/** Calculates relative luminance of a hex color */
export function getLuminance(hex) {
  if (!hex || typeof hex !== 'string') return 0;
  const h = hex.replace(/^#/, '');
  if (h.length !== 3 && h.length !== 6) return 0;
  
  let r, g, b;
  if (h.length === 3) {
    r = parseInt(h[0] + h[0], 16);
    g = parseInt(h[1] + h[1], 16);
    b = parseInt(h[2] + h[2], 16);
  } else {
    r = parseInt(h.substring(0, 2), 16);
    g = parseInt(h.substring(2, 4), 16);
    b = parseInt(h.substring(4, 6), 16);
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) return 0;

  const rgb = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

/** Calculates contrast ratio between two hex colors */
export function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const bright = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (bright + 0.05) / (dark + 0.05);
}

/** Converts Hex to HSL */
function hexToHsl(hex) {
  if (!hex || typeof hex !== 'string') return [0, 0, 0];
  const h = hex.replace(/^#/, '');
  if (h.length !== 3 && h.length !== 6) return [0, 0, 0];

  let r, g, b;
  if (h.length === 3) {
    r = parseInt(h[0] + h[0], 16) / 255;
    g = parseInt(h[1] + h[1], 16) / 255;
    b = parseInt(h[2] + h[2], 16) / 255;
  } else {
    r = parseInt(h.substring(0, 2), 16) / 255;
    g = parseInt(h.substring(2, 4), 16) / 255;
    b = parseInt(h.substring(4, 6), 16) / 255;
  }
  
  if (isNaN(r) || isNaN(g) || isNaN(b)) return [0, 0, 0];

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h_hsl, s, l = (max + min) / 2;
  if (max === min) { h_hsl = s = 0; }
  else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h_hsl = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h_hsl = (b - r) / d + 2; break;
      case b: h_hsl = (r - g) / d + 4; break;
    }
    h_hsl /= 6;
  }
  return [h_hsl * 360, s * 100, l * 100];
}

/** Converts HSL to Hex */
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

/** 
 * Finds the closest AAA-compliant color by adjusting lightness.
 * target: 7 (body) or 4.5 (lead)
 */
export function getClosestAAAColor(fgHex, bgHex, target) {
  const currentRatio = getContrastRatio(fgHex, bgHex);
  if (currentRatio >= target) return fgHex;

  const [h, s, l] = hexToHsl(fgHex);
  const bgL = getLuminance(bgHex);
  
  // Decide whether to lighten or darken based on background luminance
  const shouldLighten = bgL < 0.5;
  
  let bestColor = fgHex;
  let minDiff = Infinity;

  for (let newL = 0; newL <= 100; newL += 0.5) {
    const hex = hslToHex(h, s, newL);
    const ratio = getContrastRatio(hex, bgHex);
    if (ratio >= target) {
      const diff = Math.abs(newL - l);
      if (diff < minDiff) {
        minDiff = diff;
        bestColor = hex;
      }
    }
  }
  return bestColor;
}
