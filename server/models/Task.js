const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      immutable: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: '{VALUE} is not a valid priority level'
      },
      default: 'medium'
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function(value) {
          if (this.isNew && value) {
            return value >= new Date().setHours(0, 0, 0, 0);
          }
          return true;
        },
        message: 'Due date cannot be in the past'
      }
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

taskSchema.index({ userId: 1, completed: 1, dueDate: 1 });
taskSchema.index({ userId: 1, priority: 1 });

taskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.completed) {
    return false;
  }
  return new Date() > this.dueDate;
});

taskSchema.pre('save', function(next) {
  next();
});

taskSchema.methods.toggleComplete = function() {
  this.completed = !this.completed;
  return this.save();
};

taskSchema.statics.findOverdue = function() {
  return this.find({
    dueDate: { $lt: new Date() },
    completed: false
  });
};

taskSchema.statics.findByPriority = function(priority) {
  return this.find({ priority }).sort({ dueDate: 1 });
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
