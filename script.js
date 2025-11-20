const html = document.documentElement;
const btn = document.getElementById('theme-toggle');

const ICONS = {
    sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="M12 4v1m0 14v1M4 12H3m18 0h-1M5.6 5.6l-.7-.7m14.2 14.2l-.7-.7M18.4 5.6l.7-.7M5.6 18.4l.7-.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/>
  </svg>`,
    moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
};

function setButtonState(theme) {
    if (!btn) return;
    const isDark = theme === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    btn.innerHTML = `${isDark ? ICONS.moon : ICONS.sun}<span class="btn-label">${isDark ? 'Dark theme' : 'Light theme'}</span>`;
}

function lightTheme() {
    html.classList.remove('dark');
    html.classList.add('light');
    setButtonState('light');
    localStorage.setItem('theme', 'light');
}

function darkTheme() {
    html.classList.add('dark');
    html.classList.remove('light');
    setButtonState('dark');
    localStorage.setItem('theme', 'dark');
}

function localTheme() {
    let theme = localStorage.getItem('theme');
    if (theme !== null) {
        theme === 'light' ? lightTheme() : darkTheme();
    } else {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.matches ? darkTheme() : lightTheme();

        
        function handleThemeChange(e) {
            e.matches ? darkTheme() : lightTheme();
        }
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleThemeChange);
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(handleThemeChange); 
        }
    }
}


localTheme();

if (btn) {
    btn.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            lightTheme();
        } else {
            darkTheme();
        }
        
        btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(.98)' }, { transform: 'scale(1)' }], { duration: 180 });
    });
}