const Joi = require('joi');

const baseTaskSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100),
  description: Joi.string().allow('').max(500),
  priority: Joi.string().valid('low', 'medium', 'high'),
  dueDate: Joi.date().min('now'),
  completed: Joi.boolean()
});

const createTaskSchema = baseTaskSchema.keys({
  title: baseTaskSchema.extract('title').required(),
  priority: baseTaskSchema.extract('priority').default('medium'),
  completed: baseTaskSchema.extract('completed').default(false)
});


const validateTaskInput = (data, requireAllFields = true) => {
  const schema = requireAllFields ? createTaskSchema : baseTaskSchema;

  return schema.validate(data, { abortEarly: false, stripUnknown: true });
};

module.exports = {
  validateTaskInput
};
