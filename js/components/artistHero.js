function artistHero({ name, background_image_url }) {
    return `
    <section class="artist-hero">
        <div class="hero-background">
            <img
                src="${background_image_url}"
                alt="Đen artist background"
                class="${name}"
            />
            <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
            <div class="verified-badge">
                <i class="fas fa-check-circle"></i>
                <span>Verified Artist</span>
            </div>
            <h1 class="artist-name">${name}</h1>
            <p class="monthly-listeners">
                1,021,833 monthly listeners
            </p>
        </div>
    </section>`;
}

export default artistHero;
