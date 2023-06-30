import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEpisodes } from "store/episodes/actions";
import { getEpisodesByAllIds, getErrors } from "store/episodes/selectors";
import EpisodeCard from "./EpisodeCard";
import Filter from "./Filter";
export default function Episodes() {
    const episodesId = useSelector(getEpisodesByAllIds);
    const error = useSelector(getErrors);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadEpisodes());
    }, [dispatch]);
    if (error) {
        <div>{error}</div>;
    }
    return (
        <div>
            <Filter />
            <div>
                {episodesId.map(item => (
                    <EpisodeCard id={item} key={item} />
                ))}
            </div>
        </div>
    );
}
