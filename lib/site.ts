/**
 * Alle Inhalte der Praxis-Website an einem Ort.
 * Quelle: pongracz-psychotherapie.com (Stand Oktober 2026).
 */

export const practice = {
  name: "Mag. phil. Laudina Pongrácz",
  shortName: "Laudina Pongrácz",
  role: "Psychotherapeutin",
  methods: [
    "Psychoanalytisch-Psychodynamische Therapie",
    "Hypnosepsychotherapie",
    "Krisenintervention & Notfallpsychologie",
  ],
  registration: "Eintragungsnummer 11274 in der Liste des Bundesministeriums für Gesundheit",
  phone: "+43 676 56 23 337",
  phoneHref: "tel:+436765623337",
  signalHref: "https://signal.me/#p/+436765623337",
  smsHref: "sms:+436765623337",
  email: "praxis@pongracz-psychotherapie.com",
  url: "https://www.pongracz-psychotherapie.com",
};

export const locations = [
  {
    id: "wien",
    title: "Praxis Wien",
    place: "Wien",
    short: "Heinrichsgasse 3, 1010 Wien",
    art: "wien" as const,
    image: "standortWien" as const,
    lines: ["Heinrichsgasse 3, 2. Stock, Tür 18b", "1010 Wien"],
    note: "Schottenring, Ecke Rudolfsplatz",
    mapHref: "https://www.google.com/maps/search/?api=1&query=Heinrichsgasse%203%2C%201010%20Wien",
  },
  {
    id: "eggendorf",
    title: "Praxis Niederösterreich",
    place: "Niederösterreich",
    short: "Außer Ort 70, 2031 Eggendorf im Thale",
    art: "weinviertel" as const,
    image: "standortNoe" as const,
    lines: ["Außer Ort 70", "2031 Eggendorf im Thale"],
    note: "Bezirk Hollabrunn",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Au%C3%9Fer%20Ort%2070%2C%202031%20Eggendorf%20im%20Thale",
  },
];

export const navigation = [
  { href: "/#psychotherapie", label: "Psychotherapie" },
  { href: "/#hypnose", label: "Hypnose" },
  { href: "/#schwerpunkte", label: "Schwerpunkte" },
  { href: "/#ueber-mich", label: "Über mich" },
  { href: "/#setting", label: "Setting" },
  { href: "/#kontakt", label: "Kontakt" },
];

export const psychotherapy = {
  lead: "Psychotherapie hilft, seelisches Leid zu lindern, Lebenskrisen zu bewältigen und belastende Denk- und Verhaltensmuster zu verändern.",
};

export const hypnosis = {
  lead: "Die Hypnosepsychotherapie arbeitet mit veränderten Bewusstseinszuständen und nutzt das Potenzial, das in jedem Menschen liegt. In der Trance, einem natürlichen Zustand nach innen gerichteter Aufmerksamkeit, wachsen Gelassenheit, Sicherheit und Kraft.",
  note: "Als tiefenpsychologisches Verfahren hilft sie, frühere Erlebnisse und Traumata zu verarbeiten; ihre Wirkung auf Psyche und Körper ist wissenschaftlich gut belegt. Grundlage ist eine vertrauensvolle therapeutische Beziehung, den Ablauf stimmen wir gemeinsam ab.",
  helpsWith: ["Ängste", "Depressionen", "Traumata", "Psychosomatische Beschwerden", "Essstörungen", "Chronische Leiden"],
};

export type Focus = {
  id: string;
  title: string;
  icon: string;
  /** Ausführlicher Text, öffnet sich im Dialog. */
  body?: { heading?: string; text: string }[];
  /** Kurzer Zusatz für Schwerpunkte ohne ausführlichen Text. */
  note?: string;
};

