import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courses: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql` {
          courses(topic: "Node.js") {
            title
            author
            description
            topic
            url
          }
        }
        `,
      })
      .valueChanges.subscribe(
        (result: any) => {
          this.courses = result.data.courses;
          this.loading = result.loading;
          this.error = result.error;
        },
        (error) => console.log(error),
        () => console.log(this.courses)
      );
    setTimeout(() => {
      console.log(this.courses);
      console.log(typeof (this.courses));
    }, 2000)
  }

}
