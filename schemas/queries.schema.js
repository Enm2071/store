const Joi = require('joi');


const limit = Joi.number().integer().min(1);
const offset = Joi.number().integer().min(0);
const filterBy = Joi.string().valid('price', 'name');
const filterText = Joi.string().min(3);

const querySchema = Joi.object({
  limit,
  offset,
  filterBy,
  filterText,
});


module.exports = {
  querySchema
};
