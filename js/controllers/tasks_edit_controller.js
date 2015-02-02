Life.TasksEditController = Ember.ObjectController.extend({
	actions: {
		editTask: function() {
			var task = this.get('model');
			task.save();
			this.transitionToRoute('home');
		}
	}
});