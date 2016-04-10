var app = window.app || {};

(function(){
  'use strict';

  var Utils = app.Utils;

  app.WorkoutTimer = React.createClass({

    getInitialState: function() {
      var started = Utils.store('workoutTimerStarted') || false;
      var startTime = Utils.store('workoutTimerStartTime') || Date.now();
      var timerInterval = null;
      if (started) {
        timerInterval = setInterval(this.tick, 1000);
      }
      return {
        started: started,
        startTime: startTime,
        timerInterval: timerInterval,
        shouldShowTimer: this.props.shouldShowTimer,
        elapsedTime: 0
      };
    },

    tick: function() {
      var modal = $('#timerModal');
      if (!modal.hasClass('in') && this.state.shouldShowTimer) {
        modal.modal('show');
      }
      var elapsedTime = Math.floor((Date.now() - this.state.startTime) / 1000) % 3600;
      this.setState({
        elapsedTime: elapsedTime
      });
    },

    handleTimerToggle: function() {
      var started = !this.state.started;
      var startTime = this.state.startTime;
      var timerInterval = this.state.timerInterval;
      if (started) {
        startTime = Date.now();
        Utils.store('workoutTimerStartTime', startTime);
        timerInterval = setInterval(this.tick, 1000);
      } else {
        clearInterval(timerInterval);
        this.state.timerInterval = null;
      }
      Utils.store('workoutTimerStarted', started);
      this.setState({
        started: started,
        startTime: startTime,
        timerInterval: timerInterval
      });
    },

    handleClose: function() {
      $('#timerModal').modal('hide');
      this.setState({
        shouldShowTimer: false
      });
    },

    render: function() {
      var elapsedTime = this.state.elapsedTime;
      var mins = Math.floor(elapsedTime / 60);
      var secs = elapsedTime - mins * 60;
      var displayTime;
      var timerToggleStr = 'Start';
      if (this.state.started) {
        timerToggleStr = 'Stop';
      }
      displayTime = Utils.leftPad(mins, '0', 2);
      displayTime += ':';
      displayTime += Utils.leftPad(secs, '0', 2);
      return (
        <div>
            <div className="modal-header">
              <h4 className="modal-title"> KEEP CALM and {this.props.exerciseName} </h4>
            </div>
            <div className="modal-body">
              <h1 className="text-center"> {displayTime} </h1>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" style={{float: 'left'}} onClick={this.handleTimerToggle}>{timerToggleStr}</button>
              <button type="button" className="btn btn-default" onClick={this.handleClose}>Close</button>
            </div>
        </div>
      );
    }
  });

})();