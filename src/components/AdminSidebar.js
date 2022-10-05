import { Nav } from "react-bootstrap";
import styled from "styled-components";

const NavWrapper = styled.div`
    padding:20px 15px;
    border-radius: 5px;
    border: 1px solid #ccc; 
`

export default function AdminSidebar() {
    return (
        <NavWrapper>
            <Nav defaultActiveKey="" className="flex-column">
                <Nav.Link href="/admin/restaurants">Restaurants</Nav.Link>
                <Nav.Link href="/admin/orders" eventKey="link-1">Orders</Nav.Link>
                <Nav.Link href="/admin/users" eventKey="link-2">Users</Nav.Link>
                <Nav.Link eventKey="disabled" disabled>
                    Logouts
                </Nav.Link>
            </Nav>
        </NavWrapper>
    )
}
