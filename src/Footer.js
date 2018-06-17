import { Component } from 'inferno';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="container">
          <p>Website by <a href='https://amp.studio' target='_blank'>AMP Studio</a></p>
          {this.props.loggedIn ?
            <div className="Footer--login" onClick={() => this.props.logOut()}>Log out</div> :
            <div className="Footer--login" onClick={() => this.props.setModal('login')}>Log in</div>
          }
        </div>
      </div>
    );
  }
}

export default Footer;