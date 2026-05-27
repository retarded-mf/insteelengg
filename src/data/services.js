export const engineeringServices = [
  {
    title: "Structural Steel Design & Detailing",
    image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800",
    description: "Insteel delivers highly optimized structural design solutions and millimeter-accurate fabrication and erection drawings. Our engineering team ensures that every beam, column, and splice connection conforms to global design codes (AISC, IS, BS) to enable flawless shop assembly and swift on-site erection.",
    deliverables: [
      "Clash-free 3D TEKLA detailing models",
      "Shop fabrication drawings & assembly lists",
      "Erection layout drawings & bolt placement plans",
      "CNC data files (.NC1 / DSTV) directly synced to shop machines"
    ],
    techStack: ["Tekla Structures", "AutoCAD", "MDS structural solver"],
    metrics: [
      { label: "Fabrication Fit-up", value: "100%" },
      { label: "BIM Coordination", value: "LOD 400" }
    ]
  },
  {
    title: "RCC Design",
    image: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=800",
    description: "Our concrete design team plans robust, constructible, and seismic-resilient Reinforced Cement Concrete (RCC) frames and foundations. By integrating finite element modeling, we produce optimized schedules for deep basements, industrial machine foundations, and high-rise structural designs.",
    deliverables: [
      "3D structural finite element modeling (FEM)",
      "High-rise concrete column & shear wall schedules",
      "Foundation plans (raft, pile, and isolated footings)",
      "Dynamic wind and seismic loading analysis reports"
    ],
    techStack: ["ETABS", "STAAD Pro", "SAFE"],
    metrics: [
      { label: "Seismic Design", value: "Zone V Ready" },
      { label: "Concrete Savings", value: "Up to 15%" }
    ]
  },
  {
    title: "Rebar Detailing & BBS",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ec3?auto=format&fit=crop&q=80&w=800",
    description: "Insteel provides highly detailed 3D reinforcement models and automated Bar Bending Schedules (BBS). Our BBS output minimizes scrap steel wastage on-site by standardizing lap lengths and calculating perfect cutting lists that can be fed directly to CNC rebar bending machines.",
    deliverables: [
      "3D rebar detailing & placement models",
      "Automated Bar Bending Schedules (BBS) in Excel/PDF",
      "Rebar clash resolution layouts (e.g. beam-column joints)",
      "Site-ready bar tag details and instructions"
    ],
    techStack: ["RebarCAD", "Autodesk Revit", "BENTLEY Rebar"],
    metrics: [
      { label: "Scrap Reduction", value: "< 2.5%" },
      { label: "Placement Error", value: "0%" }
    ]
  },
  {
    title: "Building Information Modelling (BIM)",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
    description: "We coordinate multi-disciplinary architectural, structural, and MEP trades into a single, clash-free BIM environment. This 3D digital prototype allows project stakeholders to visualize construction conflicts, estimate quantities, and simulate scheduling before breaking ground.",
    deliverables: [
      "Unified multi-disciplinary federated BIM models",
      "Automated clash detection & conflict reports",
      "4D construction sequencing simulations",
      "5D quantity take-offs & material estimation matrices"
    ],
    techStack: ["Autodesk Revit", "Navisworks Manage", "BIM 360"],
    metrics: [
      { label: "BIM Standard", value: "LOD 500" },
      { label: "Clash Reduction", value: "98%" }
    ]
  },
  {
    title: "Connection Design",
    image: "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?auto=format&fit=crop&q=80&w=800",
    description: "We engineer heavy-duty structural steel joints, baseplates, moment connections, and composite splices. Leveraging non-linear finite element joint analysis, we ensure connection designs are safe, cost-efficient, and easy to weld or bolt in challenging field conditions.",
    deliverables: [
      "Non-linear FEA connection analysis calculation booklets",
      "Custom moment and shear connection drawings",
      "Anchor bolt layout & baseplate specifications",
      "Weld size and high-strength bolt torque parameters"
    ],
    techStack: ["IDEA StatiCa", "RAM Connection", "Limcon"],
    metrics: [
      { label: "Joint Capacity", value: "100% Verified" },
      { label: "Weld Optimization", value: "20% Saved" }
    ]
  },
  {
    title: "MEP Services",
    image: "https://images.unsplash.com/photo-1517646281694-8ec8d091e3dc?auto=format&fit=crop&q=80&w=800",
    description: "Insteel models high-performance Mechanical, Electrical, Plumbing, and Firefighting layouts. Our MEP designs are fully coordinated with the structural framework to guarantee zero layout intersections and to maximize vertical clearance and spatial efficiency.",
    deliverables: [
      "HVAC ductwork & air terminal layouts",
      "Electrical conduit routing & power single-line diagrams",
      "Plumbing piping designs (water supply & drainage lines)",
      "Coordinated MEP composite sleeve & wall opening plans"
    ],
    techStack: ["Revit MEP", "AutoCAD MEP", "Dialux"],
    metrics: [
      { label: "Routing Clashes", value: "Zero" },
      { label: "Sleeve Rework", value: "0%" }
    ]
  },
  {
    title: "Shop Drawing Generation",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    description: "We turn complex architectural designs into highly granular shop fabrication drawings. Every single component—from gusset plates and stiffeners to handrails and anchor systems—is modeled and documented with comprehensive weld symbols, tolerances, and assembly labels.",
    deliverables: [
      "Granular piece-mark fabrication drawings",
      "Gusset plate templates and flat patterns",
      "Material take-off (MTO) and shipping lists",
      "Weld map logs and steel grade certification charts"
    ],
    techStack: ["Tekla Structures", "AutoCAD Detailer"],
    metrics: [
      { label: "Drawing Precision", value: "±0.5 mm" },
      { label: "RFI Turnaround", value: "-45%" }
    ]
  }
];

