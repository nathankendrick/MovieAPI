const express = require('express');
const bodyParser = require('body-parser');
    morgan = require('morgan');

const app = express();

//Morgan for logging request data
app.use(morgan('common'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Disabled the section below temporarily

// const bodyParser = require('body-parser'),
//     methodOverride = require('method-override');

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.use(bodyParser.json());
// app.use(methodOverride());

// app.use((err, req, res, next) => {
//     //logic
// });

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

//GET requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get('/secret', (req, res) => {
    res.send('You discovered the hidden message.');
});

//Listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});