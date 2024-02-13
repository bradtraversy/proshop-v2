import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
<<<<<<< HEAD
            <p>ProShop &copy; {currentYear}</p>
=======
            <p>Sanaa Art Shop &copy; {currentYear}  |  <span><a href="https://swahilipothub.co.ke"><img src={sphLogo} height={27} width={150} alt="Swahilipot Hub"/></a></span></p>
>>>>>>> main
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
