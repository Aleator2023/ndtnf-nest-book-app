import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GitlabService {
  constructor(private readonly httpService: HttpService) {}

  searchProjects(query: string): Observable<any> {
    const url = `https://gitlab.com/api/v4/projects?search=${query}`;
    return this.httpService.get(url).pipe(
      map(response => response.data)
    );
  }
}