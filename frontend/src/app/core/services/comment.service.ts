import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '../models/comment.module';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug:string, payload:any): Observable<Comment> {
    return this.apiService
    .post(
      `comments/${slug}`,
      { body: payload }
    ).pipe(map(data => data.comment));
  }

  getAll(slug:string): Observable<Comment[]> {
    return this.apiService.get(`comments/${slug}`)
      .pipe(map(data => data.comments));
  }

  destroy(commentId:string, articleSlug:string) {
    return this.apiService
      .delete(`comments/${articleSlug}/${commentId}`);
  }

}