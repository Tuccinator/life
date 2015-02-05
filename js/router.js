Life.Router.map(function() {
	this.resource('home', { path: '/' });
	this.resource('tasks', { path: 'tasks/' }, function() {
		this.route('create');
		this.route('add');
		this.route('edit', { path: 'edit/:task_id' });
	});
	this.resource('ideas', { path: 'ideas/' }, function() {
		this.route('add');
		this.route('view', { path: 'view/:idea_id' });
		this.route('edit', { path: 'edit/:idea_id' });
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

/*
	Ideas Routing
 */
Life.IdeasRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('idea');
	}
});

Life.IdeasIndexRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('ideas');
	}
});

Life.IdeasAddRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('ideas');
	}
});

Life.IdeasViewRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('idea', params.idea_id);
	}
});

Life.IdeasEditRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('idea', params.idea_id);
	}
});