import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts:any;
  isLoading:boolean = true;

  constructor(private _http:HttpClient, private _postService: PostService) { }

  ngOnInit() {
    this.getPostFromService();
  }

  getPostFromService(){
    this._postService.getAllPost().subscribe(response => {
      console.log(response.body);
      this.posts = response.body;
      this.isLoading = false;
    })
  }

  refreshData(){
    this.getPostsFromAPI();
  }

  getPostsFromAPI(){
    this.isLoading = true;
    this.posts = [];
    const apiUrl = 'https://jsonplaceholder.ir/posts';
    this._http.get(apiUrl).subscribe(data => {
      console.log(data);
      this.posts = data;
      this.isLoading = false;
    })
  }

}
