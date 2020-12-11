import React, { Component } from 'react'
import { Media, Container, Row, Col } from 'react-bootstrap'
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
            <Container>
                <h1>hiiii</h1>
                {this.state.reviews && this.state.reviews.map((e) => <Media>
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src="http://placehold.it/30x30"
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h5>{e.name} -- {e.rate}</h5>
                        <p>
                            {e.comment}
                        </p>
                    </Media.Body>
                </Media>)}
            </Container>
        )
    }
}
