import { Component } from 'inferno';

class GalleryItem extends Component {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
  }
  handleImageLoaded() {
    this.setState({ loaded: true });
  }
  render() {
    const id = this.props.imageData._id
    const { loggedIn, index } = this.props
    return (
      <div className="Gallery__item">
        {loggedIn ?
          <div className="Gallery__item--admin">
            <button
              onClick={() => this.props.setModal("editPhoto", index)}
              className="Gallery__item--admin--edit">
              Edit
          </button>
            <button
              onClick={() => this.props.setModal("deletePhoto", id)}
              className="Gallery__item--admin--delete">
              × Delete
            </button>
          </div>
          : ""}
        <div
          className="Gallery__item--image--wrapper"
          onClick={() => this.props.setModal("lightbox", index)}>
          {id ?
            <img className={`Gallery__item--image ${this.state.loaded ? "loaded" : ""}`}
              src={`/images/gallery/${id}/thumbnail.jpg`}
              onLoad={() => this.handleImageLoaded()}
              alt="" />
            : ''}
        </div>
      </div>
    );
  }
}

export default GalleryItem;