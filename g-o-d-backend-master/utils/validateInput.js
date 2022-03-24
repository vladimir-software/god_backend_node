import validator from 'validator';

const validateInput = {
 

  /**
   * @method signInInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  signInInput(req, res, next) {
    console.log(req);
    const { email, password } = req.body;
    if (typeof (email) === 'undefined') {
      return res.status(401).json({
        message: 'Email field must not be empty'
      });
    } if (typeof (password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    } 
    return next();
  },

 
};
export default validateInput;
