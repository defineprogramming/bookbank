```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Book from './components/Book';
import Bookshelf from './components/Bookshelf';
import Review from './components/Review';
import Forum from './components/Forum';
import Challenge from './components/Challenge';
import Author from './components/Author';
import Recommendation from './components/Recommendation';
import Blog from './components/Blog';
import Social from './components/Social';
import Signup from './components/Signup';
import Login from './components/Login';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/book" component={Book} />
        <Route path="/bookshelf" component={Bookshelf} />
        <Route path="/review" component={Review} />
        <Route path="/forum" component={Forum} />
        <Route path="/challenge" component={Challenge} />
        <Route path="/author" component={Author} />
        <Route path="/recommendation" component={Recommendation} />
        <Route path="/blog" component={Blog} />
        <Route path="/social" component={Social} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
```