import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCharacterById, getLoadingEpisodes } from "store/characters/selectors";
import { loadCharacter, setResetEpisodesAC } from "store/characters/actions";
import { Spinner } from "components/UI/Spinner";
import style from "./SingleCharacters.module.scss";

import { withBackButton } from "components/UI/BackButton/withBackButton";
import EpisodeCard from "pages/Episodes/EpisodeCard";
import { LOADING_STATE } from "store/shared/loadingState";

export function SingleCharacter() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = Number(params.characterId);
    const character = useSelector(state => getCharacterById(state, id));
    const loading = useSelector(getLoadingEpisodes);

    useEffect(() => {
        dispatch(loadCharacter(id));

        return () => {
            dispatch(setResetEpisodesAC());
        };
    }, [character, dispatch, id]);

    if (loading !== LOADING_STATE.LOADED) {
        return <Spinner />;
    }
    const episodes = character?.episode.map(item => Number(item.split("/").at(-1))) ?? [];

    return (
        <div className={style.SingleCharacterMain}>
            <div className={style.SingleCharacterAbout}>
                <div className={style.SingleCharacterImgName}>
                    <h1>{character.name}</h1>
                    <img src={character.image} alt="cardImage" className={style.cardImage} />
                </div>

                <div className={style.SingleCharacterInformations}>
                    <span>Informations</span>
                    <div className={style.CardInformations}>
                        <div>
                            <h3>Gender</h3>
                            <p>{character.gender}</p>
                        </div>
                        <div>
                            <h3>Status</h3>
                            <p>{character.status}</p>
                        </div>
                        <div>
                            <h3>Specie</h3>
                            <p>{character.species}</p>
                        </div>
                        <div>
                            <h3>Origin</h3>
                            <p>{character.origin.name}</p>
                        </div>
                        <div>
                            <h3>Type</h3>
                            <p>{character.type}</p>
                        </div>
                        <div>
                            <h3>Location</h3>
                            <p>{character.location.name}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.SingleCharacterMainEpisode}>
                <span>Episodes</span>
                <div className={style.SingleCharacterEpisode}>
                    {episodes.map(item => (
                        <div key={item}>
                            {" "}
                            <EpisodeCard id={item} />{" "}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default withBackButton(SingleCharacter);
