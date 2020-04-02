import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPaidFor, setError } from '../../store/paymentSlice';

function Payment() {
    const addedCourses = useSelector(state => state.cart.courseList);
    const stateOfPayment = useSelector(state => state.payment.paid);
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
            onError: err => {
                setError(err);
                console.error(err);
            },
        })
        .render(paypalRef.current);
    }, []);

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
            <h1>
                {product.description} for ${product.price}
            </h1>
            <div ref={paypalRef}/>
        </div>
    )
}

export default Payment;
