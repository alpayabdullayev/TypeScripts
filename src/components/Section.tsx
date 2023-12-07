import React, { useEffect, useState } from "react";
import { Product, todos } from "../type/type";
import Input from "./input";
import Message from "./message";

const Section: React.FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todosArray, setTodosArray] = useState<todos[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [basket, setBasket] = useState<Product[]>([])
    const [wishlist, setWishlist] = useState<Product[]>([])
    const [editId, setEditId] = useState<todos[]>([]);

    const addMessage = () => {
        if (todo) {
            setTodosArray([...todosArray, { text: todo, id: todosArray.length + 1 }]);
        }
    };

    const deleteMesage = (id: number) => {
        setTodosArray(todosArray.filter((x) => x.id !== id));
    };

    function handleEdit(todos: todos) {
        setTodo(todos.text);
        setEditId([todos]);
    }

    async function getProducts() {
        try {
            const response = await fetch(
                "https://northwind.vercel.app/api/categories"
            );
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);


    const addBasket = (products: Product) => {

        const elementIndex = basket.findIndex(x => x.id === products.id)
        if (elementIndex !== -1) {
            const newBasket = [...basket]
            newBasket[elementIndex].count++
            setBasket(newBasket)
        } else {
            setBasket([...basket, { ...products, count: 1 }])
        }
    };

    const removeBasket = (products: Product) => {
        setBasket(basket.filter((x => x.id !== products.id)))
    }

    const handleCountVal = (isAdd: boolean, products: Product) => {
        const elementIndex = basket.findIndex(x => x.id === products.id)
        const newBasket = [...basket]
        if (isAdd) {
            newBasket[elementIndex].count++
            setBasket(newBasket)
        }
        else {
            if (newBasket[elementIndex].count === 1) {
                return
            }
            newBasket[elementIndex].count--
            setBasket(newBasket)
        }
    }

    const addWishlist = (products: Product) => {
        const elementIndex = wishlist.findIndex(x => x.id === products.id)
        if (elementIndex !== -1) {
            const newWishlist = wishlist.filter((x) => x.id !== products.id);
            setWishlist(newWishlist);
        } else {
            setWishlist([...wishlist, { ...products }]);
        }
    }





    return (
        <div>
            <Input todo={todo} setTodo={setTodo} addMessage={addMessage} />
            <Message
                todosArray={todosArray}
                setTodosArray={setTodosArray}
                deleteMesage={deleteMesage}
                handleEdit={handleEdit}
            />
            <div className="products">
                {
                    products && products.map((products) => (
                        <div>
                            <h1>{products.name}</h1>
                            <button onClick={() => addBasket(products)}>addbasket</button>
                            <button onClick={() => addWishlist(products)}> addwishlist</button>
                        </div>
                    ))
                }





            </div>
            <h1>BASKET</h1>
            <div className="basket">

                {
                    basket.map((item) => (
                        <div>
                            <h1>{item.id}</h1>
                            <p>{item.name}</p>
                            <p>{item.count}</p>
                            <button onClick={() => removeBasket(item)}>remove</button>
                            <button onClick={() => handleCountVal(true, item)}>+</button>
                            <button onClick={() => handleCountVal(false, item)}>-</button>
                        </div>
                    ))
                }
            </div>



            <h1>wishlist</h1>

            <div>
                {
                    wishlist.map((item) => (
                        <div>
                            <h1>{item.name}</h1>
                            <p>{item.description}</p>
                            <p>{item.id}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Section;
