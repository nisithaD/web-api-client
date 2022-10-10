import React from "react";
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

export default function Cart() {
    //get cart items
    return (
        <section className="h-100" style={{ backgroundColor: "#eee" }}>
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
                                <MDBRow className="justify-content-between align-items-center">
                                    <MDBCol md="2" lg="2" xl="2">
                                        <MDBCardImage className="rounded-3" fluid
                                                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                                      alt="Cotton T-shirt" />
                                    </MDBCol>
                                    <MDBCol md="3" lg="3" xl="3">
                                        <p className="lead fw-normal mb-2">Basic T-shirt</p>
                                        <p>
                                            <span className="text-muted">Price: </span>${125.00}
                                            <span className="text-muted ms-3">Flavor: </span> Vanilla
                                        </p>
                                    </MDBCol>
                                    <MDBCol md="3" lg="3" xl="2"
                                            className="d-flex align-items-center justify-content-around">
                                        <MDBBtn color="link" className="px-2">
                                            <MDBIcon fas icon="minus" />
                                        </MDBBtn>

                                        <MDBInput min={0} defaultValue={2} type="number" size="sm" />

                                        <MDBBtn color="link" className="px-2">
                                            <MDBIcon fas icon="plus" />
                                        </MDBBtn>
                                    </MDBCol>
                                    <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                        <MDBTypography tag="h5" className="mb-0">
                                            $499.00
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                                        <a href="#!" className="text-danger">
                                            Remove
                                        </a>
                                    </MDBCol>
                                </MDBRow>
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