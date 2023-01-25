import Collection from '../../models/collectionModel';

export const getCollection = async (req, res) => {
  const collections = await Collection.find({});
  res.render('documentation', { collections });
};

export const index = (req, res) => {
  res.render('index');
};

export const createCollection = async (req, res) => {
  const { collection, description, GET, POST, PUT, DELETE } = req.body;

  let newCollection = {
    Collection: collection,
    Description: description,
    MethodGET: {
      Name: GET.name,
      Url: GET.url,
      Description: GET.description,
    },
    MethodPOST: {
      Name: POST.name,
      Url: POST.url,
      Description: POST.description,
    },
    MethodPUT: {
      Name: PUT.name,
      Url: PUT.url,
      Description: PUT.description,
    },
    MethodDELETE: {
      Name: DELETE.name,
      Url: DELETE.url,
      Description: DELETE.description,
    },
  };
  const collections = new Collection(newCollection);
  await collections.save();
  res.redirect(`documentation`);
};

export const showCollection = async (req, res) => {
  const { id } = req.params;
  const collection = await Collection.findById(id);
  res.render(show, { collection });
};
export const formCollection = (req, res) => {
  res.render('create');
};
export const editOne = (req, res) => {
  res.render('edit');
};
