import React, { useState } from 'react';
import {Button,Input} from 'antd';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const {TextArea} = Input;


function Comments(props) {
    const user = useSelector(state =>  state.user)
    const [Comment, setComment] = useState("")
    
    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const  variables = {
            content : Comment,
            writer: user.userData._id,
            postId: props.postId
        }
        axios.post('/api/comment/saveComment',variables)
        .then(response => {
            if(response.data.success){
                setComment("");
                props.refreshFunction(response.data.result)

            }else{
                alert('Failed to deliver a comment');
            }
        })
    }
    return (
        <div>
            <br/>
            <p>Comments</p>
            <hr/>
            {/*Comments Lists */}
            {console.log(props.CommentLists)}
            {props.CommentLists && props.CommentLists.map((comment,index) => (
                (!comment.responseTo &&  <>
                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction}/>

                    <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction}/>
                    </>)
               
            ))}
            {/* Root Comment Form */}
            <form style={{display:'flex',alignItems:'center',justifyContent:"left"}} onSubmit={onSubmit} >
                <TextArea
                    style={{width:'96%',borderRadius:'5px',border:'none',borderBottom:'1px solid gray',height:'12px'}}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Write some comments!!!!"
                    />
                    <br/>
                <SendIcon style={{height:'64px',color:'gray',padding:'3px',cursor:'pointer'}} onClick={onSubmit}/> 
            </form>
            
        </div>
    )
}

export default Comments;
