import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "components/UI/Spinner";
import { LOADING_STATE } from "store/shared/loadingState";
import { getLoading, getErrors, getCharactersAllIds, loadCharacters, loadMoreCharacters } from "store/characters/slice";
import style from "./Characters.module.scss";
import image from "images/Charates_Main.png";
import LoadMore from "components/UI/LoadMore";
import Filter from "./Filters/index.jsx";
import CharacterCard from "./CharacterCard";
import Quotes from "components/UI/Quotes";

export default function Characters() {
    const dispatch = useDispatch();
    const charactersIds = useSelector(getCharactersAllIds);
    const loading = useSelector(getLoading);
    const error = useSelector(getErrors);
    useEffect(() => {
        dispatch(loadCharacters());
    }, [dispatch]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={style.characters}>
            <div>
                <Quotes image={image} />
            </div>

            <div className={style.filter}>
                <Filter />
            </div>

            <div className={style.charactersCards}>
                {charactersIds.map(item => (
                    <CharacterCard id={item} key={item} />
                ))}
                {loading === LOADING_STATE.LOADING && <Spinner />}
            </div>
            <LoadMore loadData={loadMoreCharacters} />
        </div>
    );
}
