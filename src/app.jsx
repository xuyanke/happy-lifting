/*global React */
/*global ReactDom */
/*global Router */
/*global Route */
/*global IndexRedirect */
/*global broswerHistory */


var app = window.app || {};

(function() {
  'use strict';

  var Navbar = app.Navbar;
  var Program = app.Program;
  var Settings = app.Settings;

  var WarmupApp = React.createClass({
    render: function() {
      var navbar;
      var programs;

      navbar = <Navbar />;

      return (
        <div>
          {navbar}
          <div className="container">
            {this.props.children}
          </div>
        </div>
      );
    }
  });

  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={WarmupApp}>
        <IndexRedirect to="/programs/3x5" />
        <Route path="programs/:program" component={Program}/>
        <Route path="settings" component={Settings}/>
      </Route>
    </Router>,
    document.getElementById('warmupapp'));
})();
