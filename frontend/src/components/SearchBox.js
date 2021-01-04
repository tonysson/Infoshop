import React , {useState} from 'react'
import {Form , Button} from 'react-bootstrap';


const SearchBox = ({history}) => {

    //STATE
    const [keyword , setKeyword] = useState('')

    // submit handle
    //IMPORTANT: when embeding a component in a header we do not have access to 'push' , we have to grab it into a Route imported from react-router-dom with render props
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

    return (
        <>
          <Form inline onSubmit={submitHandler}>
              <Form.Control 
              style={{borderRadius:'5px'}}
              name='q'
              onChange={(e) => setKeyword(e.target.value)}
              placeholder='rechercher un article'
              className='mr-sm-2 ml-sm-5 mt-2'
              type='text'>
              </Form.Control>
              <Button 
              type='submit' variant='outline' className='p-2 mt-2 search__button'>
                    Rechercher
              </Button>
          </Form>
            
        </>
    )
}

export default SearchBox
