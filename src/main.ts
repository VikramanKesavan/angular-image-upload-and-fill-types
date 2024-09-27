import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
     <input type="file" (change)="onFileSelected($event)" /> <br/>
    <img class="contain-image size-image" *ngIf="sanitizedImageUrl" [src]="sanitizedImageUrl" alt="Sanitized Image" />
    <br/>
    <img class="cover-image size-image" *ngIf="sanitizedImageUrl" [src]="sanitizedImageUrl" alt="Sanitized Image"/>
    <br/>
    <img class="fill-image size-image" *ngIf="sanitizedImageUrl" [src]="sanitizedImageUrl" alt="Sanitized Image"/>
    <br/>
    <img class="none-image size-image" *ngIf="sanitizedImageUrl" [src]="sanitizedImageUrl" alt="Sanitized Image"/>
  `,
})
export class App {
  sanitizedImageUrl: SafeUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const unsafeImageUrl = e.target.result;
        this.sanitizedImageUrl =
          this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
      };
      reader.readAsDataURL(file);
    }
  }
}

bootstrapApplication(App);
