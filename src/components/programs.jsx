var app = window.app || {};

(function(){
  'use strict';

  app.PROGRAMS = [{
    name: 'Starting Strength',
    exercises: [{
      name: 'Squat',
      max: 500,
      workouts: [{
        sets: 2,
        reps: 5,
        multiplier: 0
      }, {
        sets: 1,
        reps: 5,
        multiplier: 0.4
      }, {
        sets : 1,
        reps : 3,
        multiplier : 0.6
      }, {
        sets: 1,
        reps: 2,
        multiplier: 0.8
      }, {
        sets: 3,
        reps: 5,
        multiplier: 1.0
      }]
    }, {
      name: 'Press',
      max: 180,
      workouts: [{
        sets: 2,
        reps: 5,
        multiplier: 0
      }, {
        sets: 1,
        reps: 5,
        multiplier: 0.55
      }, {
        sets: 1,
        reps: 3,
        multiplier: 0.7
      }, {
        sets: 1,
        reps : 2,
        multiplier : 0.85
      }, {
        sets: 3,
        reps: 5,
        multiplier: 1.0
      }]
    }, {
      name: 'Bench Press',
      max: 300,
      workouts: [{
        sets: 2,
        reps: 5,
        multiplier: 0
      }, {
        sets: 1,
        reps: 5,
        multiplier: 0.5
      }, {
        sets: 1,
        reps: 3,
        multiplier: 0.7
      }, {
        sets: 1,
        reps : 2,
        multiplier : 0.9
      }, {
        sets: 3,
        reps: 5,
        multiplier: 1.0
      }]
    }, {
      name: 'Deadlift',
      max: 500,
      workouts: [{
        sets: 2,
        reps: 5,
        multiplier: 0.4
      }, {
        sets: 1,
        reps: 3,
        multiplier: 0.6
      }, {
        sets: 1,
        reps: 2,
        multiplier: 0.85
      }, {
        sets: 1,
        reps: 5,
        multiplier: 1.0
      }]
    }],
    link: 'programs/3x5',
    id: '3x5'
  }];

  app.MIN_WEIGHT = 45;

  var Exercises = app.Exercises;

  app.Program = React.createClass({
    render: function() {
      var programId = this.props.params.program;
      var program = $.grep(app.PROGRAMS, function(e) {
        return e.id === programId;
      })[0];

      return (
        <div>
          <div className="col-lg-8 col-md-7 col-sm-6">
            <h1> {program.name} </h1>
          </div>
          <Exercises exercises={program.exercises} />
        </div>
      );
    }
  });

})();