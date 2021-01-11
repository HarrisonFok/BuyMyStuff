import React, {useState} from 'react'
import { MDBInput, MDBBtn } from "mdbreact";
import { useDispatch } from 'react-redux';
import { editQuestion } from "../actions/questionActions";

const QuestionEditScreen = ({location, history}) => {
    const questionObject = location.state.questionObj

    const [question, setQuestion] = useState("")

    const dispatch = useDispatch()

    const updateHandler = e => {
        const userId = questionObject["user"]
        dispatch(editQuestion(userId, questionObject["_id"], question))
        history.push(`/user/${userId}/questions/`)
    }

    const handleChange = e => {
        setQuestion(e.target.value)
    }
    
    return (
        <div>
            <MDBInput hint={questionObject.question} onChange={handleChange}/>
            <MDBBtn color="primary" onClick={updateHandler}>Update</MDBBtn>
        </div>
    )
}

export default QuestionEditScreen
