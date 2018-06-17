import { Component } from 'inferno';

class Nav extends Component {
  scrollTo(e, node) {
    e.preventDefault()
    const target = e.target.getAttribute('href')
    const element = document.querySelector(target)
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  render() {
    return (
      <header className="Nav container">
        <img class="Nav__logo" src="/images/james-booth-photography-logo.svg" alt="James Booth Photography Logo" />
        <nav>
          <ul className="Nav__items">
            <li>
              <a href='#gallery' onClick={(e) => this.scrollTo(e)}>Gallery</a>
            </li>
            <li>
              <a href='#about' onClick={(e) => this.scrollTo(e)}>About</a>
            </li>
            <li>
              <a href='#gear' onClick={(e) => this.scrollTo(e)}>Gear</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Nav;