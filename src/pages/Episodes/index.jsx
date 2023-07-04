import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEpisodes, loadMoreEpisodes } from "store/episodes/actions";
import { getEpisodesByAllIds, getErrors } from "store/episodes/selectors";
import EpisodeCard from "./EpisodeCard";
import Filter from "./Filter";
import image from "../../images/Episodes_Main.png";
import style from "./Episodes.module.scss";
import LoadMore from "components/UI/LoadMore";
export default function Episodes() {
    const [pickleRick, setPickleRick] = useState(false);

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
        <div className={style.mainEpisodes}>
            <img src={image} alt=" Episode" onClick={prev => setPickleRick(!pickleRick)} />
            {pickleRick ? (
                <iframe
                    src="https://www.youtube.com/embed/leCVVw6iD84?autoplay=1"
                    title="YouTube video player"
                    allow="autoplay; "
                ></iframe>
            ) : (
                ""
            )}
            <div className={style.filterEpisodes}>
                <Filter />
            </div>
            <div className={style.cardsEpisodes}>
                {episodesId.map(item => (
                    <EpisodeCard id={item} key={item} />
                ))}
            </div>
            <LoadMore loadData={loadMoreEpisodes} />
        </div>
    );
}
