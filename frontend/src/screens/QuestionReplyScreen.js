import React, {useState, useEffect, useRef} from 'react'
import { MDBInput, MDBBtn } from "mdbreact";
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments, replyQuestion } from "../actions/questionActions";
import Loader from '../components/Loader';

const QuestionReplyScreen = ({location, history}) => {
    const [reply, setReply] = useState("")
    const [questionId, setQuestionId] = useState("")
    const [seeComments, setSeeComments] = useState(false)

    // const {user: userId} = location.state

    const dispatch = useDispatch()

    const typedReply = useRef()

    const questionReply = useSelector(state => state.questionReply)
    const { success: successReply } = questionReply

    const questionComments = useSelector(state => state.questionComments)
    const { loading: loadingComments, comments } = questionComments

    useEffect(() => {
        // Get the question ID from the URL
        const questionId = location.pathname.split("/")[3]
        setQuestionId(questionId)
        // Reset the MDBInput to be empty
        typedReply.current.state.innerValue = ""
        if (seeComments) {
            dispatch(getAllComments(questionId))
        }
    }, [dispatch, successReply, seeComments, location.pathname])

    const replyHandler = e => {
        const ret = {
            "reply": reply
        }
        dispatch(replyQuestion(questionId, ret))
    }

    const handleChange = e => {
        setReply(e.target.value)
    }
    
    return (
        <>
            <div style={{marginBottom: "2%"}}>
                <h1>Reply Question</h1>
                <p>{location.state.question}</p>
                <MDBInput ref={typedReply} onChange={handleChange}/>
                <MDBBtn color="primary" onClick={replyHandler}>Reply</MDBBtn>
                <MDBBtn color="primary" onClick={(e) => setSeeComments(!seeComments)}>See Comments</MDBBtn>
            </div>
            <div>
                {loadingComments && <Loader /> }
                {comments && seeComments && comments.map((comment, i) => ( 
                    <div key={i}> 
                        <p><strong>{comment.name}:</strong> {comment.comment}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

//className={userId === comment.questionId ? "right" : "left"}>

export default QuestionReplyScreen
