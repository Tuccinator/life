Life.IdeaController = Ember.ObjectController.extend({
	actions: {
		removeIdea: function() {
			var idea = this.get('model');
			idea.deleteRecord();
			idea.save();
		}
	}
});