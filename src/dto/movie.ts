import { ApiProperty } from '@nestjs/swagger';
import Movie from 'src/entity/movie';
import { RequestDTO, ResponseDTO } from './common';

export class RequestMovieCreateDTO extends RequestDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly director: string;
}

export class ResponseMovieCreateDTO extends ResponseDTO<Movie> {
  constructor(RESULT_DATA: Movie) {
    super(RESULT_DATA);
  }
}
