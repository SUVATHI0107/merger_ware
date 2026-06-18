import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// Define the Tasks collection
Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // Create a reactive variable for the category filter
  Template.body.onCreated(function() {
    this.selectedCategory = new ReactiveVar('All');
  });

  Template.body.helpers({
    tasks() {
      const selectedCategory = Template.instance().selectedCategory.get();
      if (selectedCategory === 'All') {
        return Tasks.find({}, { sort: { order: 1 } });
      } else {
        return Tasks.find({ category: selectedCategory }, { sort: { order: 1 } });
      }
    },
    categories() {
      return ['All', 'Work', 'Personal', 'Urgent'];
    },
    selectedCategory() {
      return Template.instance().selectedCategory.get();
    }
  });

  Template.body.events({
    'submit .new-task'(event) {
      event.preventDefault();
      
      const target = event.target;
      const text = target.text.value;
      const category = target.category.value;
      
      // Get the highest order number
      const highestOrder = Tasks.findOne({}, { sort: { order: -1 } });
      const newOrder = highestOrder ? highestOrder.order + 1 : 1;

      Tasks.insert({
        text,
        category,
        createdAt: new Date(),
        order: newOrder
      });

      target.text.value = '';
    },

    'click .category-filter'(event, instance) {
      instance.selectedCategory.set(event.target.textContent);
    },

    'change .hide-completed input'(event, instance) {
      instance.hideCompleted.set(event.target.checked);
    }
  });

  Template.task.helpers({
    isOwner() {
      return this.owner === Meteor.userId();
    }
  });

  Template.task.events({
    'click .toggle-checked'() {
      Tasks.update(this._id, {
        $set: { checked: !this.checked }
      });
    },
    'click .delete'() {
      Tasks.remove(this._id);
    },
    'dragstart'(event) {
      event.target.classList.add('dragging');
      event.dataTransfer.setData('text/plain', this._id);
    },
    'dragend'(event) {
      event.target.classList.remove('dragging');
    },
    'dragover'(event) {
      event.preventDefault();
    },
    'drop'(event, instance) {
      event.preventDefault();
      const draggedId = event.dataTransfer.getData('text/plain');
      const targetId = this._id;

      if (draggedId !== targetId) {
        const draggedTask = Tasks.findOne(draggedId);
        const targetTask = Tasks.findOne(targetId);

        if (draggedTask && targetTask) {
          // Swap the order values
          Tasks.update(draggedId, { $set: { order: targetTask.order } });
          Tasks.update(targetId, { $set: { order: draggedTask.order } });
        }
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(() => {
    // Code to run on server at startup
  });
}
