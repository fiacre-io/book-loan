import React from 'react';
import AddBookForm from './AddBookForm';
import base from '../base';

class Shelves extends React.Component {
  constructor() {
    super();
    this.renderShelves = this.renderShelves.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    };
  }

  handleChange(e, key) {
    const book = this.props.books[key];
    const updatedBook = {
      ...book,
      [e.target.name]: e.target.value
    };
    this.props.updateBook(key, updatedBook);
  }

  authenticate(provider) {
    // console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData) {
    // console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    const storeRef = base.database().ref(this.props.storeId);

    storeRef.once('value', snapshot => {
      const data = snapshot.val() || {};

      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  renderLogin() {
    return (
      <div className="column">
        <nav className="login">
          <h4>Manage Shelves</h4>
          <p className="signin">Sign in to manage your bookshelves</p>
          <button className="github" onClick={() => this.authenticate('github')}>
            <span>Log In with Github</span>
            <i className="fa fa-github fa-2x" aria-hidden="true" />
          </button>
          <button className="facebook" onClick={() => this.authenticate('facebook')}>
            Log In with Facebook<i className="fa fa-facebook-official fa-2x" aria-hidden="true" />
          </button>
          <button className="twitter" onClick={() => this.authenticate('twitter')}>
            Log In with Twitter<i className="fa fa-twitter-square fa-2x" aria-hidden="true" />
          </button>
        </nav>
      </div>
    );
  }

  renderShelves(key) {
    const book = this.props.books[key];
    return (
      <div className="book-edit" key={key}>
        <input
          type="text"
          name="name"
          value={book.name}
          placeholder="Book Name"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="author"
          value={book.author}
          placeholder="Book Price"
          onChange={e => this.handleChange(e, key)}
        />
        <select
          type="text"
          name="status"
          value={book.status}
          placeholder="Book Status"
          onChange={e => this.handleChange(e, key)}
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <textarea
          type="text"
          name="desc"
          value={book.desc}
          placeholder="Book Desc"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="image"
          value={book.image}
          placeholder="Book Image"
          onChange={e => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.removeBook(key)}>Remove Book</button>
      </div>
    );
  }

  render() {
    const logout = (
      <button className="logout" onClick={this.logout}>
        Log Out!
      </button>
    );
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }
    if (this.state.uid !== this.state.owner) {
      return (
        <div className="column">
          <h4 className="loan">Manage Shelves</h4>
          <p>Sorry, you do not own this library. Please log out and create a new library</p>
          {logout}
        </div>
      );
    }

    return (
      <div className="column">
        <h4 className="loan">Manage Shelves</h4>
        <button className="load-books" onClick={this.props.loadSamples}>
          Load Sample Books
        </button>
        {logout}
        {Object.keys(this.props.books).map(this.renderShelves)}
        <AddBookForm addBook={this.props.addBook} />
      </div>
    );
  }
}

Shelves.proprTypes = {
  books: React.PropTypes.object.isRequired,
  updateBook: React.PropTypes.func.isRequired,
  removeBook: React.PropTypes.func.isRequired,
  addBook: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default Shelves;
