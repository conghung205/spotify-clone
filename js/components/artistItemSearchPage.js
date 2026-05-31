function artistItemSearchPage(artist) {
    return `
    <div class="search-item" data-id="${artist.id}" data-type="${artist.type}">
        <div class="search-item-info">
            <div class="artist-image-sidebar">
                <img
                    src="${artist.image}?height=40&width=40"
                    alt="${artist.name}"
                />
            </div>
            <div class="artist-info-sidebar">
                <div class="artist-name-sidebar">
                    ${artist.name}
                </div>
                <div class="artist-subtext">
                    ${artist.subText}
                </div>
            </div>
        </div>

       <button 
            data-id="${artist.id}" 
            data-type="${artist.type}" 
            class="search-item-follow ${artist.is_followed ? "followed" : ""}"
        >
            ${artist.is_followed ? "Following" : "Follow"}
        </button>
       
    </div>`;
}
export default artistItemSearchPage;
