import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, LicitacionNewResponse } from '../models/licitacion.model';
import { map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LicitacionService {
    private http = inject(HttpClient);
    private readonly API_URL = 'http://localhost:8000/licitaciones/new';

    private _loading = signal<boolean>(false);
    private _response = signal<LicitacionNewResponse | null>(null);
    private _error = signal<string | null>(null);

    public loading = this._loading.asReadonly();
    public response = this._response.asReadonly();
    public error = this._error.asReadonly();

    createLicitacion(nombre: string, files: File[]) {
        this._loading.set(true);
        this._error.set(null);
        this._response.set(null);

        const formData = new FormData();
        formData.append('nombre', nombre);
        files.forEach(file => {
            formData.append('files', file, file.name);
        });

        return this.http.post<ApiResponse<LicitacionNewResponse>>(this.API_URL, formData).pipe(
            map(res => {
                if (res.success) {
                    this._response.set(res.data);
                    return res;
                } else {
                    this._response.set(res.data); // data contains validation details even on failure
                    this._error.set(res.message);
                    return res;
                }
            }),
            catchError(err => {
                this._error.set('Error de conexión o error interno del servidor');
                return of({ success: false, message: 'Server Error', data: null });
            })
        ).subscribe(() => this._loading.set(false));
    }

    resetState() {
        this._response.set(null);
        this._error.set(null);
    }
}
