import Card from "components/UI/Card";
import React from "react";
import { useSelector } from "react-redux";
import { getEpisodesById } from "store/episodes/selectors";

export default function EpisodeCard({ id }) {
    const item = useSelector(state => getEpisodesById(state, id));

    return (
        
            <Card title={item.name} description={item.air_date} info={item.episode} type={"/episodes"} id={item.id} />
        
    );
}
