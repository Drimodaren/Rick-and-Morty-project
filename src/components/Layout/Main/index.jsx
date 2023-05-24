import { Suspense } from "react";
import style from "./main.module.scss";
import { Outlet } from "react-router";

export default function Main() {
    return (
        <main className={style.main}>
            <div className="container">
            <Suspense fallback={<div/>}><Outlet/></Suspense>

            </div>
        </main>
    );
}
