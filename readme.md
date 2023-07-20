# ProShop eCommerce Platform (v2)

> eCommerce platform built with the MERN stack & Redux.

<img src="./frontend/public/images/screens.png">

This project is part of my [MERN Stack From Scratch | eCommerce Platform](https://www.traversymedia.com/mern-stack-from-scratch) course. It is a full-featured shopping cart with PayPal & credit/debit payments. See it in action at https://www.proshopdemo.dev

This is version 2.0 of the app, which uses Redux Toolkit. The first version can be found [here](https://proshopdemo.dev)

<!-- toc -->

- [Features](#features)
- [Usage](#usage)
  - [Env Variables](#env-variables)
  - [Install Dependencies (frontend & backend)](#install-dependencies-frontend--backend)
  - [Run](#run)
- [Build & Deploy](#build--deploy)
  - [Seed Database](#seed-database)

* [Bug Fixes, corrections and code FAQ](#bug-fixes-corrections-and-code-faq)
  - [BUG: Warnings on ProfileScreen](#bug-warnings-on-profilescreen)
  - [BUG: Changing an uncontrolled input to be controlled](#bug-changing-an-uncontrolled-input-to-be-controlled)
  - [BUG: All file types are allowed when updating product images](#bug-all-file-types-are-allowed-when-updating-product-images)
  - [BUG: Throwing error from productControllers will not give a custom error response](#bug-throwing-error-from-productcontrollers-will-not-give-a-custom-error-response)
    - [Original code](#original-code)
  - [BUG: Bad responses not handled in the frontend](#bug-bad-responses-not-handled-in-the-frontend)
    - [Example from PlaceOrderScreen.jsx](#example-from-placeorderscreenjsx)
  - [FAQ: How do I use Vite instead of CRA?](#faq-how-do-i-use-vite-instead-of-cra)
    - [Setting up the proxy](#setting-up-the-proxy)
    - [Setting up linting](#setting-up-linting)
    - [Vite outputs the build to /dist](#vite-outputs-the-build-to-dist)
    - [Vite has a different script to run the dev server](#vite-has-a-different-script-to-run-the-dev-server)
    - [A final note:](#a-final-note)
  * [License](#license)

<!-- tocstop -->

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
PAGINATION_LIMIT = 8
```

Change the JWT_SECRET and PAGINATION_LIMIT to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@email.com (Admin)
123456

john@email.com (Customer)
123456

jane@email.com (Customer)
123456
```

---

# Bug Fixes, corrections and code FAQ

The code here in the main branch has been updated since the course was published to fix bugs found by students of the course and answer common questions, if you are looking to compare your code to that from the course lessons then
please refer to the [originalcoursecode](https://github.com/bradtraversy/proshop-v2/tree/originalCourseCode) branch of this repository.

There are detailed notes in the comments that will hopefully help you understand
and adopt the changes and corrections.
An easy way of seeing all the changes and fixes is to use a note highlighter
extension such as [This one for VSCode](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) or [this one for Vim](https://github.com/folke/todo-comments.nvim) Where by you can easily list all the **NOTE:** and **FIX:** tags in the comments.

### BUG: Warnings on ProfileScreen

We see the following warning in the browser console..

`<tD> cannot appear as a child of <tr>.`

and

`warning: Received 'true' for a non-boolean attribute table.`

> Code changes can be seen in [ProfileScreen.jsx](./frontend/src/screens/ProfileScreen.jsx)

### BUG: Changing an uncontrolled input to be controlled

In our SearchBox input, it's possible that our `urlKeyword` is **undefined**, in
which case our initial state will be **undefined** and we will have an
uncontrolled input initially i.e. not bound to state.
In the case of `urlKeyword` being **undefined** we can set state to an empty
string.

> Code changes can be seen in [SearchBox.jsx](./frontend/src/components/SearchBox.jsx)

### BUG: All file types are allowed when updating product images

When updating and uploading product images as an Admin user, all file types are allowed. We only want to upload image files. This is fixed by using a fileFilter function and sending back an appropriate error when the wrong file type is uploaded.

You may see that our `checkFileType` function is declared but never actually
used, this change fixes that. The function has been renamed to `fileFilter` and
passed to the instance of [ multer ](https://github.com/expressjs/multer#filefilter)

> Code changes can be seen in [uploadRoutes.js](./backend/routes/uploadRoutes.js)

### BUG: Throwing error from productControllers will not give a custom error response

In section **3 - Custom Error Middleware** we throw an error from our
`getProductById` controller function, with a _custom_ message.
However if we have a invalid **ObjectId** as `req.params.id` and use that to
query our products in the database, Mongoose will throw an error before we
reach the line of code where we throw our own error.

#### Original code

```js
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  // NOTE: the following will never run if we have an invalid ObjectId
  res.status(404);
  throw new Error('Resource not found');
});
```

Instead what we can do is if we do want to check for an invalid ObjectId is use
a built in method from Mongoose - [isValidObjectId](<https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.isValidObjectId()>)
There are a number of places in the project where we may want to check we are
getting a valid ObjectId, so we can extract this logic to it's own middleware
and drop it in to any route handler that needs it.  
This also removes the need to check for a cast error in our errorMiddleware and
is a little more explicit in checking fo such an error.

> Changes can be seen in [errorMiddleware.js](./backend/middleware/errorMiddleware.js), [productRoutes.js](./backend/routes/productRoutes.js), [productController.js]('./backend/controllers/productController.js') and [checkObjectId.js](./backend/middleware/checkObjectId.js)

### BUG: Bad responses not handled in the frontend

There are a few cases in our frontend where if we get a bad response from our
API then we try and render the error object.
This you cannot do in React - if you are seeing an error along the lines of
**Objects are not valid as a React child** and the app breaks for you, then this
is likely the fix you need.

#### Example from PlaceOrderScreen.jsx

```jsx
<ListGroup.Item>
  {error && <Message variant='danger'>{error}</Message>}
</ListGroup.Item>
```

In the above code we check for a error that we get from our [useMutation](https://redux-toolkit.js.org/rtk-query/usage/mutations)
hook. This will be an object though which we cannot render in React, so here we
need the message we sent back from our API server...

```jsx
<ListGroup.Item>
  {error && <Message variant='danger'>{error.data.message}</Message>}
</ListGroup.Item>
```

The same is true for [handling errors from our RTK queries.](https://redux-toolkit.js.org/rtk-query/usage/error-handling)

> Changes can be seen in:-
>
> - [PlaceOrderScreen.jsx](./frontend/src/screens/PlaceOrderScreen.jsx)
> - [OrderScreen.jsx](./frontend/src/screens/OrderScreen.jsx)
> - [ProductEditScreen.jsx](./frontend/src/screens/admin/ProductEditScreen.jsx)
> - [ProductListScreen.jsx](./frontend/src/screens/admin/ProductListScreen.jsx)

### BUG: After switching users, our new user gets the previous users cart

When our user logs out we clear **userInfo** and **expirationTime** from local
storage but not the **cart**.  
So when we log in with a different user, they _inherit_ the previous users cart
and shipping information.

The solution is to simply clear local storage entirely and so remove the
**cart**, **userInfo** and **expirationTime**.

> Changes can be seen in:-
>
> - [authSlice.js](./frontend/src/slices/authSlice.js)

### FAQ: How do I use Vite instead of CRA?

Ok so you're at **Section 1 - Starting The Frontend** in the course and you've
heard cool things about [Vite](https://vitejs.dev/) and why you should use that
instead of [Create React App](https://create-react-app.dev/) in 2023.

There are a few differences you need to be aware of using Vite in place of CRA
here in the course after [scaffolding out your Vite React app](https://github.com/vitejs/vite/tree/main/packages/create-vite#create-vite)

#### Setting up the proxy

Using CRA we have a `"proxy"` setting in our frontend/package.json to avoid
breaking the browser [Same Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) in development.
In Vite we have to set up our proxy in our
[vite.config.js](https://vitejs.dev/config/server-options.html#server-proxy).

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // proxy requests prefixed '/api' and '/uploads'
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
});
```

#### Setting up linting

By default CRA outputs linting from eslint to your terminal and browser console.
To get Vite to ouput linting to the terminal you need to add a [plugin](https://www.npmjs.com/package/vite-plugin-eslint) as a
development dependency...

```bash
npm i -D vite-plugin-eslint

```

Then add the plugin to your **vite.config.js**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import the plugin
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      // setup the plugin
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
});
```

By default the eslint config that comes with a Vite React project treats some
rules from React as errors which will break your app if you are following Brad exactly.
You can change those rules to give a warning instead of an error by modifying
the **eslintrc.cjs** that came with your Vite project.

```js
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // turn this one off
    'react/prop-types': 'off',
    // change these errors to warnings
    'react-refresh/only-export-components': 'warn',
    'no-unused-vars': 'warn',
  },
};
```

#### Vite outputs the build to /dist

Create React App by default ouputs the build to a **/build** directory and this is
what we serve from our backend in production.  
Vite by default outputs the build to to a **/dist** directory so we need to make
some adjustments to our [backend/server.js](./backend/server.js)
Change...

```js
app.use(express.static(path.join(__dirname, '/frontend/build')));
```

to...

```js
app.use(express.static(path.join(__dirname, '/frontend/dist')));
```

#### Vite has a different script to run the dev server

In a CRA project you run `npm start` to run the development server, in Vite you
start the development server with `npm run dev`  
If you are using the **dev** script in your root pacakge.json to run the project
using concurrently, then you will also need to change your root package.json
scripts from...

```json
    "client": "npm start --prefix frontend",
```

to...

```json
    "client": "npm run dev --prefix frontend",
```

Or you can if you wish change the frontend/package.json scripts to use `npm
start`...

```json
    "start": "vite",
```

#### A final note:

Vite requires you to name React component files using the `.jsx` file
type, so you won't be able to use `.js` for your components. The entry point to
your app will be in `main.jsx` instead of `index.js`

And that's it! You should be good to go with the course using Vite.

---

## License

The MIT License

Copyright (c) 2023 Traversy Media https://traversymedia.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
