import { Component } from 'inferno';

class Profile extends Component {
  render() {
    return (
      <div className="Profile container">
        <section id="about" class="About">
          <img src="/images/about/james-booth-profile-photo.jpg" alt="James Booth" className="About__image" />
          <div className="About__text">
            <h2>Hi, I'm James</h2>
            <p>I was born somewhere, and then grew up. Along the way I served 27 years in the military where I learned very important stuff like how to poop in a plastic bag and clean a rifle. Then I left and now live in Stoke on Trent where I do other stuff such as photography. I hope to continue doing stuff for quite some time.</p>
          </div>
        </section>
        <section id="gear" class="Gear">
          <div className="Gear__text">
            <h2>Gear</h2>
            <ul>
              <li>Canon 5D Mark IV</li>
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