import { Component } from '@angular/core';
import { siteConfigReqModel } from './site-configuration.model';
import { SharedService } from '../../shared/services/shared.service';
import { SiteConfigService } from './site-configuration.service';

@Component({
  selector: 'app-site-configuration',
  templateUrl: './site-configuration.component.html',
  styleUrl: './site-configuration.component.scss'
})
export class SiteConfigurationComponent {
  isDataLoaded = false;
  siteConfig: siteConfigReqModel = new siteConfigReqModel();
  headingFonts = ['Cormorant Garamond', 'Playfair Display', 'Cinzel', 'Libre Baskerville'];
  bodyFonts = ['Outfit', 'Jost', 'Manrope', 'Nunito Sans'];

  constructor(
    public sharedservice: SharedService,
    private siteconfigservice: SiteConfigService,
  ) {}

  ngOnInit(): void {
    this.getSiteConfig();
  }

  getSiteConfig() {
    this.siteconfigservice.getSiteConfig().subscribe((res: any) => {
      const config = res.data[0] || {};
      this.siteConfig.siteName = config.siteName || '';
      this.siteConfig.clientUrl = config.clientUrl || '';
      this.siteConfig.logo = config.logo || '';
      this.siteConfig.whiteLogo = config.whiteLogo || '';
      this.siteConfig.icon = config.icon || '';
      this.siteConfig.tagline = config.tagline || 'Fine jewellery, made to be lived in.';
      this.siteConfig.mobile = config.mobile || '';
      this.siteConfig.email = config.email || '';
      this.siteConfig.instagramURL = config.instagramURL || '';
      this.siteConfig.facebookURL = config.facebookURL || '';
      this.siteConfig.twitterURL = config.twitterURL || '';
      this.siteConfig.youtubeURL = config.youtubeURL || '';
      this.siteConfig.linkedInURL = config.linkedInURL || '';
      this.siteConfig.currency = config.currency || '₹';
      this.siteConfig.deliveryCharge = config.deliveryCharge ?? 0;
      this.siteConfig.primaryColor = config.primaryColor || '#1c1410';
      this.siteConfig.secondaryColor = config.secondaryColor || '#3d2b1f';
      this.siteConfig.accentColor = config.accentColor || '#c4a265';
      this.siteConfig.backgroundColor = config.backgroundColor || '#faf7f2';
      this.siteConfig.headingColor = config.headingColor || '#1c1410';
      this.siteConfig.textColor = config.textColor || '#6b5e52';
      this.siteConfig.headingFont = config.headingFont || 'Cormorant Garamond';
      this.siteConfig.bodyFont = config.bodyFont || 'Outfit';
      this.siteConfig.marqueeItems = Array.isArray(config.marqueeItems) && config.marqueeItems.length
        ? config.marqueeItems
        : this.siteConfig.marqueeItems;
      this.siteConfig.metaPixelId = config.metaPixelId || '';
      this.siteConfig.metaAccessToken = config.metaAccessToken || '';
      this.siteConfig.buyNowText = config.buyNowText || 'Buy Now';
      this.siteConfig.buyNowSubtext = config.buyNowSubtext || '';
      this.sharedservice.setPrimaryColor(this.siteConfig.primaryColor);
      this.sharedservice.siteConfig = config;
      this.isDataLoaded = true;
    });
  }

  async pickImage(field: 'logo' | 'whiteLogo' | 'icon') {
    const file = await this.sharedservice.UploadFile('siteconfig/', null, 'image');
    if (file?.url) this.siteConfig[field] = file.url;
  }

  addMarquee() {
    this.siteConfig.marqueeItems.push({ emoji: '✦', text: '' });
  }

  removeMarquee(index: number) {
    this.siteConfig.marqueeItems.splice(index, 1);
  }

  updateSiteConfig() {
    const payload = {
      ...this.siteConfig,
      marqueeItems: (this.siteConfig.marqueeItems || []).filter(item => item.text && item.text.trim())
    };
    this.siteconfigservice.updateSiteConfig(payload).subscribe(() => {
      this.sharedservice.setPrimaryColor(this.siteConfig.primaryColor);
      this.sharedservice.showAlert(1, 'Configuration Updated Successfully');
    }, () => {
      this.sharedservice.showAlert(2, 'Technical Issue Found !');
    });
  }
}
