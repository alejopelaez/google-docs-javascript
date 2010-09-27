jQuery.extend({
    Controller: function(model, view){
	/**
	 * Escucha a la vista
	 */
	var vlistener = $.ViewListener({
	    viewLoadData : function(){
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
	    modelLoadData : function(){
		view.show("Cargar datos del modelo");
	    }
	});
	model.addListener(mlist);
    }    
});