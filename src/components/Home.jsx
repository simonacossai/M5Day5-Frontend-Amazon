import React, { Component } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import SingleProduct from "./SingleProduct";

export default class Home extends Component {
  state = {
    products: [],
  };

  fetchProducts = async (titles) => {
    try {
      const url = "http://localhost:3001/products";
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ products: data });
        console.log("aaa", data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //   deleteProducts = async (titles) => {
  //     try {
  //       const url = `http://localhost:3001/products/${id}`;
  //       const response = await fetch(url, {
  //         method: "DELETE",
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  componentDidMount = async () => {
    this.fetchProducts();
  };

  render() {
    return (
      <Container className="mt-2">
        <Row className="mt-5">
          {this.state.products.map((product) => (
            <SingleProduct
              product={product}
              props={this.props}
              /*delete={this.deleteProducts() }*/
            />
          ))}
        </Row>
      </Container>
    );
  }
}
