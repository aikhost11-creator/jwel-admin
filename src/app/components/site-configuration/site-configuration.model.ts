export class siteConfigReqModel{
    [key: string]: any;
    siteName : string;
    clientUrl : string;
    logo : string;
    whiteLogo : string;
    icon : string;
    mobile : string;
    email : string;
    currency : string = '£';
    deliveryCharge : number = 20;
    primaryColor : string = '#1c1410';
    secondaryColor : string = '#3d2b1f';
    accentColor : string = '#c4a265';
    backgroundColor : string = '#faf7f2';
    headingColor : string = '#1c1410';
    textColor : string = '#6b5e52';
    headingFont : string = 'Cormorant Garamond';
    bodyFont : string = 'Outfit';
    tagline : string = 'Fine jewellery, made to be lived in.';
    marqueeItems : { emoji: string; text: string }[] = [
        { emoji: '✦', text: 'Complimentary shipping on prepaid orders' },
        { emoji: '◆', text: 'Hallmarked gold and certified stones' },
        { emoji: '✧', text: 'Easy returns within 7 days' },
        { emoji: '◈', text: 'Quick checkout available' }
    ];
    metaPixelId   : string = '';
    metaAccessToken : string = '';
    buyNowText    : string = 'BUY NOW';
    buyNowSubtext : string = '';

    instagramURL : string;
    facebookURL : string;
    twitterURL : string;
    linkedInURL : string;
    youtubeURL : string;

    enablePlayerLogin : boolean;
}