import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';
const routes: Routes = [
  {
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full',
    },
  ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
