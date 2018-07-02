import { Component } from 'inferno'
import GalleryItem from './GalleryItem'

class Gallery extends Component {
  selectCategory(e) {
    e.preventDefault()
    const selectedValue = e.target.dataset.value
    if (this.props.selectedCategory === selectedValue)
      this.props.setActiveFilter("")
    else
      this.props.setActiveFilter(e.target.dataset.value)
  }
  render() {
    return (
      <section id="gallery" className="container">
        <div className="Gallery__categories">
          {this.props.categories.map(category => {
            const selected = this.props.activeFilter === category
            return (
              <button
                className={`Gallery__categories--button ${selected ? "selected" : ""}`}
                data-value={category}
                onClick={e => this.selectCategory(e)}
              >
                {category}
              </button>
            )
          })
          }
        </div>
        <div className="Gallery">
          {this.props.error ?
            <p className="Error">{this.props.error}</p>
            : ""}
          {
            this.props.images.map((image, i) => {
              return <GalleryItem
                index={i}
                imageData={image}
                loggedIn={this.props.loggedIn}
                setModal={this.props.setModal}
                swapImages={this.props.swapImages}
              />
            })
          }
        </div>
      </section>
    )
  }
}

export default Gallery