import React from 'react'
import './index.css'
import Menu from './components/Menu'
import CategoryMenu from './components/CategoryMenu'
import Category from './components/Category'
import LoginForm from './components/LoginForm'
import ItemList from './components/ItemList'
import Ostoskori from './components/Ostoskori'
import OneItem from './components/OneItem'
import User from './components/User'
import itemService from './services/items'
import userService from './services/users'
import loginService from './services/login'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      showAll: true,
      notification: null,
      username: '',
      password: '',
      address: '',
      user: null,
      ostoskori: [],
      currentlyViewedItem: '',
      haku: '',
      fromTilaa: false,
      newItemNimi: '',
      newItemKuva: '',
      newItemHinta: '',
      newItemPaino: '',
      newItemKuvaus: '',
      newItemKategoria: '',
      timer: null
    }
  }

  componentDidMount() {
    itemService.getAll().then(items =>{
      this.setState({ items })
    }
    )
    const loggedUserJSON = window.localStorage.getItem('loggedItemAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      userService.setToken(user.token)
    }

    const ostoskoriJSON = window.localStorage.getItem('ostoskori')
    if (ostoskoriJSON) {
      const ostoskori = JSON.parse(ostoskoriJSON)
      this.setState({
        ostoskori
      })
    }
  }

  logout = (history) => {
    window.localStorage.removeItem('loggedItemAppUser')
    userService.setToken(null)
    this.setState({ username: '', password: '', user: null })
    history.push('/kauppa')
  }

  notification = (message) => {
    clearTimeout(this.state.timer)
    const timer = setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
    this.setState({notification: message, timer})
  }
  resetNotification = () => {
    this.setState({notification: null})
  }

  login = async (event, history) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      
      userService.setToken(user.token)
      window.localStorage.setItem('loggedItemAppUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user, notification: null })
      
      if (this.state.fromTilaa) {
        this.setState({ fromTilaa: false })
        history.push('/ostoskori')
      }else{
        history.push('/kauppa')
      }
    } catch (exception) {
      this.notification('käyttäjätunnus tai salasana virheellinen')
    }
  }

  register = async (event, history) => {
    event.preventDefault()
    if (this.state.username==='' || this.state.password==='' || this.state.address==='') {
      this.notification('kaikki kentät pitää täyttää')
    }else{
      try {
        const user = await userService.create({
          username: this.state.username,
          password: this.state.password,
          address: this.state.address
        })

        userService.setToken(user.token)
        window.localStorage.setItem('loggedItemAppUser', JSON.stringify(user))
        this.setState({ username: '', password: '',address: '', user, notification: null })
        if (this.state.fromTilaa) {
          this.setState({ fromTilaa: false })
          history.push('/ostoskori')
        }else{
          history.push('/kauppa')
        }
      } catch (exception) {
        this.notification('käyttäjätunnus pitää olla ainutlaatuinen')
      }
    }
  }

  
  changeInformation = async (event, address) => {
    event.preventDefault()
    if (address==='') {
      this.notification('osoite ei saa olla tyhjä')
    }else{
      await userService.changeInformation({
        address
      })
      const user = {...this.state.user, address}
      window.localStorage.setItem('loggedItemAppUser', JSON.stringify(user))
      this.setState({ address: '', user })
      this.notification('osoite muutettu')
    }
  }

  changePassword = async (event) => {
    event.preventDefault()
    if (this.state.password==='') {
      this.notification('salasana ei saa olla tyhjä')
    }else{
      await userService.changePassword({
        password: this.state.password
      })
      this.setState({ password: '' })
      this.notification('salasana muutettu')
    }
  }

  deleteUser = async (history) => {
    await userService.remove()
    window.localStorage.clear()
    this.setState({ostoskori: [], user: null})
    history.push('/kauppa')
  }
  

  addItem = async (event) => {
    event.preventDefault()
    this.itemForm.toggleVisibility()
    const itemObject = {
      nimi: this.state.newItemNimi,
      kuva: this.state.newItemKuva,
      hinta: this.state.newItemHinta,
      paino: this.state.newItemPaino,
      kuvaus: this.state.newItemKuvaus,
      kategoria: this.state.newItemKategoria
    }
    const newItem = await itemService.create(itemObject)
    this.setState({
      items: this.state.items.concat(newItem),
      newItemNimi: '',
      newItemKuva: '',
      newItemHinta: '',
      newItemPaino: '',
      newItemKuvaus: '',
      newItemKategoria: ''
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  changeAppState = (key, value) => {
    this.setState({ [key]: value })
  }
  
  lisaaOstoskoriin = (currentlyViewedItem) => {
    const ostoskoriItemObject = {
      nimi: currentlyViewedItem.nimi,
      kuva: currentlyViewedItem.kuva,
      hinta: currentlyViewedItem.hinta,
      paino: currentlyViewedItem.paino,
      kuvaus: currentlyViewedItem.kuvaus,
      _id: currentlyViewedItem._id
    }
    const ostoskori = this.state.ostoskori.concat(ostoskoriItemObject)
    window.localStorage.setItem('ostoskori', JSON.stringify(ostoskori))
    this.setState({
      ostoskori
    })
  }

  poistaOstoskorista = (index) => {
    const ostoskori=this.state.ostoskori
    ostoskori.splice(index, 1)
    window.localStorage.setItem('ostoskori', JSON.stringify(ostoskori))
    this.setState({
      ostoskori
    })
  }

  tilaa = async (history) => {
    if (this.state.user === null) {
      this.setState({fromTilaa: true})
      history.push('/kirjaudu')
    }else{
      const ostoskori=this.state.ostoskori
      const orders = ostoskori.map(ostoskoriItem =>{
        const newOrder = {
          orderItem: ostoskoriItem,
          date: Date.now()
        }
        return(newOrder)
      })
      const orderHistory=this.state.user.orderHistory.concat(orders)
      const newOrderHistory = await userService.order({orderHistory})
      const user ={...this.state.user, orderHistory: newOrderHistory}
      window.localStorage.setItem('loggedItemAppUser', JSON.stringify(user))
      window.localStorage.setItem('ostoskori', JSON.stringify([]))
      this.setState({
        ostoskori: [],
        user
      })
      this.notification('tilattu')
    }
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <h1>ruokakauppa</h1>
            <Menu user={this.state.user} resetNotification={this.resetNotification}/>
            <Route exact path="/" render={() =>
              <Redirect to='/kauppa'/>
            } />
            <Route path="/kauppa" render={() =>
              <div>
                <br/>
                <CategoryMenu />
                <input className='haku'
                  name="haku"
                  placeholder="hae..."
                  value={this.state.haku}
                  onChange={this.handleChange}
                />
              </div>
            } />
            <Route exact path="/kauppa" render={() =>
              <ItemList items={this.state.items.filter(item => item.nimi.toLowerCase().includes(this.state.haku.toLowerCase()))}
              title='tuotteet'
              />
            } />
            <Route exact path="/kauppa/:category" render={({ match }) => 
              <div>
                <Category
                items={this.state.items.filter(item => item.nimi.toLowerCase().includes(this.state.haku.toLowerCase()))}
                category={match.params.category}
                />
              </div>
            } />

            <Route exact path="/ostoskori" render={({history}) =>
              <Ostoskori
              ostoskori={this.state.ostoskori}
              poistaOstoskorista={this.poistaOstoskorista}
              tilaa={this.tilaa}
              history={history}
              notification={this.state.notification}
              />
            } />

            <Route exact path="/käyttäjä" render={({history}) =>
              <User
              user={this.state.user}
              address={this.state.address}
              password={this.state.password}
              handleChange={this.handleChange}
              onInformationSubmit={this.changeInformation}
              onPasswordSubmit={this.changePassword}
              logout={this.logout}
              changeAppState={this.changeAppState}
              notification={this.state.notification}
              deleteUser={this.deleteUser}
              history={history}
              />
            } />

            <Route exact path="/kirjaudu" render={({history}) => 
              <LoginForm
              username={this.state.username}
              password={this.state.password}
              address={this.state.address}
              handleChange={this.handleChange}
              onLoginSubmit={this.login}
              onRegisterSubmit={this.register}
              notification={this.state.notification}
              resetNotification={this.resetNotification}
              history={history}
              />
            } />

            <Route path="/tuote/:id" render={({ match }) => {
              const items = this.state.items
              const currentlyViewedItem = items.find(a => a._id === match.params.id)
              if (items.length > 0) {
                return (
                  <div>
                    <br/>
                    <CategoryMenu />
                    <OneItem item={currentlyViewedItem} lisaaOstoskoriin={this.lisaaOstoskoriin}/>
                  </div>
                )
              }
              return null
            }
            } />
          </div>
        </Router>
      </div>
    )
  }
}

export default App