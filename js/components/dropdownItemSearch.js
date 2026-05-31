function dropdownItemSearch(item) {
    // nếu là nghệ sĩ thì thêm class 'circle-img' để làm ảnh tròn, còn lại ảnh vuông
    const imgClass = item.type === "artist" ? "circle-img" : "";

    return `
    <div class="dropdown-item-search" data-id="${item.id}" data-type="${item.type}">
        <img class="${imgClass}" src="${item.image}" alt="${item.name}">
        <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-sub">${item.subText}</div>
        </div>
    </div>`;
}

export default dropdownItemSearch;
