import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  searchRepositories(query: string): Observable<any> {
    const url = `https://api.github.com/search/repositories?q=${query}`;
    return this.httpService.get(url).pipe(
      map(response => response.data)
    );
  }
}