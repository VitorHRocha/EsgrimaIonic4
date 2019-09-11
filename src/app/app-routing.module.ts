import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' },
  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule' },
  { path: 'registro-op', loadChildren: './pages/registro-op/registro-op.module#RegistroOpPageModule' },
  { path: 'minhas-lutas', loadChildren: './pages/minhas-lutas/minhas-lutas.module#MinhasLutasPageModule' },
  { path: 'profileedit', loadChildren: './pages/profileedit/profileedit.module#ProfileeditPageModule' },
  { path: 'luta', loadChildren: './pages/luta/luta.module#LutaPageModule' },
  { path: 'relatorio', loadChildren: './pages/relatorio/relatorio.module#RelatorioPageModule' },
  { path: 'registra-lutadores', loadChildren: './pages/registra-lutadores/registra-lutadores.module#RegistraLutadoresPageModule' },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
