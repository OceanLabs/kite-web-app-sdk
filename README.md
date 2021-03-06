# Kite Web App SDK

The Kite Web App SDK provides an interface to launch into the Kite/Prodigi web apps.

Included web app:
- Print Shop

## Table of Contents
- [Installation](#installation)
- [API](#api)

## Installation

Install using NPM:

```
npm install @kite-tech/web-app-sdk
```
    
### Import

#### ES6 module

```js
import { KiteWebAppSdk } from '@kite-tech/web-app-sdk';
```

#### Require

```js
const KiteWebAppSdk = require('@kite-tech/web-app-sdk');
```

### Suggested JavaScript Usage

Import the script in the html or package it with your app.

```html
// From CDN
<script src="https://unpkg.com/@kite-tech/web-app-sdk"></script>

// From local node_modules
<script src="/node_modules/@kite-tech/web-app-sdk"></script>
```

## API

### Launch with Items

Launches an app with some images in the user's image collector, some existing
line items or both.

It may be useful to use the `KiteWebAppSdk.initaliseLineItem` or
the `KiteWebAppSdk.initialiseCollectorImage` to create the line items or the
collector images with default values.

```js
KiteWebAppSdk.launchWithItemsAndImages({
    baseUrl: 'https://shop.prodigi.com/prodigi/',
    collectorImages: [{
        dimensions: {
            width: 100,
            height: 150,   
        },
        id: 'imageId',
        isUploadComplete: true,
        thumbnailUrl: 'imageThumbnailUrl',
        url: 'imageUrl',
    }],
    lineItems: [{
        designId?: string
        images: [{
            filters: null,
            mirror: false,
            rotate_degrees: 0,
            scale: 1,
            aspect?: 'fit', // Optional Property to aspect fit the image inside specified template
            tx: 0,
            ty: 0,
            url_full: 'image1Url',
            url_preview: 'image1Preview'
        }],
        affiliate_id: 'affiliateId',
        templateId: 'kiteTemplateId',
        variantName: 'variantName',
    }],
});
```

Other [options](#options) are available.

### Intialise Methods

#### Initialise Collector Image

Generates a collector image with default values.

- `id` will default to a random GUID

```js
const collectorImage = KiteWebAppSdk.initialiseCollectorImage(
    'imageUrl',
    'imageThumbnailUrl',
    {
        width: 100,
        height: 150,   
    },
    'imageId'
);
```

This will return the following object:
```js
{
    dimensions: {
        width: 100,
        height: 150,   
    },
    id: 'imageId',
    isUploadComplete: true,
    thumbnailUrl: 'imageThumbnailUrl',
    url: 'imageUrl',
}
```

#### Initialise Line Item

Generates a line item with default values.

- `variantName` defaults to `cover` if not set.
- `id` defaults to a random UUID if not set.

```js
const lineItem = KiteWebAppSdk.initaliseLineItem(
    'kiteTemplateId',
    [{
        urlFull: 'image1Url',
        urlPreview: 'image1Preview',
    }],
    'lineItemId',
    'variantName',
);
```

This will return the following object:

```js
{
    images: [
        filters: null,
        mirror: false,
        rotate_degrees: 0,
        scale: 1,
        tx: 0,
        ty: 0,
        url_full: 'image1Url',
        url_preview: 'image1Preview'
    ],
    templateId: 'kiteTemplateId',
    variantName: 'variantName',
}
```

### Launch from JSON

Launches the app from the state JSON for loading a stored user state.

```js
KiteWebAppSdk.launchFromJSON({
    appStateJSONString: JSON.stringify({
        appState: 'exampleState'
    }),
    baseUrl: 'http://dev-wall-art.kite.ly/canon/'
});
```

Other [options](#options) are available.

### Options

These other options can be used both for the `launchFromJSON` and the
`launchWithItemsAndImages` functions.

- All of these except `baseUrl` are optional.

- By default, user uploads _are enabled_ and the associated interface controls made visible. This functionality can be set manually either in the Angular module for a partner's app (`brandSettings.featureSettings.userUploadsAllowed`) or through the SDK (`config.userUploadsAllowed`). Note that any user uploads setting defined via the SDK will override the corresponding setting, if set, in the partner's app module file.

```typescript
{
    baseUrl: string,
    brandSettings?: {
        brandColor?: string; // Color to be used on the checkout
        brandName?: string; // Brand name to get branch info
        checkoutLogoImage?: string; // Logo Image used on checkout
        checkoutLogoLinkUrl?: string; // Logo link for logo image on checkout
        mixpanelToken: string; // Mixpanel token to use for tracking
        publishableKey: string; // Kite partner public key
        testPublishableKey: string; // Kite partner public key for testing
        universalAnalyticsToken?: string; // GA Token for tracking
        userUploadsAllowed?: boolean; // Set whether the user can upload own images.
    },
    breadCrumbs?: [{ // If present adds breadcrumbs separated by chevrons
        text: string, // Bread crumb text to display
        url?: string, // URL to redirect to if text is clicked
        target?: string // URL href target, for example '_blank' for new tab and '_self': for current window
    }],
    config?: {
        startInNewTab?: boolean; // Set to `true` to have UI open in new tab.
        returnToUrl?: string; // If set, UI will display a button to enable users to return to the URL specified. Suitable for partners wishing to have users able to return to their own websites.
        userUploadsAllowed?: boolean; // Set whether users can upload photos.
        customer_id?: string;
    },
    checkout?: {
        checkoutUrl?: string; // Url of the checkout to call
        cancelCallbackUrls?: Array<{
            // Array of urls and methods that gets called when the user presses
            // cancel on the checkout
            method?: string;
            url?: string;
        }>;
        successCallbackUrls?: Array<{
            // Array of urls and methods that gets called when the user makes
            // a successful purchase
            method?: string;
            url?: string;
        }>;
        // User gets redirected to this URL when completing the checkout
        successRedirectUrl?: string;
    },
    checkoutUserFields?: {
        shippingAddress?: {
            // Prepopulated details when the user gets to the checkout
            recipient_first_name?: string;
            recipient_last_name?: string;
            address_line_1?: string;
            address_line_2?: string;
            city?: string;
            county_state?: string;
            postcode?: string;
            country?: string;   
        };
        // Email set for the user when they reach the checkout
        customerEmail?: string;
        // Set to automatically opt the user in for marketting
        termsOfService?: boolean;   
    },
    collectorImages?: [{ // Array of objects containing images that can be loaded onto products
        dimensions: {
            width: number,
            height: number,   
        },
        id: string,
        isUploadComplete: boolean,
        thumbnailUrl: string,
        url: string,
    }],
    lineItems?: [{ // Array of objects defining images and variants of products to be added to basket on launch
        designId?: string
        images: [{
            filters: string,
            mirror: boolean,
            rotate_degrees: number,
            scale: number,
            aspect?: string, // Optional Property to aspect fit the image inside specified template
            tx: number,
            ty: number,
            url_full: string,
            url_preview: string
        }],
        id: string,
        affiliate_id?: string,
        templateId: string,
        variantName: string,
        options?: {
            color: string 
        }
    }],
     // Reference Id for the customers order. Used by things like the checkout
     // callbacks to inform which user it is.
    referenceId?: string,
    // Custom content to include in the footer. Allows for an array of
    // links.
    footer?: {
        links?: [
            {
                // Text for link if no translations provided.
                defaultText: string;
                // `language_code` is the two letter ISO 639-1 code for the language.
                // E.g., `en` for English.
                translations?: {
                    [language_code: string]: [text: string]
                },
                url: string;
                // Set `newFrame` to `true` to open URL in new window/tab.
                newFrame: boolean;              
            }
        ]
    }
}
```
