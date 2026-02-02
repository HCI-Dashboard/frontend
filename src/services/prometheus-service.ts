import type { PrometheusResponse } from "@/types/response/prometheus";
import ky from "ky";

export class PrometheusService {
  private readonly BASE_URL = "http://211.214.71.44:39090/api/v1/query";

  public async getAllVmCount(): Promise<number> {
    const response = await this.queryPrometheus("count(openstack_nova_server_status)") as PrometheusResponse;
    return this.getCount(response);
  }

  public async getActiveVmCount(): Promise<number> {
    const response = await this.queryPrometheus("count(openstack_nova_server_status{status=\"ACTIVE\"})") as PrometheusResponse;
    return this.getCount(response);
  }

  public async getShutoffVmCount(): Promise<number> {
    const response = await this.queryPrometheus("count(openstack_nova_server_status{status=~\"SHUTOFF|SUSPENDED\"})") as PrometheusResponse;
    return this.getCount(response);
  }

  public async getElseVmCount(): Promise<number> {
    const response = await this.queryPrometheus("count(openstack_nova_server_status{status!~\"ACTIVE|SHUTOFF|SUSPENDED\"})") as PrometheusResponse;
    return this.getCount(response);
  }

  public async getAllVmLookup(): Promise<PrometheusResponse> {
    return await this.queryPrometheus("openstack_nova_server_status") as PrometheusResponse;
  }

  public async getActiveVmLookup(): Promise<PrometheusResponse> {
    return await this.queryPrometheus("openstack_nova_server_status{status=\"ACTIVE\"}") as PrometheusResponse;
  }

  public async getShutoffVmLookup(): Promise<PrometheusResponse> {
    return await this.queryPrometheus("openstack_nova_server_status{status=~\"SHUTOFF|SUSPENDED\"}") as PrometheusResponse;
  }

  public async getElseVmLookup(): Promise<PrometheusResponse> {
    return await this.queryPrometheus("openstack_nova_server_status{status!~\"ACTIVE|SHUTOFF|SUSPENDED\"}") as PrometheusResponse;
  }

  public async getVcpuTotalCount(): Promise<PrometheusResponse> {
    return await this.queryPrometheus("sum(openstack_placement_resource_total{resourcetype=\"VCPU\"}) * avg(openstack_placement_resource_allocation_ratio{resourcetype=\"VCPU\"})") as PrometheusResponse;
  }

  public async getVcpuUsageCount(): Promise<PrometheusResponse> {
    return await this.queryPrometheus("sum(openstack_placement_resource_usage{resourcetype=\"VCPU\"})") as PrometheusResponse;
  }

  public async getMemoryTotalVolume(): Promise<PrometheusResponse> {
    return await this.queryPrometheus("sum(openstack_placement_resource_total{resourcetype=\"MEMORY_MB\"}) * avg(openstack_placement_resource_allocation_ratio{resourcetype=\"MEMORY_MB\"})") as PrometheusResponse;
  }

  public async getMemoryUsageVolume(): Promise<PrometheusResponse> {
    return await this.queryPrometheus("sum(openstack_placement_resource_usage{resourcetype=\"MEMORY_MB\"})") as PrometheusResponse;
  }

  public async getStorageTotalVolume(): Promise<PrometheusResponse> {
    return await this.queryPrometheus("ceph_cluster_total_bytes") as PrometheusResponse;
  }

  public async getStorageUsageVolume(): Promise<PrometheusResponse> {
    return await this.queryPrometheus("ceph_cluster_total_used_bytes") as PrometheusResponse;
  }

  private async queryPrometheus(query: string) {
    const response = await ky.post(this.BASE_URL, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(
        {
          "query": query
        }
      )
    });

    return response.json();
  }

  private getCount(response: PrometheusResponse): number {
    if (!response?.data?.result || response.data.result.length === 0) {
      return 0;
    }

    const value = response.data.result[0]?.value?.[1];
    return value ? Number(value) : 0;
  }
}
