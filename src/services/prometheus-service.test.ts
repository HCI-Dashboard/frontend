import { describe, it, expect, beforeAll } from "vitest";
import { PrometheusService } from "./prometheus-service";

describe("PrometheusService class test", () => {
  let prometheusService: PrometheusService | null = null;
  beforeAll(() => {
    prometheusService = new PrometheusService();
  });

  it("vmAllLookup method test", async () => {
    const response = await prometheusService?.getAllVmCount();
    console.log(response);
    expect(response).toBeDefined();
  });
})
