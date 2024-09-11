import { Navbar, Nav, Container, NavDropdown, Badge, Dropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice';
import { useState } from 'react';
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);


  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

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
            <Nav.Link as={Link} to={`/search`}>
              <CiSearch fontSize={20} />
            </Nav.Link>
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

            {userInfo ? (
              <>
              
               
                <Dropdown className='custom-dropdown' >
                  <Dropdown.Toggle className='bg-transparent border-0 text-primary '  id="dropdown-basic">
                    {userInfo.name} {" "}
                    <FaUser fontSize={15} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler} >Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Nav.Link as={Link} to='/login'>
              </Nav.Link>
            )}
          </div>
        </div>
      </div>
      {/* <div className="container-fluid ">
        <div className="  pt-3 pb-3 ">
          <div className=" d-flex justify-content-between   ">
            <a href="/home" className="navbar-brand"><h1 className="text-primary display-6">MangoHub</h1></a>
            <div className="d-flex gap-4" id="navbarCollapse">
              <div className="nav-links">
                {navLinks?.map((link) => (
                  <Link key={link.id} href={`/${link.id}`}>
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="d-flex ">
                <a href="/cart" className="position-relative me-4 my-auto align-middle">
                  <FaShoppingCart fontSize={20} />                                <span className=" cart position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1 ">3</span>
                </a>
                <button onClick={openPopup} className='border-0 bg-transparent' >
                  <FaUser fontSize={25} />
                </button>
                <div onClick={openSidebar} className="nav-menu">
                  <FaShoppingCart fontSize={20} />
                </div>
                <div className={`sidebar ${isOpen ? "open" : ""}`}>
                  <div onClick={closeSidebar} className="close-icon">
                    x
                  </div>
                  <div className="sidebar-links ">
                    {navLinks?.map((link) => (
                      <Link key={link.id} onClick={closeSidebar} href={`/${link.id}`}>
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>

        </div>
      </div> */}
      {/* <Navbar bg='' variant='' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <h4>MangoHub</h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <Nav.Link as={Link} to='/cart'>
                <FaShoppingCart fontSize={20} />
                {cartItems.length > 0 && (
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item as={Link} to='/profile'>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <FaUser fontSize={25} />
                </Nav.Link>
              )}

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <NavDropdown.Item as={Link} to='/admin/productlist'>
                      Products
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/admin/orderlist'>
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/admin/userlist'>
                      Users
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
};

export default Header;
