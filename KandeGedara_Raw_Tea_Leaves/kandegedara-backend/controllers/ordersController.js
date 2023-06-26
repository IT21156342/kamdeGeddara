const orderModel = require('../models/oders');
const { getAllVitamins } = require('./vitaminsController');

//add order

const addOrder = async (req, res) => {
  //get count of orders

  const result = await orderModel.find();
  const orderCount = result.length;

  const orderID = 'ORD' + orderCount + 1;

  const {
    id,
    name,
    sstg_id,
    mobile,
    item,
    quantity,
    price,
    description,
    payment,
    delivery,
    status,
  } = req.body;

  const newOrder = new orderModel({
    id: orderID,
    name,
    sstg_id,
    mobile,
    item,
    quantity,
    price,
    description,
    payment,
    delivery,
    status: 'pending',
  });

  console.log(newOrder);

  newOrder
    .save()
    .then(() => {
      res.json({
        message: 'order added',
        data: newOrder,
        status: 'success',
        code: 200,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: 'error with adding order', error: err.message });
    });
};

//get order details

const getAllOrder = (req, res) => {
  orderModel
    .find()
    .then((orderModel) => {
      res.json(orderModel);
    })
    .catch((err) => {
      console.log(err);
    });
};

//update order details
const updateOrder = async (req, res) => {
  let orderID = req.params.id;
  const {
    id,
    name,
    sstg_id,
    mobile,
    item,
    quantity,
    price,
    description,
    payment,
    delivery,
    status,
  } = req.body;

  const updateOrder = {
    id,
    name,
    sstg_id,
    mobile,
    item,
    quantity,
    price,
    description,
    payment,
    delivery,
    status,
  };

  const update = await orderModel
    .findByIdAndUpdate(orderID, updateOrder)
    .then(() => {
      res.json({
        message: 'order updated',
        data: updateOrder,
        status: 'success',
        code: 200,
      });
    });
};

//delete order details
const deleteOrder = async (req, res) => {
  let orderID = req.params.id;

  await orderModel
    .findByIdAndDelete(orderID)
    .then(() => {
      res.json({
        message: 'order deleted',
        status: 'success',
        code: 200,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: 'error with deleting order', error: err.message });
    });
};

//get order details by id(search with id function )

const getOrderByID = async (req, res) => {
  let orderID = req.params.id;

  const order = await orderModel.findOne({ id: orderID }).then((order) => {
    res.json({
      message: 'order details',
      data: order,
      status: 'success',
      code: 200,
    });
  });
};

module.exports = {
  addOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getOrderByID,
};
