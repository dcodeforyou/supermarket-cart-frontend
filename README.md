# Supermarket Cart Frontend

This repository contains the frontend code for the Supermarket Cart application. It is built using Angular and interacts with a backend server to manage a shopping cart and product listings. The application allows users to add products to their cart, apply discounts, manage quantities, and generate receipts.

## Demo of creating Transactions

Product Listing Page:
<br />
<img width="1437" alt="Screenshot 2023-06-28 at 3 08 31 PM" src="https://github.com/dcodeforyou/supermarket-cart-frontend/assets/92050154/1f91b7f6-3277-4a01-9a2b-4cf461b972cf">

Cart Page:
<br />
<img width="1437" alt="Screenshot 2023-06-28 at 3 09 04 PM" src="https://github.com/dcodeforyou/supermarket-cart-frontend/assets/92050154/ac613ee3-1f1f-44c6-b08f-7be3305cf1e5">

Receipt Page:
<br />
<img width="1437" alt="Screenshot 2023-06-28 at 3 09 15 PM" src="https://github.com/dcodeforyou/supermarket-cart-frontend/assets/92050154/baf49e7e-d7c8-463b-9410-c1e3a483411b">


## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/dcodeforyou/supermarket-cart-frontend.git
   ```

2. Install the dependencies:

   ```shell
   cd supermarket-cart-frontend
   npm install
   ```

3. Start the development server:

   ```shell
   ng serve
   ```

   The application will be accessible at `http://localhost:4200`.

## Features

- Get previous cart items: View the list of available products with prices and discounts. When the application loads, it retrieves the previous cart items that were already added. The cart state is managed through MongoDB Atlas.
- Discounts on product listing: The product listing displays any applicable discounts for the products.
- Add products to the shopping cart - Users can add items to the cart. If an individual item has a discount, the discounted price will be applied.
- Group discounts: If a group discount is available, after adding the minimum required quantity of products, the discounted price for each item will be applied.
- Managing quantity: Users can increment or decrement the quantity of products from the products page.
- Increment or decrement the quantity of items in the cart.
- Managing cart items: Users can increment, decrement, or remove items from the cart page.
- View the cart contents and total price.
- Checkout and receipt: Users can proceed to checkout to view the receipt, which includes the discounted price, user information, and timestamp.

## Technologies Used

- Angular: A popular JavaScript framework for building web applications.
- HTML/SCSS: Markup and styling languages for structuring and designing the user interface.
- TypeScript: A superset of JavaScript that adds static typing and other features to enhance development.
- Jest: A testing library for JavaScript applications.

## Deployment

The application is deployed and hosted on Netlify. You can access the live version at [https://supermarket-cart.netlify.app](https://supermarket-cart.netlify.app).

## License

This project is licensed under the [MIT License](LICENSE).

