# VID APP

### About citrone
- VID APP is a simple web application for movie rental services.
-A movie belong to a genre and customers can make requests to borrow any available movie after signing up.
- Customer must register before making requests in any of the protected routes(create rental services and some customer requests endpoints)


## Api hosting Url
- [https://faruq-vidproject.up.railway.app](https://faruq-vidproject.up.railway.app)


#### Genre Routes

- Default genre route (pagination available with query params) : GET : [/api/genres/](/api/genres/)
- Get a specicific genre route : GET : [/api/genres/:id](/api/genres/:id)
- Create a new genre : POST :  [/api/genres](/api/genres)
- Delete a genre : DELETE : [/api/genres](/api/genres)
- update genre : PUT : [/api/genres/:id](/api/genres/:id)


#### Movies Routes

- Default movies route(pagination available with query params) : GET : [/api/movies/](/api/movies/)
- Get a specicific movies route : GET : [/api/movies/:id](/api/movies/:id)
- Create a new movies : POST :  [/api/movies](/api/movies)
- Delete a movies : DELETE : [/api/movies](/api/movies)
- update movies : PUT : [/api/movies/:id](/api/movies/:id)


#### Customers Routes

- Default (all) customers route (pagination available with query params) : GET : [/api/customers/](/api/customers/)
- Get a specicific customers route : GET : [/api/customers/:id](/api/customers/:id)
- Create a new customers : POST :  [/api/customers](/api/customers)
- Delete a customers : DELETE : [/api/customers](/api/customers)
- update customers : PUT : [/api/customers/:id](/api/customers/:id)



#### Rentals Routes

- Default (all) rentals route (pagination available with query params) : GET : [/api/rentals/](/api/rentals/)
- Create a new rentals : POST :  [/api/rentals](/api/rentals)
