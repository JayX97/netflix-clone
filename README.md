App used to search for series/movies based on search query.

API used for app will show Japanese animation (anime) series/movies.

Shows/movies will only pop up on the Home screen when text is present on search bar and the search button is clicked.

Pages (using React Router for navigation of pages)

1. Home - Title, Search Bar, List (visible when search text is entered), Footer
2. Details - *information of selected show/movies determined by data fetched*

API used for app -> Jikan API (filters each query to 25 entries per page), text in search bar will be used in query.