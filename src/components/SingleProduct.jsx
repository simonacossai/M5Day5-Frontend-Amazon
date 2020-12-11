import React, { Component } from 'react'
import {Card, Button, Container, Row, Col} from 'react-bootstrap'
import './SingleProduct.css';

export default class SingleProduct extends Component {
    render() {
        return (
                <Col md={4}>
                  <Card  className="card p-1 mb-2">
                        <img variant="top" src={this.props.product.image} className="product-image "/>
                        <Card.Body>
                          <Card.Title>{this.props.product.name}</Card.Title>
                          <Card.Text className="description">
                            {this.props.product.description}
                          </Card.Text>
                          <Button variant="primary" onClick={() =>this.props.props.history.push('/details/' + this.props.product.ID)}>See more</Button>
                        </Card.Body>
                      </Card>
                      </Col>
        )
    }
}
