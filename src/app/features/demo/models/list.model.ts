export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}

export interface DemoListRequest {
  // Coincide con DemoListIn (vacío por ahora)
}

export interface DemoListResponse {
  id: number;
  nombre: string;
  valor: number; // Mapeado de float
  fecha: string; // Las fechas viajan como string en JSON
}
