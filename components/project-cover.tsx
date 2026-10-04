import { ScrollArtwork } from "@/components/motion";

export function ProjectCover({ kind, name }: { kind: string; name: string }) {
  return <div className={`project-cover cover-${kind}`} aria-hidden="true">
    <span className="cover-caption">{kind === "formpilot" ? "EXTRACT / VALIDATE / EXPORT" : kind === "queuesense" ? "OBSERVE / PREDICT / COMPARE" : kind === "ledge" ? "AT THE EDGE OF YOUR WORKSPACE" : kind === "suiroll" ? "PREPARE / APPROVE / SETTLE" : kind === "medisync" ? "CONTINUITY OF CARE" : kind === "cpd" ? "CLIENT NEEDS → LEARNING PATHS" : "WHERE NEXT?"}</span>
    <ScrollArtwork>{kind === "ledge" ? <div className="ledge-art"><i /><i /><i /><span>L</span></div> : kind === "suiroll" ? <div className="suiroll-art"><span>01</span><i /><span>02</span><i /><span>03</span></div> : kind === "medisync" ? <div className="care-art">+</div> : kind === "cpd" ? <div className="cpd-art"><i /><i /><i /><i /><i /></div> : <div className="chapter-art">{kind === "formpilot" ? "F" : kind === "queuesense" ? "Q" : "N"}<span>↗</span></div>}</ScrollArtwork>
    <span className="cover-name">{name}</span><span className="cover-note">Typographic study</span>
  </div>;
}
