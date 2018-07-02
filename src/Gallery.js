import { Component } from 'inferno'
import GalleryItem from './GalleryItem'

class Gallery extends Component {
  render() {
    let galleryImages = this.props.images.map((image, i) =>
      <GalleryItem
        index={i}
        imageData={image}
        loggedIn={this.props.loggedIn}
        setModal={this.props.setModal}
        swapImages={this.props.swapImages}
      />
    )
    if (galleryImages.length === 0)
      galleryImages = (
        <p className="Error">No images found</p>
      )
    return (
      <section id="gallery" class="Gallery container">
        {this.props.error ?
          <p className="Error">{this.props.error}</p>
          : ""}
        {galleryImages.length ?
          galleryImages
          : <p className="Error">No images found</p>
        }
      </section>
    )
  }
}

export default Gallery