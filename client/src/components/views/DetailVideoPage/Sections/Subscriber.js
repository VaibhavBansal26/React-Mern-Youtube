import React,{useEffect,useState} from 'react'
import axios from 'axios';


function Subscriber(props) {
    const userTo = props.userTo
    const userFrom = props.userFrom

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    const onSubscribe = () => {

        let subscribeVariables = {
            userTo:userTo,
            userFrom:userFrom
        }
   
        if(Subscribed){
            //when we are already subscribed
            axios.post('/api/subscribe/unSubscribe',subscribeVariables)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber-1)
                    setSubscribed(!Subscribed)
                }else{
                    alert('Failed to unsubscribe');
                }
            })
        }else{
            //when we are not subscribed yet
            axios.post('/api/subscribe/subscribe',subscribeVariables)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber+1)
                    setSubscribed(!Subscribed)
                }else{
                    alert('Failed to subscribe');
                }
            })
        }
    }

    useEffect(() => {
        const subscribeNumberVariables = {userTo:userTo,userFrom:userFrom}
        axios.post('/api/subscribe/subscribeNumber',subscribeNumberVariables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.subscribeNumber);
                setSubscribeNumber(response.data.subscribeNumber);
            }else{
                alert('Failed to Subscribe');
            }
        })
        axios.post('/api/subscribe/subscribed',subscribeNumberVariables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.subscribed);
                setSubscribed(response.data.subscribed);
            }else{
                alert('Failed to get subscribed information')
            }
        })
    }, [])
    return (
        <div>
            <button onClick={onSubscribe}  style={{
                backgroundColor:`${Subscribed ? '#AAAAAA':'#CC0000'}`,
                borderRadius:'4px',color:'white',
        padding:'10px 16px', fontWeight:'500',fontSize:'1rem',textTransform:'uppercase',cursor:'pointer',border:'none'}}>{SubscribeNumber} {Subscribed ?'Subscribed':'Subscribe'}</button>
        </div>
    )
}

export default Subscriber
