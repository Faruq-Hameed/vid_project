# VID APP

### About citrone
  VID APP is a simple web application for movie rental services.
  A movie belong to a genre and customers can make requests to borrow any available movie after signing up

## Routings
- Default routes : GET [/](/),[/api/citrone/](/api/citrone/),[/*](/*)

#### Genre Routes

- Default genre route (pagination available with query params) : GET : [/api/genre/](/api/genre/)
- Get a specicific genre route : GET : [/api/genre/:id](/api/genre/:id)
- Create a new genre : POST :  [/api/genre](/api/genre)
- Delete a genre : DELETE : [/api/genre](/api/genre)
- update genre : PUT : [/api/genre/:id](/api/genre/:id)


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
