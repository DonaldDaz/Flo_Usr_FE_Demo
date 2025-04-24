import { Component } from '@angular/core';
import { UserService, User } from '../../shared/user.service';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.scss'],
  standalone: true,
})
export class FileLoaderComponent {
  csvData: User[] = []; // Data extracted from the CSV file
  selectedFile: File | null = null; // File selected by the user
  loading = false;

  constructor(private userService: UserService) {}

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.parseCsvFile(this.selectedFile);
    }
  }

  // Parse the CSV file and extract data
  parseCsvFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const csvContent = e.target?.result as string;
      const rows = csvContent.split('\n');
      this.csvData = rows
        .slice(1) // Skip the header row
        .map((row) => {
          const [firstName, lastName, email, address] = row.split(',');
          return { firstName, lastName, email, address } as User;
        })
        .filter((user) => user.firstName && user.lastName); // Filter out invalid rows
    };
    reader.readAsText(file);
  }

  // Upload the selected file to the server
  uploadCsv(): void {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }

    this.loading = true;
    this.userService.uploadCsv(this.selectedFile).subscribe({
      next: () => {
        alert('File uploaded successfully!');
        this.loading = false;
        this.csvData = []; // Clear the table after upload
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Error uploading file:', err);
        alert('Failed to upload the file.');
        this.loading = false;
      },
    });
  }
}
