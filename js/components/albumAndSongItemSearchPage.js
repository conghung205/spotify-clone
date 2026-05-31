function albumAndSongItemSearchPage(item) {
    return `
        <div
            class="search-item"
            data-id="${item.id}"
            data-type="${item.type}"
        >
            <div class="search-item-info"> 
                <div>
                    <img
                        src="${item.image || "placeholder.svg?height=48&width=48"}"
                        class="item-image"
                    />
                </div>

                <div class="item-info">
                    <div class="item-title">
                        ${item.name}
                    </div>

                    <div class="item-subtitle">
                        ${item.subText}
                    </div>
                </div>
            </div>

            <button 
                class="search-item-like ${item.is_liked ? "liked" : ""}"
                data-id="${item.id}" 
                data-type="${item.type}">
                ${
                    item.is_liked
                        ? '<i class="bi bi-check-circle-fill icon-check"></i>'
                        : '<i class="bi bi-plus-circle icon-like"></i>'
                }
            </button>
        </div>
    `;
}

export default albumAndSongItemSearchPage;
