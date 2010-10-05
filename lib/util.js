function ssort(candidates, totals)
{
    for(var i = 0; i < totals.length; ++i)
    {
        for(var j = i+1; j<totals.length; ++j)
        {
            if(totals[j] > totals[i])
            {
                var ts = candidates[j];
                var ti = totals[j];
                candidates[j] = candidates[i];
                totals[j] = totals[i];
                candidates[i] = ts;
                totals[i] = ti;
            }
        }
    }
    return {'c':candidates, 't': totals};
}
function createAction(label){
    $("."+label).live('click',function(){
        $("#"+label).dialog('open');
    });
}
/**
 * Crea los resultados por departamento
 */
function helper(root)
{
    var partial = { 'jojoy' : 0, 'reyes' : 0, 'piedad' : 0}
    stack = [root];
    while(stack.length > 0)
    {
        var actual = stack.pop();
        if(actual.match("^mesa")=="mesa")
        {
            for( i in totales[actual])
                partial[i] += totales[actual][i]
        }
        else
            for( i in totales[actual])
                stack.push(totales[actual][i]);
    }
    return partial;
}