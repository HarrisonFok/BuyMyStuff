import React, {useState, useEffect, useRef} from 'react'
import { MDBInput, MDBBtn } from "mdbreact";
import { useDispatch, useSelector } from 'react-redux';
import { editQuestion, getAllComments, replyQuestion, commentEdit, commentDelete } from "../actions/questionActions";
import Loader from '../components/Loader';
import "../index.css"

const QuestionEditScreen = ({location, history}) => {
    const questionObject = location.state.questionObj
    const questionId = questionObject["_id"]
    const userId = questionObject["user"]
    const [seeComments, setSeeComments] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editCommentId, setEditCommentId] = useState("")

    const [formData, setFormData] = useState({
        question: "",
        followup: ""
    })

    const dispatch = useDispatch()

    const questionComments = useSelector(state => state.questionComments)
    const { loading: loadingComments, comments } = questionComments

    const refObj = useRef({})

    useEffect(() => {
        // typedReply.current.state.innerValue = ""
        dispatch(getAllComments(questionId))
    }, [dispatch, seeComments. comments, isEdit])

    const updateHandler = e => {
        if (e.target.name === "questionBtn") {
            dispatch(editQuestion(userId, questionId, formData.question))
        } else if (e.target.name === "replyBtn") {
            if (refObj.current["typedReply"])
                dispatch(replyQuestion(questionId, {"reply": formData.followup}))
            else { // (refObj.current["typedEdit"])
                const body = {
                    "question": questionId,
                    "userId": userId,
                    "name": questionObject.name,
                    "comment": refObj.current["typedEdit"].state.innerValue
                }
                // dispatch edit comment
                dispatch(commentEdit(questionId, editCommentId, body))
            }
        }
        history.push(`/user/${userId}/questions/`)
    }

    const deleteHandler = (qId, cId) => {
        dispatch(commentDelete(qId, cId))
        history.push(`/user/${userId}/questions/`)
    }

    const switchModeHandler = commentId => {
        const replyModeMsg = "Switched back to reply mode. Type your message."
        const editModeMsg = "Switched the edit mode. Type your message to edit the targeted comment."
        setEditCommentId(commentId)
        if (commentId === editCommentId) {
            setIsEdit(!isEdit)
            isEdit && alert(replyModeMsg)
            !isEdit && alert(editModeMsg)
        } else {
            setIsEdit(true)
            alert(editModeMsg)
        }
    }

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    
    return (
        <>
            <div style={{marginBottom: "2%"}}>
                <p>{questionObject.question}</p>
                <MDBInput name="question" hint={questionObject.question} onChange={handleChange}/>
                <MDBBtn color="primary" name="questionBtn" onClick={updateHandler}>Update</MDBBtn>
                <MDBBtn color="primary" onClick={(e) => setSeeComments(!seeComments)}>See Comments</MDBBtn>
            </div>
            <div>
                {loadingComments && <Loader /> }
                {comments && seeComments && comments.map((comment, i) => ( 
                    <div key={i}>
                        <p>
                            <strong>{comment.name}:</strong> {comment.comment}
                            {comment.userId === userId && ( 
                                <MDBBtn onClick={(e) => switchModeHandler(comment._id)}>
                                    <i className="fas fa-edit"></i>
                                </MDBBtn>
                            )}
                            {comment.userId === userId && (
                                <MDBBtn> 
                                    {/* onClick={deleteHandler(comment.question, comment._id)} */}
                                    <i className="fas fa-trash-alt" onClick={(e) => deleteHandler(comment.question, comment._id)}></i>
                                </MDBBtn>
                            )}
                        </p>
                    </div>
                ))}
                {comments && seeComments && comments.length === 0 && <p>No Comments</p>}
            </div>
            <div>
                <MDBInput name="followup" ref={e => isEdit ? refObj.current["typedEdit"] = e : refObj.current["typedReply"] = e} onChange={handleChange}/>
                <MDBBtn color="primary" name="replyBtn" onClick={updateHandler}>{refObj.current["typedReply"] ? "Reply" : "Edit"}</MDBBtn>
            </div>
        </>
    )
}

// filter(comment => comment.question === questionId).

export default QuestionEditScreen
