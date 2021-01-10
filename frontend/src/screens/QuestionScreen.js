import React from 'react'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta';
import { Row, Col, Form, Card, ListGroup, Button } from "react-bootstrap";
import { MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {createQuestion} from "../actions/userActions"
import Message from '../components/Message';
import Loader from '../components/Loader';
import {listQuestions, addQuestion, deleteQuestion} from "../actions/questionActions";

const QuestionScreen = ({match}) => {
    const [question, setQuestion] = useState("")
    const [done, setDone] = useState(false)

    const dispatch = useDispatch()

    const typedQuestion = React.useRef()

    const questionsList = useSelector(state => state.questionsList)
    const { loading, error, questions } = questionsList

    // Make a request to backend and add products as component-level states
    useEffect(() => {
        setDone(false)
        // Reset the MDBInput to be empty
        typedQuestion.current.state.innerValue = ""
        // Dispatch this so that the redux state will be filled
        dispatch(listQuestions(match.params.id))
    }, [dispatch, done])

    const submitHandler = (e) => {
        e.preventDefault()
        const questionObj = {
            question: question
        }
        dispatch(addQuestion(match.params.id, questionObj))
        setDone(true)
    }

    const deleteHandler = (userId, qId) => {
        dispatch(deleteQuestion(userId, qId))
        setDone(true)
    }

    return (
        <>
            <Meta title="Ask questions" />
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            <h1>Ask a Question</h1>

            <Form onSubmit={submitHandler}>
                <Row>
                    <Col md={10}>
                        <MDBInput ref={typedQuestion} onChange={(e) => setQuestion(e.target.value)}/>
                    </Col>
                    <Col md={2}>
                        <MDBBtn size="lg" type="submit">
                            <MDBIcon icon="user-plus" /> Submit
                        </MDBBtn>
                    </Col>
                </Row>
            </Form>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <div className="my-3">
                    {questions.map((p) => (
                        <Row key={p._id}>
                            <Card>
                                <ListGroup>
                                    <ListGroup.Item>
                                        {p.question}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                            <MDBBtn onClick={(e) => deleteHandler(match.params.id, p._id)}>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </MDBBtn>
                        </Row>
                    ))}
                </div>
            )}
        </>
    )
}

export default QuestionScreen
