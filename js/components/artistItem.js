function artistItem(artist) {
    return `
    <div class="artist-item-sidebar library-item" data-id="${artist.id}" data-type="${artist.type}">
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
       
    </div>`;
}
export default artistItem;
