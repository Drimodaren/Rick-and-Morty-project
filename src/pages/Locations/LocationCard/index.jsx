import Card from "components/UI/Card";
import React from "react";
import { useSelector } from "react-redux";
import { getLocationById } from "store/locations/selectors";


export default function LocationCard({ id }) {
    const item = useSelector(state => getLocationById(state, id));

    return <Card title={item.name} description={item.type} id={item.id} type={'/locations'}/>;
}
