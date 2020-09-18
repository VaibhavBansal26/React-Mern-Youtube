import React ,{useEffect,useState}from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {

        let commentNumber = 0;
        props.CommentLists.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.CommentLists, props.parentCommentId])

    let renderReplyComment = (parentCommentId) => (
        props.CommentLists && props.CommentLists.map((comment,index) => (
          
            <>
            {console.log(comment)}
            {console.log(parentCommentId)}
              {comment.responseTo === parentCommentId &&
            <div style={{marginLeft:'50px',width:'80%'}}>
           <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction}/>

           <ReplyComment CommentLists={props.CommentLists}  parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction}/>
           </div>
            }
    
    
           </>
      
   ))

    )

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                    onClick={handleChange} >
                    View {ChildCommentNumber} more comment(s)
             </p>
            }

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
