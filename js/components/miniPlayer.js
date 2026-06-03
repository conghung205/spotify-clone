function miniPlayer() {
    return `
    <div id="mini-player" class="mini-player hidden">
        <div class="mini-progress-bar">
            <div class="mini-progress-fill"></div>
        </div>
        
        <div class="mini-player-content">
            <div class="mini-left">
                <img id="mini-avatar" src="placeholder.svg" alt="track avatar" />
                <div class="mini-info">
                    <div id="mini-title">Chưa có bài hát</div>
                </div>
            </div>
            <div class="mini-right">
                <button id="mini-btn-play" class="play-btn-large"><i class="fas fa-play"></i></button>
            </div>
        </div>

    </div>`;
}
export default miniPlayer;
