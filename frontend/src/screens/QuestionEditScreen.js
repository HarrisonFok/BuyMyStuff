import React, {useState, useEffect, useRef} from 'react'
import { MDBInput, MDBBtn } from "mdbreact";
import { useDispatch, useSelector } from 'react-redux';
import { editQuestion, getAllComments, replyQuestion, commentEdit, commentDelete } from "../actions/questionActions";
import Loader from '../components/Loader';
import "./QuestionEditScreen.css"
import {toastr} from 'react-redux-toastr'
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';

const QuestionEditScreen = ({location, history}) => {
    const questionObject = location.state.questionObj
    const questionId = questionObject["_id"]
    const userId = questionObject["user"]
    const [done, setDone] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editCommentId, setEditCommentId] = useState("")

    const [reactionShown, setReactionShown] = useState(false)
    const [selectedEmojis, setSelectedEmojis] = useState([])

    const [formData, setFormData] = useState({
        question: "",
        followup: ""
    })

    const dispatch = useDispatch()

    const questionComments = useSelector(state => state.questionComments)
    const { loading: loadingComments, comments } = questionComments

    const refObj = useRef({})

    useEffect(() => {
        setDone(false)
        refObj.current["typedReply"] === null ? refObj.current["typedEdit"].state.innerValue = "" : refObj.current["typedReply"].state.innerValue = ""
        dispatch(getAllComments(questionId))
    }, [dispatch, isEdit, done])

    const updateHandler = e => {
        if (e.target.name === "questionBtn") {
            dispatch(editQuestion(userId, questionId, formData.question))
        } else if (e.target.name === "replyBtn") {
            if (refObj.current["typedReply"]) {
                dispatch(replyQuestion(questionId, {"reply": formData.followup}))
                setDone(true)
            } else { // (refObj.current["typedEdit"])
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
        setDone(true)
    }

    const deleteHandler = (qId, cId) => {
        dispatch(commentDelete(qId, cId))
        setDone(true)
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

    const onReactionClick = () => {
        setReactionShown(!reactionShown)
        console.log(reactionShown)
    }

    const handleEmojiSelect = (emoji, i) => {
        console.log(emoji)
        console.log(i)
        setSelectedEmojis([...selectedEmojis, emoji])
    }

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    console.log("selected emojis: ", selectedEmojis)
    
    return (
        <>
            <div style={{marginBottom: "2%"}}>
                <p>Question: {questionObject.question}</p>
                <MDBInput name="question" hint={questionObject.question} onChange={handleChange}/>
                <MDBBtn color="primary" name="questionBtn" onClick={updateHandler}>Update</MDBBtn>
            </div>
            {done && !isEdit && toastr.success('Comment added!')}
            {done && isEdit && toastr.success('Comment edited!')}
            <div>
                {loadingComments && <Loader /> }
                {comments && comments.map((comment, i) => ( 
                    <div key={i}>
                        {selectedEmojis.map((emoji, i) => {
                            return (
                                <Emoji size={26} emoji={emoji} key={i}/>
                            )
                        })}
                        {comment.userId === userId && ( 
                            <MDBBtn onClick={(e) => switchModeHandler(comment._id)}>
                                <i className="fas fa-edit"></i>
                            </MDBBtn>
                        )}
                        {comment.userId === userId && (
                            <MDBBtn> 
                                <i className="fas fa-trash-alt" onClick={(e) => deleteHandler(comment.question, comment._id)}></i>
                            </MDBBtn>
                        )}
                        <p>
                            <strong>{comment.name}:</strong> {comment.comment}
                        </p>
                        {/* <Picker showPreview={false} showSkinTones={false}/> */}
                        <div onClick={(e) => onReactionClick()}>
                            <i 
                                className="fa fa-smile-o" 
                                aria-hidden="true" 
                                style={{ fontSize: 22, color: '#36b9e0' }} 
                            />
                            <span>+</span>
                        </div>
                        {reactionShown && 
                            (<div className="reactions" key={i}>
                                <Picker
                                    showPreview={false}
                                    showSkinTones={false}
                                    onSelect={(e) => handleEmojiSelect(e, i)}
                                />
                            </div>)
                        }
                    </div>
                ))}
                {comments && comments.length === 0 && <p>No Comments</p>}
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
