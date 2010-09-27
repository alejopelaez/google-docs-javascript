jQuery.extend({
    Controller: function(model, view){
	/**
	 * Escucha a la vista
	 */
	var vlistener = $.ViewListener({
	    dummyView : function{
		var all = model.getAll();
		$.each(all, function(i){
		    view.show(all[i]);
		});
	    }
	});
	view.addListener(vlistener);

	/**
	 * listen to the model
	 */
	var mlist = $.ModelListener({
	    dummyModel : function(){
		view.show("Dummy del modelo");
	    }
	});
	model.addListener(mlist);
    }    
});