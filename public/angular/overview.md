🧩 Angular: Concetti Fondamentali
Angular è un framework open-source sviluppato da Google per la creazione di applicazioni web dinamiche e strutturate. Utilizza TypeScript e si basa su un'architettura a componenti.​

🔹 Componenti (@Component)
I componenti sono le unità fondamentali di Angular. 
Ogni componente è costituito da:

    Un template HTML che definisce la vista.

    Una classe TypeScript che gestisce la logica e i dati.

    Un foglio di stile CSS per la presentazione.​

I componenti controllano porzioni specifiche dell'interfaccia utente e possono essere riutilizzati in diverse parti dell'applicazione. ​
seozoom.it


🔹 Moduli (@NgModule)
I moduli organizzano logicamente l'applicazione, raggruppando componenti, direttive, pipe e servizi correlati. Il modulo principale (AppModule) è il punto di ingresso dell'applicazione. ​


🔹 Servizi e Dependency Injection
I servizi sono classi che contengono logica condivisa e possono essere iniettati nei componenti tramite il sistema di Dependency Injection di Angular. Questo favorisce la modularità e il riutilizzo del codice.​

🔹 Data Binding
Angular offre diverse modalità di data binding per sincronizzare i dati tra il modello e la vista:

    [
        Interpolation: {{ variabile }} per visualizzare dati.

        Property Binding: [property]="variabile" per passare dati dal componente alla vista.

        Two-way Binding: [(ngModel)]="variabile" per una sincronizzazione bidirezionale.​
    ]

    In entrambi i casi lato typeScript abbiamo semplicemente una variabile:

        export class ExampleComponent {
            imageUrl = 'https://via.placeholder.com/150';
            isDisabled = false;
        }

        
    Event Binding: (evento)="metodo()" per gestire eventi dell'utente.

        export class ExampleComponent {
            handleClick() {
                console.log('Button clicked!');
            }
        }

🔹 Routing
Il modulo di routing permette la navigazione tra diverse viste o componenti, definendo percorsi (routes) e associandoli a componenti specifici.

