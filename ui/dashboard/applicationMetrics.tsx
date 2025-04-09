import { auth } from "@/auth";
import { fetchApplicationMetrics } from "@/lib/data";
import Card from "@/ui/components/card";

export default async function ApplicationMetrics() {
  const session = await auth();
  const {
    numberOfApplied,
    numberOfRejected,
    numberOfInterview,
    numberOfOffers
  } = await fetchApplicationMetrics(session?.user?.id);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
      <Card title="Applied" value={numberOfApplied} type="applied"/>
      <Card title="Rejected" value={numberOfRejected} type="rejected"/>
      <Card title="Interview Scheduled" value={numberOfInterview} type="interview"/>
      <Card title="Offer Received" value={numberOfOffers} type="offers"/>
    </div>
  )
}