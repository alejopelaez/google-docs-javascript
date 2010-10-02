candidatos = { "jojoy" : 0, "piedad" : 0, "reyes" : 0 };
totales = {};
//toLowerCase()
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
		var whitespace = false;
		for(i in data){
                    if(data[i][1] == null || data[i][1] == "")
			whitespace = true;
		    if( data[i][1] != "" && data[i][1] != null && whitespace)
		    {
			if(prune)
			{
			    model.getAll(data[i][1]);
			}
			else 
			{
			    candidatos[data[i][0].toLowerCase()] += data[i][1];
			}

		    }
		}
                console.log(totales);
		view.showCandidatos(candidatos);
            }
        });
        model.addListener(mlist);
    }
});