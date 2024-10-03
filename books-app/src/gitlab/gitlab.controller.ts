import { Controller, Get, Query } from '@nestjs/common';
import { GitlabService } from './gitlab.service';
import { Observable } from 'rxjs';

@Controller('gitlab')
export class GitlabController {
  constructor(private readonly gitlabService: GitlabService) {}

  @Get('search')
  searchProjects(@Query('q') query: string): Observable<any> {
    return this.gitlabService.searchProjects(query);
  }
}