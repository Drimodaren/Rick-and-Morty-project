import React from "react";
import BaseFilterCharacters from "./BaseFilterCharacters";
import BaseSelectCharacters from "./BaseFilterSelectCharacters";
import { GENDER, SPECIES, STATUS } from "./constant";
import style from "./Filter.module.scss";

export default function Filter() {
   
    return (
        <div className="container">
            <div className={style.inputFeld}>
                <BaseFilterCharacters
                    fieldName="name"
                    placeholder="Name character..."
                    label= {<span>&#128269; Filter by name...</span>}
                    
                />
                <BaseSelectCharacters fieldName="species" placeholder="Species">
                    {SPECIES.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </BaseSelectCharacters>
                <BaseSelectCharacters fieldName="gender" placeholder="Gender">
                    {GENDER.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </BaseSelectCharacters>
                <BaseSelectCharacters fieldName="status" placeholder="Status">
                    {STATUS.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </BaseSelectCharacters>
            </div>
        </div>
    );
}
