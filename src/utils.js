var app = app || {};

(function () {
  'use strict';

  app.Utils = {
    store: function(namespace, data) {
      if (typeof data  !== 'undefined') {
        return localStorage.setItem(namespace, JSON.stringify(data));
      }
      var store = localStorage.getItem(namespace);
      return store && JSON.parse(store);
    },

    fillBar: function(weight) {
      var plates = this.plates();
      var i;
      var result = 'Bar';
      weight -= this.barWeight();
      weight /= 2;
      while(weight > 0) {
        for (i = 0; i < plates.length; i++) {
          if (weight >= plates[i]) {
            result += ' ';
            result += plates[i];
            weight -= plates[i];
            break;
          }
        }
        if (i == plates.length) {
          break;
        }
      }
      return result;
    },

    roundDown: function(weight) {
      if (weight - (weight % this.stepSize()) < this.barWeight()) {
        return this.barWeight();
      }
      return weight - (weight % this.stepSize());
    },

    stepSize: function() {
      return 5;
    },

    barWeight: function() {
      return 45;
    },

    plates: function() {
      return [45, 35, 25, 10, 5, 2.5];
    },

    leftPad: function(string, pad, length) {
      return (new Array(length+1).join(pad)+string).slice(-length);
    }
  }

})();