import { loadStripe } from "@stripe/stripe-js";

const Home = () => {
    // Product List
  const cart = [
    { id: 1, name: "Producto A", price: 1000, priceId: "price_1HQ..." },
    { id: 2, name: "Producto B", price: 2000, priceId: "price_1HR..." },
    { id: 3, name: "Producto C", price: 3000, priceId: "price_1HS..." },
  ];

  // stripe integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Q81UpP3WBhplXYwggVU8aKSusfUgfjKqFPz6amcMmjkcnJSJVOL22DHfqQiyou6mtPlbTpOtehXhG0wFRFIo47l00rb1JJ1Qc"
    );

    const body = {
      products: cart,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:7000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <>
      <h1>Stripe Workflow</h1>

      <div className="card">
        <h3>Products To Buy</h3>
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price / 100}
            </li>
          ))}
        </ul>
        <button onClick={makePayment}>make payment</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Home;
