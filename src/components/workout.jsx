var app = window.app || {};

(function(){
  'use strict';

  var Utils = app.Utils;

  var WorkoutTimer = app.WorkoutTimer;

  app.Workout = React.createClass({

    getInitialState: function() {
      var weight = localStorage.getItem('targetWeight' + this.props.exercise.name) || app.MIN_WEIGHT;
      return {
        weight: weight,
      };
    },

    handleWeightChange: function(event) {
      this.setState({
        weight: event.target.value, 
        updateBar: false
      });
    },

    handleGoBack: function(event) {
      Utils.store('selectedExercise', '');
      this.props.handleGoBack(event);
    },

    fillBar: function(event) {
      var weight = this.state.weight;      
      var exercise = this.props.exercise;
      if (weight > exercise.max) {
        weight = exercise.max;
      }
      weight = Utils.roundDown(weight);
      this.setState({weight: weight, updateBar: true});
      localStorage.setItem('targetWeight' + exercise.name, weight);
    },

    render: function() {
      var exercise = this.props.exercise;
      var weight = this.state.weight;
      var workoutList = exercise.workouts.map(function(workout, i) {
        var roundDownWeight = Utils.roundDown(weight * workout.multiplier);
        var plates = Utils.fillBar(roundDownWeight);
        return (
            <a key={i} className="list-group-item"> {workout.sets}x{workout.reps} | {roundDownWeight} lbs ({plates}) </a>
        );
      });

      var marginBottom = {
        marginBottom: '15px'
      };

      var inputFontSize = {
        fontSize: '16px'
      };

      var modalMarginTop = {
        marginTop: (screen.height * 0.3) + ''
      };

      return (
        <div>
          <div className="col-lg-8 col-md-7 col-sm-6">
            <h2> {exercise.name} </h2>
          </div>
          <div className="form-group">
            <label className="control-label">Weight</label>
            <input type="number" className="form-control" id="inputWeight" style={inputFontSize} onChange={this.handleWeightChange} onBlur={this.fillBar} value={weight}/>
          </div>
          <div className="row vcenter">
            <label className="col-lg-2 control-label">Workout</label>
            <div className="col-lg-3 col-md-3 col-sm-4">
              <div className="list-group table-of-contents">
                {workoutList}
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-7 col-sm-6">
            <button type="button" className="btn btn-default" onClick={this.handleGoBack} style={{float: 'left'}}> Go Back </button>
            <button type="button" className="btn btn-default" onClick={this.toggleTimer} style={{float: 'right'}} data-toggle="modal" data-target="#timerModal"> Timer </button>
          </div>
          <div id="timerModal" className="modal fade" data-backdrop="static" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content" style={modalMarginTop}>
                <WorkoutTimer exerciseName={exercise.name.toUpperCase()} shouldShowTimer={Utils.store('shouldShowTimer')} />
              </div>
            </div>
          </div>
         </div>
      );
    }
  });

})();