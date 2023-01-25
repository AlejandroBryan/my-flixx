import exceptionHandler from '../../utils/exceptions/exceptionHandler';
import Users from '../../models/usersModel';

export const getAllUsers = async (req, res) => {
  const users = await Users.find({})
    .populate([{ path: 'FavoriteMovies', strictPopulate: false }])
    .exec();
  res.status(200).json({
    count: users.length,
    success: true,
    data: users,
  });
};

export const registerUsers = async (req, res, next) => {
  const { FirstName, LastName, UserName, Password, Email, Birthday } = req.body;

  if (!Email && !UserName && !FirstName && !LastName && !Password && Birthday) {
    next(new exceptionHandler(400, `Please enter all required fields`));
  }

  const newUser = {
    FirstName,
    LastName,
    UserName,
    Password,
    Email,
    Birthday,
  };

  const user = await Users.findOne({ Email: Email });

  if (!user) {
    const users = new Users(newUser);
    await users.save();
    res.status(200).json({
      success: true,
      message: `Successfully registered`,
      user: users,
    });
  } else {
    next(new exceptionHandler(400, `Users with email: ${Email} or username: ${UserName} already been registered`));
  }
};

export const getOneUserById = async (req, res) => {
  const user = await Users.findById(req.params.Id).populate([
    { path: 'Movies', select: 'movies', strictPopulate: false },
  ]);
  res.status(201).json({
    success: true,
    data: user,
  });
};

export const getOneUser = async (req, res) => {
  const { Id } = req.params;
  const { Username } = req.params;
  const user = await Users.find({ $or: [{ _id: Id }, { Username: Username }] }).populate([
    { path: 'FavoriteMovies', select: 'Movies' },
  ]);
  res.status(201).json({
    success: true,
    data: user,
  });
};

export const getOneUserByName = async (req, res, next) => {
  const { Username } = req.params;
  const user = await Users.findOne({ UserName: Username }).populate([
    { path: 'FavoriteMovies', strictPopulate: false },
  ]);
  if (user) {
    res.status(201).json({
      success: true,
      data: user,
    });
  } else {
    next(new exceptionHandler(404, `There was not user ${Username} found`));
  }
};

export const updateOneUser = async (req, res, next) => {
  const { Username } = req.params;
  const { FirstName, LastName, UserName, Password, Email, Birthday } = req.body;
  const body = {
    FirstName,
    LastName,
    UserName,
    Password,
    Email,
    Birthday,
  };
  const filterUser = { UserName: Username };
  let user = await Users.findOneAndUpdate(filterUser, body, { new: true });

  if (user) {
    res.status(201).json({
      success: true,
      data: user,
    });
  } else {
    next(new exceptionHandler(404, `There was not user with name: ${Username} found`));
  }
};

export const updateUserMovies = async (req, res, next) => {
  const { MovieId, Username } = req.params;
  const body = {
    FavoriteMovies: MovieId,
  };
  const filterUser = { UserName: Username };
  let user = await Users.findOneAndUpdate(filterUser, { $push: body }, { new: true }).populate('FavoriteMovies');

  if (user) {
    res.status(201).json({
      message: 'Movie was successfully updated',
      success: true,
      data: user,
    });
  } else {
    next(new exceptionHandler(404, `There was not movie with name: ${Username} found`));
  }
};

export const deleteUserMovies = async (req, res, next) => {
  const { MovieId, Username } = req.params;
  const body = { FavoriteMovies: MovieId };
  const filter = { UserName: Username };

  let user = await Users.findOneAndUpdate(filter, { $pull: body }, { new: true });

  if (user) {
    res.status(201).json({
      success: true,
      message: 'User favorite movies was successfully deleted',
      data: user,
    });
  } else {
    next(new exceptionHandler(404, `There was no user with name: ${Username} found`));
  }
};
export const deleteOneUser = async (req, res, next) => {
  const { Username } = req.params;
  const user = await Users.findOneAndRemove({ UserName: Username });
  if (user) {
    res.status(201).json({
      success: true,
      message: `User with ${Username} has been successfully deleted`,
      data: user,
    });
  } else {
    next(new exceptionHandler(404, `There was not user with name ${Username} found`));
  }
};
