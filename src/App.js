import { Component } from 'inferno';
import './registerServiceWorker';
import './stylus/main.css';
import Nav from './Nav';
import Gallery from './Gallery';
import Profile from './Profile';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Gallery />
        <Profile />
        <Footer />
      </div>
    );
  }
}

export default App;