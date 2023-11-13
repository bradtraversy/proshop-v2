// import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import Rating from './Rating';

// const Product = ({ product }) => {
//   return (
//     <Card className='my-3 p-3 rounded'>
//       <Link to={`/product/${product._id}`}>
//         <Card.Img src={product.image} variant='top' />
//       </Link>

//       <Card.Body>
//         <Link to={`/product/${product._id}`}>
//           <Card.Title as='div' className='product-title'>
//             <strong>{product.name}</strong>
//           </Card.Title>
//         </Link>

//         <Card.Text as='div'>
//           <Rating
//             value={product.rating}
//             text={`${product.numReviews} reviews`}
//           />
//         </Card.Text>

//         <Card.Text as='h3'>${product.price}</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Product;
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        {/* Assuming Product has an 'image' property */}
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' >
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {}
        <Card.Text as='div'>
        {product.date} {product.time}
        </Card.Text>
        <Card.Text as='div'>
        {product.address} {product.postcode}
        </Card.Text>
      

        {/* Assuming Product has 'rating' and 'numReviews' properties */}
        {/* <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text> */}

        {/* Assuming Product has 'price' property */}
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

