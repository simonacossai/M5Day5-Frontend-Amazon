import React, { Component } from 'react'
import {Card, Button, Container, Row, Col} from 'react-bootstrap'
import './SingleProduct.css';

export default class SingleProduct extends Component {
  state={
    selected: false,
  }
  addToCart = async (product) => {
    await this.setState({selected: !this.state.selected})
    console.log(this.state.selected)
    console.log(product)
   if(this.state.selected===true){
    try {
      let response = await fetch(`http://localhost:3001/users/${process.env.REACT_APP_USER_ID}/products`,
          {
              method: 'POST',
              body: JSON.stringify(product),
              headers: new Headers({
                  "Content-Type": "application/json"
              })
          })
      if (response.ok) {
         alert("element added to cart")
      } else {
          console.log('an error occurred')
          let error = await response.json()
          alert(error)
      }
  } catch (e) {
      console.log(e) // Error
      alert(e)
  }
  }else{
    try {
      let response = await fetch(`http://localhost:3001/users/${process.env.REACT_APP_USER_ID}/products/${product.ID}`,
          {
              method: 'DELETE',
          })
      if (response.ok) {
         alert("element removed from the cart")
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
}
    render() {
        return (
                <Col md={4}>
                  <Card  className="card p-1 mb-2" onClick={()=>this.addToCart(this.props.product)} style={{border: this.state.selected ? "3px solid #3E78B2": "none"}}>
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
