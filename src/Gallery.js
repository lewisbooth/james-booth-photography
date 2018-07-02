import { Component } from 'inferno'
import GalleryItem from './GalleryItem'

class Gallery extends Component {
  constructor() {
    super()
    this.state = {
      selectedCategory: ""
    }
  }
  selectCategory(e) {
    e.preventDefault()
    const selectedValue = e.target.dataset.value
    if (this.state.selectedCategory === selectedValue)
      this.setState({ selectedCategory: "" })
    else
      this.setState({ selectedCategory: e.target.dataset.value })
  }
  render() {
    return (
      <section id="gallery" className="container">
        <div className="Gallery__categories">
          {this.props.categories.map(category => {
            const selected = this.state.selectedCategory === category
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
          {this.props.images.length > 0 ?
            this.props.images.map((image, i) => {
              if (!image.meta)
                return null
              const isFiltered =
                image.meta.category.indexOf(this.state.selectedCategory) === -1
                && this.state.selectedCategory !== ""
              if (isFiltered)
                return null
              return <GalleryItem
                index={i}
                imageData={image}
                loggedIn={this.props.loggedIn}
                setModal={this.props.setModal}
                swapImages={this.props.swapImages}
              />
            }
            )
            : <p className="Error">No images found</p>

          }
        </div>
      </section>
    )
  }
}

export default Gallery