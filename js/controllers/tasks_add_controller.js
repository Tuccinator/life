Life.TasksAddController = Ember.ObjectController.extend({
	actions: {
		addTask: function() {
			var name = this.get('name');
			var shortDescription = this.get('shortDescription');
			var longDescription = this.get('longDescription');
			var daySelect = this.get('day.day');
			var day;

			if(daySelect == "Today") {
				day = moment().format('YYYY-MM-DD H:m:s');
			} else {
				day = moment().add(1, 'days').format('YYYY-MM-DD H:m:s');
			}

			var task = this.store.createRecord('task', {
				name: name,
				shortDescription: shortDescription,
				longDescription: longDescription,
				day: day
			});

			task.save();

			this.set('name', '');
			this.set('shortDescription', '');
			this.set('longDescription', '');
			
			this.transitionToRoute('home');
		}
	},

	days: [
		{day: "Tomorrow", id: 1},
		{day: "Today", id: 2}
	]
});