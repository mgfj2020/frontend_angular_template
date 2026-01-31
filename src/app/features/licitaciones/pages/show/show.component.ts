import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LicitacionService } from '../../services/licitacion.service';
import { LicitacionShowResponse } from '../../models/licitacion.model';
import { DatosEconomicosCardComponent } from '../../sub-features/datos-economicos/components/datos-economicos-card/datos-economicos-card.component';
import { ItemsShowComponent } from '../../sub-features/items/pages/show/show.component';

@Component({
    selector: 'app-licitacion-show',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, DatosEconomicosCardComponent, ItemsShowComponent],
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.css']
})
export class LicitacionShowComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private licitacionService = inject(LicitacionService);

    public licitacion = signal<LicitacionShowResponse | null>(null);
    public loading = signal<boolean>(true);
    public error = signal<string | null>(null);

    // Editing state
    public isEditing = signal<boolean>(false);
    public editForm = signal<Partial<LicitacionShowResponse>>({});
    public saving = signal<boolean>(false);

    // Notifications
    public notification = signal<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.fetchLicitacion(id);
        } else {
            this.error.set('ID de licitación no proporcionado');
            this.loading.set(false);
        }
    }

    fetchLicitacion(id: string): void {
        this.loading.set(true);
        this.licitacionService.getLicitacion(id).subscribe({
            next: (res) => {
                if (res.success) {
                    this.licitacion.set(res.data);
                } else {
                    this.error.set(res.message);
                }
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('Error al cargar la licitación');
                this.loading.set(false);
            }
        });
    }

    startEdit(): void {
        if (this.licitacion()) {
            this.isEditing.set(true);
            this.editForm.set({ ...this.licitacion()! });
        }
    }

    cancelEdit(): void {
        this.isEditing.set(false);
        this.editForm.set({});
    }

    saveEdit(): void {
        const id = this.licitacion()?.id;
        if (!id) return;

        this.saving.set(true);
        this.licitacionService.updateLicitacion(id.toString(), this.editForm()).subscribe({
            next: (res) => {
                if (res.success) {
                    this.licitacion.set({ ...this.licitacion()!, ...res.data });
                    this.showNotification('Licitación actualizada correctamente', 'success');
                    this.cancelEdit();
                } else {
                    this.showNotification(res.message || 'Error al actualizar', 'error');
                }
                this.saving.set(false);
            },
            error: () => {
                this.showNotification('Error de conexión', 'error');
                this.saving.set(false);
            }
        });
    }

    private showNotification(message: string, type: 'success' | 'error'): void {
        this.notification.set({ message, type });
        setTimeout(() => {
            this.notification.set({ message: '', type: null });
        }, 3000);
    }
}
