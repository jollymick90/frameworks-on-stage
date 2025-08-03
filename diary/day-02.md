
## Day 2 - 
I started familiarizing myself with Playwright-core ([documentation](https://playwright.dev/docs/library)), practicing basic commands such as `page.click` and `page.locator`. I created a very simple page with a single button: clicking this button generates a new `div` element. This minimal setup allows me to easily measure rendering times.

Initially, my goal was to study the code in the [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) repository and extract only the necessary parts to run some targeted tests.

During planning, I reflected on which UI components actually deserved benchmarking. Not everything can be effectively evaluated by simply creating, modifying, or deleting DOM elements. For example, testing rendering technologies (React, Angular, etc.) with libraries like Chart.js or Three.js, which primarily operate on a single canvas element, would not yield meaningful results. These tools operate on a single `<canvas>` node with unique properties, and the framework would only add it to the DOM without significant additional handling.

Therefore, I decided a good initial strategy would be replicating an existing test from js-framework-benchmark, such as CRUD operations on tables, since this is a very common and practical use case.

However, I wondered if there might be more original and engaging scenarios for testing framework performance, such as:

1. **Dynamic Tree:** Simulate a complex hierarchical structure with numerous nodes, assessing the speed of expanding and collapsing branches, similar to file system navigation.

2. **Dynamic Heatmap:** A grid of variable dimensions (e.g., 50x50 or 1000x1000), where each cell initially has a unique color that dynamically changes, simulating a continuous data stream. This test is useful for measuring performance related to updating many DOM elements.

3. **Body Simulation:** Visualize a set of physical elements (e.g., spheres) continuously moving across the screen. Each point is represented by a DOM element (`<div>` or SVG).

4. **Game of Life:** A classic simulation generating a substantial number of real-time DOM modifications, useful for testing framework performance in highly dynamic scenarios.

Addressing these hypotheses clearly highlighted the complexity of directly using the original benchmark code. Consequently, I chose a simpler and more gradual strategy:

* I will start with extremely simple UI components, progressively increasing complexity by gradually adding DOM elements.
* I will initially focus on mastering Playwright thoroughly, building a solid foundation to proceed with more advanced tests.


### Italian Version

Ho iniziato a familiarizzare con Playwright-core ([documentazione](https://playwright.dev/docs/library)), mettendo in pratica alcuni comandi base come `page.click` e `page.locator`. Ho creato una pagina estremamente semplice composta da un singolo pulsante: cliccando il pulsante viene generato un nuovo elemento `div`. Questa configurazione minima mi consente di iniziare a misurare i tempi di rendering con facilità.

Inizialmente il mio obiettivo era quello di studiare il codice presente nel repository di [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) ed estrarne solo le parti necessarie per eseguire alcuni test mirati.

Durante la pianificazione, ho riflettuto su quali componenti UI meritassero effettivamente di essere sottoposti a benchmark. Non tutto infatti può essere valutato correttamente attraverso la semplice operazione di creazione, modifica o eliminazione di elementi DOM. Ad esempio, testare tecnologie di rendering (React, Angular, ecc.) utilizzando librerie come Chart.js o Three.js, che si basano principalmente su un singolo elemento canvas, non produrrebbe risultati utili. Questi strumenti operano infatti su un unico nodo `<canvas>` dalle caratteristiche particolari, e il framework in questione si limiterebbe semplicemente ad aggiungerlo al DOM, senza alcuna ulteriore gestione significativa.

Ho quindi deciso che una buona strategia iniziale potesse essere quella di replicare un test già presente in js-framework-benchmark, ad esempio il CRUD su tabelle. È un caso d'uso estremamente comune e pratico.

Tuttavia, mi sono domandato se esistessero altri scenari più originali e stimolanti per testare le performance dei framework, quali ad esempio:

1. **Dynamic Tree (Albero Gerarchico Dinamico):** Simulare una struttura gerarchica complessa con numerosi nodi, valutando la rapidità di espansione e contrazione dei rami, come avviene ad esempio in una navigazione di tipo file system.

2. **Heatmap Dinamica:** Una griglia di dimensioni variabili (ad es. 50x50 o 1000x1000), in cui ogni cella possiede inizialmente un colore unico che cambia dinamicamente, simulando un flusso continuo di dati. Questo test è utile per misurare le performance relative all'aggiornamento di un gran numero di elementi DOM.

3. **Body Simulation (Simulazione di punti fisici):** Visualizzare un insieme di elementi fisici (ad es. sfere) che si muovono continuamente sullo schermo. Ciascun punto viene rappresentato da un elemento DOM (`<div>` o SVG).

4. **Game of Life:** Una simulazione classica che genera un notevole numero di modifiche al DOM in tempo reale, utile per testare le performance dei framework in scenari altamente dinamici.

Affrontando queste ipotesi, è emersa chiaramente la complessità di utilizzare direttamente il codice presente nel benchmark originale. Di conseguenza, ho deciso di adottare una strategia più semplice e graduale:

* Inizierò con componenti UI estremamente semplici, incrementando progressivamente la complessità tramite l'aggiunta graduale di elementi DOM.
* Concentrerò la fase iniziale sul padroneggiare a fondo Playwright, consolidando le basi per procedere poi con test più avanzati.

