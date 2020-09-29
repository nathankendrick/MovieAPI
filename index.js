const express = require('express');

const bodyParser = require('body-parser');
    
const uuid = require('uuid');

const methodOverride = require('method-override');

const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(methodOverride());

//Morgan for logging request data
app.use(morgan('common'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Movies

let topMovies = [
    {
        title: 'Ghostbusters',
        director: 'Ivan Reitman',
        cast: 'Bill Murray, Dan Aykroyd, Sigourney Weaver, Harold Ramis, Rick Moranis, Ernie Hudson, Annie Potts',
        genre: 'Science Fiction, Comedy',
        released: '1984'
    },
    {
        title: 'Indiana Jones and the Last Crusade',
        director: 'Steven Spielberg',
        cast: 'Harrison Ford, Denholm Elliott, Alison Doody, John Rhys-Davies, Julian Glover, Sean Connery',
        genre: 'Action Adventure',
        released: '1989'
    },
    {
        title: 'Jurassic Park',
        director: 'Steven Spielberg',
        cast: 'Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough, Bob Peck, Martin Ferrero, BD Wong, Samuel L. Jackson, Wayne Knight, Joseph Mazzello, Ariana Richards',
        genre: 'Science Fiction, Action Adventure',
        released: '1990'
    },
    {
        title: 'Lost in Translation',
        director: 'Sofia Coppola',
        cast: 'Bill Murray, Scarlett Johansson, Giovanni Ribisi, Anna Faris, Fumihiro Hayashi',
        genre: 'Romantic Comedy',
        released: '2003'
    },
    {
        title: 'Rush Hour',
        director: 'Brett Ratner',
        cast: 'Jackie Chan, Chris Tucker, Tom Wilkinson, Chris Penn, Elizabeth Peña',
        genre: 'Action Comedy',
        released: '1998'
    },
    {
        title: 'Return of the Jedi',
        director: 'Richard Marquand',
        cast: 'Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams, Anthony Daniels, David Prowse, Kenny Baker, Peter Mayhew, Frank Oz',
        genre: 'Epic Space Opera',
        released: '1983'
    },
    {
        title: 'Smokey and the Bandit',
        director: 'Hal Needham',
        cast: 'Burt Reynolds, Sally Field, Jerry Reed, Jackie Gleason',
        genre: 'Road Action Comedy',
        released: '1977'
    },
    {
        title: 'Mr. Beans Holiday',
        director: 'Steve Bendelack',
        cast: 'Rowan Atkinson, Emma de Caunes, Max Baldry, Willem Dafoe',
        genre: 'Comedy',
        released: '2007'
    },
    {
        title: 'Rat Race',
        director: 'Jerry Zucker',
        cast: 'Rowan Atkinson, John Cleese, Whoopi Goldberg, Cuba Gooding Jr, Seth Green, Wayne Knight, Jon Lovitz, Breckin Meyer, Kathy Najimy, Amy Smart',
        genre: 'Comedy',
        released: '2001'
    },
    {
        title: 'GoldenEye',
        director: 'Martin Campbell',
        cast: 'Pierce Brosnan, Sean Bean, Izabella Scorupco, Famke Janssen, Joe Don Baker',
        genre: 'Spy Film',
        released: '1995'
    },
];

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get('/movies/titles/:title', (req, res) => {
    res.json(topMovies.find((movie) =>
      { return movie.title === req.params.title }));
  });

app.get('/movies/genres/:genre', (req, res) => {
    res.json(topMovies.find((movie) =>
      { return movie.genre === req.params.genre }));
  });

app.get('/movies/directors/:director', (req, res) => {
    res.json(topMovies.find((movie) =>
      { return movie.director === req.params.director }));
  });

app.get('/secret', (req, res) => {
    res.send('You discovered the hidden message.');
});


// Users

let users = [
    {
        id: '1',
        name: 'Test',
        password: '1234',
        email: 'test@email.com',
        dob: '01/01/1990',
    },
];

    // Adds data for/Registers a new user.
    app.post('/users', (req, res) => {
        let newUser = req.body;
    
        if (!newUser.name) {
            const message = 'Missing name in request body';
            res.status(400).send(message);
        } else {
            console.log('new user:', newUser)
            newUser.id = uuid.v4();
            users.push(newUser);
            res.status(201).send(newUser);
        }
    });
  
  // Deletes/Deregisters a user from the list by ID.
  app.delete('/users/:id', (req, res) => {
      console.log(req.params);
    let user = users.find((user) => user.id === req.params.id);
    console.log('user found', user, req.params.id)
    if (user) {
        console.log(users);
      users = users.filter((obj) => { return obj.id !== req.params.id });
      console.log(users);
      res.status(201).send('User ' + req.params.id + ' was deleted.');
    } else {
        res.status(404).send('User' + req.params.id +' was not found');
    }
  });

    app.put('/users/:id', (req, res) => {
        let user = users.find((user) => user.id === req.params.id);
    
        if (user) {
          user.name = req.body.name;
          user.password = req.body.password;
          user.email = req.body.email;
          user.dob = req.body.dob;
    
          res.status(201).send(user);
        } else {
          res.status(404).send('User ' + req.params.id + ' was not found.');
          console.log('action failed');
        }
    });

    //GET user by id
    app.get('/users', (req, res) => {
        res.status(200).send(users);
    });

    app.put('/users/:id/addFavorite/:movie', (req, res) => {
        let user = users.find((user) => user.id === req.params.id);

        if (user) {
            if (!user.favorites) {
                user.favorites = [];
            }
            user.favorites.push(req.params.movie);
      
            res.status(201).send(user);
          } else {
            res.status(404).send('User ' + req.params.id + ' was not found.');
            console.log('action failed');
          }
    });

    app.put('/users/:id/removeFavorite/:movie', (req, res) => {
        let user = users.find((user) => user.id === req.params.id);

        if (user && user.favorites) {
            user.favorites = user.favorites.filter((movie) => { return movie !== req.params.movie });
      
            res.status(201).send(user);
          } else {
            res.status(404).send('User ' + req.params.id + ' was not found.');
            console.log('action failed');
          }
    });

//Listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});