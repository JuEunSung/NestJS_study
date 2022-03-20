import { ApiProperty } from '@nestjs/swagger';

export default class Movie {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  director: string;
}
