import React from 'react'
import { Container , Row , Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
           <Container>
                <Row>
                    <Col className="text-center py-3" style={{color:'black'}}>
                        Copyright &copy; Teyi Lawson , Proshop 2020.
                    </Col>
                </Row>
           </Container>
        </footer>
    )
}

export default Footer
