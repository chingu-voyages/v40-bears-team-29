const {
  Model
} = require("sequelize");

class ApplicationModel extends Model {
  constuctor () {
  }

  static formatError (err) {
    const formatedErrors = {};
    const errors = err.errors;
    if (!errors) {
      return null;
    }
    const fields = errors.map((e) => e.path);

    fields.forEach((e) => {
      formatedErrors[e] = [];
    });

    errors.forEach((e) => {
      formatedErrors[e.path].push({ message: e.message });
    });

    if (formatedErrors.length === 0) {
      return null;
    }

    return { errors: formatedErrors };
  }
}

module.exports = ApplicationModel;
