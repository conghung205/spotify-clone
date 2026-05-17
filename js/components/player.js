function player() {
    return `
    <footer class="player">
        <div class="player-left">
            <img
                src="placeholder.svg?height=56&width=56"
                alt="Current track"
                class="player-image"
            />
            <div class="player-info">
                <div class="player-title">
                    Yêu Một Người Sao Buồn Đến Thế
                </div>
                <div class="player-artist">Noo Phước Thịnh</div>
            </div>
            <button class="add-btn">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <div class="player-center">
            <div class="player-controls">
                <button class="control-btn active">
                    <i class="fas fa-random"></i>
                    <span class="tooltip">Enable shuffle</span>
                </button>
                <button class="control-btn">
                    <i class="fas fa-step-backward"></i>
                    <span class="tooltip">Previous</span>
                </button>
                <button class="control-btn play-btn">
                    <i class="fa-solid fa-play"></i>
                    <span class="tooltip">Play</span>
                </button>
                <button class="control-btn">
                    <i class="fas fa-step-forward"></i>
                    <span class="tooltip">Next</span>
                </button>
                <button class="control-btn">
                    <i class="fas fa-redo"></i>
                    <span class="tooltip">Enable repeat</span>
                </button>
            </div>
            <div class="progress-container">
                <span class="time time-start">0:52</span>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                    <div class="progress-handle"></div>
                </div>
                <span class="time time-end">4:59</span>
            </div>
        </div>

        <div class="player-right">
            <button class="control-btn">
                <i class="fas fa-microphone"></i>
            </button>
            <div class="volume-container">
                <button class="control-btn">
                    <i class="fas fa-volume-down"></i>
                </button>
                <div class="volume-bar">
                    <div class="volume-fill" style="width: 70%"></div>
                    <div class="volume-handle"></div>
                </div>
            </div>
            <button class="control-btn">
                <i class="fas fa-expand"></i>
            </button>
        </div>
    </footer>`;
}

export default player;
