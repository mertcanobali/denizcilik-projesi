import { useState, useEffect } from "react";
import { reportService } from "../services/report.service";
import { Report } from "../types/report";

export function useReports(shipId?: string) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!shipId) return;
    async function fetchReports() {
      try {
        const data = await reportService.getReportsByShipId(shipId, 10);
        setReports(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, [shipId]);

  return { reports, loading, error };
}
