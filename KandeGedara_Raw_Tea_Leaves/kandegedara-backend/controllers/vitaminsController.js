const vitaminModel = require('../models/vitamins');

//add vitamin

const addVitamin = async (req, res) => {
  const result = await vitaminModel.find();
  const vitaminCount = result.length;

  const vitaminID = 'VIT' + vitaminCount + 1;

  const { type, image, name, quantity, amuont, description } = req.body;

  const newVitamin = new vitaminModel({
    vitaminsId: vitaminID,
    type,
    image,
    name,
    quantity,
    amuont,
    description,
  });

  newVitamin
    .save()
    .then(() => {
      res.json('vitamin Added');
    })
    .catch((err) => {
      console.log(err);
      console.log('error while adding vitamin details');
    });
};

//get vitamin details
const getAllVitamins = (req, res) => {
  vitaminModel
    .find()
    .then((vitaminModel) => {
      res.json(vitaminModel);
    })
    .catch((err) => {
      console.log(err);
    });
};

//update vitamin details
const updateVitamin = async (req, res) => {
  let userId = req.params.id;
  const { vitaminsId, type, image, name, quantity, amuont, description } =
    req.body;

  const updateVitamin = {
    vitaminsId,
    type,
    image,
    name,
    quantity,
    amuont,
    description,
  };

  const update = await vitaminModel
    .findByIdAndUpdate(userId, updateVitamin)
    .then(() => {
      res.status(200).send({ status: 'user updated' });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: 'error with updating date', error: err.message });
    });
};

//delete vitamin details

const deleteVitamin = async (req, res) => {
  let userId = req.params.id;

  await vitaminModel
    .findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: 'vitamin deleted' });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: ' Error with delete vitamin', error: err.message });
    });
};

//get vitamin details

const getVitaminByID = async (req, res) => {
  let userId = req.params.id;
  const user = await vitaminModel
    .findOne({ vitaminsId: userId })
    .then((vitaminModel) => {
      res.status(200).send({ status: 'user fetched', data: vitaminModel });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: 'Error with get user', error: err.message });
    });
};

module.exports = {
  addVitamin,
  getAllVitamins,
  updateVitamin,
  deleteVitamin,
  getVitaminByID,
};
