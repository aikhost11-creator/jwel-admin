import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { urlConstant } from '../../shared/constant/urlConst';
import { CategoriesService } from '../categories/categories.service';

@Component({
    selector: 'app-home-layout',
    standalone: false,
    templateUrl: './home-layout.component.html',
    styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent implements OnInit {

    isLoading = false;
    savingKey: string | null = null;
    savingCatId: number | null = null;
    slots: { [key: string]: any } = {};
    rootCategories: any[] = [];

    groups = [
        {
            title: 'Four icons under categories',
            note: 'Phone shows these in one row: round icon on top, text under it. Upload a small icon and the words. Example: 925 Fine Silver.',
            items: [
                { key: 'perk_1', name: 'Card 1', image: true, label: true, link: true },
                { key: 'perk_2', name: 'Card 2', image: true, label: true, link: true },
                { key: 'perk_3', name: 'Card 3', image: true, label: true, link: true },
                { key: 'perk_4', name: 'Card 4', image: true, label: true, link: true },
            ]
        },
        {
            title: 'Shop For Him / Shop For Her',
            note: 'On the phone these sit side by side. Upload a portrait photo. The text shows under the photo, for example Shop For Him.',
            items: [
                { key: 'audience_him', name: 'Shop For Him', image: true, label: true, link: true },
                { key: 'audience_her', name: 'Shop For Her', image: true, label: true, link: true },
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
            title: 'Under products — 1 banner, then 4 photos',
            note: 'Sits under the product row. One wide banner on top. Under it, four maroon cards scroll sideways. Type the title and upload the photo for each card.',
            items: [
                { key: 'story_banner', name: 'Wide banner', image: true, label: false, link: true },
                { key: 'story_1', name: 'Photo 1', image: true, label: true, link: true },
                { key: 'story_2', name: 'Photo 2', image: true, label: true, link: true },
                { key: 'story_3', name: 'Photo 3', image: true, label: true, link: true },
                { key: 'story_4', name: 'Photo 4', image: true, label: true, link: true },
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
            note: 'Wide banner near the end of the home page. Size 2000 × 1000. Set the link so the photo opens a page.',
            items: [
                { key: 'banner_bottom', name: 'Bottom banner', image: true, label: false, link: true },
            ]
        },
        {
            title: 'Shop by Bond — above the footer',
            note: 'Last block on the home page. Nine portrait photos in a grid, then one wide banner. Each photo and the banner has its own link.',
            items: [
                { key: 'bond_title', name: 'Heading', image: false, label: true, link: false },
                { key: 'bond_1', name: 'Photo 1', image: true, label: true, link: true },
                { key: 'bond_2', name: 'Photo 2', image: true, label: true, link: true },
                { key: 'bond_3', name: 'Photo 3', image: true, label: true, link: true },
                { key: 'bond_4', name: 'Photo 4', image: true, label: true, link: true },
                { key: 'bond_5', name: 'Photo 5', image: true, label: true, link: true },
                { key: 'bond_6', name: 'Photo 6', image: true, label: true, link: true },
                { key: 'bond_7', name: 'Photo 7', image: true, label: true, link: true },
                { key: 'bond_8', name: 'Photo 8', image: true, label: true, link: true },
                { key: 'bond_9', name: 'Photo 9', image: true, label: true, link: true },
                { key: 'bond_banner', name: 'Wide banner', image: true, label: false, link: true },
            ]
        },
    ];

    constructor(
        public sharedService: SharedService,
        private http: HttpClient,
        private categoriesService: CategoriesService
    ) {}

    ngOnInit(): void {
        this.loadAll();
        this.loadCategories();
    }

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

    loadCategories(): void {
        this.categoriesService.getAll().subscribe((res: any) => {
            this.rootCategories = (res?.data || [])
                .filter((c: any) => !c.parentId)
                .sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0) || String(a.name).localeCompare(String(b.name)));
        });
    }

    async uploadCategoryImage(cat: any): Promise<void> {
        const result = await this.sharedService.UploadFile('categories', null, 'image');
        if (result?.url) cat.image = result.url;
    }

    saveCategory(cat: any): void {
        this.savingCatId = cat.id;
        this.categoriesService.update(cat.id, {
            name: cat.name,
            image: cat.image || '',
            parentId: cat.parentId || null,
            sortOrder: cat.sortOrder || 0,
            isActive: cat.isActive,
        }).subscribe(
            () => {
                this.savingCatId = null;
                this.sharedService.showAlert(1, 'Saved');
            },
            () => {
                this.savingCatId = null;
                this.sharedService.showAlert(2, 'Could not save');
            }
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
