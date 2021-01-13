import React, {useState, useEffect} from 'react'
import { MDBInput, MDBBtn } from "mdbreact";
import { useDispatch, useSelector } from 'react-redux';
import { replyQuestion } from "../actions/questionActions";

const QuestionReplyScreen = ({location, history}) => {
    const [reply, setReply] = useState("")
    const [questionId, setQuestionId] = useState("")

    const dispatch = useDispatch()

    const questionReply = useSelector(state => state.questionReply)
    const { success: successReply } = questionReply

    useEffect(() => {
        const questionId = location.pathname.split("/")[3]
        setQuestionId(questionId)
        if (successReply) {
            history.push("/admin/questionsList")
        }
    }, [dispatch])

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
        <div>
            <h1>Reply Question</h1>
            <MDBInput onChange={handleChange}/>
            <MDBBtn color="primary" onClick={replyHandler}>Reply</MDBBtn>
        </div>
    )
}

export default QuestionReplyScreen
