import ServicePage, { type ServicePageData } from "@/components/marketing/service-page";

const data: ServicePageData = {
  eyebrow: "Services · Commercial",
  title: (
    <>
      Commercial spaces
      <br />
      that work as hard as <span className="text-brass-light">you</span>.
    </>
  ),
  description:
    "Offices, showrooms and small commercial builds delivered with a clear scope, written costing and a single point of accountability.",
  image: "/img2.png",
  imageAlt: "Commercial development",
  imageCaption: "Commercial work · Tamil Nadu",
  facts: [
    { value: "Offices", label: "Build & fit-out" },
    { value: "Retail", label: "Showrooms & shops" },
    { value: "Written", label: "Cost & timeline" },
    { value: "Handover", label: "Ready to operate" },
  ],
  introTitle: (
    <>
      Built for business, not just for <span className="text-brass-dark">photographs</span>.
    </>
  ),
  introText:
    "Commercial projects are judged by how soon they can earn. We plan the works around your opening date, coordinate the trades tightly, and keep the specification honest so the building performs after handover.",
  introSecondary:
    "From a single showroom fit-out to a small office block, the same discipline applies: an approved drawing set, an itemised estimate and a written programme of works.",
  checklist: [
    "Site feasibility and access review",
    "Layout planning with your team",
    "Itemised estimate and cash-flow plan",
    "Coordination with statutory approvals",
    "Services, safety and fire provisions",
    "Operational handover and support",
  ],
  scope: [
    { title: "Office buildings", text: "Structure, envelope and core services for small and mid-sized office builds." },
    { title: "Showrooms & retail", text: "Street-facing retail shells and interiors designed for footfall and display." },
    { title: "Warehousing", text: "Clear-span storage sheds with durable flooring, ventilation and access." },
    { title: "Interior fit-outs", text: "Partitions, ceilings, flooring, lighting and furniture coordination for tenants." },
    { title: "MEP & services", text: "Electrical distribution, plumbing, drainage, air conditioning provision and backup power." },
    { title: "Approvals & compliance", text: "Coordination of plan approvals, fire provisions and occupancy documentation." },
  ],
  process: [
    { title: "Brief & site study", text: "We agree the business need, opening date and budget before drawing anything." },
    { title: "Design & costing", text: "Layout options, specification and an itemised estimate with a works programme." },
    { title: "Execution", text: "Coordinated trades, staged inspections and weekly progress reporting." },
    { title: "Operational handover", text: "Testing of services, documentation and support through your opening." },
  ],
  projects: [
    { title: "Arakkonam Layout", location: "Arakkonam", image: "/img1.png" },
    { title: "Thiruthani Layout", location: "Thiruthani", image: "/img2.png" },
    { title: "Layout Site View", location: "Arakkonam", image: "/img7.png" },
  ],
  faqs: [
    {
      q: "Can you work to a fixed opening date?",
      a: "Yes. We build a programme backwards from your opening date and flag any risk early. Penalties and incentives can be written into the contract if you prefer.",
    },
    {
      q: "Do you take fit-out work in leased premises?",
      a: "Regularly. We coordinate with the landlord's conditions, building management rules and working-hour restrictions so the fit-out does not disrupt other tenants.",
    },
    {
      q: "Can you handle only part of the work?",
      a: "Yes — some clients engage us for structure alone, others for interiors or services only. The scope is defined clearly so responsibilities do not blur.",
    },
    {
      q: "How is commercial pricing different?",
      a: "Commercial builds have different structural spans, services loads and safety requirements. We price from the actual drawing set rather than a generic per-square-foot rate.",
    },
  ],
  ctaTitle: (
    <>
      Opening soon?
      <br />
      Let&apos;s protect the <span className="text-brass-light">date</span>.
    </>
  ),
  ctaDescription:
    "Send us the premises details and your target opening date. We will come back with a realistic plan and a written estimate.",
};

export default function CommercialServicePage() {
  return <ServicePage data={data} />;
}
