// ====================================
// SHARED GENERATOR ENGINE
// ====================================
// This file contains ALL the logic for the font generator
// It can be reused across multiple SEO pages

const GeneratorEngine = {
    state: {
        currentText: "",
        currentIntent: "all",
        fonts: []
    },

    init(fonts, defaultIntent = "all") {
        this.state.fonts = fonts;
        this.state.currentIntent = defaultIntent;
        
        const input = document.getElementById('tool-input');
        if (input) {
            input.addEventListener('input', (e) => {
                this.state.currentText = e.target.value;
                this.render();
            });
            this.state.currentText = input.value || "Generador de Letras";
        }

        this.renderSidebar();
        this.render();
    },

    setIntent(intent) {
        this.state.currentIntent = intent;
        this.updateActiveSidebar(intent);
        this.render();
    },

    getFilteredFonts() {
        if (this.state.currentIntent === "all") {
            return this.state.fonts;
        }
        return this.state.fonts.filter(font => font.intent === this.state.currentIntent);
    },

    render() {
        const container = document.getElementById('tool-results');
        if (!container) return;
        
        const filtered = this.getFilteredFonts();
        const text = this.state.currentText || "Generador de Letras";
        
        container.innerHTML = '';
        
        if (filtered.length === 0) {
            container.innerHTML = '<p class="no-results">No hay estilos disponibles.</p>';
            return;
        }

        // Group by intent if showing all
        if (this.state.currentIntent === "all") {
            this.renderGrouped(filtered, text, container);
        } else {
            this.renderFlat(filtered, text, container);
        }
    },

    renderGrouped(fonts, text, container) {
        const groups = {};
        fonts.forEach(font => {
            if (!groups[font.intent]) groups[font.intent] = [];
            groups[font.intent].push(font);
        });

        const intentOrder = ['bold', 'cursive', 'fancy', 'aesthetic', 'gaming', 'decorated', 'styling', 'boxed', 'emoji', 'weird'];
        
        intentOrder.forEach(intentKey => {
            if (groups[intentKey]) {
                const header = document.createElement('h3');
                header.className = 'result-section-header';
                header.innerText = window.INTENT_LABELS?.[intentKey] || intentKey.toUpperCase();
                container.appendChild(header);
                
                const grid = document.createElement('div');
                grid.className = 'results-subgrid';
                groups[intentKey].forEach(font => {
                    grid.appendChild(this.createFontCard(font, text));
                });
                container.appendChild(grid);
            }
        });
    },

    renderFlat(fonts, text, container) {
        fonts.forEach(font => {
            container.appendChild(this.createFontCard(font, text));
        });
    },

    createFontCard(font, text) {
        const transformed = font.transform(text);
        const card = document.createElement('div');
        card.className = 'font-card';
        card.innerHTML = `
            <div class="font-info">
                <span class="font-name">${font.name}</span>
                <div class="font-preview">${transformed}</div>
            </div>
            <button class="copy-btn">Copiar</button>
        `;
        
        card.querySelector('.copy-btn').addEventListener('click', (e) => {
            this.copyToClipboard(transformed, e.target);
        });
        
        return card;
    },

    copyToClipboard(text, btnElement) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = btnElement.innerText;
            btnElement.innerText = "¡Copiado!";
            btnElement.classList.add("copied");
            setTimeout(() => {
                btnElement.innerText = originalText;
                btnElement.classList.remove("copied");
            }, 2000);
        });
    },

    renderSidebar() {
        const sidebar = document.getElementById('tool-sidebar');
        if (!sidebar || !window.INTENT_MENU) return;
        
        sidebar.innerHTML = '';

        Object.keys(window.INTENT_MENU).forEach(label => {
            const intentKey = window.INTENT_MENU[label];
            const btn = document.createElement('button');
            btn.className = 'sidebar-btn';
            btn.innerText = label;
            btn.dataset.intent = intentKey;
            btn.type = 'button';

            btn.addEventListener('click', () => {
                this.setIntent(intentKey);
            });

            sidebar.appendChild(btn);
        });

        this.updateActiveSidebar(this.state.currentIntent);
    },

    updateActiveSidebar(activeIntent) {
        document.querySelectorAll('.sidebar-btn').forEach(btn => {
            if (btn.dataset.intent === activeIntent) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
};

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.FONT_DATA && window.DEFAULT_INTENT !== undefined) {
        GeneratorEngine.init(window.FONT_DATA, window.DEFAULT_INTENT);
    }
});
