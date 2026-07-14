import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { MicrosoftClarity } from "@/components/analytics/microsoft-clarity";

export function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <MicrosoftClarity />
    </>
  );
}
