import React from 'react'
import {Alert} from 'react-bootstrap';

const Message = ({variant , children}) => {
    return (
        <Alert variant={variant} style={{textAlign:"center" , fontSize:'1rem'}}>
            {children}
        </Alert>
    )
}

Message.defaultProps = {
    variant: 'info'
}
export default Message
