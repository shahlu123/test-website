// COMBINED FONT LOADER
// This file loads all font category files and combines them

// Wait for all font files to load
document.addEventListener('DOMContentLoaded', () => {
    // Combine all fonts from different categories
    window.FONT_DATA = [
        ...(window.FONTS_BOLD || []),
        ...(window.FONTS_CURSIVE || []),
        ...(window.FONTS_FANCY || []),
        ...(window.FONTS_AESTHETIC || []),
        ...(window.FONTS_GAMING || []),
        ...(window.FONTS_DECORATED || []),
        ...(window.FONTS_STYLING || []),
        ...(window.FONTS_BOXED || []),
        ...(window.FONTS_EMOJI || []),
        ...(window.FONTS_WEIRD || []),
        ...(window.FONTS_SYMBOLS || []),
        ...(window.FONTS_MATH || []),
        ...(window.FONTS_SQUARES || []),
        ...(window.FONTS_CIRCLES || []),
        ...(window.FONTS_ARROWS || []),
        ...(window.FONTS_LINES || []),
        ...(window.FONTS_HEARTS || []),
        ...(window.FONTS_STARS || []),
        ...(window.FONTS_FRAMES || []),
        ...(window.FONTS_SPECIAL || [])
    ];

    console.log(`✅ Loaded ${window.FONT_DATA.length} font styles`);
});

// Intent-Based Menu Structure
window.INTENT_MENU = {
    "Generador de Letras": "all",
    "Letras en Negrita": "bold",
    "Letras Cursivas": "cursive",
    "Letras Bonitas": "fancy",
    "Letras Aesthetic": "aesthetic",
    "Nombres para Juegos": "gaming",
    "Letras Decoradas": "decorated",
    "Estilos de Texto": "styling",
    "Cajas y Marcos": "boxed",
    "Emoji y Kaomoji": "emoji",
    "Letras Raras": "weird"
};

// Labels for Section Headings
window.INTENT_LABELS = {
    "bold": "Letras en Negrita",
    "cursive": "Letras Cursivas / Script",
    "fancy": "Letras Bonitas y Elegantes",
    "aesthetic": "Letras Aesthetic",
    "gaming": "Nombres para Juegos",
    "decorated": "Letras Decoradas",
    "styling": "EstilosEstilos de Texto",
    "boxed": "Cajas y Marcos",
    "emoji": "Emoji y Kaomoji",
    "weird": "Letras Raras"
};
