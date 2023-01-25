import exceptionHandler from '../../utils/exceptions/exceptionHandler';
import Genres from '../../models/genresModel';

export const getAllGenres = async (req, res) => {
  const genres = await Genres.find();
  res.status(200).json({
    count: genres.length,
    success: true,
    data: genres,
  });
};

export const getOneGenreById = async (req, res) => {
  const { Id } = req.params;
  const genre = await Genres.findOne({ _id: Id }).populate('Movies');
  res.status(201).json({
    success: true,
    data: genre,
  });
};

export const getOneGenreByName = async (req, res, next) => {
  const { Name } = req.params;
  const genre = await Genres.findOne({ Name: Name });
  if (!genre) {
    next(new exceptionHandler(404, `There was no genre with ${Name} found`));
  } else {
    res.status(201).json({
      success: true,
      data: genre,
    });
  }
};

export const createOneGenre = async (req, res, next) => {
  const newgenre = await req.body;
  if (!newgenre.Name) {
    next(new exceptionHandler(400, `the genre Name field is strong required`));
  } else {
    newgenre.id = v4;
    genres.push(newgenre);
    res.status(201).json({
      success: true,
      message: `genre with has been successfully created`,
      data: newgenre,
    });
  }
};

export const updateOneGenre = async (req, res, next) => {
  const id = parseInt(req.params.id);
  let genre = Genres.find((genre) => genre.id === id);

  if (genre) {
    genre = req.body;
    res.status(201).json({
      success: true,
      data: genre,
    });
  } else {
    next(new exceptionHandler(404, `There was with ${id} found`));
  }
};

export const deleteOneGenre = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const genre = genres.find((genre) => genre.id === id);
  if (genre) {
    const leftgenres = genres.filter((genre) => genre.id !== id);
    res.status(201).json({
      success: true,
      message: `genre with ${id} has been successfully deleted`,
      data: leftgenres,
    });
  } else {
    next(new exceptionHandler(404, `There was with ${id} found`));
  }
};
