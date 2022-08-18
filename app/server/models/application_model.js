const {
  Model
} = require("sequelize");

class ApplicationModel extends Model {
  constuctor () {
  }

  getData () {
    const associations = this.constructor.associations

    const data = this.toJSON()

    if (this.attributesFilter) {
      this.attributesFilter.forEach((attr) => {
        // data[attr] = '[FILTERED]'
        delete data[attr]
      })
    }

    for (const prop in associations) {
      if (this[prop]) {
        if (this[prop].constructor.name === 'Array') {
          data[prop] = this[prop].map((o) => o.getData())
        } else {
          data[prop] = this[prop].getData()
        }
      }
    }

    return data
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
