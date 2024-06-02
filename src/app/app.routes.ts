import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { RamschemaComponent } from './ramschema/ramschema.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'course', component:CourseComponent},
    {path:'ram', component:RamschemaComponent},
    {path:'', redirectTo:'/home', pathMatch:'full'}
];
