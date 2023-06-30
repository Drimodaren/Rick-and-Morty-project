import Card from "components/UI/Card";
import React from "react";
import { useSelector } from "react-redux";
import { getEpisodesId } from "store/episodes/selectors";

export default function EpisodeCard({ id }) {
    const item = useSelector(state=>getEpisodesId(state, id));
   
    return <div>
      <Card title={item.name} description={item.air_date} info={item.episode}/>
    </div>;
}
