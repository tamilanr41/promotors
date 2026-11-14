import ServicePage, { type ServicePageData } from "@/components/marketing/service-page";

const data: ServicePageData = {
  eyebrow: "Services · Renovation",
  title: (
    <>
      Renew the space
      <br />
      you already <span className="text-brass-light">own</span>.
    </>
  ),
  description:
    "Thoughtful renovation for homes and small commercial spaces — planned around how you use the building, priced in writing, and finished without drama.",
  image: "/img5.png",
  imageAlt: "Renovation work",
  imageCaption: "Renovation · Tamil Nadu",
  facts: [
    { value: "Homes", label: "Full & partial" },
    { value: "Interiors", label: "Kitchen & bath" },
    { value: "Repairs", label: "Structure & seepage" },
    { value: "Clear", label: "Written scope" },
  ],
  introTitle: (
    <>
      Sometimes the right move is to <span className="text-brass-dark">rework</span>, not rebuild.
    </>
  ),
  introText:
    "Renovation is mostly about constraints — existing structure, services you cannot see, and a family still living in the house. We survey first, price honestly, and sequence the work to keep disruption to a minimum.",
  introSecondary:
    "Where the old work is unsound, we say so and show you why. Where it can be retained and repaired, we do that — because unnecessary demolition costs you money and time.",
  checklist: [
    "Existing condition and structure survey",
    "Services and leakage assessment",
    "Phased scope to limit disruption",
    "Written specification and estimate",
    "Dust, debris and safety controls",
    "Final cleaning and handover",
  ],
  scope: [
    { title: "Full home renovation", text: "Layout changes, structural alterations and complete interior renewal." },
    { title: "Kitchen & bathroom", text: "Waterproofing, plumbing, tiling, cabinetry and fittings for daily use." },
    { title: "Structural repairs", text: "Crack repair, column and beam strengthening, and slab remedial work." },
    { title: "Seepage & waterproofing", text: "Terrace, bathroom and wall seepage treatment with a tested system." },
    { title: "Extensions", text: "Additional rooms, floors and balconies coordinated with the existing structure." },
    { title: "Commercial retrofit", text: "Refreshing offices and shops without shutting the business for long." },
  ],
  process: [
    { title: "Site survey", text: "We inspect the existing building, services and defects before quoting anything." },
    { title: "Scope & estimate", text: "A written scope with options where choices matter, and an itemised price." },
    { title: "Phased execution", text: "Work sequenced room by room where needed, with dust and safety controls." },
    { title: "Finishing", text: "Testing, cleaning, snag closure and handover of the renewed space." },
  ],
  projects: [
    { title: "Maduranthangam Layout", location: "Maduranthangam", image: "/layoutmad1.jpeg" },
    { title: "JP Avenue Plots", location: "Arakkonam", image: "/scetch1.jpeg" },
    { title: "Mullai Avenue Plots", location: "Arakkonam", image: "/scetch2.jpeg" },
  ],
  faqs: [
    {
      q: "Can we stay in the house during renovation?",
      a: "Often yes, if the work is phased. For heavy structural or full-home work, we will advise a temporary move and plan the programme around it.",
    },
    {
      q: "Do you fix seepage without demolishing everything?",
      a: "Usually. We trace the source first and treat it with the appropriate system. Only failed layers are removed, which keeps the cost and disruption down.",
    },
    {
      q: "How accurate is a renovation estimate?",
      a: "It becomes accurate after the survey. Hidden defects can change scope, so we quote from an inspection and flag anything we cannot confirm until work opens up.",
    },
    {
      q: "Can you match existing tiles or finishes?",
      a: "We try to source matching materials. When an exact match is unavailable, we propose a deliberate contrast rather than an awkward near-match.",
    },
  ],
  ctaTitle: (
    <>
      Reworking a space?
      <br />
      Start with an honest <span className="text-brass-light">survey</span>.
    </>
  ),
  ctaDescription:
    "Tell us what is not working in the building. We will visit, assess what can be retained, and give you a written scope.",
};

export default function RenovationServicePage() {
  return <ServicePage data={data} />;
}
