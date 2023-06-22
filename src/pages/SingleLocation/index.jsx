import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import style from "./SingleLocation.module.scss";
import { Spinner } from "components/UI/Spinner";
import { withBackButton } from "components/UI/BackButton/withBackButton";
import { getLoadingResidents, getLocationById } from "store/locations/selectors";
import { loadLocation, setResetResidentsAC } from "store/locations/actions";
import CharacterCard from "pages/Characters/CharacterCard";
import { LOADING_STATE } from "store/locations/constans";

export function SingleLocation() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = Number(params.locationId);
    const location = useSelector(state => getLocationById(state, id));
    const loading = useSelector(getLoadingResidents);
    useEffect(() => {
        dispatch(loadLocation(id));

        return () => {
            dispatch(setResetResidentsAC());
        };
    }, [dispatch, id]);

    if (loading !== LOADING_STATE.LOADED) {
        return <Spinner />;
    }

    const residents = location?.residents.map(item => Number(item.split("/").at(-1))) ?? [];
    console.log(residents);
    return (
        <div className={style.singleLocationMain}>
            <div className={style.singleLocationTitle}>
                <h1>{location.name}</h1>
            </div>
            <div className={style.singleLocationSubtitle}>
                <div>
                    <h2>{location.type}</h2>
                </div>
                <div>
                    <h2>{location.dimension}</h2>
                </div>
            </div>
            {residents.length === 0 ? (
                <NavLink to={"/locations"}>
                    <h1>Maybe nobody's home...</h1>
                </NavLink>
            ) : (
                <div className={style.charactersCards}>
                    {residents.map(item => (
                        <CharacterCard key={item} id={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default withBackButton(SingleLocation);
