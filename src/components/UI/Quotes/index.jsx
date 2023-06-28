import React, { useEffect, useState } from "react";
import style from "./Quotes.module.scss";

export default function Quotes({ image }) {
    const [quote, setQuote] = useState("");
    const [loading, setLoading] = useState(true);
    const cb = async () => {
        const response = await fetch("http://loremricksum.com/api/");
        const text = await response.json();
        setQuote(text.data[0]);
        setLoading(false);
    };
    useEffect(() => {
        cb();
    }, []);
    console.log(quote);

    return (
        <div className={style.quote} onClick={cb}>
            <img src={image} alt="Characters" />
            <div className={style.div_quote}>
                <p className={style.span}>{loading ? "..." : quote}</p>
            </div>
        </div>
    );
}
