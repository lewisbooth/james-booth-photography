import { Component } from 'inferno';

class AdminBar extends Component {
  render() {
    if (!this.props.username) return
    return (
      <div className="AdminBar">
        <div className="container">
          <p>{`Logged in as ${this.props.username}`}</p>
          <div className="AdminBar__buttons">
            <button onClick={() => this.props.setModal('addPhoto')}>
              <img src="/images/icons/picture.svg" alt="Add a new entry" />
              Add photo
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminBar;