function artistControls(artist) {
    const buttonText = artist.is_following ? "Following" : "Follow";
    const buttonClass = artist.is_following
        ? "btn-follow-artist following"
        : "btn-follow-artist";

    return `
    <section class="container-artist-controls">
        <div class="artist-controls">
            <button disabled class="play-btn-large">
                <i class="fas fa-play"></i>
            </button>
            <button disabled class="control-btn-shuffle-large btn-shuffle">
                <i class="bi bi-shuffle"></i>
            </button>
            <button class="${buttonClass}">
                <span>${buttonText}</span>
            </button>
        </div>   
   </section>`;
}

export default artistControls;
