jQuery.extend({
    Controller: function(model, view){
        /**
         * Escucha a la vista
         */
        var vlistener = $.ViewListener({
            viewLoadData : function(key){
                var all = model.getAll(key);
            }
        });
        view.addListener(vlistener);

        /**
         * listen to the model
         */
        var mlist = $.ModelListener({
            onLoadBegin : function(){
                view.show("Cargar datos del modelo...");
            },
            onLoadEnd : function(info){
                //extraiga los datos
		var data = info['data'];
		var prune = info['recursive'];
                result = "";
		for(i in data){
                    for(j in data[i]){
			result += data[i][j] + "----";
                    }
		    if(prune)
		    {
			vlistener.viewLoadData(data[i][1]);
		    }
		    result += "<br/>";
		}
                view.show(result);
            }
        });
        model.addListener(mlist);
    }
});