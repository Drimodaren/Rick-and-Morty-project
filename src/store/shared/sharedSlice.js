import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    isFulfilled,
    isPending,
    isRejected
} from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit/src";
import { LOADING_STATE } from "store/shared/loadingState";
import { LABEL } from "store/shared/labels";
import { INITIAL_STATE } from "store/characters/initialState";
import { getCharacters } from "rickmortyapi";
import { getGender, getName, getPage, getSpecies, getStatus } from "store/characters/slice";

//1 вариант - плохой т.к. его нельзя расширить
export const sharedSlice = (label, initialState, firstLoadThunk, updateThunk) => {
    const changeFormField = createAction(label + "/changeFormField");
    const adapter = createEntityAdapter();
    const slice = createSlice({
        name: label,
        initialState,
        reducers: {
            [changeFormField.type]: (state, action) => {
                state.form[action.payload.fieldName] = action.payload.value;
            }
        },
        extraReducers: builder => {
            builder
                .addCase(firstLoadThunk.fulfilled, (state, action) => {
                    adapter.setAll(state, action.payload);
                    state.currentPage = 1;
                })
                .addCase(updateThunk.fulfilled, (state, action) => {
                    adapter.addMany(state, action.payload);
                    state.currentPage += 1;
                })
                .addMatcher(isRejected(firstLoadThunk, updateThunk), (state, action) => {
                    state.errors = action.error; //TODO надо проверить что здесь в action.payload/action.error
                    state.loading = LOADING_STATE.LOADED;
                })
                .addMatcher(isPending(firstLoadThunk, updateThunk), state => {
                    state.loading = LOADING_STATE.LOADING;
                })
                .addMatcher(isFulfilled(firstLoadThunk, updateThunk), state => {
                    state.loading = LOADING_STATE.LOADED;
                });
        }
    });
    const { reducer, actions } = slice;
    return { slice, adapter, reducer, actions };
};

//2 вариант, сделать функции для общих частей, к примеру для extraReducers и changeFormField

export const sharedExtraReducer = (builder, adapter, firstLoadThunk, updateThunk) => {
    builder
        .addCase(firstLoadThunk.fulfilled, (state, action) => {
            adapter.setAll(state, action.payload);
            state.currentPage = 1;
        })
        .addCase(updateThunk.fulfilled, (state, action) => {
            adapter.addMany(state, action.payload);
            state.currentPage += 1;
        })
        .addMatcher(isRejected(firstLoadThunk, updateThunk), (state, action) => {
            state.errors = action.error; //TODO надо проверить что здесь в action.payload/action.error
            state.loading = LOADING_STATE.LOADED;
        })
        .addMatcher(isPending(firstLoadThunk, updateThunk), state => {
            state.loading = LOADING_STATE.LOADING;
        })
        .addMatcher(isFulfilled(firstLoadThunk, updateThunk), state => {
            state.loading = LOADING_STATE.LOADED;
        });
};

export const sharedChangeFormField = label => createAction(label + "/changeFormField");

export const sharedChangeFormFieldReducer = label => {
    const changeFormField = sharedChangeFormField(label);
    return {
        [changeFormField.type]: (state, action) => {
            state.form[action.payload.fieldName] = action.payload.value;
        }
    };
};
//EXAMPLE USAGE
export const characterAdapter = createEntityAdapter();
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
export const charactersSlice = createSlice({
    initialState: { ...INITIAL_STATE, ...characterAdapter.getInitialState() }, //передаем начальное состояние
    name: LABEL.CHARACTERS, //это будет префикс как в actionType
    reducers: {
        //тут создаем обычный редюсер, но из него нам надо только изменение формы, остальное мы сделаем хитро
        ...sharedChangeFormFieldReducer(LABEL.CHARACTERS)
    },
    extraReducers: builder => {
        //вот тут будет хитрость - extraReducer позволяет работать с тем, что создано с помощью createAsyncThunk
        sharedExtraReducer(builder, characterAdapter, loadCharacters, loadMoreCharacters);
    }
});
