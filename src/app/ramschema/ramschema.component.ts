import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef } from '@angular/core';
import { RamschemaService } from '../service/ramschema.service';
import { Course } from '../model/course';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ramschema',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ramschema.component.html',
  styleUrl: './ramschema.component.scss'
})
export class RamschemaComponent {
  chosenCourses:Course[]=[];
  sumScore:number=0;
  sumCourses:number=0;

  constructor(private ramschemaService:RamschemaService) {
    this.chosenCourses = this.ramschemaService.getCourses();
    this.counter();
  }

    courseChosen(course:Course):boolean 
    {
      const index = this.chosenCourses.findIndex(chosenCourse => chosenCourse === course);
      if (index === -1) 
      {
        return false;
      }

      return true;
    }

    courseToggle(course:Course)
    {
      const index = this.chosenCourses.findIndex(chosenCourse => chosenCourse.courseCode === course.courseCode);
      if (index === -1) 
      {
        this.chosenCourses.push(course);
      } 
      else 
      {
        this.chosenCourses.splice(index, 1);
      }
      this.ramschemaService.saveCourses(this.chosenCourses);
      this.counter();
    }
  
  
    counter() {
      this.sumCourses = this.chosenCourses.length;
      this.sumScore = this.chosenCourses.reduce((sum, course) => sum + course.points, 0);
    }

    sort_code()
    {
      this.chosenCourses = this.chosenCourses.sort((a,b) => (a.courseCode>b.courseCode)?1 :-1);
    }
  
    sort_coursename()
    {
      this.chosenCourses = this.chosenCourses.sort((a,b) => (a.courseName>b.courseName)?1 :-1);
    }
  
    sort_progression()
    {
      this.chosenCourses = this.chosenCourses.sort((a,b) => (a.progression>b.progression)?1 :-1);   
    }
  

}
