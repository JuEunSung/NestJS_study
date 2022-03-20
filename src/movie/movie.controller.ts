import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Query,
} from '@nestjs/common';

import { MovieService } from './movie.service';

import { RequestMovieCreateDTO, ResponseMovieCreateDTO } from 'src/dto/movie';
import Movie from 'src/entity/movie';
import { ApiResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';

@Controller('movie')
@ApiExtraModels(ResponseMovieCreateDTO, Movie)
export class MovieController {
  constructor(private readonly service: MovieService) {}

  @Get()
  getAll(
    @Query('name') name: string,
    @Query('director') director: string,
  ): Movie[] {
    return this.service.getAll(name, director);
  }

  @Get('/:id')
  get(@Param('id') id: string): Movie {
    return this.service.get(+id);
  }

  @Post()
  @ApiResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseMovieCreateDTO) },
        {
          properties: {
            RESULT_DATA: {
              $ref: getSchemaPath(Movie),
            },
          },
        },
      ],
    },
  })
  create(@Body() movie: RequestMovieCreateDTO): ResponseMovieCreateDTO {
    const _movie = this.service.create(movie as Movie);

    return new ResponseMovieCreateDTO(_movie).setCode(404);
  }

  @Delete()
  remove(@Param('id') id: string): boolean {
    return this.service.remove(+id);
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() movie) {
    return this.service.modify({
      ...movie,
      id: +id,
    });
  }
}
