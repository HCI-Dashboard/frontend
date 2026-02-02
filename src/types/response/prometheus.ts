export interface PrometheusResponse {
  status: string;
  data: PrometheusData;
}

export interface PrometheusData {
  resultType: string;
  result: PrometheusResult[];
}

export interface PrometheusResult {
  metric: { [key: string]: string };
  value: [number, string];
}
