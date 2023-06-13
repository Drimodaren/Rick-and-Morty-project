import React from "react";

import style from "./Filter.module.scss";
import { GENDER, SPECIES, STATUS } from "./constant";
import BaseInputFilterCharacters from "./BaseFilterCharacter/InputCharacter/index.jsx";
import BaseSelectFilterCharacters from "./BaseFilterCharacter/SelectCharacter/index.jsx";

export default function Filter() {
    return (
        <div className={style.inputField}>
            <BaseInputFilterCharacters
                fieldName="name"
                placeholder="Name character..."
                label={<span>&#128269; Filter by name... </span>}
            />
            <BaseSelectFilterCharacters fieldName="species" placeholder="Species">
                {SPECIES.map(item => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </BaseSelectFilterCharacters>
            <BaseSelectFilterCharacters fieldName="gender" placeholder="Gender">
                {GENDER.map(item => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </BaseSelectFilterCharacters>
            <BaseSelectFilterCharacters fieldName="status" placeholder="Status">
                {STATUS.map(item => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </BaseSelectFilterCharacters>
        </div>
    );
}
