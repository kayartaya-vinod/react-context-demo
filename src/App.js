import React, { Component, createContext } from 'react';
import './App.css';

const AppContext = createContext();

class AppProvider extends Component {
  state = {
    contacts: [
      {
        name: 'Vinod',
        email: 'vinod@vinod.co',
        phone: '9731424784'
      },
      {
        name: 'Shyam',
        email: 'shyam@example.com',
        phone: '7731424784'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '8731424784'
      }
    ],
    addContact: contact => this.setState({ contacts: [...this.state.contacts, contact] }),
    deleteContact: email => {
      let contacts = [...this.state.contacts];
      let index = contacts.findIndex(c => c.email == email);
      contacts.splice(index, 1);
      this.setState({ contacts });
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

const Header = (props) => (
  <div className="navbar navbar-default">
    <div className="navbar-header">
      <a href="#" className="navbar-brand">
        {props.title}
      </a>
    </div>
  </div>
);

const ContactRows = () => (
  <AppContext.Consumer>
    {context => {
      console.log('>>>>', context);
      return context.contacts.map(c => {
        return (
          <tr key={Math.random()}>
            <td>
              <a href="" onClick={(e) => {
                e.preventDefault();
                context.deleteContact(c.email)
              }}><span className="glyphicon glyphicon-trash"></span></a>
              &nbsp;&nbsp;&nbsp;
                  {c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
          </tr>
        )
      })
    }}
  </AppContext.Consumer>
);

const ContactList = () => (
  <table className="table table-striped table-bordered">
    <thead>
      <tr>
        <th>name</th>
        <th>Email id</th>
        <th>Phone number</th>
      </tr>
    </thead>
    <tbody>
      <ContactRows />
    </tbody>
  </table>
);


class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    phone: ''
  }

  onChangeHandler(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <AppContext.Consumer>
        {
          context => {
            return (<div>
              <div className="form-group">
                <label className="control-label" htmlFor="name">Name</label>
                <input className="form-control" id="name"
                  name="name" onChange={this.onChangeHandler.bind(this)}
                  value={this.state.name}
                  type="text" />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="name">Email</label>
                <input className="form-control" id="email"
                  name="email" onChange={this.onChangeHandler.bind(this)}
                  value={this.state.email}
                  type="text" />
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="name">Phone</label>
                <input className="form-control" id="phone"
                  name="phone" onChange={this.onChangeHandler.bind(this)}
                  value={this.state.phone}
                  type="text" />
              </div>
              <button className="btn btn-default" onClick={() => {
                context.addContact(this.state);
                this.setState({ name: '', email: '', phone: '' })
              }} >Add to my 😎 phonebook 📗</button>
            </div>)
          }
        }
      </AppContext.Consumer>
    )
  }

}

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Header title='React Context Demo'>
        </Header>
        <div className="row">
          <div className="col-sm-4">
            <ContactForm />
          </div>
          <div className="col-sm-8">
            <ContactList />
          </div>
        </div>
      </AppProvider>
    );
  }
}

export default App;
