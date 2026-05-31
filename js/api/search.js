import httpRequest from "./httpRequest.js";

export const getSuggestionsSearch = (query) => {
    return httpRequest.get(`/search/suggestions?q=${query}&limit=5`);
};

export const getUniversalSearch = (query) => {
    return httpRequest.get(`/search?q=${query}&type=all&limit=20&offset=0`);
};
