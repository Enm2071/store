const bcrypt = require('bcrypt');


const generateHash = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

const validatePassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
}

module.exports = {
  generateHash,
  validatePassword
};
