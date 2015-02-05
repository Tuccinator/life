Life.HomeController = Ember.ArrayController.extend({
	today: function() {
		var todayTasks = this.filter(function(task) {
			var current = moment().format('M D YY');
			var taskDate = moment(task.get('day')).format('M D YY');

			return taskDate === current || (task.get('completed') === null && taskDate < current) == true;
		});
		return todayTasks;
	}.property('@each.day'),

	tomorrow: function() {
		var tomorrowTasks = this.filter(function(task) {
			var current = moment().add(1, 'days').format('M D YY');
			var taskDate = moment(task.get('day')).format('M D YY');

			return taskDate === current;
		});
		return tomorrowTasks;
	}.property('@each.day')
});