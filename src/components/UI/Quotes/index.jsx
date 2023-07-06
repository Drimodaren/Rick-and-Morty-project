import React, { useEffect, useState } from "react";
import style from "./Quotes.module.scss";

export default function Quotes({ image }) {
    const [quote, setQuote] = useState("");
    const [loading, setLoading] = useState(true);
    const cb = async () => {
        if (window.location.protocol === "http:") {
            const response = await fetch("http://loremricksum.com/api/");
            const text = await response.json();
            setQuote(text.data[0]);
        } else {
            const response = await fetch(`${process.env.PUBLIC_URL}/rick-and-morty-quotes.json`);
            const arr = await response.json();
            const randomID = Math.floor(Math.random() * (arr.length - 1)) * 1;
            setQuote(arr[randomID]);
        }

        setLoading(false);
    };
    useEffect(() => {
        cb();
    }, []);

    return (
        <div className={style.quote} onClick={cb}>
            <img src={image} alt="Characters" />
            <div className={style.div_quote}>
                <p className={style.span}>{loading ? "..." : quote}</p>
            </div>
        </div>
    );
}
