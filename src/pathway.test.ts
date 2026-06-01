import { describe, expect, it } from "vitest";
import { submitStep } from "./pathway";
import type { FormValues, PathwayState, Step } from "./types";

const start = (currentStep: Step = "metabolic", answers = {}): PathwayState =>
  ({ currentStep, history: [], answers });
const submit = (state: PathwayState, values: Record<string, string>) =>
  submitStep(state, values as FormValues);
const qualifyingMetabolic = (overrides = {}) => ({
  sex: "male", waist: "102", waistUnit: "cm", triglycerides: "1.7",
  triglyceridesUnit: "mmol", hdl: "1.5", hdlUnit: "mmol", systolic: "130",
  diastolic: "70", glucose: "4", glucoseUnit: "mmol", ...overrides,
});

describe("MASLD pathway engine", () => {
  it("exits when fewer than three metabolic criteria are met", () => {
    const state = submit(start(), qualifyingMetabolic({ waist: "101" }));
    expect((state.answers.metabolic as { criteriaCount: number }).criteriaCount).toBe(2);
    expect(state.result?.title).toBe("MASLD pathway not indicated");
  });

  it("counts treatment and converts US customary units", () => {
    const state = submit(start(), qualifyingMetabolic({
      sex: "female", waist: String(88 / 2.54), waistUnit: "in",
      triglycerides: String(1.7 * 88.57), triglyceridesUnit: "mgdl",
      hdl: String(1.29 * 38.67), hdlUnit: "mgdl",
      systolic: "100", diastolic: "60", glucose: String(5.6 * 18),
      glucoseUnit: "mgdl", bloodPressureTreatment: "on",
    }));
    expect((state.answers.metabolic as { criteriaCount: number }).criteriaCount).toBe(4);
    expect(state.currentStep).toBe("alcohol");
  });

  it("exits at configured MetALD and ALD thresholds", () => {
    const metabolic = submit(start(), qualifyingMetabolic());
    expect(submit(metabolic, { drinksPerWeek: "15" }).result?.message).toMatch(/MetALD range/);
    expect(submit(metabolic, { drinksPerWeek: "30" }).result?.message).toMatch(/ALD range/);
  });

  it("continues below the sex-specific alcohol threshold", () => {
    const metabolic = submit(start(), qualifyingMetabolic({ sex: "female" }));
    expect(submit(metabolic, { drinksPerWeek: "9.99" }).currentStep).toBe("alternate");
  });

  it("exits for an alternate diagnosis and continues without one", () => {
    const state = start("alternate");
    const exit = submit(state, { "dili-0": "on", hbsagPositive: "on" });
    expect(exit.result?.summary).toEqual([
      "Identified: possible drug-induced liver injury.",
      "Identified: positive HBsAg.",
    ]);
    expect(submit(state, {}).currentStep).toBe("enzymes");
  });

  it("uses the configured either-below aminotransferase rule", () => {
    expect(submit(start("enzymes"), { alt: "199.99", ast: "200" }).currentStep).toBe("diabetes");
    expect(submit(start("enzymes"), { alt: "200", ast: "200" }).result?.title).toBe("Further assessment required");
  });

  it("routes diabetes to APP and absence of diabetes to FIB-4", () => {
    expect(submit(start("diabetes"), { hasDiabetes: "yes" }).currentStep).toBe("app");
    expect(submit(start("diabetes"), { hasDiabetes: "no" }).currentStep).toBe("fib4");
  });

  it("calculates FIB-4 and routes exact boundaries", () => {
    const low = submit(start("fib4"), { age: "50", ast: "25.8", alt: "100", platelets: "100" });
    expect((low.answers.fib4 as { score: number }).score).toBe(1.29);
    expect(low.result?.title).toBe("Repeat FIB-4 every 2 years");
    expect(submit(start("fib4"), { age: "50", ast: "26", alt: "100", platelets: "100" }).currentStep).toBe("elastography");
    expect(submit(start("fib4"), { age: "60", ast: "50", alt: "100", platelets: "100" }).currentStep).toBe("elastography");
  });

  it("calculates APP and routes exact boundaries", () => {
    expect(submit(start("app"), { albumin: "4", platelets: "1380" }).currentStep).toBe("elastography");
    expect(submit(start("app"), { albumin: "4", platelets: "2000" }).result?.title).toBe("APP recommendation not implemented yet");
    expect(submit(start("app"), { albumin: "3", platelets: "3090" }).result?.title).toBe("Repeat APP in 1 year");
  });

  it("refers at 8 kPa and repeats FIB-4 below 8 kPa", () => {
    const answers = { fib4: { score: 1.3 } };
    expect(submit(start("elastography", answers), { kpa: "8" }).result?.title).toBe("Refer to hepatology");
    expect(submit(start("elastography", answers), { kpa: "7.99" }).result?.title).toBe("Repeat FIB-4 in 1 year");
  });
});

