import React, {useState, useRef, useEffect} from 'react';

function Payment() {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
    const product = {
        price: 100,
        description: "Test Course",
    }

    useEffect(() => {
        window.paypal.
        Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: product.description,
                            amount: {
                                currency_code: 'USD',
                                value: product.price,
                            },
                        },
                    ],
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                setPaidFor(true);
                console.log(order);
            },
            onError: err => {
                setError(err);
                console.error(err);
            },
        })
        .render(paypalRef.current);
    }, [product.description, product.price]);

    if (paidFor) {
        return(
            <div>
                <h1>Purchase complete!</h1>
            </div>
        );
    }

    return (
        <div>
            {error && <div>Error occurred! {error.message}</div>}
            <h1>
                {product.description} for ${product.price}
            </h1>
            <div ref={paypalRef}/>
        </div>
    )
}

export default Payment;