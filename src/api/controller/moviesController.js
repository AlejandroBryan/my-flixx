import exceptionHandler from '../../utils/exceptions/exceptionHandler';
import Movies from '../../models/moviesModel';

export const getAllMovies = async (req, res) => {
  const movies = await Movies.find();
  res.status(200).json({
    count: movies.length,
    success: true,
    data: movies,
  });
};

export const getOneMovieById = async (req, res) => {
  const { Id } = req.params;
  const movie = await Movies.findOne({ _id: Id });
  res.status(201).json({
    success: true,
    data: movie,
  });
};

export const getOneMovie = async (req, res, next) => {
  const { Title, Directors } = req.params;
  const movie = await Movies.find({ $or: [{ Title: Title }, { 'Director.Name': Directors }] });
  if (!movie) {
    next(new exceptionHandler(404, `There was no movie with ${Title} or ${Directors} found`));
  } else {
    res.status(201).json({
      success: true,
      data: movie,
    });
  }
};

export const getOneMovieByDirectors = async (req, res, next) => {
  const { Directors } = req.params;
  const movie = await Movies.findOne({ 'Director.Name': Directors });
  if (!movie) {
    next(new exceptionHandler(404, `There was no movie with ${Directors} found`));
  } else {
    res.status(201).json({
      success: true,
      data: movie,
    });
  }
};

export const createOneMovie = async (req, res, next) => {
  const body = await req.body;
  if (!newMovie.title) {
    next(new exceptionHandler(400, `the movie title field is strong required`));
  } else {
    const movies = new Movies(body);
    await movies.save();
    res.status(201).json({
      success: true,
      message: `Movie with has been successfully created`,
      data: newMovie,
    });
  }
};

export const updateOneMovie = async (req, res, next) => {
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

export const deleteOneMovie = async (req, res, next) => {
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
