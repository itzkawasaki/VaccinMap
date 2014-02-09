
		var ViewModel = function(first, last) {
		    this.firstName = ko.observable(first);
		    this.lastName = ko.observable(last);

		    this.fullName = ko.computed(function() {
		        return this.firstName() + " " + this.lastName();
		    }, this);
		};

		ko.applyBindings(new ViewModel("有馬医院", "Earth")); // This makes Knockout get to work
