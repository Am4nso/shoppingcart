import {useEffect, useState} from "react";

function App() {

    const [tempBarcode, setTempBarcode] = useState("");

    useEffect(() => {
        function handleKeyPress(e: KeyboardEvent) {

            if (e.key.match(/^[a-zA-Z0-9]$/) && e.key.length === 1) {
                setTempBarcode(tempBarcode + e.key);
            } else if (e.key === "Enter") {

                window.location.href = `/cart/${tempBarcode}`

                setTempBarcode("");

            }
        }

        window.addEventListener('keypress', handleKeyPress)

        return () => {
            window.removeEventListener('keypress', handleKeyPress)
        }
    }, [tempBarcode]);


    return (
        <>


            <h2>Start by scanning your Shopping Cart barcode</h2>

            <span style={{marginTop: "12px", width: "fit-content", margin: "0 auto", display: "block"}}>Or</span>

            <div className={"menu"}>
                <div className={"menu-item"} onClick={() => {
                    window.location.href = "/additems"
                }}>
                    <span>Add Items</span>
                </div>

            </div>


        </>
    )
}

export default App
