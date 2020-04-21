import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import _useToasts from '../Toasts';

function money_round(num) {
    return Math.ceil(num * 100) / 100;
}
function Payment() {
    const [paidFor, setPaidFor] = useState(false);
    const { addError, addSuccess } = _useToasts();
    const grandTotal = useSelector(state => state.cart.total);
    const paypalRef = useRef();
    const addedCourses = useSelector(state => state.cart.courseList);

    useEffect(() => {
        window.paypal.
            Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: addedCourses.map(course => ({
                            description: course.description,
                            amount: {
                                currency: 'USD',
                                value: course.price
                            }
                        }))
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaidFor(true);
                    addSuccess("Successfully purchased!");
                    console.log(order);
                },
                onError: err => {
                    addError(err);
                    console.error(err);
                },
            })
            .render(paypalRef.current);
    }, [addedCourses]);

    if (paidFor) {
        return (
            <div>
                <h1>Purchase complete!</h1>
            </div>
        );
    }

    if (money_round(grandTotal) != 0) {
        return <div className="paymentBox">
            <div className="title is-h5">
                Total: <small>${money_round(grandTotal)}</small>
            </div>
            <div style={{ textAlign: "center" }} ref={paypalRef} />
        </div>
    } else {
        return <></>
    }

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
