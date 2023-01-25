import exceptionHandler from '../../utils/exceptions/exceptionHandler';
import Directors from '../../models/directorsModel';

export const getAllDirectors = async (req, res) => {
  const directors = await Directors.find();
  res.status(200).json({
    count: directors.length,
    success: true,
    data: directors,
  });
};

export const getOneDirectorByName = async (req, res, next) => {
  const { Name } = req.params;
  const name = await Directors.findOne({ Name: Name });
  if (!name) {
    next(new exceptionHandler(404, `There was no director with name: ${Name} found`));
  } else {
    res.status(201).json({
      success: true,
      data: name,
    });
  }
};

export const getOneDirectorById = async (req, res, next) => {
  const { Id } = req.params;
  const director = await Directors.findById({ _id: Id });
  if (!director) {
    next(new exceptionHandler(404, `There was no director with id: ${Id} found`));
  } else {
    res.status(201).json({
      success: true,
      data: director,
    });
  }
};

export const createOneDirector = async (req, res, next) => {
  const newgenre = await req.body;
  if (!newgenre.Name) {
    next(new exceptionHandler(400, `the genre Name field is strong required`));
  } else {
    newgenre.id = v4;
    Directors.push(newgenre);
    res.status(201).json({
      success: true,
      message: `genre with has been successfully created`,
      data: newgenre,
    });
  }
};

export const updateOneDirector = async (req, res, next) => {
  const id = parseInt(req.params.id);
  let genre = Directors.find((genre) => genre.id === id);

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

export const deleteOneDirector = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const genre = Directors.find((genre) => genre.id === id);
  if (genre) {
    const leftDirectors = Directors.filter((genre) => genre.id !== id);
    res.status(201).json({
      success: true,
      message: `genre with ${id} has been successfully deleted`,
      data: leftDirectors,
    });
  } else {
    next(new exceptionHandler(404, `There was with ${id} found`));
  }
};
