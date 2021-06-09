import Vue from 'vue';
import Router from 'vue-router';

//  Importa o componente da página que vai ser renderizada
import login from '../components/base/login';

Vue.use(Router)

const routes = [
  
    {path: '', redirect:'/login'},
    {path:'/login', name: 'login', component:login},

    {path:'/auth/',  component: () => import('../components/estrutura/Chassis.vue'),
      children:[
        {path: '/', redirect:'/EscolhaUnidade'},
    ]}
]

const router = new Router( {routes, mode:'history'} )


export default router;
