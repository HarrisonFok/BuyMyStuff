import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import {Table, Button} from "react-bootstrap"
import { getAllQuestions } from '../actions/questionActions';

const QuestionsListScreen = () => {
    const dispatch = useDispatch()

    const questionsAll = useSelector(state => state.questionsAll)
    const { questions } = questionsAll

    useEffect(() => {
        dispatch(getAllQuestions())
    }, [dispatch])

    return (
        <div>
            {/* {questions.map(p => (
                <Row key={p._id}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                {p.question}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Row>
            ))} */}
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        {/* table heading */}
                        <th>QUESTION</th>
                        <th>USER ID</th>
                        <th>NAME</th>
                        <th>UPDATED AT</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map(user => (
                        // table row
                        <tr key={user._id}>
                            {/* table columns */}
                            <td>{user.question}</td>
                            <td>{user.user}</td>
                            <td>{user.name}</td>
                            <td>{user.updatedAt.substr(0,10)}</td>
                            <td>
                                <LinkContainer to={`/admin/questionsList`}>
                                    <Button variant="light" className="btn-sm">
                                        <i className="fas fa-reply"></i>
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default QuestionsListScreen
