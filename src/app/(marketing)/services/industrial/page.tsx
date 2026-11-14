import ServicePage, { type ServicePageData } from "@/components/marketing/service-page";

const data: ServicePageData = {
  eyebrow: "Services · Industrial",
  title: (
    <>
      Industrial builds,
      <br />
      engineered for <span className="text-brass-light">uptime</span>.
    </>
  ),
  description:
    "Factory sheds, warehouses and utility structures built to specification, with safety and maintainability designed in from the start.",
  image: "/img4.png",
  imageAlt: "Industrial development",
  imageCaption: "Industrial work · Tamil Nadu",
  facts: [
    { value: "Sheds", label: "Clear-span builds" },
    { value: "Storage", label: "Warehouse floors" },
    { value: "Safety", label: "Designed in" },
    { value: "Written", label: "Scope & costing" },
  ],
  introTitle: (
    <>
      Built for machines, maintenance and the <span className="text-brass-dark">long run</span>.
    </>
  ),
  introText:
    "Industrial work rewards precision. We plan foundations around actual equipment loads, keep service routes accessible for maintenance, and specify materials that stand up to dust, heat and daily use.",
  introSecondary:
    "Safety is not an add-on. Access, egress, ventilation and fire provisions are reviewed with the layout, so the building can be operated confidently from day one.",
  checklist: [
    "Load and equipment requirement study",
    "Foundation and floor design review",
    "Ventilation, lighting and power planning",
    "Fire access and safety provisions",
    "Durable, maintainable material choices",
    "As-built drawings and handover file",
  ],
  scope: [
    { title: "Factory sheds", text: "Pre-engineered and conventional sheds with clear spans suited to your process line." },
    { title: "Warehouses", text: "High-floor warehouses with loading bays, ramps and heavy-duty flooring." },
    { title: "Utility structures", text: "Pump rooms, panel rooms, offices and canteen blocks within the site." },
    { title: "Foundations & flooring", text: "Machine foundations, industrial flooring and drainage designed for the load." },
    { title: "MEP installation", text: "Power distribution, compressed air provision, water lines and lighting." },
    { title: "Safety & compliance", text: "Egress routes, fire provisions and statutory coordination for occupancy." },
  ],
  process: [
    { title: "Requirement study", text: "We document equipment loads, process flow and access needs before design." },
    { title: "Engineering & costing", text: "Structural design, specification and an itemised estimate with a build programme." },
    { title: "Construction", text: "Sequenced civil and services work with inspection checkpoints and safety audits." },
    { title: "Commissioning", text: "Testing of services, as-built drawings and handover alongside your operations team." },
  ],
  projects: [
    { title: "Arakkonam Layout", location: "Arakkonam", image: "/img1.png" },
    { title: "Acharapakkam Layout", location: "Acharapakkam", image: "/img4.png" },
    { title: "Farm Lands", location: "Tamil Nadu", image: "/img6.png" },
  ],
  faqs: [
    {
      q: "Can you build to our consultant's drawings?",
      a: "Yes. Many industrial clients already have a structural consultant. We work from their drawings, raise buildability queries early, and price the scope transparently.",
    },
    {
      q: "Do you handle pre-engineered buildings?",
      a: "We coordinate pre-engineered shed supply and erection along with the civil works, foundations and services so one team remains accountable for the whole shell.",
    },
    {
      q: "How do you handle site safety?",
      a: "A site-specific safety plan, induction for every worker, and regular audits are standard. Industrial sites also get specific controls for lifting, hot work and electrical safety.",
    },
    {
      q: "Can work be phased around existing operations?",
      a: "Yes. For expansion work we phase the construction and agree access, noise and shutdown windows with your operations team in advance.",
    },
  ],
  ctaTitle: (
    <>
      Expanding capacity?
      <br />
      Let&apos;s engineer the <span className="text-brass-light">shell</span>.
    </>
  ),
  ctaDescription:
    "Share your process, equipment loads and target capacity. We will help you plan a facility that is safe, practical and built to last.",
};

export default function IndustrialServicePage() {
  return <ServicePage data={data} />;
}
