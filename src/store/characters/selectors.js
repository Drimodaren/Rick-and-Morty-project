export const getCharactersById = state => state.character.characters.byId;
export const getCharactersAllIds = state => state.character.characters.allIds;
export const getName = state => state.character.form.name;
export const getSpecies = state => state.character.form.species;
export const getGender = state => state.character.form.gender;
export const getStatus = state => state.character.form.status;
export const getLoading = state => state.character.loading;
export const getErrors = state => state.character.errors;
export const getPage = state => state.character.currentPage;
export const getCharacterById = (state, id) => getCharactersById(state)[id];
 