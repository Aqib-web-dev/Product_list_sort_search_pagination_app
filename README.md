Task Description

You need to create a web application that displays a list of products. The application should allow the user to sort, filter, search, and paginate through the list of products. The products should be retrieved from an API that returns an array of JSON objects, each representing a product.

Here are the specific requirements for the application:

The application should display a table of products with columns for the product name, price, category, and date added.

The user should be able to sort the table by clicking on the column headers. The table should display an arrow icon indicating the sort direction (ascending or descending) of the column being sorted.

The user should be able to filter the table by category using a dropdown menu. The dropdown menu should display all unique categories in the list of products.

The user should be able to search for a product by name using a search bar. The search should be case-insensitive and should match any products whose names contain the search query.

The application should display a pagination bar at the bottom of the table that allows the user to navigate between pages. Each page should display a maximum of 10 products.

The application should be responsive and work well on mobile devices.

The application should be built using React.

Here are some additional details to help you get started:

You will need to create a component to handle the API call and retrieve the list of products.

You will need to use the useState hook to store the list of products, the current sort column and direction, the current filter category, and the current search query.

You will need to use the useEffect hook to make the API call when the component mounts or when the sort, filter, or search criteria change.

You will need to use conditional rendering to display the table or an error message if the API call fails.

You will need to use the Array.prototype.sort() method to sort the list of products based on the current sort column and direction.

You will need to use the Array.prototype.filter() method to filter the list of products based on the current filter category.

You will need to use the Array.prototype.slice() method to paginate the list of products based on the current page number.

You will need to use CSS or a CSS framework like Bootstrap or Material UI to style the application.

You can use any other libraries or tools you like, such as Axios for making API calls or Lodash for filtering and sorting arrays.
