const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
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
          // Optional: Validate that due date is not in the past (only for new tasks)
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
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster queries on commonly used fields
taskSchema.index({ completed: 1, dueDate: 1 });
taskSchema.index({ priority: 1 });

// Virtual property to check if task is overdue
taskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.completed) {
    return false;
  }
  return new Date() > this.dueDate;
});

// Pre-save middleware example (optional)
taskSchema.pre('save', function(next) {
  // You can add custom logic before saving
  // For example, auto-complete if due date is far in past
  next();
});

// Instance method to toggle completion status
taskSchema.methods.toggleComplete = function() {
  this.completed = !this.completed;
  return this.save();
};

// Static method to find overdue tasks
taskSchema.statics.findOverdue = function() {
  return this.find({
    dueDate: { $lt: new Date() },
    completed: false
  });
};

// Static method to find tasks by priority
taskSchema.statics.findByPriority = function(priority) {
  return this.find({ priority }).sort({ dueDate: 1 });
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

