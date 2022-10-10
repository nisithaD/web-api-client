import React, {useEffect, useState} from "react";
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

export default function Cart() {
    const [foods, setFoodItems] = useState();
    useEffect(() => {
        (async function () {
            let token = loadState()['token'];
            let user_id = decodeToken(token)._id;
            try {
                let foods = await axios.get(API.DOMAIN + '/api/users/' + user_id + '/cart', {
                    headers: {
                        "x-Authorization": loadState()['token']
                    }
                });
                if (foods.status === 200) {
                    setFoodItems(foods.data.data)
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    //todo have to complete

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
                                {foods && foods.map((res, key,) => {

                                        let food_id = res._id;
                                        let restaurant_id = foods[key].outlet;
                                        let price = foods[key].price;
                                        let qty = foods[key].qty;

                                        return <MDBRow key={key} className="justify-content-between align-items-center mb-3">
                                            <MDBCol md="2" lg="2" xl="2">
                                                <MDBCardImage className="rounded-3" fluid
                                                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                                              alt="Cotton T-shirt"/>
                                            </MDBCol>
                                            <MDBCol md="3" lg="3" xl="3">
                                                <p className="lead fw-normal mb-2">{food_id}</p>
                                                <p>
                                                    <span className="text-muted">Price: </span>${price}
                                                    <span className="text-muted ms-3">Flavor: </span> Vanilla
                                                </p>
                                            </MDBCol>
                                            <MDBCol md="3" lg="3" xl="2"
                                                    className="d-flex align-items-center justify-content-around">
                                                <MDBBtn color="link" className="px-2">
                                                    <MDBIcon fas icon="minus"/>
                                                </MDBBtn>

                                                <MDBInput min={0} defaultValue={qty} type="number" size="sm"/>

                                                <MDBBtn color="link" className="px-2">
                                                    <MDBIcon fas icon="plus"/>
                                                </MDBBtn>
                                            </MDBCol>
                                            <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                                <MDBTypography tag="h5" className="mb-0">
                                                    ${price*qty}
                                                </MDBTypography>
                                            </MDBCol>
                                            <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                <a href="#!" className="text-danger">
                                                    Remove
                                                </a>
                                            </MDBCol>
                                        </MDBRow>
                                    }
                                )}
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard>
                            <MDBCardBody>
                                <MDBBtn className="ms-3" color="warning" block size="lg">
                                    Place Order
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}