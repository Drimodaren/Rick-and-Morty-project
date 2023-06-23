import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "components/UI/Spinner";
import { LOADING_STATE } from "store/locations/constans";
import style from "./Locations.module.scss";
import image from "images/Lockation_Main.png";
import LoadMore from "components/UI/LoadMore";
import { loadLocations, loadMoreLocations } from "store/locations/actions";
import { getErrors, getLoading, getLocationsAllIds } from "store/locations/selectors";
import LocationCard from "./LocationCard";
import FilterLocations from "./Filters";
import RandomCard from "components/UI/RandomCard";
export default function Locations() {
    const dispatch = useDispatch();
    const locationsIds = useSelector(getLocationsAllIds);
    const loading = useSelector(getLoading);
    const error = useSelector(getErrors);

    useEffect(() => {
        dispatch(loadLocations());
    }, [dispatch]);
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className={style.locations}>
            <img src={image} alt="Locations" />
            <RandomCard fineText={"let's go in and out Morty, 20 minute adventure"} maxCard={locationsIds.length} />
            <div>
                <FilterLocations />
            </div>
            <div className={style.locationsCards}>
                {locationsIds.map(item => (
                    <LocationCard id={item} key={item} />
                ))}
                {loading === LOADING_STATE.LOADING && <Spinner />}
            </div>
            <LoadMore loadData={loadMoreLocations()} />
        </div>
    );
}
