export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    error?: string;
}

export interface FileValidationResult {
    nombre: string;
    valido: boolean;
    error?: string;
}

export interface LicitacionNewResponse {
    id?: string;
    nombre: string;
    archivos_procesados: FileValidationResult[];
}
