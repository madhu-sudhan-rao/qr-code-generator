import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  form: FormGroup;
  qrCodeDownloadLink!: SafeUrl;
  text!: string;
  show: boolean = false

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      text: [null, Validators.required],
    })
  }

  onSubmit(): void {
    this.text = this.form.value.text;
    this.show = true;
  }

  getURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  async pasteFromClipboard() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      this.form.patchValue({
        text: clipboardText
      })
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  }


}
