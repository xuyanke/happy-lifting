var app = window.app || {};

(function(){
  'use strict';

  var Workout = app.Workout;
  var Utils = app.Utils;

  app.Exercises = React.createClass({

    getInitialState: function() {
      var exercise = Utils.store('selectedExercise');
      return {
        selected: exercise
      };
    },

    handleSelect: function(event) {
      var exercise = event.target.name;
      this.setState({selected: exercise});
      Utils.store('selectedExercise', exercise);
    },

    handleGoBack: function(event) {
      this.setState({
        selected: ''
      });
    },

    render: function() {
      var that = this;
      var exercises = this.props.exercises;
      var selected = this.state.selected;
      var toRender;
      if (selected && selected.length > 1) {
        var selectedExercise = $.grep(exercises, function(e) {
          return e.name === selected;
        })[0];
        toRender = <Workout exercise={selectedExercise} handleGoBack={this.handleGoBack} />
      } else {
        var exerciseList = exercises.map(function(exercise, i) {
          return (
            <a key={i} className="list-group-item" onClick={that.handleSelect} name={exercise.name}> {exercise.name} </a>
          );
        });
        toRender = (
          <div className="row vcenter">
            <div className="col-lg-3 col-md-3 col-sm-4">
              <div className="list-group table-of-contents">
                {exerciseList}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div>
          {toRender}
        </div>
      );
    }
  });

})();