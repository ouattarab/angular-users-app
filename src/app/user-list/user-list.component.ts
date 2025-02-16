import { Component, OnInit } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { UserService } from '../services/user.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver'; // Import FileSaver.js
//import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, NgxDatatableModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'name', name: 'Nom' },
    { prop: 'email', name: 'Email' },
    { prop: 'age', name: 'Âge' },
    { prop: 'city', name: 'Ville' }
  ];
  selectedFileName: string | null = null; // Propriété pour stocker le nom du fichier sélectionné

  constructor(private userService: UserService, private ngxCsvParser: NgxCsvParser) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data || [];
        console.log("Données reçues:", this.users);
      },
      error: (err) => console.error("Erreur lors de la récupération des utilisateurs:", err)
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name; // Stocke le nom du fichier sélectionné
      this.ngxCsvParser.parse(file, { header: true, delimiter: ',' })
        .pipe()
        .subscribe({
          next: (result): void => {
            if (Array.isArray(result)) {
              console.log('Résultat du parsing CSV:', result);
              this.users = result; // Affectation seulement si result est un tableau
            } else {
              console.error("Erreur de parsing CSV :", result);
            }
          },
          error: (error: NgxCSVParserError): void => {
            console.error('Erreur lors du parsing CSV:', error);
          }
        });
    }
  }

  

 /* exportToCSV(): void {
    if (this.users.length === 0) {
      console.warn("Aucune donnée à exporter.");
      return;
    }
  
    // Définir les en-têtes du fichier CSV
    const headers = this.columns.map(col => col.name).join(';'); // Utilisation du ";" pour séparer les colonnes
  
    // Générer les lignes du CSV
    const csvRows = this.users.map(user =>
      this.columns.map(col => user[col.prop]).join(';') // Chaque ligne correspond aux valeurs de chaque colonne
    );
  
    // Assembler tout le contenu
    const csvContent = [headers, ...csvRows].join('\n');
  
    // Créer un blob et déclencher le téléchargement
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'utilisateurs.csv');
  } */

    exportToCSV(): void {
      if (this.users.length === 0) {
        console.warn("Aucune donnée à exporter.");
        return;
      }
    
      // Définir les en-têtes du fichier CSV
      const headers = this.columns.map(col => col.name).join(';'); // Séparateur ";"
    
      // Générer les lignes du CSV
      const csvRows = this.users.map(user =>
        this.columns.map(col => user[col.prop]).join(';')
      );
    
      // Assembler tout le contenu
      const csvContent = [headers, ...csvRows].join('\n');
    
      // Créer un blob et déclencher le téléchargement (sans import)
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
    
      // Créer un lien invisible et déclencher le téléchargement
      const a = document.createElement('a');
      a.href = url;
      a.download = 'utilisateurs.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    
      // Libérer l'URL du blob après utilisation
      window.URL.revokeObjectURL(url);
    }
    
    
  
  
  
}
