import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { urlConstant } from '../../shared/constant/urlConst';

@Component({
    selector: 'app-home-layout',
    standalone: false,
    templateUrl: './home-layout.component.html',
    styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent implements OnInit {

    isLoading = false;
    savingKey: string | null = null;
    slots: { [key: string]: any } = {};

    groups = [
        {
            title: 'Highlight icons',
            note: 'Four circles under the top banner. Square photo. Leave the text blank until you decide what to write.',
            items: [
                { key: 'perk_1', name: 'Icon 1', image: true, label: true, link: true },
                { key: 'perk_2', name: 'Icon 2', image: true, label: true, link: true },
                { key: 'perk_3', name: 'Icon 3', image: true, label: true, link: true },
                { key: 'perk_4', name: 'Icon 4', image: true, label: true, link: true },
            ]
        },
        {
            title: 'Shop for him / Shop for her',
            note: 'Two tiles. Use a square photo. The title under the photo is editable.',
            items: [
                { key: 'audience_him', name: 'Shop for him', image: true, label: true, link: true },
                { key: 'audience_her', name: 'Shop for her', image: true, label: true, link: true },
            ]
        },
        {
            title: 'Campaign banner',
            note: 'Wide banner under Shop for him / her, like a festive offer. Size 2000 × 800.',
            items: [
                { key: 'banner_campaign', name: 'Campaign banner', image: true, label: false, link: true },
            ]
        },
        {
            title: 'Banner before products',
            note: 'Second wide banner. Size 2000 × 800.',
            items: [
                { key: 'banner_mid', name: 'Mid banner', image: true, label: false, link: true },
            ]
        },
        {
            title: 'Gifting made easy',
            note: 'Heading plus three photos. Change the heading and each caption from here.',
            items: [
                { key: 'gift_title', name: 'Section heading', image: false, label: true, link: false },
                { key: 'gift_1', name: 'Gift 1', image: true, label: true, link: true },
                { key: 'gift_2', name: 'Gift 2', image: true, label: true, link: true },
                { key: 'gift_3', name: 'Gift 3', image: true, label: true, link: true },
            ]
        },
        {
            title: 'Bottom banner',
            note: 'Last banner on the home page. Size 2000 × 1000.',
            items: [
                { key: 'banner_bottom', name: 'Bottom banner', image: true, label: false, link: true },
            ]
        },
    ];

    constructor(
        public sharedService: SharedService,
        private http: HttpClient
    ) {}

    ngOnInit(): void { this.loadAll(); }

    loadAll(): void {
        this.isLoading = true;
        this.http.get<any>(urlConstant.HomeSlotAPI.getAll).subscribe(
            res => {
                this.slots = {};
                (res.data || []).forEach((row: any) => {
                    this.slots[row.slotKey] = {
                        ...row,
                        label: row.label || '',
                        image: row.image || '',
                        link: row.link || '',
                        isActive: !!Number(row.isActive),
                    };
                });
                this.isLoading = false;
            },
            () => { this.isLoading = false; }
        );
    }

    slot(key: string): any {
        if (!this.slots[key]) {
            this.slots[key] = { label: '', image: '', link: '', isActive: true };
        }
        return this.slots[key];
    }

    async uploadImage(key: string): Promise<void> {
        const result = await this.sharedService.UploadFile('home-slots', null, 'image');
        if (result?.url) this.slot(key).image = result.url;
    }

    removeImage(key: string): void {
        this.slot(key).image = '';
    }

    save(key: string): void {
        this.savingKey = key;
        const row = this.slot(key);
        this.http.put<any>(urlConstant.HomeSlotAPI.save + key, {
            label: row.label,
            image: row.image,
            link: row.link,
            isActive: row.isActive,
        }).subscribe(
            () => {
                this.savingKey = null;
                this.sharedService.showAlert(1, 'Saved');
            },
            () => {
                this.savingKey = null;
                this.sharedService.showAlert(2, 'Could not save');
            }
        );
    }
}
