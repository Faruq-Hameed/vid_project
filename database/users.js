const users = [
    {
        id: 1,
        name: 'John',
        moviesRented: [
            { moviesId: 2, dateRented: new Date, returned: false },
            { moviesId: 7, dateRented: new Date, returned: true },
        ]
    },
    {
        id: 2,
        name: 'James',
        moviesRented: [
            { moviesId: 2, dateRented: new Date, returned: false },
            { moviesId: 5, dateRented: new Date, returned: true },
        ]
    },
    {
        id: 3,
        name: 'Faruq',
        moviesRented: [
            { moviesId: 1, dateRented: new Date, returned: false },
            { moviesId: 3, dateRented: new Date, returned: true },
        ]
    },
    {
        id: 4,
        name: 'Raphael',
        moviesRented: [
            { moviesId: 5, dateRented: new Date, returned: false },
            { moviesId: 6, dateRented: new Date, returned: true },
        ]
    },
    {
        id: 5,
        name: 'Adeshina',
        moviesRented: [
            { moviesId: 7, dateRented: new Date, returned: false },
            { moviesId: 4, dateRented: new Date, returned: true },
        ]
    },
    {
        id: 6,
        name: 'Ajibola',
        moviesRented: [
            { moviesId: 1, dateRented: new Date, returned: false },
            { moviesId: 3, dateRented: new Date, returned: true },
        ]
    }
]

module.exports = users