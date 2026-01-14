import { ApiResponse } from './list.model';

export interface DemoShowRequest {
  licitacion_id: number;
}

export interface DemoShowResponse {
  licitacion_nombre: string;
  licitacion_encargado: string;
  licitacion_fecha_inicio: string;
  licitacion_fecha_termino: string;
  licitacion_fecha_creacion: string;
}

export type DemoShowApiResponse = ApiResponse<DemoShowResponse>;
