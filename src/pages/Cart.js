import React, {useEffect, useReducer, useState} from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";
import API from "../config/api";
import {loadState} from "../utils/session";
import {decodeToken} from "react-jwt";
import {toaster} from "../utils/alert";

export default function Cart() {
    let [foods,setFoods] = useState([]);
    let [food_items,setFoodItems] = useState([]);
    let [,forceUpdate] = useReducer(x => x + 1, 0);
    let [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        (async function () {
            let token = loadState()['token'];
            let user_id = decodeToken(token)._id;
            try {
                let response = await axios.get(API.DOMAIN + '/api/users/' + user_id + '/cart', {
                    headers: {
                        "x-Authorization": loadState()['token']
                    }
                });
                if (response.status === 200) {
                    setFoods(response.data.data);
                    //calculate initial grand total
                    let total = 0;
                    response.data.data.forEach((item) => {
                        total += item.lineTotal;
                    });
                    setGrandTotal(total);

                    //eslint-disable-next-line array-callback-return
                    //get food items for each food
                    response.data.data.map(async (item,index) => {
                        let food_item = await axios.get(API.DOMAIN + '/api/restaurants/' + item.outlet + '/foods/' + item.food, {
                            headers: {
                                "x-Authorization": loadState()['token']
                            }
                        });
                        if (food_item.status === 200) {
                            food_items.push(food_item.data.data);
                        }
                    });
                    setFoodItems(food_items);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [food_items]);


    const setQty = (event) => {
        let idx = event.target.id;
        foods[idx].qty = event.target.value;
        foods[idx].lineTotal = foods[idx].qty * foods[idx].price;

        calculateGrandTotal();
    }

    const calculateGrandTotal = () => {
        let grandTotal = 0;
        // eslint-disable-next-line array-callback-return
        foods.map((food) => {
            grandTotal += food.lineTotal;
        });
        setGrandTotal(grandTotal);
    }

    const removeItem = async (id) => {
        let token = loadState()['token'];
        let user_id = decodeToken(token)._id;
        try {
            let response = await axios.delete(API.DOMAIN + '/api/users/' + user_id + '/cart/' + id, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            });
            if (response.data.statusCode === 200) {
                let idx = foods.findIndex((x) => {
                    return x._id === id;
                });
                foods.splice(idx, 1);
                forceUpdate();
                calculateGrandTotal();
                toaster('Item removed successfully', 'success');
            }
        } catch (e) {
            console.log(e);
        }
    }

    const placeOrder = async () => {
        let token = loadState()['token'];
        let user_id = decodeToken(token)._id;
        try {
            let response = await axios.post(API.DOMAIN + '/api/orders', {
                foods: foods,
                total: grandTotal,
                user_id:user_id,
            }, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            });
            if (response.data.statusCode === 200) {
                //clear cart
                setFoods([]);
                setFoodItems([]);
                forceUpdate();
                calculateGrandTotal();
                //redirect to order success page
                window.location.href = '/order-success';
                toaster(response.data.message, 'success');
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <section className="h-100" style={{backgroundColor: "#eee"}}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="10">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                                Taste Buds Cart
                            </MDBTypography>
                        </div>
                        <MDBCard className="rounded-3 mb-4">
                            <MDBCardBody className="p-4">
                                {foods && foods.map((food, index) => {

                                        let item_id = food._id;
                                        let price = foods[index].price;
                                        let qty = foods[index].qty;
                                        let line_total = foods[index].lineTotal;
                                        let food_item = food_items[index];

                                        console.log(food_item);

                                        return <MDBRow key={index}
                                                       className="justify-content-between align-items-center mb-3">
                                            <MDBCol md="2" lg="2" xl="2">
                                                <MDBCardImage className="rounded-3" fluid
                                                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                                              alt="Cotton T-shirt"/>
                                            </MDBCol>
                                            <MDBCol md="3" lg="3" xl="3">
                                                <p className="lead fw-normal mb-2"></p>
                                                <p>
                                                    <span className="text-muted">Price: </span>${price}
                                                    <span className="text-muted ms-3"></span>
                                                </p>
                                            </MDBCol>
                                            <MDBCol md="3" lg="3" xl="2"
                                                    className="d-flex align-items-center justify-content-around">
                                                <MDBBtn color="link" className="px-2">
                                                    <MDBIcon fas icon="minus"/>
                                                </MDBBtn>

                                                <MDBInput min={0} id={index} defaultValue={qty} onChange={setQty}
                                                          type="number" size="sm"/>

                                                <MDBBtn color="link" className="px-2">
                                                    <MDBIcon fas icon="plus"/>
                                                </MDBBtn>
                                            </MDBCol>
                                            <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                                <MDBTypography tag="h5" className="mb-0">
                                                    ${line_total}
                                                </MDBTypography>
                                            </MDBCol>
                                            <MDBCol md="1" lg="1" xl="1" className="me-5">
                                                <button onClick={() => removeItem(item_id)}
                                                        className="btn btn-sm btn-danger">
                                                    Remove
                                                </button>
                                            </MDBCol>
                                        </MDBRow>
                                    }
                                )}
                                <div className="card mb-5">
                                    <div className="card-body p-4">
                                        <div className="float-end">
                                            <p className="mb-0 me-5 d-flex align-items-center">
                                                <span className="small text-muted me-2">Order total:</span> <span
                                                className="lead fw-normal">${grandTotal}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                        <button onClick={() => placeOrder()} className="btn btn-lg btn-warning ms-auto" color="warning">
                            Place Order
                        </button>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}