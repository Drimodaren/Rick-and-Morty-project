import React from "react";

export default function EpisodesCharacter({ id, name, episode, air_date, fake }) {
    const lastUrl = fake.slice(-1);
    return <div>{lastUrl}</div>;
}
