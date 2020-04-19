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


// WIP version below is buggy, commented out for the sake of the merge request from branch */
/* import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPaidFor, setError } from '../../store/paymentSlice';

function Payment() {
    const addedCourses = useSelector(state => state.cart.courseList);
    // must use keyword 'let' not 'const' because the stateOfPayment
    // may change while viewing the Payment component after the user
    // pays for the courses (coded in the Effect hook)
    let stateOfPayment = useSelector(state => state.payment.paid);
    const dispatch = useDispatch();
    const paypalRef = useRef();

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        addedCourses.map(course => {
                            title: course.title,
                            currency: 'USD',
                            price: course.price
                        })
                    ],
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                setPaidFor(true);
                console.log(order);
            },
            //
            onError: err => {
                setError(err);
                console.error(err);
            },
        })
        .render(paypalRef.current);
    // The effect is re-run if any of the elements within the brackets change;
    // consider putting stateOfPayment here
    }, [stateOfPayment]);

    if(stateOfPayment === true) {
        return(
            <div>
                <h1>Purchase complete!</h1>
            </div>
        );
    }

    return (
        <div>
            {error && <div>Error occurred! {error.message}</div>}
            <div ref={paypalRef}/>
        </div>
    )
}

export default Payment; */
