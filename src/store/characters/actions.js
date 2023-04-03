import { getCharacters } from "rickmortyapi";

export const asyncGetAllCharacters =
    (page = 1) =>
    async (dispatch, getState) => {
        const result = await getCharacters({ page, name: "rick", gender: "male", status: "alive" }); //это пример как этим пользоваться
        console.log(result);
    };
