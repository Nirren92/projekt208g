import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef, NgModule } from '@angular/core';
import { CoursesService } from '../service/course.service';
import { Course } from '../model/course';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RamschemaService } from '../service/ramschema.service';
import {MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatPaginatorModule],
  styleUrls: ['./course.component.scss']
})



export class CourseComponent  {
  courselist: Course[] = [];
  courselist_orginal:Course[] = [];
  inputform: FormGroup;
  chosenCourses:Course[]=[];
  subjectList:string[]=[];
  sumCourses:number=0;
  sumFilterCourses:number=0;

  pageSizeOptions = [5, 10];
  pageIndex = 0;
  pageSize = 10;
  displayedCourses: Course[]=[];


  constructor(private ramschemaService:RamschemaService,private kurserService: CoursesService,private formBuilder: FormBuilder,) {
    this.chosenCourses = this.ramschemaService.getCourses();

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
      this.counter(); 
      
      this.filter()});
      
    }

    //räknar antal kurser och filterarde kurser
    counter() {
      this.sumCourses = this.courselist_orginal.length;
      this.sumFilterCourses = this.courselist.length;
    }

//kontrollerar om kursen är vald eller inte
    courseChosen(course:Course):boolean 
    {
      const index = this.chosenCourses.findIndex(chosenCourse => chosenCourse === course);
      if (index === -1) 
      {
        return false;
      }

      return true;
    }

    //kontroll om kursen är med redan isåfall tas den bort annars läggs den till. toggle funktion 
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
  
    }
  
  //soteringsfunktion
    sort_code()
    {
      this.courselist = this.displayedCourses.sort((a,b) => (a.courseCode>b.courseCode)?1 :-1);
    }
  //soteringsfunktion
    sort_coursename()
    {
      this.courselist = this.displayedCourses.sort((a,b) => (a.courseName>b.courseName)?1 :-1);
    }
  //soteringsfunktion
    sort_progression()
    {
      this.courselist = this.displayedCourses.sort((a,b) => (a.progression>b.progression)?1 :-1);   
    }
  
//filterfunktion beorende av både input text samt valt ämnesområde. 
    filter() {
      const selectedCourse = this.inputform.get('selectedCourse')?.value || '';
      const sokord = this.inputform.get('sokord')?.value || '';
    
      this.pageIndex = 0;
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
    
      this.displayedCourses = this.courselist_orginal.filter(item =>
        (selectedCourse === '' || item.subject.toLowerCase() === selectedCourse.toLowerCase()) &&
        (sokord === '' || item.courseCode.toLowerCase().includes(sokord.toLowerCase()) || item.courseName.toLowerCase().includes(sokord.toLowerCase()))
      ).slice(startIndex, endIndex);
    
      //räknar total antal filterade kurser också
      this.courselist = this.courselist_orginal.filter(item =>
        (selectedCourse === '' || item.subject.toLowerCase() === selectedCourse.toLowerCase()) &&
        (sokord === '' || item.courseCode.toLowerCase().includes(sokord.toLowerCase()) || item.courseName.toLowerCase().includes(sokord.toLowerCase()))
      );
      this.counter();
      
    }


    onPageChange(event: any): void {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      //uppdaterar de kurser som visas i tabellen
      this.displayedCourses = this.courselist.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    }



}

