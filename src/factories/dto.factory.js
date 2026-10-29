import { usuarioDto } from '../dtos/usuario.dto.js';
import { peliculaDto } from '../dtos/pelicula.dto.js';
import { resenaDto } from '../dtos/resena.dto.js';
import {
  categoriaEntradaDto,
  peliculaEntradaDto,
  resenaEntradaDto,
  usuarioEntradaDto
} from '../dtos/entrada.dto.js';
export const createDto = (type, value) =>
  ({ usuario: usuarioDto, pelicula: peliculaDto, resena: resenaDto })[type]?.(value) ?? value;

export const createInputDto = (type, value) =>
  ({
    usuario: usuarioEntradaDto,
    categoria: categoriaEntradaDto,
    pelicula: peliculaEntradaDto,
    resena: resenaEntradaDto
  })[type]?.(value) ?? value;
