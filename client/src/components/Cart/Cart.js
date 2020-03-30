import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* JUNK CODE TRYING TO UNDERSTAND HOW REDUX AND REACT WORK TOGETHER */
/* To connect with database??? Allowed with MERN stack?? */

class Cart extends Component {
    /* add a selected course to cart */
    handleAdd(id) {
        this.props.add(id);
    }

    render() {
        const addedItems = this.props.items.length
            ? (
                this.props.items.map((item) => (
                    <div className="item-desc">
                        <div className="add">
                            <Link to="/cart">
                                <i className="material-icons" onClick={() => { this.handleAdd(item.id); }}>
                                    arrow_drop_up
                                </i>
                            </Link>
                        </div>
                        <button type="button" onClick={() => { this.handleAdd(item.id); }} />
                    </div>
                ))
            ) : [];
        return (
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>
            </div>
        );
    }
}
const add = (id) => id;
const mapStateToProps = (state) => ({ items: state.addedItems });
const mapDispatchToProps = (dispatch) => ({
    add: (id) => { dispatch(add(id)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
