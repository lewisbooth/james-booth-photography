import { Component } from 'inferno'

class ModalLightbox extends Component {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
  }
  handleImageLoaded(loaded = true) {
    this.setState({ loaded })
  }
  render() {
    const { image, index } = this.props
    let hasMeta = false
    Object.keys(image.meta).forEach(key => {
      if (image.meta[key] !== "")
        hasMeta = true
    })
    console.log(image)
    return (
      <div className="Modal">
        <div
          className="Lightbox__pagination Lightbox__pagination--prev"
          onClick={() => {
            this.handleImageLoaded(false)
            this.props.setModal("lightbox", index - 1)
          }}>
          {"<"}
        </div>
        <div
          className="Lightbox__pagination Lightbox__pagination--next"
          onClick={() => {
            this.handleImageLoaded(false)
            this.props.setModal("lightbox", index + 1)
          }}>
          {">"}
        </div>
        <div className="Modal__window">
          <div
            className="Modal__close"
            onClick={() => this.props.setModal("lightbox", false)}>
            × </div>
          <div className={`Lightbox ${hasMeta ? "" : "Lightbox__no-meta"}`}>
            <div className={`Lightbox__photo ${this.state.loaded ? "" : "fade"}`}>
              <img
                src={`/images/gallery/${image._id}/large.jpg`}
                onLoad={() => this.handleImageLoaded()}
                alt="" />
            </div>
            {hasMeta ?
              <div className="Lightbox__meta">
                {image.meta.description ?
                  <div>
                    <label>Description</label>
                    <div className="Lightbox__meta--content">{image.meta.description}</div>
                  </div>
                  : ''}
                {image.meta.camera ?
                  <div>
                    <label>Camera</label>
                    <div className="Lightbox__meta--content">{image.meta.camera}</div>
                  </div>
                  : ''}
                {image.meta.lens ?
                  <div>
                    <label>Lens</label>
                    <div className="Lightbox__meta--content">{image.meta.lens}</div>
                  </div>
                  : ''}
                <div className="Lightbox__meta--inputs">
                  {image.meta.iso ?
                    <div className="Lightbox__meta--inputs--input">
                      <label>ISO</label>
                      <div className="Lightbox__meta--content">{image.meta.iso}</div>
                    </div>
                    : ''}
                  {image.meta.aperture ?
                    <div className="Lightbox__meta--inputs--input">
                      <label>Aperture</label>
                      <div className="Lightbox__meta--content">f/{image.meta.aperture}</div>
                    </div>
                    : ''}
                  {image.meta.shutterSpeed ?
                    <div className="Lightbox__meta--inputs--input">
                      <label>Shutter Speed</label>
                      <div className="Lightbox__meta--content">{image.meta.shutterSpeed}</div>
                    </div>
                    : ''}
                  {image.meta.focalLength ?
                    <div className="Lightbox__meta--inputs--input">
                      <label>Focal Length</label>
                      <div className="Lightbox__meta--content">{image.meta.focalLength}</div>
                    </div>
                    : ''}
                </div>
              </div> : ""}
          </div>
        </div>
      </div>
    )
  }
}

export default ModalLightbox