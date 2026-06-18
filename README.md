App used to search for series/movies based on search query.

API used for app will show Japanese animation (anime) series/movies.

Shows/movies will only pop up on the Home screen when text is present on search bar and the search button is clicked.

Pages (using React Router for navigation of pages)

1. List - List (visible when search text is entered)
2. Details - *information of selected show/movies determined by data fetched*

UPDATE -> API used for app -> Kitsu API (filters each query to 20 entries per page), text in search bar will be used in query.
NOTE: Jikan API was originally used for this project. However, support for the API has been discontinued on June 14th, 2026.

Fetch API to fetch data from Kitsu API with error handling (and using an ignore flag to ensure the app fetches once during strict mode).

SearchBar component will render search bar used for fetching data via search query.

List component will render loading and error states from fetch.

Detail component will render anime selection from current selection state (resets state to null when navigating back to List component)

NOTES:

    - localStorage property used for storing data in browser as key-value pairs with no expiration date. This is useful for having data persist through window closes and refreshes (in this project, selection state needs to be stored when refreshing the details age of the app).

    Functions -> getItem(key), setItem(key, value), removeItem(key), clear()