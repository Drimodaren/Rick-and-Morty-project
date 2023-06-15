import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Spinner } from "components/UI/Spinner";
import { withBackButton } from "components/UI/BackButton/withBackButton";
import { getLocationById } from "store/locations/selectors";
import { loadLocation } from "store/locations/actions";


export function SingleLocation() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = Number(params.locationId);
    const location = useSelector(state => getLocationById(state, id));
   

    useEffect(() => {
        if (!location) {
            dispatch(loadLocation(id));
        }
    }, [location, dispatch, id]);
    if (!location) {
        return <Spinner />;
    }
    return <div>
        
    </div>;
}

export default withBackButton(SingleLocation);
