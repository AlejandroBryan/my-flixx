import exceptionHandler from '../../utils/exceptions/exceptionHandler';
import Movies from '../../models/moviesModel';
import Genres from '../../models/genresModel';

export const getAllMovies = async (req, res) => {
  console.log(req.params.token);
  const movies = await Movies.find().populate({ path: 'Genres', select: 'Name' });
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
  const { Title } = req.params;
  const movie = await Movies.findOne({ Title: Title }).populate({ path: 'Genres', select: 'Name' });
  if (!movie) {
    next(new exceptionHandler(404, `There was no movie with title: ${Title} found`));
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
  if (!body.Title) {
    next(new exceptionHandler(400, `the movie title field is strong required`));
  } else {
    const movies = new Movies(body);
    await movies.save();
    res.status(201).json({
      success: true,
      message: `Movie with has been successfully created`,
      data: movies,
    });
  }
};

export const updateOneMovie = async (req, res, next) => {
  const title = req.params.Title;
  const { Title, Description, Released_year, Runtime, Genres, Director, Actors, ImagePath, Featured } = req.body;
  const body = {
    Title,
    Description,
    Released_year,
    Runtime,
    Genres,
    Director,
    Actors,
    ImagePath,
    Featured,
  };
  const filterMovie = { Title: Title };
  const movie = await Movies.findOneAndUpdate(filterMovie, body, { new: true });
  if (!movie) {
    next(new exceptionHandler(404, `There was no movie with title: ${Title} found`));
  } else {
    res.status(201).json({
      success: true,
      data: movie,
    });
  }
};

export const updateGenreMovie = async (req, res, next) => {
  const genre = await Genres.findOne({ Name: req.params.Genres });
  const title = req.params.Title;
  const exitingGenres = await Movies.findOne({ Genres: genre._id });
  if (exitingGenres) {
    next(new exceptionHandler(404, 'Category already exists'));
    return;
  }
  const body = { Genres: genre._id };
  const filterMovie = { Title: title };
  const movie = await Movies.findOneAndUpdate(filterMovie, { $push: body }, { new: true });
  if (!movie) {
    next(new exceptionHandler(404, `There was no movie with title: ${title} found`));
  } else {
    res.status(201).json({
      success: true,
      data: movie,
    });
  }
};

export const deleteOneMovie = async (req, res, next) => {
  const { Title } = req.params;

  const movie = await Movies.findOneAndRemove({ Title: Title });
  if (movie) {
    res.status(201).json({
      success: true,
      message: `Movie with title ${Title} has been successfully deleted`,
      data: movie,
    });
  } else {
    next(new exceptionHandler(404, `There was with ${id} found`));
  }
};
