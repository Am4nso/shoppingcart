import {useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import Barcode from "react-barcode";
import {Item} from "./typed.ts";


export function Cart() {


    const {barcode} = useParams();
    const [cart, setCart] = useState<Item[]>(JSON.parse(localStorage.getItem(barcode!)?? "[]") as Item[]);
    const [tempBarcode, setTempBarcode] = useState("");


    useEffect(() => {
        localStorage.setItem(barcode!, JSON.stringify(cart));
    }, [barcode, cart]);

    useEffect(() => {
        function handleKeyPress(e: KeyboardEvent) {

            if (e.key.match(/^[a-zA-Z0-9]$/) && e.key.length === 1) {
                setTempBarcode(tempBarcode + e.key);
            } else if (e.key === "Enter") {
                const item = cart.find(item => item.barcode === tempBarcode);
                if (item) {
                    item.quantity = item.quantity ? item.quantity + 1 : 2;
                    setCart([...cart]);
                } else {

                    // check if barcode exists
                    console.log(tempBarcode)
                    const itemList = JSON.parse(localStorage.getItem("allItemsEnter") ?? "[]") as Item[];
                    console.log(itemList)
                    const item = itemList.find(item => item.barcode === tempBarcode);

                    if (item) {
                        setCart([...cart, {...item}]);
                    } else {
                        alert("Item not found");
                    }
                }

                setTempBarcode("");

            }
        }

        window.addEventListener('keypress', handleKeyPress)

        return () => {
            window.removeEventListener('keypress', handleKeyPress)
        }
    }, [cart, tempBarcode]);

    if (!barcode) {
        window.location.href = "/";
        return;
    }

    return (
        <>

            <Barcode value={barcode} />

            <div className={"shopping-list"}>

                {cart.length === 0 && <h2>Your cart is empty</h2> }

                {cart.map((item, index) => (
                    <div key={index} className={"shopping-item"}>
                        <div className={"item-index"}>
                            <span>{index+1}</span>
                        </div>
                        <img className={"item-image"} src={item.imageUrl} alt={item.name}/>
                        <div>
                            <h3 className={"item-name"}>{item.name}</h3>
                            <p>${item.price}</p>
                            <p>SKU {item.barcode}</p>
                            {item.quantity && <p>Quantity: {item.quantity}</p>}
                        </div>
                        <div className={"remove-button"} onClick={() => {
                            setCart(cart.filter((_, i) => i !== index))
                        }}>
                            <span>Remove</span>
                        </div>
                    </div>
                ))}

            </div>

            <h3 className={"cart-footer"}>
                <div className={"cart-total-price"}>
                    <span>Total </span>
                    <span>${cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)}</span>
                </div>

                <div className={"checkout-button"} onClick={() => {
                    window.location.href = "/checkout";
                }}>
                    <span>Checkout</span>
                </div>


            </h3>

        </>
    );
}
