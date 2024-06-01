import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef } from '@angular/core';
import { CoursesService } from '../service/course.service';
import { Course } from '../model/course';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  styleUrls: ['./course.component.scss']
})

export class CourseComponent  {
  courselist: Course[] = [];
  courselist_orginal:Course[] = [];
  inputform: FormGroup;
  chosenCourses:Course[]=[];
  subjectList:string[]=[];

  constructor(private kurserService: CoursesService,private formBuilder: FormBuilder,) {
    const storedCourses = localStorage.getItem("Courses");
    if (storedCourses) {
      this.chosenCourses = JSON.parse(storedCourses);
    }   
    this.inputform = this.formBuilder.group({
      sokord: [''],
      selectedCourse: ['']
    });
     }
       
   async ngOnInit() {
     
      this.kurserService.getCourses().subscribe((data) => {
      this.courselist = data;
       //Sparar för att slippa api anrop mellan filteringssökning
      this.courselist_orginal = this.courselist;
    
      this.subjectList = this.courselist_orginal
      .map(course => course.subject)
      .filter((value, index, self) => self.indexOf(value) === index);

      });
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
      localStorage.setItem("Courses", JSON.stringify(this.chosenCourses));
  
    }
  
  
    sort_code()
    {
      this.courselist = this.courselist.sort((a,b) => (a.courseCode>b.courseCode)?1 :-1);
    }
  
    sort_coursename()
    {
      this.courselist = this.courselist.sort((a,b) => (a.courseName>b.courseName)?1 :-1);
    }
  
    sort_progression()
    {
      this.courselist = this.courselist.sort((a,b) => (a.progression>b.progression)?1 :-1);   
    }
  

    filter() {
      const selectedCourse = this.inputform.get('selectedCourse')?.value || '';
      const sokord = this.inputform.get('sokord')?.value || '';
  
      this.courselist = this.courselist_orginal.filter(item =>
        (selectedCourse === '' || item.subject.toLowerCase() === selectedCourse.toLowerCase()) &&
        (sokord === '' || item.courseCode.toLowerCase().includes(sokord.toLowerCase()) || item.courseName.toLowerCase().includes(sokord.toLowerCase()))
      );
    }


}
