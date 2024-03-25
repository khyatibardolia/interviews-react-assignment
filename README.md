# FreshCart Grocery Store

Welcome to FreshCart Grocery Store, a modern e-commerce platform for all your grocery needs!

## Overview
FreshCart Grocery Store is a web application designed to provide a seamless grocery shopping experience where users can search for products, add them to the cart, pay for the products, and organize delivery. The focus is on the customer experience without considering authentication or multiple users.

## Deliverables
- `Available Products`: Implemented pagination with infinite scroll for the list of products.
- `Categories and Search`: Enabled searching for products and filtering by category.
- `Add/Remove items from Cart`: Improved the performance of adding/removing products from the cart and enhance user experience.
- `Checkout Phase`: Implemented a multistep checkout form including cart recap, address selection, delivery slot choice, payment method, and order confirmation.

## Technologies Used
- Frontend: `React.js, Material-UI`
- State Management: `Redux toolkit`
- Routing: `React Router`
- Bundler: `Vite`

## Getting Started

### Install dependencies
### `npm install`

### Available Scripts

In the project directory, start the development server:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173/](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Commit Convention
- To ensure readability and consistency in `commit messages`, the conventional commit format is used for writing commit messages that are `clear, concise, and informative`.
- Each commit message should adhere to the following pattern:

```
<type>(<scope>): <description>

[optional body]

[optional footer]

```

Where:

- `<type>` specifies the type of the commit (e.g., feat, fix, chore, docs, style).
- `<scope>` is optional and indicates the scope of the commit (e.g., component name, module).
- `<description>` is a short, concise description of the change.
- `[optional body]` provides additional context or details about the change.
- `[optional footer]` includes any relevant issue or breaking change references.

This convention helps in tracking and understanding the `purpose` of each commit.
See the section about [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) for more information.