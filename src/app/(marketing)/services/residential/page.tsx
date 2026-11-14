import ServicePage, { type ServicePageData } from "../../../../components/marketing/service-page";

const data: ServicePageData = {
  eyebrow: "Services · Residential",
  title: (
    <>
      Homes built for
      <br />
      the way you <span className="text-brass-light">live</span>.
    </>
  ),
  description:
    "Turnkey residential construction across Tamil Nadu — designed around your family, priced in writing, and delivered by one accountable team.",
  image: "/img3.png",
  imageAlt: "Residential construction",
  imageCaption: "Residential work · Tamil Nadu",
  facts: [
    { value: "Turnkey", label: "Design to handover" },
    { value: "Written", label: "Contracts & costing" },
    { value: "10+", label: "Years on site" },
    { value: "On time", label: "Stage-wise delivery" },
  ],
  introTitle: (
    <>
      A home should suit the family, not the <span className="text-brass-dark">template</span>.
    </>
  ),
  introText:
    "We build independent houses, farm houses and small residential projects across Chennai and the surrounding districts. Every project begins with your plot, your budget and how you actually want to live — then moves to drawings, costing and a written agreement before work starts.",
  introSecondary:
    "Our engineers stay on the project from foundation to final finish. You get stage-wise updates, verified material specifications and one point of contact throughout.",
  checklist: [
    "Site inspection and soil assessment",
    "Design coordination and plan approvals",
    "Itemised, written cost estimate",
    "Quality materials with specified brands",
    "Stage-wise billing and updates",
    "Snag-free handover with documents",
  ],
  scope: [
    {
      title: "Custom home design",
      text: "Plan the house around your plot, family size and daily routine — with drawings you can actually build from.",
    },
    {
      title: "New home construction",
      text: "Foundation to finishing, including structure, masonry, plastering and weatherproofing.",
    },
    {
      title: "Interior finishing",
      text: "Flooring, painting, joinery, modular kitchens and wardrobes finished to a clear specification.",
    },
    {
      title: "Plumbing & electrical",
      text: "Concealed wiring, sanitary lines, water storage and testing before the walls close.",
    },
    {
      title: "Compound walls & gates",
      text: "Boundary walls, gates, driveway paving and site levelling that complete the property.",
    },
    {
      title: "Turnkey handover",
      text: "Final inspection, snag list closure and handover with warranties and as-built drawings.",
    },
  ],
  process: [
    { title: "Consultation", text: "We visit the plot, understand your budget and agree the brief in person." },
    { title: "Design & estimate", text: "Drawings, specifications and an itemised estimate you approve before work starts." },
    { title: "Construction", text: "Stage-wise execution with material checks, photos and written progress updates." },
    { title: "Handover", text: "Final walkthrough, snag closure and your keys with the complete document set." },
  ],
  projects: [
    { title: "Maduranthangam Layout", location: "Maduranthangam", image: "/layoutmad1.jpeg" },
    { title: "Arakkonam Site", location: "Arakkonam", image: "/layoutarak1.jpeg" },
    { title: "JP Avenue Plots", location: "Arakkonam", image: "/scetch1.jpeg" },
  ],
  faqs: [
    {
      q: "How long does a house take to build?",
      a: "A typical 1,500–2,000 sq ft independent house takes 9–12 months from approved drawings to handover. Smaller farm houses are faster. Timelines are written into the agreement with stage-wise milestones.",
    },
    {
      q: "Is the estimate fixed?",
      a: "The scope and specification are fixed in writing. Only approved changes or statutory fee revisions alter the total, and those are quoted before the work is taken up.",
    },
    {
      q: "Can you build on a plot I already own?",
      a: "Yes — most of our residential work is on client-owned plots. We inspect the plot, verify access and setback requirements, and confirm feasibility before quoting.",
    },
    {
      q: "Do you handle plan approvals?",
      a: "We coordinate the plan preparation and submission to the local authority. Government fees and deposits are billed at actuals with receipts.",
    },
  ],
  ctaTitle: (
    <>
      Planning a home?
      <br />
      Let&apos;s start with the <span className="text-brass-light">plot</span>.
    </>
  ),
  ctaDescription:
    "Share your plot size and rough budget, and we will come back with a realistic scope, timeline and cost — before you commit to anything.",
};

export default function ResidentialServicePage() {
  return <ServicePage data={data} />;
}
