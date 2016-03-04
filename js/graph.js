var graph = new joint.dia.Graph;

joint.shapes.dialogue = {};
joint.shapes.dialogue.Base = joint.shapes.devs.Model.extend
({
	
	defaults: joint.util.deepSupplement
	({
		type: 'dialogue.Base',
		size: { width: 200, height: 64 },
		name: '',
		attrs:
		{
			rect: { stroke: 'none', 'fill-opacity': 0 },
			text: { display: 'none' },
			'.inPorts circle': { magnet: 'passive' },
			'.outPorts circle': { magnet: true }
		}
	},
	joint.shapes.devs.Model.prototype.defaults )
});

joint.shapes.dialogue.BaseView = joint.shapes.devs.ModelView.extend
({
	template:
	[
		'<div class="node">',
		'<span class="label"></span>',
		'<button class="delete">x</button>',
		'<input type="text" class="name" placeholder="Text" />',
		'</div>'
	].join(''),
	
	initialize: function()
	{
		_.bindAll(this, 'updateBox');
		joint.shapes.devs.ModelView.prototype.initialize.apply(this, arguments);
		
		this.$box = $(_.template(this.template)());
		// Prevent paper from handling pointerdown
		this.$box.find('input').on('mousedown click', function(evt) { evt.stopPropagation(); });
		// This is an example of reacting on the input change and storing the input data in the cell model
		this.$box.find('input.name').on('change', _.bind(function(evt)
		{
			this.model.set('name', $(evt.target).val());
		}, this));
		
		this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
		// Update the box position whenever the underlying model changes
		this.model.on('change', this.updateBox, this);
		// Remove the box when the model gets removed from the graph
		this.model.on('remove', this.removeBox, this);
		
		this.updateBox();
	},
	
	render: function()
	{
		joint.shapes.devs.ModelView.prototype.render.apply(this, arguments);
		this.paper.$el.prepend(this.$box);
		this.updateBox();
		return this;
	},
	
	updateBox: function()
	{
		// Set the position and dimension of the box so that it covers the JointJS element
		var bbox = this.model.getBBox();
		// Example of updating the HTML with a data stored in the cell model
		var nameField = this.$box.find('input name');
		if (!nameField.is(':focus'))
			nameField.val(this.model.get('name'));
		var label = this.$box.find('.label');
		var type = this.model.get('type').slice('dialogue.'.length);
		label.text(type);
		label.attr('class', 'label ' + type);
		this.$box.css({ width: bbox.width, height: bbox.height, left: bbox.x, top: bbox.y, transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)' });
	},
	
	removeBox: function(evt)
	{
		this.$box.remove();
	}
});

joint.shapes.dialogue.Node = joint.shapes.devs.Model.extend
({
	defaults: joint.util.deepSupplement
	({
		type: 'dialogue.Node',
		inPorts: ['input'],
		outPorts: ['output'],
		attrs:
		{
			'.outPorts circle': { unlimitedConnections: ['dialogue.Choice'] }
		}
	},
	joint.shapes.dialogue.Base.prototype.defaults)
});
joint.shapes.dialogue.NodeView = joint.shapes.dialogue.BaseView;

var paper = new joint.dia.Paper
({
	el: $('#main-graph'),
	model: graph,
	width: 0,
	height: 0,
	gridSize: 20
});

$(paper.svg).attr('viewBox', '0 0 100 100');
$(paper.svg).attr('preserveAspectRatio', 'xMinYMin meet');
$(paper.svg).addClass('svg-content');
$(paper.svg).removeAttr('width');
$(paper.svg).removeAttr('height');