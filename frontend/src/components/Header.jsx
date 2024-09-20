import { Nav, Badge, Dropdown, Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";


const navLinks = [
  { name: "Home", id: "" },
  { name: "Shop", id: "shop" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" }
]

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();
  const { keyword: urlKeyword } = useParams();


  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
      window.scrollBy(0, 1000);
    } else {
      navigate('/');
    }
    handleClose()
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='d-flex justify-content-between align-items-center py-3' >
          <Nav.Link as={Link} to='/'>
            <h1 className="text-primary display-6">MangoHub</h1>
          </Nav.Link>

          
          <div className='d-flex justify-content-between align-items-center gap-2' >
            <CiSearch onClick={handleShow} fontSize={20} />
            
            {/* <Dropdown className='custom-dropdown' >
            <Dropdown.Toggle className='bg-transparent border-0  ' id="myDropdown">
                Shop
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/shop">All Product</Dropdown.Item>
                  <Dropdown.Item>Devgad</Dropdown.Item>
                  <Dropdown.Item>Ratnagiri</Dropdown.Item>
                  <Dropdown.Item>Totapuri</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}

            {navLinks?.map((link) => (
              <Nav.Link as={Link} key={link.id} to={`/${link.id}`}>
                {link.name}
              </Nav.Link>
            ))}
            <Nav.Link as={Link} to='/cart'>
              <FaShoppingCart fontSize={20} />
              {cartItems.length > 0 && (
                <Badge pill bg='success'>
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </Badge>
              )}
            </Nav.Link>
            
           

            {userInfo && userInfo.isAdmin && (

              <Dropdown className='custom-dropdown' >
                <Dropdown.Toggle className='bg-transparent border-0 text-primary ' id="dropdown-basic">
                  Admin
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/admin/productlist">Products</Dropdown.Item>
                  <Dropdown.Item href='/admin/orderlist'  >Orders</Dropdown.Item>
                  <Dropdown.Item href='/admin/userlist'  >Users</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            {userInfo ? (
              <Dropdown className='custom-dropdown' >
                <Dropdown.Toggle className='bg-transparent border-0 text-primary ' id="dropdown-basic">
                  {userInfo.name} {" "}
                  <FaUser fontSize={15} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href='/myorder' >My Order</Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler} >Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            ) : (
              <Button href='/login'>
                Login
              </Button>
            )}
          </div>
        </div>
        {/* search form modal */}
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={submitHandler} >
            <Modal.Body>
              <InputGroup >
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  type='text'
                  name='q'
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyword}
                  placeholder='Search Products...'
                  className='border-none bg-transparent search-input'
                />
                <Button className='search-button' type="submit">
                  Search
                </Button>
              </InputGroup>
            </Modal.Body>
          </Form>
        </Modal>
        

      </div>
    </>
  );
};

export default Header;
