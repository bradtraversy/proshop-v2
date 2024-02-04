import { Container, Row, Col } from 'react-bootstrap';
import sphLogo from '../assets/sph-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Sanaa Art Shop &copy; {currentYear}  |  {/**Adding logo */}<span><a href="https://swahilipothub.co.ke"><img src={sphLogo} height={27} width={150} alt="Swahilipot Hub"/></a></span></p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
