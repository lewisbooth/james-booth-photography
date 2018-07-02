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
  handleDragStart(e) {
    e.dataTransfer.setData("start", this.props.index)
  }
  handleDragOver(e) {
    e.preventDefault()
  }
  handleDrop(e) {
    e.preventDefault()
    if (!this.props.loggedIn)
      return
    const start = e.dataTransfer.getData("start")
    const finish = this.props.index.toString()
    if (start === finish) return
    this.props.swapImages(start, finish)
  }
  render() {
    const id = this.props.imageData._id
    const { loggedIn, index } = this.props
    return (
      <div className="Gallery__item"
        draggable
        ondragstart={this.handleDragStart.bind(this)}
        ondragover={this.handleDragOver.bind(this)}
        ondrop={this.handleDrop.bind(this)}>
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