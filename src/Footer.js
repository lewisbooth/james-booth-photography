import { Component } from 'inferno';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="container">
          <p>Website by <a href='https://amp.studio' target='_blank'>AMP Studio</a></p>
          <p>Log in</p>
        </div>
      </div>
    );
  }
}

export default Footer;