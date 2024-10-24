import React from 'react';
// import './sidebarV2.css'; // Assuming you have SCSS for styling

const Menu = () => {
  return (
    <div className="menu-container">
      <nav>
        <ul className="menu-list">
          <li>
            <a href="">
              <i className="fa fa-home"></i>
              <strong>Home</strong>
              <small>sweet home</small>
            </a>
          </li>
          <li>
            <a href="" className="active">
              <i className="fa fa-edit"></i>
              <strong>About us</strong>
              <small>sweet home</small>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa fa-gift"></i>
              <strong>Features</strong>
              <small>sweet home</small>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa fa-globe"></i>
              <strong>News</strong>
              <small>sweet home</small>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa fa-comments-o"></i>
              <strong>Blog</strong>
              <small>what they say</small>
            </a>
            <ul>
              <li><a href="#"><i className="fa fa-globe"></i>Mission</a></li>
              <li>
                <a href="#"><i className="fa fa-group"></i>Our Team</a>
                <ul>
                  <li><a href="#"><i className="fa fa-female"></i>Leyla Sparks</a></li>
                  <li>
                    <a href="#"><i className="fa fa-male"></i>Gleb Ismailov</a>
                    <ul>
                      <li><a href="#"><i className="fa fa-leaf"></i>About</a></li>
                      <li><a href="#"><i className="fa fa-tasks"></i>Skills</a></li>
                    </ul>
                  </li>
                  <li><a href="#"><i className="fa fa-female"></i>Viktoria Gibbers</a></li>
                </ul>
              </li>
              <li><a href="#"><i className="fa fa-trophy"></i>Rewards</a></li>
              <li><a href="#"><i className="fa fa-certificate"></i>Certificates</a></li>
            </ul>
          </li>
          <li>
            <a href="">
              <i className="fa fa-picture-o"></i>
              <strong>Portfolio</strong>
              <small>sweet home</small>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa fa-envelope-o"></i>
              <strong>Contacts</strong>
              <small>drop a line</small>
            </a>
          </li>
          <li className="menu-float">
            <a className="menu-search">
              <input type="text" defaultValue="search ..." />
              <button><i className="fa fa-search"></i></button>
            </a>
            <a href="" className="menu-search-mobile">
              <i className="fa fa-search"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
