import "chart.js";

declare module "chart.js" {
  interface PluginOptionsByType<TType> {
    centerText?: {
      title?: string;
      value?: string;
    };
  }
}
