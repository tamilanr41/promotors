import ServicePage, { type ServicePageData } from "../../../../components/marketing/service-page";

const data: ServicePageData = {
  eyebrow: "Services · Infrastructure",
  title: (
    <>
      Roads, drainage
      <br />
      and services done <span className="text-brass-light">right</span>.
    </>
  ),
  description:
    "Layout development that decides how a plot feels for the next thirty years — roads, drains, water, power and grading, executed as one coordinated package.",
  image: "/img1.png",
  imageAlt: "Layout infrastructure",
  imageCaption: "Layout infrastructure · Arakkonam",
  facts: [
    { value: "Roads", label: "Internal layout" },
    { value: "Drainage", label: "Storm water" },
    { value: "Water", label: "Lines & storage" },
    { value: "Power", label: "Street lighting" },
  ],
  introTitle: (
    <>
      A layout is only as good as what runs <span className="text-brass-dark">under</span> it.
    </>
  ),
  introText:
    "Buyers feel the road width and see the street lights, but the drainage slope and water lines decide whether the layout ages well. We develop layouts as a single coordinated package rather than disconnected contracts.",
  introSecondary:
    "Every stage is set out from the approved layout plan, with levels checked before paving and services tested before handover to the local body.",
  checklist: [
    "Approved layout plan as the base",
    "Site grading and level verification",
    "Road formation, base and surfacing",
    "Storm water drains with defined outfall",
    "Water lines, valves and storage",
    "Street lighting and electrical poles",
  ],
  scope: [
    { title: "Internal roads", text: "Formation, base courses and surfacing to the approved width and levels." },
    { title: "Storm water drainage", text: "Drains, culverts and outfalls sized for the layout's run-off." },
    { title: "Water supply", text: "Distribution lines, valves, sumps and overhead storage as per the plan." },
    { title: "Street lighting", text: "Poles, cabling and fittings with a layout that keeps every street lit." },
    { title: "Land grading", text: "Cut and fill, levelling and compaction so plots drain correctly." },
    { title: "Boundary & entrance", text: "Compound walls, entrance arches and signage that define the layout." },
  ],
  process: [
    { title: "Plan & survey", text: "We work from the approved plan, verify ground levels and set out the works." },
    { title: "Sequenced execution", text: "Grading, drains and services go in before roads and surfacing are closed." },
    { title: "Testing", text: "Levels, slopes, line pressure and electrical continuity are checked before covering up." },
    { title: "Handover", text: "As-built drawings and a maintenance note handed to the developer or local body." },
  ],
  projects: [
    { title: "Arakkonam Layout", location: "Arakkonam", image: "/img1.png" },
    { title: "Layout Site View", location: "Arakkonam", image: "/img7.png" },
    { title: "Maduranthangam Layout", location: "Maduranthangam", image: "/layoutmad1.jpeg" },
  ],
  faqs: [
    {
      q: "Do you develop layouts for other landowners?",
      a: "Yes. We take up layout development for landowners and developer groups, working from their approved plan or coordinating the plan with their consultant.",
    },
    {
      q: "How long does layout development take?",
      a: "A typical 5–10 acre layout takes 4–8 months depending on monsoon, outfall availability and the scope of services. The programme is agreed in writing.",
    },
    {
      q: "Who maintains the layout afterwards?",
      a: "Maintenance is agreed at the start — either handed to the local body, a residents' association, or retained by the developer with a defined upkeep scope.",
    },
    {
      q: "Can you fix an existing layout's drainage?",
      a: "Often yes. We survey the existing levels and outfall, identify where water is pooling, and propose a corrective scope before any re-surfacing work.",
    },
  ],
  ctaTitle: (
    <>
      Developing a layout?
      <br />
      Let&apos;s get the <span className="text-brass-light">levels</span> right.
    </>
  ),
  ctaDescription:
    "Send us the site extent and approved plan if you have one. We will assess the scope and give you a written development estimate.",
};

export default function InfrastructureServicePage() {
  return <ServicePage data={data} />;
}
