document.addEventListener('DOMContentLoaded', () => {
    const wordGrid = document.getElementById('wordGrid');
    const searchInput = document.getElementById('searchInput');
    const catBtns = document.querySelectorAll('.cat-btn');
    const clock = document.getElementById('clock');

    // Live Clock
    setInterval(() => {
        const now = new Date();
        clock.innerText = now.toLocaleTimeString('ne-NP');
    }, 1000);

    // Render Function
    function renderWords(filter = 'all', search = '') {
        wordGrid.innerHTML = '';
        
        const filtered = nepaliData.filter(item => {
            const matchesCat = filter === 'all' || item.cat === filter;
            const matchesSearch = item.word.includes(search) || item.sentence.includes(search);
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            wordGrid.innerHTML = '<p style="text-align:center; padding:20px;">माफ गर्नुहोस्, शब्द भेटिएन।</p>';
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML = `
                <h4>${item.word}</h4>
                <p>${item.sentence}</p>
            `;
            wordGrid.appendChild(card);
        });
    }

    // Search Event
    searchInput.addEventListener('input', (e) => {
        const activeCat = document.querySelector('.cat-btn.active').dataset.cat;
        renderWords(activeCat, e.target.value);
    });

    // Category Event
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderWords(btn.dataset.cat, searchInput.value);
        });
    });

    // Initial Render
    renderWords();
});