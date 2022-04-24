import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import ForgetPassword from "../components/ForgetPassword";
import Error404 from "../components/error/Error404";
import Error403 from "../components/error/Error403";
import Home from "../components/Home";
import Index from "../components";
import UserCenter from "../components/part/UserCenter";
import SelectBooks from "../components/part/SelectBooks";
import BooksMaintain from "../components/part/BooksMaintain";
import UsersMaintain from "../components/part/UsersMaintain";
import Details from "../components/part/Details";
import UserDetails from "../components/part/UserDetails";
import UpLoad from "../components/part/UpLoad";


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //{ path: '/', redirect: '/index' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/sign', name: 'SignUp', component: SignUp },
    { path: '/forgetPassword', name: 'ForgetPassword', component: ForgetPassword },
    { path: '/error404', name: 'Error404', component: Error404 },
    { path: '/error403', name: 'Error403', component: Error403 },
    { path: '/home', name: 'Home', component: Home, redirect: '/index', meta: {requireAuth: true},
      children: [
        { path: '/index', name: 'Index', component: Index, meta: {requireAuth: true} },
        { path: '/userCenter', name: 'UserCenter', component: UserCenter, meta: {requireAuth: true} },
        { path: '/selectBooks', name: 'SelectBooks', component: SelectBooks, meta: {requireAuth: true} },
        { path: '/usersMaintain', name: 'UsersMaintain', component: UsersMaintain, meta: {requireAuth: true, requireJudge: true} },
        { path: '/booksMaintain', name: 'BooksMaintain', component: BooksMaintain, meta: {requireAuth: true, requireJudge: true} },
        { path: '/upload', name: 'UpLoad', component: UpLoad, meta: {requireAuth: true} },
      ]
    },
    { path: '/details', name: Details, component: Details, meta: {requireAuth: true, requireJudge: true} },
    { path: '/userDetails', name: UserDetails, component: UserDetails, meta: {requireAuth: true} },
  ]
})


