export const config = {
  metabolicSyndrome: {
    requiredCriteria: 3,
    waistCm: { male: 102, female: 88 },
    triglyceridesMmolL: 1.7,
    hdlMmolL: { male: 1.03, female: 1.29 },
    bloodPressureMmHg: { systolic: 130, diastolic: 85 },
    fastingGlucoseMmolL: 5.6,
  },
  alcohol: {
    standardDrinkGrams: 14,
    male: { metaldMinimum: 15, aldMinimum: 30 },
    female: { metaldMinimum: 10, aldMinimum: 25 },
  },
  alternateDiagnoses: {
    diliMedications: [
      "Amiodarone",
      "Methotrexate",
      "Tamoxifen",
      "Valproic acid",
      "Systemic corticosteroids",
    ],
    geneticConditions: [] as string[],
  },
  aminotransferases: {
    thresholdUL: 200,
    continueRule: "eitherBelow" as "eitherBelow" | "bothBelow",
  },
  fib4: {
    lowRiskUpperExclusive: 1.3,
    indeterminateUpperInclusive: 2.67,
  },
  app: {
    fibroscanUpperInclusive: 5.52,
    repeatYearlyLowerInclusive: 9.27,
  },
  elastography: {
    referralThresholdKpa: 8,
  },
} as const;

