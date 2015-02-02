Life.TaskController = Ember.ObjectController.extend({
	actions: {
		deleteTask: function() {
			var task = this.get('model');
			task.deleteRecord();
			task.save();
		},

		editTask: function() {
			console.log('hi');
		},

		startTask: function() {
			var task = this.get('model');
			task.set('started', moment().format('YYYY-MM-DD H:m:s'));
			task.save();
		},

		completeTask: function() {
			var task = this.get('model');
			task.set('completed', moment().format('YYYY-MM-DD H:m:s'));
			task.save();
		}
	}
});