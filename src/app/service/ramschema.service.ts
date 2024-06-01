import { Injectable } from '@angular/core';
import { Course } from '../model/course';

@Injectable({
    providedIn: 'root'
  })
export class RamschemaService {

constructor() { }


getCourses(): Course[] {
  const storedCourses = localStorage.getItem("Courses");
  return storedCourses ? JSON.parse(storedCourses) : [];
}

saveCourses(courses: Course[]): void {
  localStorage.setItem("Courses", JSON.stringify(courses));
}
}
