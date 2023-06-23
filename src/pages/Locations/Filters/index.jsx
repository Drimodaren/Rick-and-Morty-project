import React from "react";

import style from "./Filter.module.scss";
import BaseInputFilterLocations from "./BaseFilterCharacter/InputCharacter/index.jsx";
import BaseSelectFilterLocations from "./BaseFilterCharacter/SelectCharacter/index.jsx";
import { DIMENSIONS, TYPE } from "./constant";

export default function FilterLocations() {
    return (
        <div className={style.inputField}>
            <BaseInputFilterLocations
                fieldName="name"
                placeholder="Name location..."
                label={<span>&#128269; Filter by name... </span>}
            />
            <BaseSelectFilterLocations fieldName="type" placeholder="Type">
                {TYPE.map(item => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </BaseSelectFilterLocations>
            <BaseSelectFilterLocations fieldName="Dimension" placeholder="Dimension">
                {DIMENSIONS.map(item => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </BaseSelectFilterLocations>
        </div>
    );
}
