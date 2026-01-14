import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DemoShowService } from '../../services/show.services';

@Component({
    selector: 'app-show',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './show.html'
})
export class Show implements OnInit {
    private route = inject(ActivatedRoute);
    protected demoService = inject(DemoShowService);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.demoService.fetchShow(Number(id));
        }
    }
}
