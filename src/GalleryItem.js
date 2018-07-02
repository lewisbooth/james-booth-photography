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
    console.log('wat')
    e.dataTransfer.setData("start", this.props.index)
  }
  handleDragOver(e) {
    console.log('hmm')
    e.preventDefault()
  }
  handleDrop(e) {
    e.preventDefault()
    console.log('yes')
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
        draggable={loggedIn ? true : false}
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