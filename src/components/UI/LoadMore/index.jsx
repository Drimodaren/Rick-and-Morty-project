import React from "react";
import style from "./LoadMore.module.scss";
import { useDispatch } from "react-redux";

export default function LoadMore({ loadData }) {
    const dispatch = useDispatch();
    const loadMore = () => {
        dispatch(loadData);
    };
    return (
        <button className={style.button} onClick={loadMore}>
            LOAD MORE
        </button>
    );
}
