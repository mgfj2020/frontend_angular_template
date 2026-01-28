import { Component, OnInit, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../../services/items.service';
import { ItemLicitacion } from '../../models/items.model';

@Component({
    selector: 'app-items-show',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.css']
})
export class ItemsShowComponent implements OnInit {
    @Input() licitacionId!: string;

    private itemsService = inject(ItemsService);

    public items = signal<ItemLicitacion[]>([]);
    public loading = signal<boolean>(true);
    public error = signal<string | null>(null);

    ngOnInit(): void {
        if (this.licitacionId) {
            this.fetchItems();
        } else {
            this.error.set('ID de licitación no proporcionado');
            this.loading.set(false);
        }
    }

    fetchItems(): void {
        this.loading.set(true);
        this.itemsService.getItems(this.licitacionId).subscribe({
            next: (res) => {
                if (res.success) {
                    this.items.set(res.data.items);
                } else {
                    this.error.set(res.message);
                }
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('Error al cargar los ítems');
                this.loading.set(false);
            }
        });
    }
}
