var app = window.app || {};

(function(){
  'use strict';

  var Utils = app.Utils;

  app.Settings = React.createClass({

    getInitialState: function() {
      var plates = Utils.plates();
      var platesStr = plates.map(String).join(',');
      return {
        platesStr: platesStr,
      };
    },

    handlePlateChoicesChange: function(event) {
      var platesStr = event.target.value;
      Utils.savePlatesChoices(platesStr);
      this.setState({
        platesStr: platesStr
      });

    },

    render: function() {
      var platesStr = this.state.platesStr;
      return (
        <div>
          <div className="form-group">
            <label className="control-label">Plate Choices</label>
            <input type="text" className="form-control" style={{fontSize: '16px'}} onChange={this.handlePlateChoicesChange} value={platesStr}/>
          </div>
        </div>
      );
    }
  });

})();