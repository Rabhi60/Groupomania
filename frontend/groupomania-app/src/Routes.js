//import
import Login from './components/LoginAndSignup/Login.vue'
import Signup from './components/LoginAndSignup/Signup.vue'

import Home from './components/Home/Home.vue'

import NewMessage from './components/Message/NewMessage.vue'
import ModifyMessage from './components/Message/ModifyMessage.vue'
import DeleteMessage from './components/Message/DeleteMessage.vue'

import MyProfile from './components/Profile/MyProfile.vue'
import ModifyProfile from './components/Profile/ModifyProfile.vue'
import DeleteProfile from './components/Profile/DeleteProfile.vue'

import MessageAndComment from './components/Comment/MessageAndComment.vue'
import NewComment from './components/Comment/NewComment.vue'
import ModifyComment from './components/Comment/ModifyComment.vue'
import DeleteComment from './components/Comment/DeleteComment.vue'


export default [
    //Connexion
    {path: '/', component: Login},
    {path: '/Signup', component: Signup},

    //Accueil
    {path: '/Home', component: Home},
    

    //Profil coordonnées/modification/suppression
    {path: '/Home/MyProfile', component: MyProfile},
    {path: '/Home/ModifyProfile', component: ModifyProfile},
    {path: '/Home/DeleteProfile', component: DeleteProfile},

    //Message nouveau/modification/suppression
    {path: '/Home/NewMessage', component: NewMessage},
    {path: '/Home/ModifyMessage', component: ModifyMessage},
    {path: '/Home/DeleteMessage', component: DeleteMessage},

    //Commentaire nouveau/modification/suppression
    {path: '/Home/MessageAndComment', component: MessageAndComment},
    {path: '/Home/MessageAndComment/NewComment', component: NewComment},
    {path: '/Home/MessageAndComment/ModifyComment', component: ModifyComment},
    {path: '/Home/MessageAndComment/DeleteComment', component: DeleteComment}
]