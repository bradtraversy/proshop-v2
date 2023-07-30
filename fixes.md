# fixes

## add prettier config

.prettierrc.yaml

```
printWidth: 80
tabWidth: 2
useTabs: false
semi: true
singleQuote: true
bracketSpacing: true
jsxBracketSameLine: false
jsxSingleQuote: true
trailingComma: es5
```

## fix Profile Screen error

frontend/src/screens/ProfileScreen.jsx

```
<Table striped hover responsive className='table-sm'>
<td>{order._id}</td>
```

## fix: changing an uncontrolled component to controlled

frontend/src/components/SearchBox.jsx

```
// FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');
```

## restrict uploads to images

backend/routes/uploadRoutes.js

```

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});
```

## fix: remove none resolving dependency

frontend/package.json

```
   "proshop2": "file:..",
```

## fix: custom errors and checking for valid ObjectId

backend/middleware/checkObjectId.js

```
// @ts-check
import { isValidObjectId } from 'mongoose';

/**
 * Checks if the req.params.id is a valid Mongoose ObjectId.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 * @throws {Error} Throws an error if the ObjectId is invalid.
 */

function checkObjectId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid ObjectId of:  ${req.params.id}`);
  }
  next();
}

export default checkObjectId;
```

backend/middleware/errorMiddleware.js

```
  // removed
  // If Mongoose not found error, set to 404 and change message
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }
```

backend/routes/productRoutes.js

```

import checkObjectId from '../middleware/checkObjectId.js';

router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

```

package.json

```
"devDependencies": {
    "@types/express": "^4.17.17",
    "concurrently": "^7.6.0",
    "nodemon": "^2.0.21"
  }
```

## fix: handling bad response from API rendering error object

frontend/src/screens/OrderScreen.jsx

```
    <Message variant='danger'>{error}</Message>
    <Message variant='danger'>{error.data.message}</Message>
```

frontend/src/screens/PlaceOrderScreen.jsx

```
{error && <Message variant='danger'>{error}</Message>}
                {error && (
                  <Message variant='danger'>{error.data.message}</Message>
                )}
```

frontend/src/screens/admin/ProductEditScreen.jsx

```
          <Message variant='danger'>{error}</Message>
          <Message variant='danger'>{error.data.message}</Message>
```

frontend/src/screens/admin/ProductListScreen.jsx

```
        <Message variant='danger'>{error}</Message>
        <Message variant='danger'>{error.data.message}</Message>

```

## fix: user inherits last users cart and shipping

frontend/src/slices/authSlice.js

```
      localStorage.removeItem('userInfo');
      localStorage.removeItem('expirationTime');
      // NOTE: here we need to also remove the cart from storage so the next
      // logged in user doesn't inherit the previous users cart and shipping
      localStorage.clear();
```

## reset cart state on logout

frontend/src/slices/cartSlice.js

```
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),

...
{
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;
```

frontend/src/components/Header.jsx

```
import { resetCart } from '../slices/cartSlice';

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

```
