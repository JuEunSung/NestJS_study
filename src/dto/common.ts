import { ApiProperty } from '@nestjs/swagger';

export class RequestDTO {}

export class ResponseDTO<T> {
  @ApiProperty()
  public RESULT_CODE: number;

  @ApiProperty()
  public RESULT_DATA: T;

  constructor(RESULT_DATA, RESULT_CODE = 200) {
    this.RESULT_CODE = RESULT_CODE;
    this.RESULT_DATA = RESULT_DATA;
  }

  setCode(RESULT_CODE: number) {
    this.RESULT_CODE = RESULT_CODE;

    return this;
  }
}
