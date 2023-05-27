# VID APP

### About citrone
- VID APP is a simple web application for movie rental services.
-A movie belong to a genre and customers can make requests to borrow any available movie after signing up.
- Customer must register before making requests in any of the protected routes(create rental services and some customer requests endpoints)
- It was initailly deployed on railway.io but later moved to vercel



## Api hosting Url
- [vid-project-one.vercel.app](vid-project-one.vercel.app)


#### Genre Routes

- Default genre route (pagination available with query params) : GET : [https://vid-project-one.vercel.app//api/genres/](https://vid-project-one.vercel.app/api/genres/)
- Get a specicific genre route : GET : [https://vid-project-one.vercel.app/api/genres/:id](https://vid-project-one.vercel.app/api/genres/:id)
- Create a new genre : POST :  [https://vid-project-one.vercel.app/api/genres](https://vid-project-one.vercel.app/api/genres)
- Delete a genre : DELETE : [https://vid-project-one.vercel.app/api/genres](https://vid-project-one.vercel.app/api/genres)
- update genre : PUT : [https://vid-project-one.vercel.app/api/genres/:id](https://vid-project-one.vercel.app/api/genres/:id)


#### Movies Routes

- Default movies route(pagination available with query params) : GET : [https://vid-project-one.vercel.app//api/movies/](https://vid-project-one.vercel.app//api/movies/)
- Get a specicific movies route : GET : [https://vid-project-one.vercel.app//api/movies/:id](https://vid-project-one.vercel.app//api/movies/:id)
- Create a new movies : POST :  [https://vid-project-one.vercel.app//api/movies](https://vid-project-one.vercel.app//api/movies)
- Delete a movies : DELETE : [https://vid-project-one.vercel.app//api/movies](https://vid-project-one.vercel.app//api/movies)
- update movies : PUT : [https://vid-project-one.vercel.app//api/movies/:id](https://vid-project-one.vercel.app//api/movies/:id)


#### Customers Routes

- Default (all) customers route (pagination available with query params) : GET : [https://vid-project-one.vercel.app//api/customers/](https://vid-project-one.vercel.app//api/customers/)
- Get a specicific customers route : GET : [https://vid-project-one.vercel.app//api/customers/:id](https://vid-project-one.vercel.app//api/customers/:id)
- Create a new customers : POST :  [https://vid-project-one.vercel.app//api/customers](https://vid-project-one.vercel.app//api/customers)
- Delete a customers : DELETE : [https://vid-project-one.vercel.app//api/customers](https://vid-project-one.vercel.app//api/customers)
- update customers : PUT : [https://vid-project-one.vercel.app//api/customers/:id](https://vid-project-one.vercel.app//api/customers/:id)



#### Rentals Routes

- Default (all) rentals route (pagination available with query params) : GET : [https://vid-project-one.vercel.app//api/rentals/](https://vid-project-one.vercel.app//api/rentals/)
- Create a new rentals : POST :  [https://vid-project-one.vercel.app//api/rentals](https://vid-project-one.vercel.app//api/rentals)
