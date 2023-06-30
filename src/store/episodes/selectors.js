export const getEpisodesById = state=>state.episodes.entities.byId
export const getEpisodesByAllIds = state=>state.episodes.entities.allIds
export const getErrors = state=>state.episodes.errors
export const getEpisodesId = (state,id)=>getEpisodesById(state)[id]
export const changeName = (state,name)=>state.episodes.form.name[name]
export const getName = state=>state.episodes.form.name