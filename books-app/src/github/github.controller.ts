import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';
import { Observable } from 'rxjs';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('search')
  searchRepositories(@Query('q') query: string): Observable<any> {
    return this.githubService.searchRepositories(query);
  }
}