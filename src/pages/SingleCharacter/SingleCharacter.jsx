import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../../store/characters/selectors";
import { loadCharacter } from "../../store/characters/actions";
import { Spinner } from "../../components/UI/Spinner";
import BackButton from "../../components/UI/BackButton";
import style from "./SingleCharacters.module.scss";
import EpisodesCharacter from "components/UI/EpisodesCharacter";

export default function SingleCharacter() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = Number(params.characterId);
    const character = useSelector(state => getCharacterById(state, id));
    console.log(character);
    useEffect(() => {
        if (!character) {
            dispatch(loadCharacter(id));
        }
    }, [character, dispatch, id]);
    if (!character) {
        return <Spinner />;
    }
    return (
        <div className={style.SingleCharacte}>
            <div className={style.buttonBack}>
                <BackButton />
            </div>

            <img src={character.image} alt="cardImage" className={style.cardImage} />
            <h1>{character.name}</h1>
            <div className={style.allInformations}>
                <div className={style.title}>
                    <h2>Informations</h2>
                    <h2>Episodes</h2>
                </div>
                <div className={style.cardInformations}>
                    <div className={style.characterInformations}>
                        <div>
                            <h3>Gender</h3>
                            <p>{character.name}</p>
                        </div>
                        <div>
                            <h3>Status</h3>
                            <p>{character.status}</p>
                        </div>
                        <div>
                            <h3>Specie</h3>
                            <p>{character.species}</p>
                        </div>
                        <div>
                            <h3>Origin</h3>
                            <p>{character.origin.name}</p>
                        </div>
                        <div>
                            <h3>Type</h3>
                            <p>{character.type}</p>
                        </div>
                        <div>
                            <h3>Location</h3>
                            <p>{character.location.name}</p>
                        </div>
                    </div>
                    <div className={style.cardEpisodes}>
                        {character.episode.slice(0, 5).map(item => (
                            <EpisodesCharacter
                                key={item}
                                fake={item}
                                // episode={item.episode}
                                // name={item.name}
                                // air_date={item.air_date}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
