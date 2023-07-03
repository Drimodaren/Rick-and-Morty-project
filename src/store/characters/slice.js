import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
    isFulfilled,
    isPending,
    isRejected
} from "@reduxjs/toolkit";
import { INITIAL_STATE } from "store/characters/initialState";
import { LABEL } from "store/shared/labels";
import { getCharacters } from "rickmortyapi";
import { debounceThunk } from "store/shared/debounceThunk";
import { LOADING_STATE } from "store/shared/loadingState";

//1.создаем адаптер - он умеет сам работать с byId/allIds и еще умеет сам делать селекторы
export const characterAdapter = createEntityAdapter();

//2. создаем начальное состояние - для работы адаптера используем его методы (он развернет все что нужно в кусок стора)
const initialState = { ...INITIAL_STATE, ...characterAdapter.getInitialState() };
//3.создаем слайс - это большая обертка над обычным reducer
export const charactersSlice = createSlice({
    initialState, //передаем начальное состояние
    name: LABEL.CHARACTERS, //это будет префикс как в actionType
    reducers: {
        //тут создаем обычный редюсер, но из него нам надо только изменение формы, остальное мы сделаем хитро
        changeFormField: (state, action) => {
            state.form[action.payload.fieldName] = action.payload.value; //тут можно мутировать (без спредов) а можно и не мутировать
        }
    },
    extraReducers: builder => {
        //вот тут будет хитрость - extraReducer позволяет работать с тем, что создано с помощью createAsyncThunk
        builder
            .addCase(loadCharacters.fulfilled, (state, action) => {
                characterAdapter.setAll(state, action.payload); //вот работа адаптера - setAll заменит все данные
                state.currentPage = 1; //тут же мы сбрасываем страницу в 1, здесь все можно делать потоком а не возвращать объект
            })
            .addCase(loadMoreCharacters.fulfilled, (state, action) => {
                characterAdapter.addMany(state, action.payload); //вторая штука с адаптером - addMany обновить данные если их не было
                state.currentPage += 1;
            })
            .addMatcher(isRejected(loadCharacters, loadMoreCharacters), (state, action) => {
                //кабзда магия - мы заменяем логику asyncThunk и делаем ошибку сразу для всех переданных методов
                state.errors = action.error; //TODO надо проверить что здесь в action.payload/action.error
                state.loading = LOADING_STATE.LOADED;
            })
            .addMatcher(isPending(loadCharacters, loadMoreCharacters), state => {
                //тоже самое только с загрузкой
                state.loading = LOADING_STATE.LOADING;
            })
            .addMatcher(isFulfilled(loadCharacters, loadMoreCharacters), state => {
                //тоже самое только с загружено
                state.loading = LOADING_STATE.LOADED;
            });
    }
});

// const {actions, reducer, slice, adapter}=sharedSlice(LABEL.CHARACTERS, initialState, loadCharacters, loadMoreCharacters)

//тут делаем селекторы для адаптера - данные он достанет сам, нам надо только сказать в каком именно месте глобального стора они лежат
export const characterSelector = characterAdapter.getSelectors(state => state.characters);
export const getCharactersById = state => characterSelector.selectEntities(state); //EXAMPLE
export const getCharactersAllIds = state => characterSelector.selectIds(state); //вот так к примеру мы достанем allIds, можно и не делать промежуточную функцию а сразу передать useSelector(characterSelector.selectIds) и он все сам сделает
export const gerForm = state => state.characters.form; //общий селектор для формы, нужен чтоб показать что такое createSelector

export const getName = createSelector(gerForm, form => form.name); //собственно пример - здесь пока gerForm не изменится остальные селекторы не перерисуют компоненты
export const getSpecies = createSelector(gerForm, form => form.species);
export const getGender = createSelector(gerForm, form => form.gender);
export const getStatus = createSelector(gerForm, form => form.status);
export const getLoading = state => state.characters.loading;
export const getErrors = state => state.characters.errors;
export const getPage = state => state.characters.currentPage;
export const getCharacterById = (state, id) => characterSelector.selectById(state, id); //вот еще пример селектора из адаптера
//ебаная магия номер два - делаем createAsyncThunk
export const loadCharacters = createAsyncThunk(LABEL.CHARACTERS + "/firstLoad", async (_, { getState, dispatch }) => {
    const page = 1;
    const name = getName(getState());
    const species = getSpecies(getState());
    const gender = getGender(getState());
    const status = getStatus(getState());
    const characters = await getCharacters({ page, name, species, gender, status });
    return characters.data.results;
});
export const loadMoreCharacters = createAsyncThunk(LABEL.CHARACTERS + "/update", async (_, { getState }) => {
    const page = getPage(getState()) + 1;
    const name = getName(getState());
    const species = getSpecies(getState());
    const gender = getGender(getState());
    const status = getStatus(getState());
    const characters = await getCharacters({ page, name, species, gender, status });
    return characters.data.results;
});
export const { actions, reducer } = charactersSlice; //достаем экшены и редюсер из слайса
//обычные санки созданные руками тоже можно делать если у них не нужно тригерить что то через extraReducer
export const changeFilterThunk = (fieldName, value) => dispatch => {
    dispatch(actions.changeFormField({ fieldName, value }));
    dispatch(debounceThunk(loadCharacters)); //TODO работает не верно - все равно будет несколько вызовов, просто с разными данными
};
export const changeSelectThunk = (fieldName, value) => dispatch => {
    dispatch(actions.changeFormField({ fieldName, value }));
    dispatch(loadCharacters());
};
