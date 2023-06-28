# Supermarket Cart Frontend

This repository contains the frontend code for the Supermarket Cart application. It is built using Angular and interacts with a backend server to manage a shopping cart and product listings. The application allows users to add products to their cart, apply discounts, manage quantities, and generate receipts.

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

## Contributing

Contributions to this repository are welcome. If you find any issues or have suggestions for improvements, please feel free to create a pull request or submit an issue.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

This project was developed as part of a coding challenge and serves as a demonstration of web development skills using Angular and related technologies. Special thanks to the project contributors for their valuable contributions.
