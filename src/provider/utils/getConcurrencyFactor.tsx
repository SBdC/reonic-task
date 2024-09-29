export function getConcurrencyFactor(hour: number): number {
    if (hour >= 9 && hour < 10) return 0.0283;
    if (hour >= 10 && hour < 13) return 0.0566;
    if (hour >= 13 && hour < 14) return 0.0755;
    if (hour >= 16 && hour < 19) return 0.1038;
    if (hour >= 18 && hour < 22) return 0.0472;
    return 0.0094; // for remaining hours
  }