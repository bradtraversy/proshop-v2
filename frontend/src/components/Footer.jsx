import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Container>
        <div>
          <div className="container mt-4 ">
        <div className="footer-content gap-3">
          <div className="footer-content-left">
          <h1 className="text-primary display-6">MangoHub</h1>
            <p>
              The whole world best quality Alphonso mangoes come from Maharastra.
            </p>
            
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <li>+919860176395</li>
            <li>mangohub27@gmail.com</li>
          </div>
        </div >
      </div>
      <Col className='text-center py-3'>
            <p>MangoHub &copy; {currentYear}</p>
          </Col>
        </div>
      </Container>
    </>
  );
};
export default Footer;
