export const getAllCharacters = state => state.character.characters;
export const getLoading = state => state.character.loading;
export const getErrors = state => state.character.errors;
export const getPage = state => state.character.currentPage;
export const getCharacterById = (state, id) => state.character.characters.find(el => el.id === id);
