import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
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
                    {questions.map(question => (
                        // table row
                        <tr key={question._id}>
                            {/* table columns */}
                            <td>
                                {/* <LinkContainer to={`/user/1/questions`}> */}
                                    {question.question}
                                {/* </LinkContainer> */}
                            </td>
                            <td>{question.user}</td>
                            <td>{question.name}</td>
                            <td>{question.updatedAt.substr(0,10)}</td>
                            <td>
                                <LinkContainer to={`/admin/questionsList/${question._id}`}>
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
