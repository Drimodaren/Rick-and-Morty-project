export const getEpisodesById = state => state.episodes.entities.byId;
export const getEpisodesByAllIds = state => state.episodes.entities.allIds;
export const getErrors = state => state.episodes.errors;
export const getEpisodesId = (state, id) => getEpisodesById(state)[id];
export const changeName = (state, fieldName) => state.episodes.form[fieldName];
export const getName = state => state.episodes.form.name;
export const getPage = state => state.episodes.currentPage;
