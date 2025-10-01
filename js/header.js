document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    if (header) {
        header.innerHTML = `
            <header class="my-header">
                <div class="logo">MonoLab</div>
            </header>
        `;
    }
});