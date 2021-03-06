import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {Container} from "react-bootstrap";
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import NotFoundScreen from "./screens/NotFoundScreen";
import QuestionScreen from './screens/QuestionScreen';
import QuestionEditScreen from './screens/QuestionEditScreen';
import QuestionsListScreen from './screens/QuestionsListScreen';
import QuestionReplyScreen from './screens/QuestionReplyScreen';
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ChatLoginScreen from './screens/ChatLoginScreen';
// import ChatScreen from './screens/ChatScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/chat" component={ChatLoginScreen} />
            {/* <Route path="/chat.html" component={ChatScreen} /> */}
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/user/:id/questions/:qId" component={QuestionEditScreen} />
            <Route path="/user/:id/questions" component={QuestionScreen} />
            {/* optional */}
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/admin/userList" component={UserListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            {/* Without the exact for the two below routes, it'll show duplicate screeens */}
            <Route path="/admin/productList" component={ProductListScreen} exact/>
            <Route path="/admin/productList/:pageNumber" component={ProductListScreen} exact/>
            <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
            <Route path="/admin/orderList" component={OrderListScreen} />
            <Route path="/admin/questionsList/:id" component={QuestionReplyScreen} />
            <Route path="/admin/questionsList" component={QuestionsListScreen} />
            <Route path="/search/:keyword" component={HomeScreen} />
            {/* If there's a keyword, then use that to search; otherwise, just use page number  */}
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
            <Route path="/" component={HomeScreen} exact/>
            <Route component={NotFoundScreen}/>
          </Switch>
        </Container>
      </main>
      <Footer />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        getState={(state) => state.toastr} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick/>
    </Router>
  );
}

export default App;
