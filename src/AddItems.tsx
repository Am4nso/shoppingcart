import {FormEvent, MouseEventHandler, useEffect, useState} from "react";
import {Item} from "./typed.ts";
import {getBarcodeData} from "./api.ts";

function AddItems() {

    const [items, setItems] = useState<Item[]>(JSON.parse(localStorage.getItem("allItemsEnter") ?? "[]") as Item[]);
    const [form, setForm] = useState({
        barcode: "",
        name: "",
        price: "",
        imageUrl: "https://via.placeholder.com/152"
    });

    const [tempBarcode, setTempBarcode] = useState("");

    useEffect(() => {
        function handleKeyPress(e: KeyboardEvent) {

            if (e.key.match(/^[a-zA-Z0-9]$/) && e.key.length === 1 && document.activeElement?.tagName !== "INPUT") {
                setTempBarcode(tempBarcode + e.key);
                setForm({...form, barcode: tempBarcode});
            } else if (e.key === "Enter" && document.activeElement?.tagName !== "INPUT") {
                setForm({...form, barcode: tempBarcode});
                setTempBarcode("");

                getBarcodeData(tempBarcode).then(data => {
                    if (!data) return;

                    setForm({
                        ...form,
                        barcode: tempBarcode,
                        name: data.product.product_name,
                        imageUrl: data.product.image_url
                    });
                });
            }
        }

        window.addEventListener('keypress', handleKeyPress)

        return () => {
            window.removeEventListener('keypress', handleKeyPress)
        }
    }, [form, tempBarcode]);


    function handleSubmit() {
        console.log(form)

        if (!form.barcode || !form.name || !form.price || !form.imageUrl) return;

        if (items.find(item => item.barcode === form.barcode)) {
            alert("Item with barcode already exists");
            return;
        }

        setItems([...items, {
            barcode: form.barcode,
            name: form.name,
            price: parseInt(form.price),
            imageUrl: form.imageUrl ?? "https://via.placeholder.com/152"
        }]);

        setForm({
            barcode: "",
            name: "",
            price: "",
            imageUrl: "https://via.placeholder.com/152"
        });

        alert("Item added");



    }

    useEffect(() => {
        localStorage.setItem("allItemsEnter", JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        const imag = new Image();
        imag.src = form.imageUrl;
        imag.onload = () => {
            const imagePadding = document.querySelector(".image-padding") as HTMLDivElement;

            if (imagePadding) {
                imagePadding.style.paddingTop = `${(imag.height / imag.width) * 100}%`;
            }
        }
    }, [form.imageUrl]);


    return (
        <>
            <h1>Add Items</h1>

            <form className={"new-item-form"}>
                <div className={"image-wrapper"}>
                    <div style={{backgroundImage: `url(${form.imageUrl})`}} className={"image-preview"}/>
                    <div className={"image-padding"}/>
                    <img id={"img-preview"} src={form.imageUrl} alt="Image not found"/>
                </div>

                <div>
                    <div className={"field"}>
                        <label className={"field-label"} htmlFor="barcode">Barcode</label>
                        <input className={"field-input"}
                               required
                               id="barcode"
                               type="text"
                               value={form.barcode}
                               onChange={(e) => {
                                   setForm({...form, barcode: e.target.value})
                               }}/>
                    </div>

                    <div className={"field"}>
                        <label className={"field-label"} htmlFor="name">Name</label>
                        <input className={"field-input"}
                               required
                               id="name"
                               type="text"
                               value={form.name}
                               onChange={(e) => {
                                   setForm({...form, name: e.target.value})
                               }}/>
                    </div>

                    <div className={"field"}>
                        <label className={"field-label"} htmlFor="price">Price</label>
                        <input className={"field-input"}
                               required
                               id="price"
                               type="text"
                               pattern={"[0-9]*"}
                               value={form.price}
                               onChange={(e) => {
                                   setForm({...form, price: e.target.value})
                               }}/>
                    </div>

                    <div className={"field"}>
                        <label className={"field-label"} htmlFor="imageUrl">Image URL</label>
                        <input className={"field-input"}
                               required
                               id="imageUrl"
                               type="text"
                               value={form.imageUrl}
                               onChange={(e) => {
                                   setForm({...form, imageUrl: e.target.value})
                               }}/>
                    </div>

                    <div className={"add-item-button"} onClick={handleSubmit}>
                        <span>Add Item</span>
                    </div>
                </div>


            </form>

            <div style={{marginTop: "2rem"}}>
                <h2>Current Items</h2>

                <div className={"shopping-list"}>

                    {items.length === 0 && <h2>There are no items</h2>}

                    {items.map((item, index) => (
                        <div key={index} className={"shopping-item"}>
                            <div className={"item-index"}>
                                <span>{index + 1}</span>
                            </div>
                            <img className={"item-image"} src={item.imageUrl} alt={item.name}/>
                            <div>
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>
                                <p>SKU {item.barcode}</p>
                                {item.quantity && <p>Quantity: {item.quantity}</p>}
                            </div>
                            <div className={"remove-button"} onClick={() => {
                                setItems(items.filter((_, i) => i !== index))
                            }}>
                                <span>Remove</span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </>
    );
}

export default AddItems;