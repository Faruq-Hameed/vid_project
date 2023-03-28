const {getGenreById, getAllGenres, createGenre, deleteGenre, updateGenre} =require('./genres')
const {getMovieById, getAllMovies, createMovie, deleteMovie, updateMovie} =require('./movies')
const {getCustomerById, getAllCustomers, createCustomer, deleteCustomer, updateCustomer} =require('./customers')



module.exports = {getGenreById, getAllGenres, createGenre,deleteGenre, updateGenre,
    getMovieById, getAllMovies, createMovie, deleteMovie, updateMovie,
    getCustomerById, getAllCustomers, createCustomer, deleteCustomer, updateCustomer
}
