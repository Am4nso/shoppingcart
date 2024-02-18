import {ReactNode} from "react";


export function Layout({children}: { children: ReactNode }) {
  return (
    <>
        <header>
            <h1 onClick={() => {
                window.location.href = "/"
            }}>Shopping Cart</h1>
        </header>

        <main>
            <div className={"wrapped-main"}>
                {children}
            </div>
        </main>
    </>
  );
}
