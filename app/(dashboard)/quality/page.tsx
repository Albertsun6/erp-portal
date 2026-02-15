import { getQualityGates } from "@/lib/supabase/queries";
import { QualityClient } from "./quality-client";

export const dynamic = "force-dynamic";

export default async function QualityPage() {
  const gates = await getQualityGates();

  // Map DB fields to client format
  const mapped = gates.map((g: any) => ({
    id: g.id,
    phaseTransition: g.phase_transition,
    checkItem: g.check_item,
    verifyMethod: g.verify_method,
    passCriteria: g.pass_criteria,
    isPassed: g.is_passed,
    checkedAt: g.checked_at,
  }));

  return <QualityClient initialGates={mapped} />;
}
