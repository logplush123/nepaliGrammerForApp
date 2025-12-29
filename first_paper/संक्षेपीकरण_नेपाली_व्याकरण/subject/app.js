document.addEventListener('DOMContentLoaded', () => {
    const tocList = document.getElementById('toc');
    const contentDisplay = document.getElementById('content-display');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // Load Table of Contents
    bookData.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.title;
        li.onclick = () => {
            renderContent(index);
            if(window.innerWidth <= 768) sidebar.classList.remove('active');
        };
        tocList.appendChild(li);
    });

    // Render Content Function
    function renderContent(index) {
        const data = bookData[index];
        contentDisplay.innerHTML = data.content;
        document.getElementById('page-number').textContent = ` ${index + 1}`;
        window.scrollTo(0, 0);
    }

    // Toggle Sidebar for Mobile
    menuToggle.onclick = () => {
        sidebar.classList.toggle('active');
    };

    // Initial Load
    renderContent(0);
});