export const focusAreas: Focus[] = [
  {
    id: "trauma",
    title: "Traumatherapie, transgenerationale Weitergabe von Traumata",
    icon: "Layers",
    body: [
      {
        text: "Psychische Traumatisierungen sind die Folge von extrem belastenden Ereignissen oder übergriffigen bzw. gewalttätigen Beziehungen, bei denen die Betroffenen massiven psychischen oder körperlichen Bedrohungen ausgesetzt waren.",
      },
      {
        text: "Solche Ereignisse können extremen Stress und Gefühle der Hilflosigkeit und des Entsetzens auslösen. Dies kann der Fall sein, wenn jemand selbst von dem Ereignis betroffen ist oder wenn er – etwa als Augenzeuge – miterlebt, wie andere Opfer dieses Ereignisses werden.",
      },
      {
        heading: "Transgenerationales Trauma",
        text: "Unter transgenerationalem Trauma versteht man die meist unbewusste Weitergabe traumatischer Erfahrungen an nachfolgende Generationen oder Gesellschaften. Nachfahren leiden an Traumafolge-Symptomen, ohne dass sie das Trauma selbst erlebt haben.",
      },
    ],
  },
  {
    id: "psychoonkologie",
    title: "Psychoonkologie",
    icon: "Ribbon",
    body: [
      {
        text: "Psychoonkologie bezeichnet die psychotherapeutische Begleitung von Menschen mit einer Krebserkrankung und ihren Angehörigen. Sie unterstützt bei der Verarbeitung der Diagnose, dem Umgang mit emotionalen Belastungen, Krankheitsfolgen und psychosozialen Herausforderungen in allen Phasen der Erkrankung.",
      },
    ],
  },
  {
    id: "psychosomatik",
    title: "Psychosomatik, psychosomatischer Schmerz",
    icon: "Activity",
    body: [
      {
        text: "Bei psychosomatischen Erkrankungen wird Hypnose traditionell schon lange sehr erfolgreich angewendet. Denn Körper und Psyche sind untrennbar miteinander verbunden. Oftmals äußern sich psychische Konflikte in körperlichen Beschwerden.",
      },
      {
        text: "Zum Beispiel: Asthma, Neurodermitis, Allergien, Tinnitus, Kopfschmerzen, Reizdarm, Verspannungen, Vaginismus u. v. m. Mittels Hypnose können die Symptome gelindert werden und/oder verschwinden sogar vollkommen.",
      },
    ],
  },
  {
    id: "sexualitaet",
    title: "Sexualität",
    icon: "Heart",
    body: [
      {
        text: "In kaum einem anderen Bereich wirken sich Dysbalancen in unserem sozialen Leben so offensichtlich aus wie in unserer Sexualität. Verantwortlich dafür sind körperliche und/oder seelische Ursachen, die viel zu oft unausgesprochen, unterdrückt und damit unbehandelt bleiben.",
      },
      {
        text: "Ungelöste emotionale Konflikte, Beziehungskrisen, Leistungsdruck, anerzogene sittliche oder moralische Vorstellungen, hormonelle Veränderungen, wenig oder keine Information. Das und vieles mehr kann unsere Bereitschaft zur Lustempfindung und unsere sexuelle Wahrnehmung stören, belasten oder sogar verhindern.",
      },
    ],
  },
  {
    id: "adhs",
    title: "AD(H)S bei Erwachsenen",
    icon: "Orbit",
    body: [
      {
        text: "Psychotherapeutische Begleitung von Erwachsenen mit ADHS zur Unterstützung im Umgang mit Aufmerksamkeitsschwierigkeiten, Impulsivität, innerer Unruhe sowie den daraus entstehenden emotionalen und psychosozialen Belastungen.",
      },
    ],
  },
  {
    id: "depression",
    title: "Depression",
    icon: "CloudSun",
    body: [
      {
        text: "Depressive Störungen sind sehr weit verbreitet und nehmen die unterschiedlichsten Formen an. Nicht immer stehen Stimmungstief, Gedankenkreisen, Antriebslosigkeit und Gedächtnis- oder Konzentrationsschwäche im Vordergrund. Manchmal dominieren auch körperliche Symptome, häufig in Form von Schmerzen.",
      },
      {
        text: "Patienten lernen durch die Trancearbeit, grüblerische Gedanken besser loszulassen und sich auf gesundheitsfördernde Aktivitäten einzulassen.",
      },
    ],
  },
  {
    id: "angst",
    title: "Angststörungen, Panikattacken",
    icon: "HeartPulse",
    body: [
      {
        text: "Angststörungen sind weit verbreitet, doch nur wenige Menschen trauen sich, darüber zu sprechen. Ist das Thema „Angst“ doch auch mit Scham behaftet, da man ungern Schwäche zeigen möchte.",
      },
      {
        text: "Symptome können sein: aufsteigende Panik, Herzrasen, Enge in der Brust, Zittern, Schwindel, Übelkeit, Schweißausbrüche, lebensbedrohliche Angst.",
      },
      {
        text: "Hypnose hilft bei Ängsten in besonderer Weise dadurch, dass die Übererregung und Anspannung reduziert wird und Neubewertungen im Bereich des Denkens und vor allem des Fühlens möglich werden.",
      },
    ],
  },
  { id: "kinderwunsch", title: "Unerfüllter Kinderwunsch", icon: "Sprout" },
  {
    id: "geburt",
    title: "Schwangerschaft, hypnotherapeutische Geburtsvorbereitung",
    icon: "Baby",
  },
  { id: "paartherapie", title: "Paartherapie, Beziehungstherapie", icon: "HeartHandshake" },
  { id: "stress", title: "Stress, Burn-out", icon: "BatteryLow" },
  {
    id: "nikotin",
    title: "Nikotinentzug",
    icon: "CigaretteOff",
    note: "Der ORF hat in meiner Praxis dazu gedreht.",
  },
  {
    id: "selbsterfahrung",
    title: "Selbsterfahrung im Rahmen des Propädeutikums",
    icon: "GraduationCap",
  },
  { id: "supervision", title: "Supervision", icon: "MessagesSquare" },
  {
    id: "sporthypnose",
    title: "Sporthypnose",
    icon: "Medal",
    note: "Sportliche Leistung optimieren, Teambuilding",
  },
];

