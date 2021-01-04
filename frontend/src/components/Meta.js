import React from 'react'
import {Helmet} from 'react-helmet'


const Meta = ({title , description , keywords}) => {
    return (
        <Helmet>
            <title>
                {title}
            </title>
            <meta name='description' content={description}/>
            <meta name='keywords' content= {keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title:'Welcome to InfoShop',
    keywords: 'electronics, buy electronics, cheap electronics',
    description:'we sell the best informatics products for cheap'
}

export default Meta
