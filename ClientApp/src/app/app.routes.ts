import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'signin-callback',
        loadComponent: () => import('./auth/callback.component').then(m => m.CallbackComponent)
    },
    {path:'', loadChildren:()=> import('./public/public-routing-module').then(m=> m.PublicRoutingModule)},
    {path:'admin', loadChildren:()=> import('./admin/admin-routing-module').then(m=> m.AdminRoutingModule), 
        data: { ssr: false, prerender: false }
    }
    
];
