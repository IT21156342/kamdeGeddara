const sstgModel = require("../models/sstgModel");

//add new sstg
const addSSTG = async (req, res) => {
  const {
    sstgID,
    firstName,
    lastName,
    NIC,
    gender,
    email,
    mobile,
    address,
    area,
    dob,
  } = req.body;

  const result = await sstgModel.find();
  const sstgCount = result.length;

  //generate new custom id for item
  const autoGenerateSSTGId = `SSTG${sstgCount + 1}`;

  const mongooseRes = new sstgModel({
    sstgID: autoGenerateSSTGId,
    firstName,
    lastName,
    NIC,
    gender,
    email,
    mobile,
    address,
    area,
    dob,
  });

  mongooseRes.save().then((result) => {
    res.status(200).json({
      message: "SSTG added successfully",
      result: {
        data: result,
        response: true,
      },
    });
  });
};

// Read all sstg in the system
const getAllsstg = async (req, res) => {
  let results = await sstgModel.find();
  if (!results) {
    res.status(500).json({
      message: "Error while getting all sstg",
      error: "Something went wrong",
    });
  } else {
    res.status(200).json({
      message: "All sstg details",
      data: results,
    });
  }
};

// update sstg details
const updateSSTG = async (req, res) => {
  const {
    sstgID,
    firstName,
    lastName,
    NIC,
    gender,
    email,
    mobile,
    address,
    area,
    dob,
  } = req.body;
  try {
    const result = await sstgModel.findOneAndUpdate(
      { sstgID: sstgID },
      {
        sstgID,
        firstName,
        lastName,
        NIC,
        gender,
        email,
        mobile,
        address,
        area,
        dob,
      }
    );
    res
      .status(200)
      .send({ message: "SSTG updated successfully", data: result });
  } catch (e) {
    res.status(500).send({ message: "Something went wrong", error: e });
  }
};

//delete sstg
const deleteSSTG = async (req, res) => {
  const response = await sstgModel.findByIdAndDelete(req.params.id);
  if (!response) {
    res.status(500).send(err);
  } else {
    res.status(200).json({
      message: "SSTG Deleted successfully",
      result: {
        data: response,
        response: true,
      },
    });
  }
};

// search ssg
const getSSTGByID = async (req, res) => {
  const response = await sstgModel.findOne({ sstgID: req.params.id });
  if (!response) {
    res.status(500).send(err);
  } else {
    res.status(200).json({
      result: {
        data: response,
        response: true,
      },
    });
  }
};

module.exports = {
  addSSTG,
  getAllsstg,
  updateSSTG,
  deleteSSTG,
  getSSTGByID,
};
