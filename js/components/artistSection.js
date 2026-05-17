function artistSection() {
    return `
    <section class="artists-section">
        <div class="section-header">
            <h2 class="section-heading">Popular artists</h2>
        </div>

        <!-- content -->
        <div class="artists-slider">
            <button class="artists-prev">
                <i class="fa-solid fa-angle-left"></i>
            </button>
            <button class="artists-next">
                <i class="fa-solid fa-angle-right"></i>
            </button>
            <div class="artists-wraper">
                <div class="artists-grid"></div>
            </div>
        </div>
    </section>
    `;
}

export default artistSection;
