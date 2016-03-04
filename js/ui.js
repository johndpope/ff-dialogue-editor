require('jquery-ui');
require('jquery-contextmenu')

$(document).tooltip();

function add(constructor)
{
	return function()
	{
		var position = $('#cmroot').position();
		var contPos = $('#main-graph').position();
		var container = $('#main-graph')[0];
		var element = new constructor
		({
			position: { x: position.left + container.scrollLeft - contPos.left, y: position.top + container.scrollTop - contPos.top }
		});
		graph.addCells([element]);
	};
}

$('#main-graph').contextmenu(
{
	width: 150,
	items:
	[
		{ text: 'Node', alias: '1-1', action: add(joint.shapes.dialogue.Node) }
	]
});