import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create branches
  const hq = await prisma.branch.create({
    data: {
      name: "Corporate Headquarters",
      code: "HQ001",
      address: "123 Construction Avenue, Business District",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      phone: "+91-22-45678900",
      email: "hq@cos.com",
      type: "HEADQUARTERS",
    },
  });

  const branch2 = await prisma.branch.create({
    data: {
      name: "Bangalore Regional Office",
      code: "BLR001",
      address: "456 Tech Park, Whitefield",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      phone: "+91-80-23456789",
      email: "bangalore@cos.com",
      type: "REGIONAL",
      parentId: hq.id,
    },
  });

  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.create({
    data: {
      email: "admin@cos.com",
      password: adminPassword,
      name: "Admin User",
      role: "SUPER_ADMIN",
      phone: "+91-9876543210",
      branchId: hq.id,
    },
  });

  // Create project manager
  const pmPassword = await hash("pm123", 12);
  const pm = await prisma.user.create({
    data: {
      email: "pm@cos.com",
      password: pmPassword,
      name: "Rajesh Kumar",
      role: "PROJECT_MANAGER",
      phone: "+91-9876543211",
      branchId: hq.id,
    },
  });

  // Create site engineer
  const sePassword = await hash("se123", 12);
  await prisma.user.create({
    data: {
      email: "engineer@cos.com",
      password: sePassword,
      name: "Suresh Patel",
      role: "SITE_ENGINEER",
      phone: "+91-9876543212",
      branchId: hq.id,
    },
  });

  // Create client user
  const clientPassword = await hash("client123", 12);
  const clientUser = await prisma.user.create({
    data: {
      email: "client@cos.com",
      password: clientPassword,
      name: "Amit Sharma",
      role: "CLIENT",
      phone: "+91-9876543213",
    },
  });

  // Create client
  const client = await prisma.client.create({
    data: {
      companyName: "Sharma Construction Pvt Ltd",
      contactName: "Amit Sharma",
      email: "client@cos.com",
      phone: "+91-9876543213",
      address: "789 Business Park, Andheri East",
      city: "Mumbai",
      state: "Maharashtra",
      gstin: "27AABCU1234D1Z1",
      type: "RESIDENTIAL",
      source: "WEBSITE",
      branchId: hq.id,
      userId: clientUser.id,
    },
  });

  // Create vendors
  await prisma.vendor.createMany({
    data: [
      {
        companyName: "Tata Steel Ltd",
        contactName: "Ravi Verma",
        email: "ravi@tatasteel.com",
        phone: "+91-22-45670001",
        category: "STEEL",
        rating: 5,
        branchId: hq.id,
      },
      {
        companyName: "Ultratech Cement",
        contactName: "Priya Singh",
        email: "priya@ultratech.com",
        phone: "+91-22-45670002",
        category: "CEMENT",
        rating: 4,
        branchId: hq.id,
      },
      {
        companyName: "Asian Paints",
        contactName: "Vikram Joshi",
        email: "vikram@asianpaints.com",
        phone: "+91-22-45670003",
        category: "PAINTS",
        rating: 4,
        branchId: hq.id,
      },
    ],
  });

  // Create materials
  await prisma.material.createMany({
    data: [
      { name: "Cement (OPC 53 Grade)", code: "CEM001", category: "CEMENT", unit: "Bags", unitPrice: 350, minStock: 100, currentStock: 500 },
      { name: "TMT Steel Bars 12mm", code: "STL001", category: "STEEL", unit: "Tonnes", unitPrice: 55000, minStock: 5, currentStock: 25 },
      { name: "River Sand", code: "SND001", category: "AGGREGATES", unit: "Cubic Feet", unitPrice: 45, minStock: 200, currentStock: 1000 },
      { name: "20mm Coarse Aggregate", code: "AGR001", category: "AGGREGATES", unit: "Cubic Feet", unitPrice: 35, minStock: 200, currentStock: 800 },
      { name: "Red Bricks", code: "BRK001", category: "BRICKS", unit: "Thousands", unitPrice: 8000, minStock: 10, currentStock: 50 },
    ],
  });

  // Create leads
  await prisma.lead.createMany({
    data: [
      {
        companyName: "Green Valley Developers",
        contactName: "Ankit Mehta",
        email: "ankit@greenvalley.com",
        phone: "+91-9988776655",
        source: "WEBSITE",
        status: "NEW",
        projectType: "RESIDENTIAL",
        description: "Looking to build a luxury villa in Pune",
        budget: 50000000,
        location: "Pune",
        plotSize: 2500,
        builtUpArea: 4000,
        timeline: "18 months",
        branchId: hq.id,
        assignedToId: pm.id,
      },
      {
        companyName: "Skyline Builders",
        contactName: "Neha Gupta",
        email: "neha@skyline.com",
        phone: "+91-8877665544",
        source: "REFERRAL",
        status: "QUALIFIED",
        projectType: "COMMERCIAL",
        description: "Office building construction in Bangalore",
        budget: 200000000,
        location: "Bangalore",
        plotSize: 5000,
        builtUpArea: 15000,
        timeline: "24 months",
        branchId: branch2.id,
        assignedToId: pm.id,
      },
      {
        companyName: "InfraCorp India",
        contactName: "Vivek Reddy",
        email: "vivek@infracorp.com",
        phone: "+91-7766554433",
        source: "GOOGLE_ADS",
        status: "PROPOSAL_SENT",
        projectType: "INFRASTRUCTURE",
        description: "Bridge construction project in Hyderabad",
        budget: 500000000,
        location: "Hyderabad",
        timeline: "36 months",
        branchId: hq.id,
        assignedToId: pm.id,
      },
    ],
  });

  // Create a project
  const project = await prisma.project.create({
    data: {
      name: "Green Valley Luxury Villas",
      description: "Construction of 10 luxury villas in Pune",
      type: "RESIDENTIAL",
      status: "CONSTRUCTION",
      priority: "HIGH",
      clientId: client.id,
      projectManagerId: pm.id,
      branchId: hq.id,
      location: "Pune, Maharashtra",
      plotSize: 25000,
      builtUpArea: 40000,
      budget: 500000000,
      startDate: new Date("2026-01-15"),
      endDate: new Date("2027-06-30"),
      progress: 35,
    },
  });

  // Create project phases
  await prisma.projectPhase.createMany({
    data: [
      { projectId: project.id, name: "Site Preparation & Excavation", order: 1, status: "COMPLETED", progress: 100, startDate: new Date("2026-01-15"), endDate: new Date("2026-02-28") },
      { projectId: project.id, name: "Foundation & Substructure", order: 2, status: "IN_PROGRESS", progress: 70, startDate: new Date("2026-03-01"), endDate: new Date("2026-05-30") },
      { projectId: project.id, name: "Superstructure", order: 3, status: "PENDING", progress: 0, startDate: new Date("2026-06-01"), endDate: new Date("2026-10-31") },
      { projectId: project.id, name: "MEP Works", order: 4, status: "PENDING", progress: 0, startDate: new Date("2026-09-01"), endDate: new Date("2027-01-31") },
      { projectId: project.id, name: "Interior Finishing", order: 5, status: "PENDING", progress: 0, startDate: new Date("2027-01-01"), endDate: new Date("2027-04-30") },
      { projectId: project.id, name: "Handover", order: 6, status: "PENDING", progress: 0, startDate: new Date("2027-05-01"), endDate: new Date("2027-06-30") },
    ],
  });

  // Create milestones
  await prisma.milestone.createMany({
    data: [
      { projectId: project.id, name: "Foundation Complete", dueDate: new Date("2026-05-30"), status: "PENDING", amount: 50000000 },
      { projectId: project.id, name: "Structural Framework Complete", dueDate: new Date("2026-10-31"), status: "PENDING", amount: 100000000 },
      { projectId: project.id, name: "MEP Commissioning", dueDate: new Date("2027-01-31"), status: "PENDING", amount: 75000000 },
      { projectId: project.id, name: "Project Handover", dueDate: new Date("2027-06-30"), status: "PENDING", amount: 50000000 },
    ],
  });

  // Create tasks
  await prisma.task.createMany({
    data: [
      { projectId: project.id, title: "Complete piling work", status: "DONE", priority: "HIGH", assigneeId: pm.id, dueDate: new Date("2026-02-15") },
      { projectId: project.id, title: "Foundation concreting", status: "IN_PROGRESS", priority: "HIGH", assigneeId: pm.id, dueDate: new Date("2026-04-30") },
      { projectId: project.id, title: "Procure steel reinforcement", status: "IN_PROGRESS", priority: "MEDIUM", assigneeId: pm.id, dueDate: new Date("2026-03-15") },
      { projectId: project.id, title: "Quality inspection - Foundation", status: "TODO", priority: "HIGH", assigneeId: pm.id, dueDate: new Date("2026-05-15") },
      { projectId: project.id, title: "Submit progress report", status: "TODO", priority: "LOW", assigneeId: pm.id, dueDate: new Date("2026-04-01") },
    ],
  });

  // Create equipment
  await prisma.equipment.createMany({
    data: [
      { name: "JCB Excavator - 3DX", code: "EQ001", type: "EXCAVATOR", model: "3DX", make: "JCB", year: 2023, status: "IN_USE", hourlyRate: 1500, branchId: hq.id },
      { name: "Tower Crane - T7060", code: "EQ002", type: "CRANE", model: "T7060", make: "Potain", year: 2024, status: "AVAILABLE", hourlyRate: 3500, branchId: hq.id },
      { name: "Concrete Mixer - 10/7 CFT", code: "EQ003", type: "MIXER", model: "10/7 CFT", make: "Schwing Stetter", year: 2023, status: "IN_USE", hourlyRate: 800, branchId: hq.id },
      { name: "Bull Dozer - D85", code: "EQ004", type: "DOZER", model: "D85", make: "Komatsu", year: 2022, status: "UNDER_MAINTENANCE", hourlyRate: 2500, branchId: hq.id },
    ],
  });

  // Create invoices
  await prisma.invoice.createMany({
    data: [
      { invoiceNo: "INV-2026-001", clientId: client.id, projectId: project.id, type: "CLIENT", amount: 50000000, tax: 9000000, total: 59000000, status: "PAID", dueDate: new Date("2026-03-15"), issuedAt: new Date("2026-02-15"), paidAt: new Date("2026-03-10") },
      { invoiceNo: "INV-2026-002", clientId: client.id, projectId: project.id, type: "CLIENT", amount: 75000000, tax: 13500000, total: 88500000, status: "OVERDUE", dueDate: new Date("2026-04-15"), issuedAt: new Date("2026-03-15") },
      { invoiceNo: "INV-2026-003", clientId: client.id, projectId: project.id, type: "CLIENT", amount: 50000000, tax: 9000000, total: 59000000, status: "PENDING", dueDate: new Date("2026-06-30") },
    ],
  });

  // Create notifications
  await prisma.notification.createMany({
    data: [
      { userId: admin.id, title: "Welcome to COS!", message: "Your Construction Operating System is ready.", type: "INFO", link: "/dashboard" },
      { userId: admin.id, title: "New Lead Assigned", message: "Green Valley Developers lead has been assigned.", type: "LEAD", link: "/dashboard/leads" },
      { userId: admin.id, title: "Invoice Overdue", message: "INV-2026-002 is overdue by 30 days.", type: "WARNING", link: "/dashboard/finance" },
      { userId: pm.id, title: "Task Assigned", message: "Complete piling work is now overdue.", type: "TASK", link: "/dashboard/projects" },
    ],
  });

  console.log("Database seeded successfully!");
  console.log("\nDefault logins:");
  console.log("  Admin: admin@cos.com / admin123");
  console.log("  PM:    pm@cos.com / pm123");
  console.log("  Eng:   engineer@cos.com / se123");
  console.log("  Client: client@cos.com / client123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