export const constructionServices = [
  {
    title: "Fabrication",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
    description: "Operating state-of-the-art automatic fabrication yards across India, Insteel fabricates built-up columns, high-capacity box columns, custom plate girders, and elaborate roof trusses. Our shops utilize automated drilling, robotic plate cutting, and certified SAW welding to guarantee maximum structural integrity.",
    deliverables: [
      "Heavy structural built-up columns and portal frames",
      "High-span custom plate girders and crane gantries",
      "Intricate pipe-to-pipe structural steel trusses",
      "Third-party non-destructive testing (NDT/UT) records"
    ],
    equipment: ["CNC 3-Spindle Drilling & Sawing line", "Robotic Plasma Profile Cutters", "Submerged Arc Welding (SAW) portal"],
    metrics: [
      { label: "Annual Output", value: "50k Tons" },
      { label: "Weld Pass Rate", value: "99.8%" }
    ]
  },
  {
    title: "Erection",
    image: "https://images.unsplash.com/photo-1531834357241-0322ba66024d?auto=format&fit=crop&q=80&w=800",
    description: "Insteel's field crews execute heavy structural rigging and alignment of industrial complexes, bridge girders, and high-rise steel framing up to 300 meters height. We deploy advanced crawler and tower cranes, calibrated hydraulic torque wrenches, and laser-guided positioning for rapid, safe delivery.",
    deliverables: [
      "Rigging plans, crane load diagrams, and lift logs",
      "High-rise vertical alignment & column anchoring",
      "High-strength friction grip (HSFG) bolting",
      "Laser-guided structural surveying & level reports"
    ],
    equipment: ["Demag heavy crawler cranes", "Tower cranes", "Hytorc hydraulic bolt tensioners", "Leica Total Station"],
    metrics: [
      { label: "Max Erection Ht", value: "300m" },
      { label: "Safety Record", value: "Zero Harm" }
    ]
  },
  {
    title: "Painting & Fire Proofing",
    image: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=800",
    description: "We apply industrial-grade protective coatings and fire-resistant treatments. From marine-grade three-coat epoxy systems for anti-corrosion to spray-applied fireproofing coatings (intumescent and cementitious), we ensure structures withstand severe fire ratings and extreme environmental weathering.",
    deliverables: [
      "Blasting certification reports (SA 2.5 standard)",
      "High-durability marine epoxy paint applications",
      "Intumescent structural fireproofing (up to 4-hour rating)",
      "Dry film thickness (DFT) paint log documentation"
    ],
    equipment: ["Airless paint spray systems", "Automatic steel shot blasters", "Elcometer DFT gauge trackers"],
    metrics: [
      { label: "Fire Rating", value: "Up to 4 Hrs" },
      { label: "Anti-Corrosion", value: "25+ Yrs Life" }
    ]
  },
  {
    title: "Roofing & Cladding",
    image: "https://images.unsplash.com/photo-1513344605008-0133c948408f?auto=format&fit=crop&q=80&w=800",
    description: "Insteel designs and installs premium industrial roofing, sandwich panel wall cladding, and leakproof standing seam systems. Our double-skin insulated roof profiles are built to deliver thermal efficiency, structural sound insulation, and zero-defect rainwater shedding.",
    deliverables: [
      "Leak-proof standing seam steel roof profiles",
      "High-thermal insulating polyurethane sandwich panels",
      "Intricate architectural poly-carbonate skylight sheets",
      "Industrial louvers, gutters, and rainwater downspout plans"
    ],
    equipment: ["Mobile standing seam roll-forming rigs", "Safe roof walk-line rigging nets"],
    metrics: [
      { label: "Leak Guarantee", value: "10 Years" },
      { label: "R-Value Rating", value: "High Thermal" }
    ]
  },
  {
    title: "Civil Works for Composite Structures",
    image: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=800",
    description: "We handle the complete concrete and deck-sheet civil works required for steel-concrete composite systems. By managing deck profiling, shear stud installation, and concrete slab pouring, we deliver optimized structural diaphragms that speed up overall high-rise building schedules.",
    deliverables: [
      "Composite metal deck sheet placing & welding",
      "Shear connector stud installation & testing",
      "High-durability concrete floor slab pouring & leveling",
      "Permanent form-work structural reinforcement grids"
    ],
    equipment: ["CNC shear stud welding machines", "Laser concrete floor screed levelers"],
    metrics: [
      { label: "Floor Slab Speed", value: "5 Days/Floor" },
      { label: "Stud Strength", value: "100% Tested" }
    ]
  },
  {
    title: "Solar System Installation",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
    description: "We deploy utility-scale ground racking and patented industrial in-roof solar structural integrations. Our mounting frames are designed and tested to withstand maximum regional wind gusts while preserving 100% roof waterproofing integrity.",
    deliverables: [
      "Utility-scale ground racking structural frame erection",
      "Patented water-tight in-roof solar warehouse cladding",
      "PV solar panel module mounting & earthing connections",
      "Structural wind tunnel test validation calculation books"
    ],
    equipment: ["CNC metal roll-forming racking machines", "Waterproof torque-controlled drills"],
    metrics: [
      { label: "Wind Velocity", value: "Up to 180kmh" },
      { label: "Roof Warranty", value: "100% Maintained" }
    ]
  },
  {
    title: "Technical Manpower Deputation",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800",
    description: "We depute highly skilled technical professionals directly to construction sites. From structural steel supervisors and Tekla detailing managers to certified welding inspectors (AWS/CWI) and HSE safety engineers, we bridge complex execution skill gaps.",
    deliverables: [
      "On-site structural detailing managers and supervisors",
      "Certified AWS welding inspectors and QA/QC teams",
      "Rigging engineers and HSE site safety controllers",
      "Technical manpower resumes & compliance credentials"
    ],
    equipment: ["Safety harness systems", "Personal monitoring tools"],
    metrics: [
      { label: "Site Compliance", value: "100% ISO" },
      { label: "HSE Standards", value: "Zero Incident" }
    ]
  }
];
