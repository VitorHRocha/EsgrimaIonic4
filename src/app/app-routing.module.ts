import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' },
  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule' },
  { path: 'caracteristicas-oponente', loadChildren: './pages/caracteristicas-oponente/caracteristicas-oponente.module#RegistroOpPageModule' },
  { path: 'minhas-lutas', loadChildren: './pages/minhas-lutas/minhas-lutas.module#MinhasLutasPageModule' },
  { path: 'profileedit', loadChildren: './pages/profileedit/profileedit.module#ProfileeditPageModule' },
  { path: 'luta', loadChildren: './pages/luta/luta.module#LutaPageModule' },
  { path: 'relatorio', loadChildren: './pages/relatorio/relatorio.module#RelatorioPageModule' },
  { path: 'registra-lutadores', loadChildren: './pages/registra-lutadores/registra-lutadores.module#RegistraLutadoresPageModule' },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
  { path: 'modal-filtro', loadChildren: './modal-filtro/modal-filtro.module#ModalFiltroPageModule' },
  { path: 'tesste', loadChildren: './pages/tesste/tesste.module#TesstePageModule' },
  { path: 'comportamento-oponente', loadChildren: './pages/comportamento-oponente/comportamento-oponente.module#ComportamentoOponentePageModule' },
  { path: 'auto-avaliacao', loadChildren: './pages/auto-avaliacao/auto-avaliacao.module#AutoAvaliacaoPageModule' },
  { path: 'filtro', loadChildren: './filtro/filtro.module#FiltroPageModule' },  { path: 'estatistica', loadChildren: './pages/estatistica/estatistica.module#EstatisticaPageModule' },
  { path: 'condicao-pos-luta', loadChildren: './pages/condicao-pos-luta/condicao-pos-luta.module#CondicaoPosLutaPageModule' },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
