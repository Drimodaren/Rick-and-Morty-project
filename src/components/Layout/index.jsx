import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import style from "./Layout.module.scss";

export default function Layout() {
    return (
        <div className={style.Layout}>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}
