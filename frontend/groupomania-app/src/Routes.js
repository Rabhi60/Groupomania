//import
// Authentification : Login(connexion) et Signup(Inscription)
import Login from './components/Auth/Login.vue'
import Signup from './components/Auth/Signup.vue'
import ResetPassword from './components/Auth/ResetPassword.vue'

//Accueil
import Home from './components/Home/Home.vue'

//La partie Admin
import AdminHome from './components/Admin/AdminHome.vue'
import AdminAllUsers from './components/Admin/AdminAllUsers.vue'
import AdminOneUser from './components/Admin/AdminOneUser.vue'


//La partie profile Voir son profile, le modifier ou le supprimer.
import MyProfile from './components/Profile/MyProfile.vue'
import ModifyProfile from './components/Profile/ModifyProfile.vue'
import DeleteProfile from './components/Profile/DeleteProfile.vue'

// La partie création de message, modification, suppression et message unique avec les commentaires et likes.
import NewMessage from './components/Message/NewMessage.vue'
import ModifyMessage from './components/Message/ModifyMessage.vue'
import OneMessage from './components/Message/OneMessage.vue'

//La partie suppression des commentaires
import DeleteComment from './components/Comment/DeleteComment.vue'

//Page 404
import PageNotFound from './components/PageNotFound/PageNotFound.vue'

//export

//les components sont les fichiers qui vont être le contenu des pages et path contient les routes de leurs urls
export default [
    //Authentification login et signup
    {path: '/', component: Login},
    {path: '/Signup', component: Signup},
    {path: '/ResetPassword', component: ResetPassword},

    //Accueil
    {path: '/Home', component: Home},

    //Admin coordonnées/modification/suppression
    {path: '/Home/AdminHome', component: AdminHome},
    {path: '/Home/AdminHome/AllUsers', component: AdminAllUsers},
    {path: '/Home/AdminHome/OneUser/:id', component: AdminOneUser},

    
    //Profil coordonnées/modification/suppression
    {path: '/Home/MyProfile', component: MyProfile},
    {path: '/Home/ModifyProfile', component: ModifyProfile},
    {path: '/Home/DeleteProfile', component: DeleteProfile},

    //Message nouveau/modification/suppression
    {path: '/Home/NewMessage', component: NewMessage},
    {path: '/Home/ModifyMessage/:messageId', component: ModifyMessage},
    {path: '/Home/OneMessage/:messageId', component: OneMessage},

    //Commentaire /suppression
    {path: '/Home/OneMessage/:messageId/DeleteComment/:commentId', component: DeleteComment},

    // Page 404 permet de gérer en cas d'url inextistant
    {path: '*', component: PageNotFound}

]