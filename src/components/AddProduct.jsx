import React from 'react'
import { Alert, Button, Col, Form, Row, Spinner, Container } from 'react-bootstrap'

class AddProduct extends React.Component {
    state = {
        newProduct: {
            name: '',
            description: '', //REQUIRED
            brand: '', //REQUIRED
            price: '', //REQUIRED
            category: ''
        },
        imageUrl: null,
        errMessage: '',
        loading: false
    }

    HandleFile = (e) => {
        const formData = new FormData();
        formData.append("productPhoto", e.target.files[0]);
        console.log(formData);
        this.setState({ imageUrl: formData });
    };
    PostImage = async (id) => {
        console.log(id)
        try {
            let response = await fetch(
                `http://localhost:3001/products/${id}/upload`,
                {
                    method: "POST",
                    body: this.state.imageUrl,
                }
            );
            if (response.ok) {
                //this.props.fetch()
                console.log(id)
                console.log("image uploaded", this.state.imageUrl)
            } else {
                const error = await response.json();
                console.log(error);
                console.log(id)
            }
        } catch (error) {
            console.log(error);
            console.log(id)
        }
    };
    updatenewProductField = (e) => {
        let newProduct = { ...this.state.newProduct }
        let currentId = e.currentTarget.id
        newProduct[currentId] = e.currentTarget.value

        this.setState({ newProduct: newProduct })
    }

    submitnewProduct = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        try {
            let response = await fetch('http://localhost:3001/products/',
                {
                    method: 'POST',
                    body: JSON.stringify(this.state.newProduct),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                })
            if (response.ok) {
                let data= await response.json();
                this.PostImage(data.id)
                console.log(data, data.id)
                console.log(this.state.newProduct)
                this.setState({
                    newProduct: {
                        name: '',
                        description: '', //REQUIRED
                        brand: '', //REQUIRED
                        price: '', //REQUIRED
                        category: ''
                    },
                    errMessage: '',
                    loading: false
                })
            } else {
                console.log('an error occurred')
                let error = await response.json()
                this.setState({
                    errMessage: error.message,
                    loading: false,
                })
            }
        } catch (e) {
            console.log(e) // Error
            this.setState({
                errMessage: e.message,
                loading: false,
            })
        }
    }


    render() {
        return (
            <div>
                {
                    this.state.loading && (
                        <div className="d-flex justify-content-center my-5">
                            Sendin your infos pls wait
                            <div className="ml-2">
                                <Spinner animation="border" variant="success" />
                            </div>
                        </div>
                    )
                }
                {
                    this.state.errMessage ? (
                        <Alert variant="danger">
                            We encountered a problem with your request
                            {this.state.errMessage}
                        </Alert>

                    ) :

                        (
                            <Container className="d-flex p-5 justify-content-center align-items-center text-center">
                                <Form className="w-100 mt-3 d-flex justify-content-center align-items-center text-center" style={{ flexDirection: "column" }} onSubmit={this.submitnewProduct}>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="name">Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Your name"
                                                value={this.state.newProduct.name}
                                                onChange={this.updatenewProductField}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="description">Description</Form.Label>
                                            <Form.Control as="textarea" rows={3}
                                                type="text"
                                                name="description"
                                                id="description"
                                                placeholder="Describe ur project..."
                                                value={this.state.newProduct.description}
                                                onChange={this.updatenewProductField}
                                                required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>

                                        <Form.Group>
                                            <Form.Label htmlFor="brand">Brand</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="brand"
                                                id="brand"
                                                placeholder="Product brand"
                                                value={this.state.newProduct.brand}
                                                onChange={this.updatenewProductField}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="price">Price</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                id="price"
                                                placeholder="price"
                                                value={this.state.newProduct.price}
                                                onChange={this.updatenewProductField}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="category">Category</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="category"
                                                id="category"
                                                placeholder="category"
                                                value={this.state.newProduct.category}
                                                onChange={this.updatenewProductField}
                                                required
                                            />
                                        </Form.Group>
                                        <label for="file" id="file-label">
                                            <input
                                                type="file"
                                                id="file"
                                                onChange={this.HandleFile}
                                                accept="image/*"
                                            />
                                        </label>
                                    </Col>
                                    <Row className="d-flex justify-content-left text-left align-items-left">
                                        <Col>
                                            <Button type="submit">Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Container>
                        )
                }
            </div>
        )
    }
}

export default AddProduct