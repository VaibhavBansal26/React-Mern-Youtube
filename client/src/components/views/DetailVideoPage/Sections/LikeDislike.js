import React, { useEffect, useState } from 'react';
import {Tooltip, Icon} from 'antd';
import axios from 'axios';


function LikeDislike(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    
    let variable = {};
        if(props.video){
            variable = {videoId:props.videoId , userId:props.userId}
        }else{
            variable = {commentId:props.commentId, userId:props.userId}
    }
    useEffect(() => {
        axios.post('/api/like/getLikes',variable)
        .then(response =>{
            if(response.data.success){
                //How many likes
                setLikes(response.data.likes.length)
                //If i already clicked the like button
                response.data.likes.map(like => {
                    if(like.userId === props.userId){
                        setLikeAction('liked')
                    }
                })
            }else{
                alert('Failed to get likes')
            }
        })

        axios.post('/api/like/getDislikes',variable)
        .then(response =>{
            if(response.data.success){
                //How many likes
                setDislikes(response.data.dislikes.length)
                //If i already clicked the like button
                response.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId){
                        setDislikeAction('disliked')
                    }
                })
            }else{
                alert('Failed to get dislikes')
            }
        })
    }, [])
    
    const onLike = () => {
        if(LikeAction === null){
            axios.post('/api/like/uplike',variable)
            .then(response =>{
                if(response.data.success){
                    setLikes(Likes + 1)
                    setLikeAction('liked')
                    
                    if(DislikeAction !== null){
                        setDislikeAction(null)
                        setDislikes(Dislikes-1)
                    }
                   
                }else{
                    alert('Failed to get the uplike')
                }
            })
        }else{
            axios.post('/api/like/unlike',variable)
            .then(response =>{
                if(response.data.success){
                    setLikes(Likes - 1)
                    setLikeAction(null)
                }else{
                    alert('Failed to get the unlike')
                }
            })

        }

    }

    const onDislike = () => {
        if(DislikeAction !== null ){
            axios.post('/api/like/unDislike',variable)
            .then(response =>{
                if(response.data.success){
                    setDislikes(Dislikes - 1)
                    setDislikeAction(null)

                }else{
                    alert('Failed to get the unlike')
                }
            })
        }else{

            axios.post('/api/like/upDislike',variable)
            .then(response =>{
                if(response.data.success){
                    
                    setDislikes(Dislikes + 1)
                    setDislikeAction('disliked')

                    if(LikeAction !== null){
                        setLikeAction(null)
                        setLikes(Likes-1)
                    }

                }else{
                    alert('Failed to get increase unlike')
                }
            })

        }
        
    }
    return (
        <>
        <span key="comment-basic-like">
            <Tooltip title="Like">
                <Icon type="like"
                theme={LikeAction === 'liked' ? 'filled':'outlined'}
                onClick={onLike} />
                </Tooltip>
        <span style={{paddingLeft:'8px',cursor:'auto'}}>{Likes}</span>
        </span>&nbsp;&nbsp;

        <span key="comment-basic-dislike">
            <Tooltip title="Dislike">
                <Icon type="dislike"
                theme={DislikeAction === 'disliked' ? 'filled':'outlined'}
                onClick={onDislike} />
                </Tooltip>
        <span style={{paddingLeft:'8px',cursor:'auto'}}>{Dislikes}</span>
        </span>&nbsp;&nbsp;

            
        </>
    )
}

export default LikeDislike
