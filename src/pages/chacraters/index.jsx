import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/UI/Card";
import { Spinner } from "../../components/UI/Spinner";
import { loadCharacters, loadMoreCharacters } from "../../store/characters/actions";
//import { LOADING_STATE } from "../../store/characters/constans";
import { getLoading, getErrors, getAllCharacters } from "../../store/characters/selectors";
import style from "./Characters.module.scss";
import image from "../../images/Charates_Main.png";

export const LOADING_STATE = { NEVER: "Never", LOADING: "Loading", LOADED: "Loaded" };

export default function Characters() {
    const dispatch = useDispatch();
    const characters = useSelector(getAllCharacters);
    const loading = useSelector(getLoading);
    const error = useSelector(getErrors);

    useEffect(() => {
        dispatch(loadCharacters());
    }, [dispatch]);
    const loadMore = () => {
        dispatch(loadMoreCharacters());
    };

    if (true) {
        return <Spinner />;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className={style.characters}>
            <img src={image} alt="Characters" />
            <div className={style.input}>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
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
            </div>
            <button className={style.button} onClick={loadMore}>
                {" "}
                LOAD MORE
            </button>
        </div>
    );
}
