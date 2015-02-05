Life.IdeasAddController = Ember.ObjectController.extend({
	actions: {
		addIdea: function() {
			var title = this.get('title');
			var body = this.get('body');

			var idea = this.store.createRecord('idea', {
				title: title,
				body: body
			});

			idea.save();

			this.set('title', '');
			this.set('body', '');

			this.transitionToRoute('ideas');
		}
	}
});