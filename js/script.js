$(function(){

    var Food = Backbone.Model.extend({
        defaults: {
            title: 'Food',
            price: 1,
            checked: false
        },
        toggle: function() {
            this.set('checked', !this.get('checked'));
        }
    });


    var FoodList = Backbone.Collection.extend({
        model: Food,
        getChecked: function() {
            return this.where({checked:true});
        }
    });

    var foodList = new FoodList([
        new Food({ title: 'hamburger', price: 2}),
        new Food({ title: 'cheeseburger', price: 3}),
        new Food({ title: 'fries', price: 2}),
        new Food({ title: 'onion rings', price: 3})
    ]);

    var FoodView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click': 'toggleFood'
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title') + '<span> $' + this.model.get('price') + '</span>');
            this.$('input').prop('checked', this.model.get('checked'));
            return this;
        },
        toggleFood: function(){
            this.model.toggle();
        }
    });

    var FoodApp = Backbone.View.extend({
        el: $('#main'),
        initialize: function() {
            this.total = $('#total span');
            this.list = $('#food');
            this.listenTo(foodList, 'change', this.render);
            foodList.each(function(food){
                var view = new FoodView({ model: food });
                this.list.append(view.render().el);
            }, this);
        },
        render: function() {
            var total = 0;
            _.each(foodList.getChecked(), function(elem){
                total += elem.get('price');
            });
            this.total.text('$'+total);
            return this;
        }
    });

    new FoodApp();

});