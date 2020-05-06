import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { FontDetector } from './font-detector';

/**
 *  Generate a unique fingerprint of the browser
 *  Uses canvas + fonts
 *  See https://stackoverflow.com/questions/47536063/how-to-recognize-user-from-different-browsers/47536192#47536192
 */
@Injectable({providedIn: 'root'})
export class FingerprintService {

    document: Document;

    constructor(@Inject(DOCUMENT) doc) {
        this.document = doc;
    }

    public getFingerprint(collectionId?: string): Promise<string> {
        let  keys = [];

        if (collectionId) {
            keys.push(collectionId);
        }

        if (this.isCanvasSupported()) {
            keys.push(this.getCanvasFingerprint());
        } else {
            keys.push(navigator.userAgent);
            keys.push(navigator.languages);
            keys.push(new Date().getTimezoneOffset());
        }

        const fontDetector = new FontDetector(this.document);
        keys = keys.concat(fontDetector.getFonts());

        return this.digestMessage(keys.join(''));
    }

    isCanvasSupported(): boolean {
        const elem = this.document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    // https://www.browserleaks.com/canvas#how-does-it-work
    private getCanvasFingerprint(): string {
        const canvas = this.document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const txt = 'CANVAS_FINGERPRINT';
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText(txt, 4, 17);
        return canvas.toDataURL();
    }

    // TODO support IE: http://web-developer-articles.blogspot.com/2015/05/web-cryptography-api.html
    // TODO consider: http://www.movable-type.co.uk/scripts/sha256.html
    // Also https://github.com/crypto-browserify
    async digestMessage(message: string): Promise<string> {
        const msgUint8 = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return new Promise(resolve => {
            resolve(hashHex);
        });
    }

}
