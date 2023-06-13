import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "components/UI/Spinner";
import { loadCharacters } from "store/characters/actions";
import { LOADING_STATE } from "store/characters/constans";
import { getLoading, getErrors, getCharactersAllIds } from "store/characters/selectors";
import style from "./Characters.module.scss";
import image from "images/Charates_Main.png";
import LoadMore from "components/UI/LoadMore";
import Filter from "./Filters/index.jsx";
import CharacterCard from "./CharacterCard";

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
            <img src={image} alt="Characters" />
            <div>
                <Filter />
            </div>
            <div className={style.charactersCards}>
                {charactersIds.map(item => (
                    <CharacterCard id={item} key={item} />
                ))}
                {loading === LOADING_STATE.LOADING && <Spinner />}
            </div>
            <LoadMore />
        </div>
    );
}
