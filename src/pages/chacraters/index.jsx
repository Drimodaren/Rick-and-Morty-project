import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "components/UI/Card";
import { Spinner } from "components/UI/Spinner";
import { loadCharacters } from "store/characters/actions";
import { LOADING_STATE } from "store/characters/constans";
import { getLoading, getErrors, getAllCharacters } from "store/characters/selectors";
import style from "./Characters.module.scss";
import image from "images/Charates_Main.png";
import BaseFilterCharacters from "./filters/BaseFilterCharacters";
import BaseSelectCharacters from "./filters/BaseFilterSelectCharacters";
import LoadMore from "components/UI/LoadMore";
import { GENDER, SPECIES, STATUS } from "pages/constant";

export default function Characters() {
    const dispatch = useDispatch();
    const characters = useSelector(getAllCharacters);
    const loading = useSelector(getLoading);
    const error = useSelector(getErrors);
    useEffect(() => {
        dispatch(loadCharacters());
    }, [dispatch]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={style.characters}>
            <img src={image} alt="Characters" />
            <div className={style.inputFeld}>
                <BaseFilterCharacters fieldName="name" placeholder="Name character..." label="Filter by name..." />
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

            <div className={style.charactersCards}>
                {characters.map(item => (
                    <Card
                        key={item.id}
                        url={item.url}
                        title={item.name}
                        description={item.species}
                        info={item.info}
                        image={item.image}
                        id={item.id}
                    />
                ))}
                {loading === LOADING_STATE.LOADING && <Spinner />}
                <LoadMore />
            </div>
        </div>
    );
}
