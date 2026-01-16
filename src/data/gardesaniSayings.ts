// Proverbi e detti del Lago di Garda e zone limitrofe
// Mix di dialetto gardesano, veronese e bresciano

export const gardesaniSayings = [
    // Saggezza popolare
    { text: "Chi va pian, va san e va lontan", meaning: "Chi va piano va sano e va lontano" },
    { text: "El Garda l'è come la vita: calmo de fora, fondo de dentro", meaning: "Il Garda è come la vita" },
    { text: "Acqua ciara, pesce bon", meaning: "Acqua chiara, pesce buono" },
    { text: "Chi semina vento, racoje tempesta", meaning: "Chi semina vento raccoglie tempesta" },
    { text: "La boca l'è mia stracca se la sa de vaca", meaning: "Non ci si stanca mai del buon formaggio" },

    // Sul tempo e le stagioni
    { text: "Quando el Baldo mette el capèl, o che piove o che fa bèl", meaning: "Il Monte Baldo predice il tempo" },
    { text: "Ora de Garda, tempo che cambia", meaning: "Il vento Ora porta cambiamento" },
    { text: "Pèlèr de matina, bel tempo che cammina", meaning: "Vento Peler al mattino, bel tempo" },
    { text: "Nuvole sul Baldo de sera, bon tempo se spera", meaning: "Nuvole serali sul Baldo, bel tempo" },
    { text: "Quando canta el merlo, semo fora de l'inverno", meaning: "Il canto del merlo annuncia primavera" },

    // Sul cibo e il vino
    { text: "Pan e vin, mangia da re e dormi da porco", meaning: "Con pane e vino si vive bene" },
    { text: "Chi beve sol acqua, mal consiglia", meaning: "Chi beve solo acqua non ragiona" },
    { text: "L'olio de Garda l'è oro liquido", meaning: "L'olio del Garda è oro liquido" },
    { text: "Polenta e sardelle, se magna anche le budelle", meaning: "Con polenta e sardine si mangia tutto" },
    { text: "Vin vecio, amico vecio", meaning: "Vino vecchio, amico vecchio" },

    // Sulla vita
    { text: "Ogni dì che el sol se leva, porta na speransa nova", meaning: "Ogni giorno porta speranza" },
    { text: "Chi ride l'ultimo, ride mejo", meaning: "Chi ride ultimo ride meglio" },
    { text: "Mejo tardi che mai, ma mejo mai che tardi", meaning: "Meglio tardi che mai" },
    { text: "La vita l'è comme el lago: bisogna saverla navigar", meaning: "La vita è come il lago" },
    { text: "No sta pianzer sul lat versà", meaning: "Non piangere sul latte versato" },

    // Sul lavoro
    { text: "Chi lavora magna, chi no lavora magna e beve", meaning: "Chi non lavora vive meglio (ironico)" },
    { text: "El laoro el fa meraveje, la poltroneria ruje", meaning: "Il lavoro fa meraviglie" },
    { text: "Prima el dover e dopo el piaser", meaning: "Prima il dovere poi il piacere" },
    { text: "Chi dorme no ciapa pesci", meaning: "Chi dorme non piglia pesci" },
    { text: "La matina l'à l'oro in boca", meaning: "Il mattino ha l'oro in bocca" },

    // Sull'amore e la famiglia
    { text: "Amor de mare, amor che no more mai", meaning: "L'amore della mamma è eterno" },
    { text: "Casa mia, casa mia, per piccina che tu sia", meaning: "Casa dolce casa" },
    { text: "Chi trova n'amigo, trova n'tesoro", meaning: "Chi trova un amico trova un tesoro" },
    { text: "El cuor no l'è n'sasso", meaning: "Il cuore non è un sasso" },
    { text: "L'amor l'è ceco ma el vede tuto", meaning: "L'amore è cieco ma vede tutto" },

    // Sull'economia (perfetti per un calcolatore bollette!)
    { text: "Chi sparagna in gioventù, no patisce in veciaia", meaning: "Chi risparmia da giovane sta bene da vecchio" },
    { text: "I schei i fa vegnir driti i gobi", meaning: "I soldi raddrizzano i gobbi" },
    { text: "Chi più spende, manco spende", meaning: "Chi più spende meno spende (qualità)" },
    { text: "No se pol cavar sangue da na rapa", meaning: "Non si può cavare sangue da una rapa" },
    { text: "Tanti schei, tanti pensieri", meaning: "Tanti soldi, tanti problemi" },

    // Sul carattere
    { text: "Chi tase, aconsente", meaning: "Chi tace acconsente" },
    { text: "Mejo solo che mal compagnà", meaning: "Meglio soli che male accompagnati" },
    { text: "Chi va co lo zoppo, impara a zopegar", meaning: "Chi va con lo zoppo impara a zoppicare" },
    { text: "La lingua la bate dove el dente dole", meaning: "Si parla sempre di ciò che preoccupa" },
    { text: "Chi lauda se stesso, s'imbroda", meaning: "Chi si loda si imbroda" },

    // Su natura e lago
    { text: "El Garda l'è el cuor de l'Italia", meaning: "Il Garda è il cuore d'Italia" },
    { text: "L'acqua del Garda la fa miracoi", meaning: "L'acqua del Garda fa miracoli" },
    { text: "Quando el lago el specia, l'anima la se queta", meaning: "Il lago calmo quieta l'anima" },
    { text: "I limonei del Garda, profumo de paradiso", meaning: "I limoneti del Garda" },
    { text: "Olivi e viti, richeze benedite", meaning: "Olivi e viti sono benedizioni" },

    // Humor gardesano
    { text: "Se no i te coppa, te guariss", meaning: "Se non ti uccide ti guarisce" },
    { text: "Par drio sona sempre le campane", meaning: "Dietro suonano sempre le campane" },
    { text: "Chi nassé tondo no more quadro", meaning: "Chi nasce tondo non muore quadrato" },
    { text: "L'è mejo aver na bota piena che sent bote vode", meaning: "Meglio una botte piena che cento vuote" },
    { text: "Tra el dir e el far ghe sta de meso el mar", meaning: "Tra il dire e il fare c'è di mezzo il mare" },
];

export const getRandomSaying = () => {
    return gardesaniSayings[Math.floor(Math.random() * gardesaniSayings.length)];
};
