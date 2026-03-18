import { useState, useEffect } from "react";
import { shipService } from "../services/ship.service";
import { Ship } from "../types/ship";

export function useShips() {
  const [ships, setShips] = useState<Ship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchShips() {
      try {
        const data = await shipService.getShips();
        setShips(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchShips();
  }, []);

  return { ships, loading, error };
}
