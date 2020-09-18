import React,{useState} from 'react'
import {Comment,Avatar,Button,Input} from 'antd';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import {useSelector} from 'react-redux';
import LikeDislike from './LikeDislike';
const {TextArea} = Input;


function SingleComment(props) {

    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const user = useSelector(state => state.user)

    const handleChange = (e) => {
        setCommentValue(e.target.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer:user.userData._id,
            postId:props.postId,
            responseTo:props.comment._id,
            content:CommentValue
        }
        axios.post('/api/comment/saveComment',variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result);
                setCommentValue("");
                setOpenReply(!OpenReply);
                props.refreshFunction(response.data.result);
            }else{
                alert('Failed to deliver comment')
            }
        })
    }
    const actions = [
        <LikeDislike comment commentId={props.comment._id}  userId={localStorage.getItem('userId')}/>,
        <span onClick={openReply} key="comment-basic-reply-to">Reply To</span>
    ]
    
    return (
        <div>
        <Comment
            actions={actions}
            author={props.comment.writer?.name}
            avatar={
                <Avatar
                    src={props.comment.writer?.image}
                    alt="image"
                />
            }
            content={
                <p>
                {props.comment.content}
                </p>
            }
        ></Comment>
        {OpenReply&&
            <form style={{display:'flex',alignItems:'center',justifyContent:"left"}} onSubmit={onSubmit} >
                    <TextArea
                    style={{width:'96%',borderRadius:'5px',border:'none',borderBottom:'1px solid gray',height:'12px'}}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="Write some reply comments!!!!"
                    />
                    <br/>
                <SendIcon style={{height:'64px',color:'gray',padding:'3px',cursor:'pointer'}} onClick={onSubmit}/> 
            </form>
        }

    </div>
    )
}

export default SingleComment
