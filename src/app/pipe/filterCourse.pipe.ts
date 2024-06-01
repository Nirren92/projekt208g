import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCourse'
})
export class FilterCoursePipe implements PipeTransform {

  transform(items: any[], group: string): any[] {
    if (!items) return [];
    if (!group) return items;
    return items.filter(item => item.group === group);
  }

}
