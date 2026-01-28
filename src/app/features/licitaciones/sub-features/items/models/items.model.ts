export interface ItemLicitacion {
    id: string;
    licitacion_id: string;
    item_key: string;
    nombre_item: string;
    cantidad: number;
    unidad: string;
    descripcion: string;
    observaciones: string;
}

export interface ItemsLicitacionResponse {
    items: ItemLicitacion[];
}
