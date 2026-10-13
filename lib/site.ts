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
    /** Kurzform für den Einstieg. */
    badge: { title: "Wien 1010", note: "Heinrichsgasse 3" },
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
    badge: { title: "Eggendorf im Thale", note: "Bezirk Hollabrunn" },
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
};

export type Focus = {
  id: string;
  title: string;
  /** Kleinere Zeile direkt unter dem Titel. */
  subtitle?: string;
  icon: string;
  /** Kurzer Text, immer sichtbar. */
  text: string;
  /** Zweiter Absatz, etwa zum Thema der Unterzeile. */
  extra?: string;
};

/*
 * Kurztexte in eigenen Worten, fachlich abgestimmt auf Informationen des
 * Österreichischen Bundesverbands für Psychotherapie (ÖBVP), der ÖGK und des
 * Sozialministeriums (Informationen zur therapeutischen Hypnose).
 */
export const focusAreas: Focus[] = [
  {
    id: "trauma",
    title: "Traumatherapie",
    subtitle: "Transgenerationale Weitergabe von Traumata",
    icon: "Layers",
    text: "Gewalt, Unfälle, Verluste oder andere extrem belastende Erlebnisse können lange nachwirken, etwa als Ängste, Albträume oder Rückzug. In der Traumatherapie geht es zuerst um Stabilität und Sicherheit, dann um die behutsame Verarbeitung des Erlebten.",
    extra:
      "Traumatische Erfahrungen können auch unbewusst an nachfolgende Generationen weitergegeben werden. Nachkommen leiden dann an Traumafolgen, ohne das Trauma selbst erlebt zu haben.",
  },
  {
    id: "psychoonkologie",
    title: "Psychoonkologie",
    icon: "Ribbon",
    text: "Begleitung für Menschen mit einer Krebserkrankung und ihre Angehörigen: beim Verarbeiten der Diagnose, im Umgang mit Angst und Belastung und in allen Phasen der Behandlung.",
  },
  {
    id: "psychosomatik",
    title: "Psychosomatik, psychosomatischer Schmerz",
    icon: "Activity",
    text: "Körper und Psyche hängen eng zusammen. Zeigen sich seelische Belastungen als Schmerzen, Verspannungen, Haut- oder Verdauungsbeschwerden, kann Hypnose Symptome lindern und ihre Hintergründe verstehbar machen.",
  },
  {
    id: "sexualitaet",
    title: "Sexualität",
    icon: "Heart",
    text: "Lustlosigkeit, Schmerzen oder Unsicherheit in der Sexualität haben oft seelische wie körperliche Ursachen und bleiben häufig unausgesprochen. In einem geschützten Rahmen finden wir neue Zugänge.",
  },
  {
    id: "adhs",
    title: "AD(H)S bei Erwachsenen",
    icon: "Orbit",
    text: "Unterstützung im Umgang mit Unaufmerksamkeit, Impulsivität und innerer Unruhe sowie mit den Belastungen, die daraus im Alltag, im Beruf und in Beziehungen entstehen.",
  },
  {
    id: "depression",
    title: "Depression",
    icon: "CloudSun",
    text: "Niedergeschlagenheit, Antriebslosigkeit, Grübeln, manchmal auch körperliche Beschwerden: Depressionen haben viele Gesichter und sind gut behandelbar. In der Therapie lernen Sie, belastende Gedanken loszulassen und wieder Kraft zu schöpfen.",
  },
  {
    id: "angst",
    title: "Angststörungen, Panikattacken",
    icon: "HeartPulse",
    text: "Herzrasen, Enge in der Brust, Schwindel oder plötzliche Panik: Angststörungen sind häufig und gut behandelbar. Hypnose hilft, Anspannung abzubauen und Ängste neu zu bewerten.",
  },
  {
    id: "kinderwunsch",
    title: "Unerfüllter Kinderwunsch",
    icon: "Sprout",
    text: "Ein unerfüllter Kinderwunsch belastet Seele und Partnerschaft. Die Therapie gibt Raum für Hoffnung, Enttäuschung und Trauer und begleitet auch während einer Kinderwunschbehandlung.",
  },
  {
    id: "geburt",
    title: "Schwangerschaft, hypnotherapeutische Geburtsvorbereitung",
    icon: "Baby",
    text: "Hypnose stärkt das Vertrauen in den eigenen Körper, nimmt Ängste vor der Geburt und vermittelt Techniken zur tiefen Entspannung.",
  },
  {
    id: "paartherapie",
    title: "Paartherapie, Beziehungstherapie",
    icon: "HeartHandshake",
    text: "Wenn sich Konflikte wiederholen oder Nähe verloren gegangen ist, hilft Paartherapie, einander wieder zu verstehen, festgefahrene Muster zu erkennen und neue Wege miteinander zu finden.",
  },
  {
    id: "stress",
    title: "Stress, Burn-out",
    icon: "BatteryLow",
    text: "Dauerhafte Überlastung führt zu Erschöpfung, Schlafproblemen und innerer Leere. Gemeinsam schauen wir auf Ursachen und Grenzen und stärken Ihre Ressourcen.",
  },
  {
    id: "selbsterfahrung",
    title: "Selbsterfahrung im Rahmen des Psychotherapeutischen Propädeutikums",
    icon: "GraduationCap",
    text: "Die vorgeschriebene Selbsterfahrung für angehende Psychotherapeutinnen und Psychotherapeuten in Ausbildung.",
  },
  {
    id: "supervision",
    title: "Supervision",
    icon: "MessagesSquare",
    text: "Für Fachkräfte aus Gesundheits- und Sozialberufen: Reflexion der eigenen Arbeit, schwieriger Situationen und der beruflichen Rolle.",
  },
  {
    id: "sporthypnose",
    title: "Sporthypnose",
    icon: "Medal",
    text: "Mentales Training für Sportlerinnen und Sportler: Konzentration, Umgang mit Druck und Wettkampfangst, Leistung im entscheidenden Moment abrufen. Auch für Teambuilding.",
  },
  {
    id: "nikotin",
    title: "Nikotinentzug",
    icon: "CigaretteOff",
    text: "Hypnose unterstützt dabei, mit dem Rauchen aufzuhören: Sie stärkt die Motivation, hilft im Umgang mit dem Verlangen und verankert das Nichtrauchen. Der ORF hat dazu in meiner Praxis gedreht.",
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
  experience: ["Seit 2013 selbstständig in freier Praxis", "2014–2020 in der Privatklinik „Woman & Health“ tätig"],
  internships: [
    "Psychiatrische Station im Kardinal Schwarzenberg Klinikum in Schwarzach/Pongau",
    "Psychiatrische Station, Wiener AKH",
  ],
  memberships: [
    "Österreichischer Bundesverband für Psychotherapie (ÖBVP)",
    "Wiener Landesverband für Psychotherapie (WLP)",
    "Vereinigung Österreichischer Psychotherapeutinnen (VÖPP)",
  ],
  intro:
    "Ich verbinde tiefenpsychologisches Verstehen mit der Kraft der Hypnose. Meine Zusatzausbildungen erlauben mir, gezielt auf Ihr Anliegen einzugehen, ob es um belastende Erfahrungen, Ihre Beziehung oder akute Krisen geht.",
  /** Sofort sichtbar. Der vollständige Werdegang lässt sich aufklappen. */
  specializations: [
    { title: "Hypnosepsychotherapie", detail: "Psychotherapeutisches Fachspezifikum, ÖGATAP" },
    { title: "Traumatherapie", detail: "Curriculum, VÖPP" },
    { title: "Systemische Paartherapie", detail: "Curriculum, Wien" },
    { title: "Sexualtherapie", detail: "Österreichisches Institut für Sexualpädagogik und Sexualtherapien" },
    { title: "Krisenintervention und Notfallpsychologie", detail: "Curriculum, ÖAGG" },
    { title: "Sporthypnose", detail: "Milton Erickson Institut Innsbruck" },
    { title: "Hypnosystemische Aufstellungen", detail: "nach Gunther Schmidt" },
  ],
  mediaTitle: "Hypnose zum Nikotinentzug: ORF-Dreh in meiner Praxis",
};

export type Offer = { id: string; title: string; subtitle?: string; duration?: string; price?: string };

export const pricing: Offer[] = [
  { id: "einzel", title: "Einzeltherapie", duration: "50 Minuten", price: "€ 130,–" },
  { id: "paar", title: "Paartherapie", duration: "100 Minuten", price: "€ 260,–" },
  { id: "gruppe", title: "Gruppe", subtitle: "Hypnosystemische Aufstellung" },
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
    // KFA: laut Praxis-Veröffentlichungen ab Jänner 2026; eine offizielle KFA-Quelle war nicht auffindbar.
    { short: "KFA", name: "Bedienstete der Stadt Wien", amount: "€ 39,00" },
    { short: "ÖGK", name: "Österreichische Gesundheitskasse", amount: "€ 33,70" },
  ],
  source: {
    label: "Stand Jänner 2026. Mehr dazu beim Wiener Landesverband für Psychotherapie",
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
