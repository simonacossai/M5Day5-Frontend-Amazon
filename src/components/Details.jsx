import React, { Component } from 'react'
import { Media, Container, Row, Col, Spinner, Alert, Form, Button, Badge } from 'react-bootstrap'
export default class Details extends Component {

    state = {
        newReview: {
            name: '',
            comment: '',
            rate: null,
            elementId: this.props.match.params.id,
        },
        errMessage: '',
        loading: false,
        reviews: [],
    }


    fetchReviews = async () => {
        try {
            const url = `http://localhost:3001/reviews/${this.state.newReview.elementId}`
            const response = await fetch(url,
                {
                    method: "GET",
                })
            if (response.ok) {
                const data = await response.json();
                await this.setState({ reviews: data });
                console.log(this.state.reviews);
            }
        } catch (e) {
            console.log(e);
            console.log(this.state.newReview.projectId)
        }
    };
    componentDidMount = async () => {
        this.fetchReviews();
    };

    updatenewReviewField = (e) => {
        let newReview = { ...this.state.newReview }
        let currentId = e.currentTarget.id
        newReview[currentId] = e.currentTarget.value
        this.setState({ newReview: newReview })
    }


    submitnewReview = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        try {
            let response = await fetch('http://localhost:3001/reviews/',
                {
                    method: 'POST',
                    body: JSON.stringify(this.state.newReview),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                })
            if (response.ok) {
                this.fetchReviews();
                alert('New Review saved!')
                this.setState({
                    newReview: {
                        name: '',
                        comment: '',
                        rate: null,
                        elementId: this.props.match.params.id,
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
            <>
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

                        (<Container className="d-flex justify-content-center align-items-center text-center w-100">
                        <Form className="w-100 mb-5 mt-5 d-flex justify-content-center align-items-center text-center" style={{ flexDirection: "column" }} onSubmit={this.submitnewReview}>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="name">Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Your name"
                                            value={this.state.newReview.name}
                                            onChange={this.updatenewReviewField}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                         
                         
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="comment">Comment</Form.Label>
                                      <Form.Control as="textarea" rows={3} 
                                         type="text"
                                         name="comment"
                                         id="comment"
                                         placeholder="What do u think about this project?"
                                         value={this.state.newReview.comment}
                                         onChange={this.updatenewReviewField}
                                         required/>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>

                                <Form.Group>
                                        <Form.Label htmlFor="rate">Rate</Form.Label>
                                      <Form.Control
                                         type="number"
                                         name="rate"
                                         id="rate"
                                         placeholder="Give it a rate.."
                                         value={this.state.newReview.rate}
                                         onChange={this.updatenewReviewField}
                                         required/>
                                    </Form.Group>
                                </Col>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Container>)}
                   
                <Container>
                <h1 className="text-left my-4">Reviews</h1>
                {this.state.reviews && this.state.reviews.map((e) => <Media className="reviewMedia">
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src="http://placehold.it/30x30"
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h5>{e.name} -- <Badge className="rateBadge">{e.rate}</Badge></h5>
                        <p>
                            {e.comment}
                        </p>
                    </Media.Body>
                </Media>)}   
                </Container>         
                </>
        )
    }
}
