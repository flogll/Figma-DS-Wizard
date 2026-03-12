import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/module.esm.js";
import {
  COMPONENT_CATALOG, DEFAULT_CONFIG,
  buildTodoItems, generateJSON, generateSpecsMd, generateTodoMd,
  getContrastRatio, getClosestAAAColor
} from "./logic.js";

window.Alpine = Alpine;

Alpine.data('dsWizard', () => ({
  tab: 'variables', // 'variables', 'components', 'todo', 'guide'
  step: 0,
  config: JSON.parse(JSON.stringify(DEFAULT_CONFIG)),
  variablesConfigured: false,
  componentsConfirmed: false,
  selectedComponents: {},
  todoChecked: {},
  todoCategoryIdx: 0,

  STEPS: ["Fonds & couleurs neutres", "Palettes d'accent", "Typographie", "Résumé & Export"],
  GROUPS: Object.keys(COMPONENT_CATALOG),

  init() {
    // Initialize selected components structure
    this.GROUPS.forEach(g => {
      this.selectedComponents[g] = [];
    });
    // Initialize todo properties to ensure deep reactivity
    this.allComps.forEach(comp => {
      const items = buildTodoItems(comp);
      items.forEach(it => {
        this.todoChecked[it.id] = false;
      });
    });
  },

  get totalSelected() {
    return Object.values(this.selectedComponents).flat().length;
  },

  get allComps() {
    return Object.values(COMPONENT_CATALOG).flat();
  },

  get totalCompsCount() {
    return this.allComps.length;
  },

  // UI State Helpers
  goToStep(i) {
    this.step = i;
  },
  
  setTab(t) {
    this.tab = t;
  },

  // Variables Handlers
  addAccent() {
    this.config.accents.push({
      name: "nom",
      shades: { 100: "#f3f4f6", 500: "#9ca3af", 900: "#111827" },
      reverseShades: { 100: "#111827", 500: "#9ca3af", 900: "#f3f4f6" }
    });
  },

  removeAccent(index) {
    if (this.config.accents.length > 1) {
      this.config.accents.splice(index, 1);
    }
  },

  syncReverseShades(accIdx, shade) {
    const acc = this.config.accents[accIdx];
    const val = acc.shades[shade];
    const revMapping = { 100: 900, 500: 500, 900: 100 };
    acc.reverseShades[revMapping[shade]] = val;
  },

  // Components Handlers
  toggleComponent(group, id) {
    if (this.selectedComponents[group].includes(id)) {
      this.selectedComponents[group] = this.selectedComponents[group].filter(x => x !== id);
    } else {
      this.selectedComponents[group].push(id);
    }
  },

  toggleSelectAll(group) {
    const all = COMPONENT_CATALOG[group].map(c => c.id);
    const current = this.selectedComponents[group];
    const allSelected = all.every(id => current.includes(id));
    this.selectedComponents[group] = allSelected ? [] : [...all];
  },

  toggleSelectAllGlobal() {
    if (this.totalSelected === this.totalCompsCount) {
      this.GROUPS.forEach(g => { this.selectedComponents[g] = []; });
    } else {
      this.GROUPS.forEach(g => {
        this.selectedComponents[g] = COMPONENT_CATALOG[g].map(c => c.id);
      });
    }
  },
  
  isComponentSelected(group, id) {
      return this.selectedComponents[group].includes(id);
  },

  isGroupAllSelected(group) {
      const all = COMPONENT_CATALOG[group].map(c => c.id);
      const current = this.selectedComponents[group] || [];
      return all.length > 0 && all.every(id => current.includes(id));
  },

    // Todo Handlers — only property items (non-state) have checkboxes
    toggleTodoItem(id) {
        this.todoChecked[id] = !this.todoChecked[id];
    },

    toggleAllComponent(items) {
        const checkable = items.filter(it => !it.isState);
        const allChecked = checkable.every(it => this.todoChecked[it.id]);
        checkable.forEach(it => { this.todoChecked[it.id] = !allChecked; });
    },

    getCompletedCount(compItems) {
        const checkable = compItems.filter(it => !it.isState);
        return checkable.filter(it => this.todoChecked[it.id]).length;
    },

    getCheckableCount(compItems) {
        return compItems.filter(it => !it.isState).length;
    },
    
    getGlobalTodoProgress() {
        let done = 0;
        let total = 0;
        Object.entries(this.selectedComponents).forEach(([g, ids]) => {
          ids.forEach(id => {
            const comp = this.allComps.find(c => c.id === id);
            if (comp) {
              const items = buildTodoItems(comp);
              const checkable = items.filter(it => !it.isState);
              total += checkable.length;
              done += checkable.filter(it => this.todoChecked[it.id]).length;
            }
          });
        });
        return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
    },

    // Download Handlers
    handleDownload(content, filename, mime) {
      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const el = document.createElement("a");
      el.href = url;
      el.download = filename;
      el.click();
      URL.revokeObjectURL(url);
    },

    downloadJSON() {
      const payload = generateJSON(this.config);
      this.handleDownload(JSON.stringify(payload, null, 2), "ds-variables.json", "application/json");
      this.variablesConfigured = true;
    },

    downloadSpecs() {
      const payload = generateSpecsMd(this.config, this.selectedComponents);
      this.handleDownload(payload, "ds-specs.md", "text/markdown");
      this.componentsConfirmed = true;
    },

    downloadTodo() {
      const payload = generateTodoMd(this.selectedComponents, this.todoChecked);
      this.handleDownload(payload, "ds-todo.md", "text/markdown");
    },
    
    // UI Helpers exposed to template
    getContrastRatio,
    getClosestAAAColor,
    catalog: COMPONENT_CATALOG,
    buildTodoItems,
    
    checkContrast(fg, bg, target) {
        const ratio = getContrastRatio(fg, bg);
        const isOk = ratio >= target;
        let suggested = null;
        if (!isOk) {
             suggested = getClosestAAAColor(fg, bg, target);
        }
        return {
            ratio: ratio.toFixed(2),
            isOk,
            suggested,
            tooltip: isOk ? `Contraste AAA conforme : ${ratio.toFixed(2)}:1` : `⚠️ Insuffisant : ${ratio.toFixed(2)}:1. Suggéré : ${suggested}`
        };
    }
  }));

Alpine.start();
