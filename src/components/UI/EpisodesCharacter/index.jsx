import React from "react";

export default function EpisodesCharacter({ id, name, episode, air_date, url }) {
    const lastUrl = url.slice(40);
    return <div>{lastUrl}</div>;
}
