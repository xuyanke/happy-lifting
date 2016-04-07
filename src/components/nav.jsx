/*global React */
/*global Link */

var app = window.app || {};

(function() {
  'use strict';

  app.Navbar = React.createClass({
    render: function() {

      var programs = app.PROGRAMS.map(function(program, i) {
        return (
          <li key={i}><Link to={program.link} data-toggle="collapse" data-target="#navbar-main"> {program.name} </Link></li>
        );
      });

      return (
        <div className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a href="#" className="navbar-brand"> Happy Lifting </a>
              <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>            
            </div>
            <div className="navbar-collapse collapse" id="navbar-main">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#" id="program">Programs <span className="caret"></span></a>
                  <ul className="dropdown-menu" aria-labelledby="program">
                    {programs}
                  </ul>
                </li>
                <li>
                  <Link to="settings" data-toggle="collapse" data-target="#navbar-main"> Settings </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  });
})();
