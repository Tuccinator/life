Life.Router.map(function() {
	this.resource('home', { path: '/' });
	this.resource('tasks', { path: 'tasks/' }, function() {
		this.route('create');
		this.route('add');
		this.route('edit', { path: 'edit/:task_id' });
		this.route('remove');
	});
});

/*
	Home routing
 */
Life.HomeRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('task');
	}
})

Life.HomeIndexRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('home');
	}
});

/*
	Task routing
 */
Life.TasksRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('task');
	}
});

Life.TasksCreateRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('task');
	}
});

Life.TasksEditRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('task', params.task_id);
	}
});