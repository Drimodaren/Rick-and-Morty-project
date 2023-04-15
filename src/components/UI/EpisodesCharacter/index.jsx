import React from "react";

export default function EpisodesCharacter({ id, name, episode, air_date, url }) {
    const lastUrl = url.split("/");
    const numberEpisode = lastUrl[lastUrl.length - 1];

    return <div>{numberEpisode}</div>;
}
