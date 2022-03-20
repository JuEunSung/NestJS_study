import { Injectable, NotFoundException } from '@nestjs/common';
import Movie from 'src/entity/movie';

@Injectable()
export class MovieService {
  private list: Movie[] = [];

  getAll(name = '', director = ''): Movie[] {
    return this.list.filter(
      (item) =>
        item.name.indexOf(name) > -1 && item.director.indexOf(director) > -1,
    );
  }

  get(id: number): Movie {
    const movie = this.list.find((item) => item.id === id);

    if (!movie) {
      throw new NotFoundException();
    }

    return movie;
  }

  remove(id: number): boolean {
    this.get(id);
    this.list = this.list.filter((item) => item.id !== id);

    return true;
  }

  create(movie: Movie): Movie {
    const param: Movie = {
      ...movie,
      id: this.list[this.list.length - 1]?.id + 1 || 1,
    };

    this.list.push(param);

    return param;
  }

  modify(movie: Movie) {
    const _movie = this.get(movie.id);
    _movie.name = movie.name;
    _movie.director = movie.director;

    return _movie;
  }
}
