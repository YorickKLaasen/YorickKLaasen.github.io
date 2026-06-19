/* ── CODE VIEWER ─────────────────────────────────── */

const codeTabs = document.querySelectorAll('.ctab');
const codeContent = document.getElementById('code-content');

async function loadScript(file) {

    try {

        const response = await fetch(`CsharpCode/${file}`);

        if (!response.ok) {
            throw new Error('Script niet gevonden');
        }

        const text = await response.text();

        codeContent.textContent = text;
    }
    catch (error) {

        console.error(error);

        codeContent.textContent =
            'Kon script niet laden.';
    }
}

codeTabs.forEach(tab => {

    tab.addEventListener('click', () => {

        codeTabs.forEach(t =>
            t.classList.remove('active')
        );

        tab.classList.add('active');

        loadScript(tab.dataset.file);
    });
});

/* Eerste script laden */

const firstTab =
    document.querySelector('.ctab.active');

if (firstTab) {
    loadScript(firstTab.dataset.file);
}

/* ── COPY CODE ───────────────────────────────────── */

function copyCode() {

    navigator.clipboard.writeText(
        codeContent.textContent
    ).then(() => {

        const btn =
            document.querySelector('.copy-btn');

        const originalText =
            btn.textContent;

        btn.textContent = 'Gekopieerd!';

        setTimeout(() => {

            btn.textContent =
                originalText;

        }, 1500);
    });
}