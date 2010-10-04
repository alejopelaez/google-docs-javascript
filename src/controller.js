candidatos = { "jojoy" : 0, "piedad" : 0, "reyes" : 0 };
totales = {};
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
         * Función llamada cuando se terminan todos los
         * requests.
         */
        $("#key").ajaxStop(function(){
            view.show("Done!!");
            view.showCandidatos(candidatos);
            view.showTable("colombia",0,"");
	    antioquia = helper("antioquia");
	    view.crearPie(antioquia, "antioquia");
	    valle = helper("valle del cauca");
	    view.crearPie(valle, "valle");
	    cundinamarca = helper("cundinamarca");
	    view.crearPie(cundinamarca, "cundinamarca");
            //console.log(this.regionSummary("colombia", 0 , ""));
        });

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
		//console.log(data);
		var prune = info['recursive'];
		if(prune)
		    var parent = data[0][1].toLowerCase();
		else
		    var parent = 'mesa ' + data[0][1];
		var whitespace = false;
		if(totales[parent] == undefined){
		    if(prune)
			totales[parent] = [];
		    else
			totales[parent] = {};
		}
		for(i in data){
                    if(data[i][1] == null || data[i][1] == "")
			whitespace = true;
		    if( data[i][1] !== "" && data[i][1] != null && whitespace)
		    {
			if(prune)
			{
			    totales[parent].push(data[i][0].toLowerCase());
			    model.getAll(data[i][1]);
			}
			else 
			{
			    totales[parent][data[i][0].toLowerCase()] = data[i][1];
			    candidatos[data[i][0].toLowerCase()] += data[i][1];
			    //console.log(data);
			}

                    }
                }
            }
        });
        model.addListener(mlist);
    }
});