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
    primaryColor : string = '#212326';
    secondaryColor : string = '#151618';
    accentColor : string = '#c9a24a';
    backgroundColor : string = '#ffffff';
    headingColor : string = '#212326';
    textColor : string = '#212326';
    headingFont : string = 'Outfit';
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