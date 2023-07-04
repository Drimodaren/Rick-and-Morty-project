import React from "react";
import InputEpisode from "./BaseFilterEpisode/InputEpisode";

export default function Filter() {
    return (
        
            <InputEpisode
                fieldName="name"
                placeholder="Name of episode"
                label={<span>&#128269; Filter by name... </span>}
            />
        
    );
}
