export class Province {

  static province = [
    { "sigla": "AG", "nome": "Agrigento" },
    { "sigla": "AN", "nome": "Ancona" },
    { "sigla": "AR", "nome": "Arezzo" },
    { "sigla": "AV", "nome": "Avellino" },
    { "sigla": "BA", "nome": "Bari" },
    { "sigla": "BT", "nome": "Barletta-Andria-Trani" },
    { "sigla": "BO", "nome": "Bologna" },
    { "sigla": "CB", "nome": "Campobasso" },
    { "sigla": "CE", "nome": "Caserta" },
    { "sigla": "FI", "nome": "Firenze" },
    { "sigla": "FG", "nome": "Foggia" },
    { "sigla": "FR", "nome": "Frosinone" },
    { "sigla": "GE", "nome": "Genova" }, // se vuoi inserire Genova
    { "sigla": "GR", "nome": "Grosseto" },
    { "sigla": "IM", "nome": "Imperia" }, // se vuoi Liguria completa
    { "sigla": "IS", "nome": "Isernia" },
    { "sigla": "AQ", "nome": "L'Aquila" },
    { "sigla": "LE", "nome": "Lecce" },
    { "sigla": "LI", "nome": "Livorno" },
    { "sigla": "LU", "nome": "Lucca" },
    { "sigla": "MC", "nome": "Macerata" }, // se vuoi Marche completa
    { "sigla": "MO", "nome": "Modena" },
    { "sigla": "MT", "nome": "Matera" },
    { "sigla": "NA", "nome": "Napoli" },
    { "sigla": "NO", "nome": "Novara" }, // se vuoi Piemonte completa
    { "sigla": "NU", "nome": "Nuoro" },
    { "sigla": "OR", "nome": "Oristano" },
    { "sigla": "PD", "nome": "Padova" }, // se vuoi Veneto completa
    { "sigla": "PA", "nome": "Palermo" },
    { "sigla": "PR", "nome": "Prato" },
    { "sigla": "PE", "nome": "Pescara" },
    { "sigla": "PI", "nome": "Pistoia" },
    { "sigla": "PO", "nome": "Prato" }, // verifica eventuali duplicati
    { "sigla": "PG", "nome": "Perugia" },
    { "sigla": "PU", "nome": "Pesaro-Urbino" },
    { "sigla": "PT", "nome": "Pistoia" },
    { "sigla": "RA", "nome": "Ravenna" },
    { "sigla": "RC", "nome": "Reggio di Calabria" },
    { "sigla": "RE", "nome": "Reggio Emilia" },
    { "sigla": "RI", "nome": "Rimini" },
    { "sigla": "RM", "nome": "Roma" },
    { "sigla": "RO", "nome": "Rovigo" },
    { "sigla": "SA", "nome": "Salerno" },
    { "sigla": "SI", "nome": "Siena" },
    { "sigla": "SO", "nome": "Sondrio" },
    { "sigla": "SS", "nome": "Sassari" },
    { "sigla": "SV", "nome": "Savona" },
    { "sigla": "TA", "nome": "Taranto" },
    { "sigla": "TE", "nome": "Teramo" },
    { "sigla": "TR", "nome": "Terni" },
    { "sigla": "TO", "nome": "Torino" },
    { "sigla": "TP", "nome": "Trapani" },
    { "sigla": "TN", "nome": "Trento" },
    { "sigla": "TV", "nome": "Treviso" },
    { "sigla": "TS", "nome": "Trieste" },
    { "sigla": "UD", "nome": "Udine" },
    { "sigla": "VA", "nome": "Varese" },
    { "sigla": "VB", "nome": "Verbano-Cusio-Ossola" },
    { "sigla": "VC", "nome": "Vercelli" },
    { "sigla": "VE", "nome": "Venezia" },
    { "sigla": "VI", "nome": "Vicenza" },
    { "sigla": "VR", "nome": "Verona" },
    { "sigla": "VT", "nome": "Viterbo" }
  ].sort((a, b) => a.nome.localeCompare(b.nome)); // ordine alfabetico per nome

}
