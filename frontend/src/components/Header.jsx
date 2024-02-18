import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
//import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleVendorSignIn = () => {
    // Navigate to vendor sign in
  };

  const handleBuyerSignIn = () => {
    // Navigate to buyer sign in
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='primary' variant='blue' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              {/*<img src={logo} alt='ProShop' />*/}
              Sanaa Art Shop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <NavDropdown
                title={<FaUser />}
                id='signin-options'
                show={showOptions}
                onMouseEnter={() => setShowOptions(true)}
                onMouseLeave={() => setShowOptions(false)}
              >
                <NavDropdown.Item onClick={handleVendorSignIn}>
                  Sign in as Vendor
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleBuyerSignIn}>
                  Sign in as Buyer
                </NavDropdown.Item>
              </NavDropdown>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/** Category Menu Section */}
      <div className="bg-light py-2">
        <Container>
          <div className="d-flex flex-row overflow-auto gap-4">
            <Link to='/category/crafts/' style={{textDecoration: 'none'}}>
              <NavDropdown.Item>Crafts</NavDropdown.Item>
            </Link>
            <Link to='/category/fashion/' style={{textDecoration: 'none'}}>
              <NavDropdown.Item>Fashion</NavDropdown.Item>
            </Link>
            <Link to='/category/visual-arts/' style={{textDecoration: 'none'}}>
              <NavDropdown.Item>Visual Arts</NavDropdown.Item>
            </Link>
            <Link to='/category/music/' style={{textDecoration: 'none'}}>
              <NavDropdown.Item>Music</NavDropdown.Item>
            </Link>
            <Link to='/category/performers/' style={{textDecoration: 'none'}}>
              <NavDropdown.Item>Performers</NavDropdown.Item>
            </Link>
            <Link to='/category/films/' style={{textDecoration: 'none'}}>
              <NavDropdown.Item>Films</NavDropdown.Item>
            </Link>
            <Link to='/category/theatre-plays/' style={{textDecoration: 'none'}}>
              <NavDropdown.Item>Theatre plays</NavDropdown.Item>
            </Link>
            <Link to='/category/digital-media/' style={{textDecoration: 'none'}}>
              <NavDropdown.Item>Digital Media</NavDropdown.Item>
            </Link>
          </div>
        </Container>
      </div>
      {/** Category Menu Section */}
    </header>
  );
};

export default Header;
