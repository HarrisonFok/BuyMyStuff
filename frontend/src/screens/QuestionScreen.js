import React from 'react'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta';
import { Row, Col, Button, Form, Card, ListGroup } from "react-bootstrap";
import { MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {createQuestion} from "../actions/userActions"
import Message from '../components/Message';
import { USER_ADD_QUESTION_RESET } from '../constants/userConstants';
import questions from '../questions';

const QuestionScreen = ({match}) => {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userQuestions = questions.filter(p => p.userId === userInfo._id)
    // console.log(userQuestions)

    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch(createQuestion(match.params.id, {question}))
        console.log("Question")
    }

    return (
        <>
            <Meta title="Ask questions" />
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            <h1>Ask a Question</h1>

            <Form onSubmit={submitHandler}>
                <Row>
                    <Col md={10}>
                        <MDBInput/>
                    </Col>
                    <Col md={2}>
                        <MDBBtn size="lg" type="submit">
                            <MDBIcon icon="user-plus" /> Submit
                        </MDBBtn>
                    </Col>
                </Row>
            </Form>

            <div className="my-3">
                {userQuestions.map((p, i) => (
                <Row key={i}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                {p.question}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Row>
                ))}
            </div>
        </>
    )
}

export default QuestionScreen
