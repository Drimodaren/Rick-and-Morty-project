import style from "./Main.module.scss";
import { Outlet } from "react-router";

export default function Main() {
    return (
        <main className={style.main}>
            <div className="container">
                <Outlet />
            </div>
        </main>
    );
}
