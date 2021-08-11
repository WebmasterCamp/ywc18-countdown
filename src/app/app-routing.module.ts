import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountdownComponent } from './components/countdown/countdown.component';

const routes: Routes = [
  { path: '', component: CountdownComponent, pathMatch: 'full' },
  { path: 'live', component: CountdownComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
