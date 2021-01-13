import React, {useState, useEffect} from 'react'
import { MDBInput, MDBBtn } from "mdbreact";
import { useDispatch, useSelector } from 'react-redux';
import { editQuestion, getAllComments } from "../actions/questionActions";
import Loader from '../components/Loader';

const QuestionEditScreen = ({location, history}) => {
    const questionObject = location.state.questionObj
    const questionId = questionObject["_id"]
    const [seeComments, setSeeComments] = useState(false)

    const [question, setQuestion] = useState("")

    const dispatch = useDispatch()

    const questionComments = useSelector(state => state.questionComments)
    const { loading: loadingComments, comments } = questionComments

    useEffect(() => {
        if (seeComments) {
            dispatch(getAllComments(questionId))
        } 
    }, [dispatch, seeComments])

    const updateHandler = e => {
        const userId = questionObject["user"]
        dispatch(editQuestion(userId, questionId, question))
        history.push(`/user/${userId}/questions/`)
    }

    const handleChange = e => {
        setQuestion(e.target.value)
    }
    
    return (
        <div>
            <p>{questionObject.question}</p>
            <MDBInput hint={questionObject.question} onChange={handleChange}/>
            <MDBBtn color="primary" onClick={updateHandler}>Update</MDBBtn>
            <MDBBtn color="primary" onClick={(e) => setSeeComments(!seeComments)}>See Comments</MDBBtn>
            <div>
                {loadingComments && <Loader /> }
                {comments ? comments.map((comment, i) => ( 
                    <div key={i}>
                        <p><strong>{comment.name}:</strong> {comment.comment}</p>
                    </div>
                )) : <h6>No comments</h6>}
            </div>
        </div>
    )
}

export default QuestionEditScreen
