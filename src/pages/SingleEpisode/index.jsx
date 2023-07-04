import { Spinner } from "components/UI/Spinner";
import CharacterCard from "pages/Characters/CharacterCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { loadEpisode, setResetResidentsAC } from "store/episodes/actions";
import { getEpisodesById, getLoadingResidents } from "store/episodes/selectors";
import { LOADING_STATE } from "store/shared/loadingState";
import style from "./SingleEpisode.module.scss";
import { withBackButton } from "components/UI/BackButton/withBackButton";

export function SingleEpisode() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = Number(params.episodesId);
    const episode = useSelector(state => getEpisodesById(state, id));
    const loading = useSelector(getLoadingResidents);
   
    useEffect(() => {
        dispatch(loadEpisode(id));

        return () => {
            dispatch(setResetResidentsAC());
        };
    }, [dispatch, id]);

    if (loading !== LOADING_STATE.LOADED) {
        return <Spinner />;
    }

    const residents = episode?.characters.map(item => Number(item.split("/").at(-1))) ?? [];

    return (
        <div className={style.singleEpisodeMain}>
            <div className={style.singleEpisodeTitle}>
                <h1>{episode.name}</h1>
            </div>
            <div className={style.singleEpisodeSubtitle}>
                <div>
                    <h1>Episode</h1>
                    <h2>{episode.episode}</h2>
                </div>
                <div>
                    <h1>Date</h1>
                    <h2>{episode.air_date}</h2>
                </div>
            </div>
            {residents.length === 0 ? (
                <NavLink to={"/episodes"}>
                    <h1>Nothing special...</h1>
                </NavLink>
            ) : (
                <div className={style.charactersCards}>
                    {residents.map(item => (
                        <CharacterCard key={item} id={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default withBackButton(SingleEpisode);
