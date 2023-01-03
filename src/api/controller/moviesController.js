import { v4 } from 'uuid';
import exceptionHandler from '../../utils/exceptions/exceptionHandler';

let movies = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
    runtime: '92',
    genres: ['Comedy', 'Fantasy'],
    director: 'Tim Burton',
    actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
    plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
  },

  {
    id: 2,
    title: 'Crocodile Dundee',
    year: '1986',
    runtime: '97',
    genres: ['Adventure', 'Comedy'],
    director: 'Peter Faiman',
    actors: 'Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil',
    plot: 'An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.',
  },

  {
    id: 3,
    title: 'Ratatouille',
    year: '2007',
    runtime: '111',
    genres: ['Animation', 'Comedy', 'Family'],
    director: 'Brad Bird, Jan Pinkava',
    actors: 'Patton Oswalt, Ian Holm, Lou Romano, Brian Dennehy',
    plot: 'A rat who can cook makes an unusual alliance with a young kitchen worker at a famous restaurant.',
  },
  {
    id: 4,
    title: 'Apocalypto',
    year: '2006',
    runtime: '139',
    genres: ['Action', 'Adventure', 'Drama'],
    director: 'Mel Gibson',
    actors: 'Rudy Youngblood, Dalia Hernández, Jonathan Brewer, Morris Birdyellowhead',
    plot: 'As the Mayan kingdom faces its decline, the rulers insist the key to prosperity is to build more temples and offer human sacrifices. Jaguar Paw, a young man captured for sacrifice, flees to avoid his fate.',
  },
  {
    id: 5,
    title: 'Scarface',
    year: '1983',
    runtime: '170',
    genres: ['Crime', 'Drama'],
    director: 'Brian De Palma',
    actors: 'Al Pacino, Steven Bauer, Michelle Pfeiffer, Mary Elizabeth Mastrantonio',
    plot: 'In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.',
  },

  {
    id: 6,
    title: 'Django Unchained',
    year: '2012',
    runtime: '165',
    genres: ['Drama', 'Western'],
    director: 'Quentin Tarantino',
    actors: 'Jamie Foxx, Christoph Waltz, Leonardo DiCaprio, Kerry Washington',
    plot: 'With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.',
  },
  {
    id: 7,
    title: 'Midnight in Paris',
    year: '2011',
    runtime: '94',
    genres: ['Comedy', 'Fantasy', 'Romance'],
    director: 'Woody Allen',
    actors: 'Owen Wilson, Rachel McAdams, Kurt Fuller, Mimi Kennedy',
    plot: "While on a trip to Paris with his fiancée's family, a nostalgic screenwriter finds himself mysteriously going back to the 1920s everyday at midnight.",
  },
  {
    id: 8,
    title: 'Les Misérables',
    year: '2012',
    runtime: '158',
    genres: ['Drama', 'Musical', 'Romance'],
    director: 'Tom Hooper',
    actors: 'Hugh Jackman, Russell Crowe, Anne Hathaway, Amanda Seyfried',
    plot: "In 19th-century France, Jean Valjean, who for decades has been hunted by the ruthless policeman Javert after breaking parole, agrees to care for a factory worker's daughter. The decision changes their lives forever.",
  },
  {
    id: 9,
    title: 'The Hangover',
    year: '2009',
    runtime: '100',
    genres: ['Comedy'],
    director: 'Todd Phillips',
    actors: 'Bradley Cooper, Ed Helms, Zach Galifianakis, Justin Bartha',
    plot: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
  },

  {
    id: 10,
    title: 'Madagascar: Escape 2 Africa',
    year: '2008',
    runtime: '89',
    genres: ['Animation', 'Action', 'Adventure'],
    director: 'Eric Darnell, Tom McGrath',
    actors: 'Ben Stiller, Chris Rock, David Schwimmer, Jada Pinkett Smith',
    plot: 'The animals try to fly back to New York City, but crash-land on an African wildlife refuge, where Alex is reunited with his parents.',
  },
];

export const getAll = async (req, res) => {
  const { length } = movies;
  res.status(200).json({
    count: length,
    success: true,
    data: movies,
  });
};

export const getOne = async (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  res.status(201).json({
    success: true,
    data: movie,
  });
};

export const createOne = async (req, res, next) => {
  const newMovie = await req.body;
  if (!newMovie.title) {
    next(new exceptionHandler(400, `the movie title field is strong required`));
  } else {
    newMovie.id = v4;
    movies.push(newMovie);
    res.status(201).json({
      success: true,
      message: `Movie with has been successfully created`,
      data: newMovie,
    });
  }
};

export const updateOne = async (req, res, next) => {
  const id = parseInt(req.params.id);
  let movie = movies.find((movie) => movie.id === id);

  if (movie) {
    movie = req.body;
    res.status(201).json({
      success: true,
      data: movie,
    });
  } else {
    next(new exceptionHandler(404, `There was with ${id} found`));
  }
};

export const deleteOne = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    const leftMovies = movies.filter((movie) => movie.id !== id);
    res.status(201).json({
      success: true,
      message: `Movie with ${id} has been successfully deleted`,
      data: leftMovies,
    });
  } else {
    next(new exceptionHandler(404, `There was with ${id} found`));
  }
};