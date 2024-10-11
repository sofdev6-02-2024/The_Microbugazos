# Stripe Integration & How it works?

1. **Server Setup (Backend with Express)**:
   - The `express` framework creates a server, and the `stripe` package is used to handle payments via Stripe’s API. A private Stripe key (`sk_test_...`) is passed to `stripe()` to authenticate with your test account.
   - The server listens on port 7000, with `CORS` and JSON parsing (`express.json()`) enabled to allow cross-origin requests and handle JSON data from requests.

2. **Checkout Endpoint (`/api/create-checkout-session`)**:
   - This endpoint generates a checkout session for the products the user wants to purchase.
   - It retrieves `products` from the request body (`req.body`) and maps them to create `line_items`, an array that contains each product’s details:
     - `price_data` defines currency (`currency: "inr"`), the product’s name (`product_data: { name: product.name }`), and the price in cents (`unit_amount`), which multiplies the price by 100 to convert to the smallest currency unit.
     - `quantity` sets the quantity of each product in the cart (set to `1` here).
   - The server then calls `stripe.checkout.sessions.create` to create a Stripe session, specifying:
     - `payment_method_types: ["card"]`: Allows only card payments.
     - `line_items`: Details of products in the cart.
     - `mode: "payment"`: Specifies a one-time payment mode.
     - `success_url` and `cancel_url`: URLs to redirect the user to based on the payment result.

3. **Client (Frontend with React)**:
   - The cart (`cart`) is defined with products, each containing `id`, `name`, and `price` (in cents). The public Stripe key (`pk_test_...`) is used to initialize `stripe-js`, which loads Stripe’s library on the client side.
   - The `makePayment` function integrates the client with Stripe. Here’s how it flows:
     - The `loadStripe` function initializes Stripe using the public key.
     - The function defines a `body` containing the cart and a `headers` object for the `Content-Type`.
     - It sends a `POST` request to `/api/create-checkout-session` on the server using `fetch`.
     - The server responds with a `session.id`, which is used in `stripe.redirectToCheckout` to redirect the user to Stripe’s checkout page. If an error occurs, it’s logged to the console.

4. **Full Stripe Integration Workflow**:
   - In the frontend, when the user selects products and clicks “make payment,” the `makePayment` function sends the products to the server.
   - The server receives the products, configures `line_items`, creates the Stripe session, and returns the `session.id`.
   - The frontend then redirects the user to Stripe’s checkout page using `stripe.redirectToCheckout`, where they can complete the payment.
   - Once the payment completes, the user is redirected to either `success_url` or `cancel_url` based on the payment outcome.

### **Summary of Stripe Integration**
Stripe simplifies payment processing by offering an easy-to-use API for creating checkout sessions on the backend and tools on the frontend to direct users to the checkout. A private key is used on the backend to authenticate, while a public key initializes `stripe-js` on the frontend, allowing for secure and user-friendly payment processing.