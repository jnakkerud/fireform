import { Injectable } from '@angular/core';

import { AngularFireFunctions } from '@angular/fire/compat/functions';

import { CollectionItem } from '../collection-service/collection.service';

@Injectable({providedIn: 'root'})
export class DownloadService {
    constructor(private fns: AngularFireFunctions) { }

    downloadCsv(item: CollectionItem) {
        // Generate the filename
        const filename = `${item.name}_${Date.now()}.csv`;

        const callable = this.fns.httpsCallable('downloadCSV');
        const result = callable({ collectionId: item.id });
        result.subscribe(data => this.saveFile(data, filename));
    }

    private saveFile(csvContent: any, filename: string) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
