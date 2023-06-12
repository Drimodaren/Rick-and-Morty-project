import React from "react";
import style from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className="container">
                <div>Created by Menshikov Andrey</div>
                <div>
                    <a href="mailto:Men.a.a@yandex.ru">Обратная связь </a>
                    <p>&#9993;</p>
                </div>
            </div>
        </footer>
    );
}
