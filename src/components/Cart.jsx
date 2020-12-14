import React, { Component } from 'react'
import {Card, Col, Row, Container} from 'react-bootstrap';
import SingleProduct from './SingleProduct';
export default class Cart extends Component {
    state={
        products: [],
        total: 0,
    }
    fetchProducts = async () => {
        try {
            const url = `http://localhost:3001/users/${process.env.REACT_APP_USER_ID}/products`
            const response = await fetch(url,
                {
                    method: "GET",
                }
            );
            if (response.ok) {
                const data = await response.json();
                this.setState({ products: data });
                console.log("aaa", data);
                let total = 0;
                await this.state.products.forEach((product)=>{
                    total += parseInt(product.price)
                })
                console.log(total)
                this.setState({total})
            }
        } catch (e) {
            console.log(e);
        }
    };
    componentDidMount = async () => {
        this.fetchProducts();
    };
    deleteFromCart=async(product)=>{
        try {
            let response = await fetch(`http://localhost:3001/users/${process.env.REACT_APP_USER_ID}/products/${product.ID}`,
                {
                    method: 'DELETE',
                })
            if (response.ok) {
               alert("element removed from the cart")
               this.fetchProducts()
            } else {
                console.log('an error occurred')
                let error = await response.json()
                alert(error)
            }
        } catch (e) {
            console.log(e) // Error
            alert(e)
        }
    }
    render() {
        return (
            <div>
                <h1>My Cart</h1>
                <Container>
                    <Row className="d-flex justify-content-center align-items-center text-center">
                    {
                    this.state.products.length>0 ? this.state.products.map((product) =>
                    <Col md={4}>
                    <Card  className="card p-1 mb-2" onClick={()=>this.deleteFromCart(product)} >
                          <img variant="top" src={product.image} className="product-image "/>
                          <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text className="description">
                              {product.description}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        </Col>
                    ): 
                    <h1 className="text-center mt-5">Still no products here</h1>
                }
                </Row>
                <h2>Total: {this.state.total}$</h2>
                </Container>
            </div>
        )
    }
}
