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

let genres = [
    {
        name: 'Science Fiction',
        desc: 'Description of Science Fiction genre here'
    }
];

let directors = [
    {
        name: 'Example Director Name',
        bio: 'All about this director',
        birth: 'Birth year here',
        death: 'Death year here if applicable'
    }
];

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

app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((title) =>
      { return topMovies.title === req.params.title }));
  });

app.get('/genres', (req, res) => {
    res.json(genres);
});

app.get('/genres/:name', (req, res) => {
    res.json(genres.find((genre) =>
      { return genres.name === req.params.name }));
  });

app.get('/directors', (req, res) => {
    res.json(directors);
});

app.get('/directors/:name', (req, res) => {
    res.json(directors.find((director) =>
      { return directors.name === req.params.name }));
  });

app.get('/secret', (req, res) => {
    res.send('You discovered the hidden message.');
});


// Users

let users = [
    {
        id: 1,
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
    let user = users.find((user) => parseInt(user.id) === parseInt(req.params.id));
    console.log('user found', users, req.params.id)
    if (user) {
      users = users.filter((obj) => { return obj.id !== req.params.id });
      res.status(201).send('User ' + req.params.id + ' was deleted.');
    }
  });

    // Update the username of a user by user name.
    app.put('/users/name/:name', (req, res) => {
        let user = users.find((user) => { return user.name === req.params.name });
      
        if (user) {
          user.name[req.params.name] = parseInt(req.params.namne);
          res.status(201).send('User ' + req.params.name + ' was assigned the username of ' + req.params.name);
        } else {
          res.status(404).send('User ' + req.params.name + ' was not found.');
          console.log('action failed');
        }
      });

    // Update the password of a user by user name.
    app.put('/users/password/:password', (req, res) => {
        let user = users.find((user) => { return user.name === req.params.name });
    
        if (user) {
        user.name[req.params.password] = parseInt(req.params.password);
        console.log('password updated successfully');
        res.status(201).send('User ' + req.params.name + ' was assigned the password of ' + req.params.password);
        } else {
        res.status(404).send('User ' + req.params.name + ' was not found.');
        console.log('action failed');
        }
    });

    // Update the email of a user by user name.
    app.put('/users/email/:email', (req, res) => {
        let user = users.find((user) => { return user.name === req.params.name });
    
        if (user) {
        user.name[req.params.email] = parseInt(req.params.email);
        console.log('email updated successfully');
        res.status(201).send('User ' + req.params.name + ' was assigned the email of ' + req.params.email);
        } else {
        res.status(404).send('User ' + req.params.name + ' was not found.');
        console.log('action failed');
        }
    });

    app.put('/users/dob/:dob', (req, res) => {
        let user = users.find((user) => { return user.name === req.params.name });
    
        if (user) {
        user.name[req.params.dob] = parseInt(req.params.dob);
        console.log('dob updated successfully');
        res.status(201).send('User ' + req.params.name + ' was assigned the Date of Birth of ' + req.params.dob);
        } else {
        res.status(404).send('User ' + req.params.name + ' was not found.');
        console.log('action failed');
        }
    });

//Listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});