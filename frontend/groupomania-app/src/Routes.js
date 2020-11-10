//import
// Authentification : Login(connexion) et Signup(Inscription)
import Login from './components/Auth/Login.vue'
import Signup from './components/Auth/Signup.vue'

//Accueil
import Home from './components/Home/Home.vue'

//La partie profile Voir son profile, le modifier ou le supprimer.
import MyProfile from './components/Profile/MyProfile.vue'
import ModifyProfile from './components/Profile/ModifyProfile.vue'
import DeleteProfile from './components/Profile/DeleteProfile.vue'

// La partie création de message, modification, suppression et message unique avec les commentaires et likes.
import NewMessage from './components/Message/NewMessage.vue'
import ModifyMessage from './components/Message/ModifyMessage.vue'
import DeleteMessage from './components/Message/DeleteMessage.vue'
import OneMessage from './components/Message/OneMessage.vue'

//La partie modification et suppression des commentaires
import ModifyComment from './components/Comment/ModifyComment.vue'
import DeleteComment from './components/Comment/DeleteComment.vue'

//export
//les components sont les fichiers qui vont être le contenu des pages et path contient les routes de leurs urls
export default [
    //Authentification login et signup
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
    {path: '/Home/ModifyMessage/:id', component: ModifyMessage},
    {path: '/Home/DeleteMessage', component: DeleteMessage},
    {path: '/Home/OneMessage/:id', component: OneMessage},

    //Commentaire modification/suppression
    {path: '/Home/OneMessage/:id/ModifyComment', component: ModifyComment},
    {path: '/Home/OneMessage/:id/DeleteComment', component: DeleteComment}
]