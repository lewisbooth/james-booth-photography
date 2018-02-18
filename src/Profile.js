import { Component } from 'inferno';

class Profile extends Component {
  render() {
    return (
      <div className="Profile container">
        <section id="about" class="About">
          <img src="/images/about/james-booth-profile-photo.jpg" alt="James Booth" className="About__image" />
          <div className="About__text">
            <h2>About James</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>
        </section>
        <section id="gear" class="Gear">
          <div className="Gear__text">
            <h2>Gear</h2>
            <ul>
              <li>Canon 5D Mark IV</li>
              <li>Pentax K-1</li>
              <li>Mamiya RB67 Pro Medium Format</li>
              <li>Canon 70-200mm f/2.8 mkII</li>
              <li>Canon 24-70mm f/2.8 mkII</li>
              <li>Sigma ART 35mm f/1.4</li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Profile;