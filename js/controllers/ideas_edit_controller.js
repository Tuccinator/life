Life.IdeasEditController = Ember.ObjectController.extend({
	actions: {
		editIdea: function() {
			var idea = this.get('model');
			idea.save();
			this.transitionToRoute('ideas.view', idea);
		}
	}
});