export const about = {
  education: [
    "Kolleg Klessheim in Salzburg für Tourismus- und Freizeitwirtschaft",
    "Studium an der Universität Wien, Publizistik mit Fächerkombination Psychologie",
    "Psychotherapeutisches Propädeutikum, ARGE Wien",
    "Psychotherapeutisches Fachspezifikum: Hypnosepsychotherapie, ÖGATAP",
    "Krisenintervention und Notfallpsychologie, Curriculum, ÖAGG",
    "Sexualtherapie, Österreichisches Institut für Sexualpädagogik und Sexualtherapien",
    "Sporthypnose, Milton Erickson Institut für Hypnosystemische Kompetenzerweiterung Innsbruck",
    "Systemische Paartherapie, Curriculum, Wien",
    "Hypnosystemische Aufstellungen (Gunther Schmidt)",
    "Traumatherapie, Curriculum Wien, VÖPP",
  ],
  experience: ["2014–2020 in der Privatklinik „Woman & Health“ tätig"],
  internships: [
    "Psychiatrische Station im Kardinal Schwarzenberg Klinikum in Schwarzach/Pongau",
    "Psychiatrische Station, Wiener AKH",
  ],
  memberships: [
    "Österreichischer Bundesverband für Psychotherapie (ÖBVP)",
    "Wiener Landesverband für Psychotherapie (WLP)",
    "Vereinigung Österreichischer Psychotherapeutinnen (VÖPP)",
  ],
  /** Kurzfassung, die sofort sichtbar ist. Der vollständige Werdegang lässt sich aufklappen. */
  highlights: [
    "Hypnosepsychotherapie (ÖGATAP)",
    "Traumatherapie, systemische Paartherapie, Sexualtherapie",
    "Krisenintervention und Notfallpsychologie (ÖAGG)",
    "2014–2020 Privatklinik „Woman & Health“",
  ],
  mediaTitle: "Hypnose zum Nikotinentzug: ORF-Dreh in meiner Praxis",
};

export const pricing = [
  { id: "einzel", title: "Einzeltherapie", duration: "50 Minuten", price: "€ 130,–" },
  { id: "paar", title: "Paartherapie", duration: "100 Minuten", price: "€ 260,–" },
];

export const subsidy = {
  intro:
    "Je nach Krankenkasse erhalten Sie € 33,70 bis € 50,20 pro Einheit zurück, wenn eine krankheitswertige Störung vorliegt.",
  steps: [
    "Vor der zweiten Psychotherapiesitzung holen Sie eine ärztliche Bestätigung ein.",
    "Nach einigen Sitzungen, überwiegend vor der 11. Sitzung, reichen Sie den Antrag auf Kostenzuschuss bei der Krankenkasse ein. Ihre Psychotherapeutin füllt ihn teilweise aus, die ärztliche Bestätigung legen Sie bei.",
    "Sie reichen die Honorarnote ein und die Kasse überweist Ihnen den Zuschuss, wie beim Wahlarztsystem.",
  ],
  funds: [
    { short: "BVAEB", name: "Öffentlich Bedienstete, Eisenbahnen, Bergbau", amount: "€ 50,20" },
    { short: "SVS", name: "Selbstständige", amount: "€ 50,00" },
    // KFA: Betrag der alten Website (Stand 2020). Aktuelle Quellen nennen € 36 bis € 39; bitte bei der KFA bestätigen.
    { short: "KFA", name: "Bedienstete der Stadt Wien", amount: "€ 45,00" },
    { short: "ÖGK", name: "Österreichische Gesundheitskasse", amount: "€ 33,70" },
  ],
  source: {
    label: "Stand Jänner 2026 (KFA: Stand 2020). Mehr dazu beim Wiener Landesverband für Psychotherapie",
    href: "https://psychotherapie-wlp.at/informationen/psychotherapie/finanzierung/kostenzuschuss",
  },
};

export const appointmentTerms = {
  title: "Honorar- und Terminvereinbarung",
  intro:
    "Mit meiner Unterschrift bestätige ich, dass ich die auf der Website veröffentlichten Informationen, insbesondere zu Honorar, Verschwiegenheit und Datenschutz, sowie die folgenden Terminregelungen zur Kenntnis genommen habe und akzeptiere:",
  rules: [
    "Vereinbarte psychotherapeutische Termine sind verbindlich.",
    "Eine Terminabsage ist bis spätestens 48 Stunden vor dem vereinbarten Termin möglich.",
    "Absagen werden bei Einlangen schriftlich bestätigt.",
    "Bei nicht fristgerechter Absage wird das vereinbarte Honorar in Rechnung gestellt.",
  ],
};

export const insurers = ["ÖGK", "BVAEB", "SVS", "KFA Wien"];
