export interface SamplePdfContent {
  resourceId: string;
  title: string;
  subtitle: string;
  headerTag: string;
  pages: {
    pageNumber: number;
    title: string;
    sections: {
      heading: string;
      items: {
        question?: string;
        formula?: string;
        answer?: string;
        examTip?: string;
        marks?: string;
      }[];
    }[];
  }[];
}

export const SAMPLE_STUDY_MATERIALS: Record<string, SamplePdfContent> = {
  'res-m10': {
    resourceId: 'res-m10',
    title: "10th Maths: Top 25 Golden Questions & Formulas",
    subtitle: "Ravi's Tuition Centre, Madurai • 26 Years Board Exam Special",
    headerTag: "CONFIDENTIAL REEL RESOURCE (M10)",
    pages: [
      {
        pageNumber: 1,
        title: "Section A: 2-Mark Compulsory Models (Relations & Functions + Algebra)",
        sections: [
          {
            heading: "Chapter 1: Relations & Functions (Sure 2-Mark)",
            items: [
              {
                question: "Q1. If A = {1, 3, 5} and B = {2, 3}, find (i) A × B and (ii) B × A. Is A × B = B × A?",
                answer: "A × B = {(1,2), (1,3), (3,2), (3,3), (5,2), (5,3)}. B × A = {(2,1), (2,3), (3,1), (3,3), (3,5)}. Since ordered pairs differ, A × B ≠ B × A.",
                examTip: "⚡ Examiner Tip: Always write 'A × B ≠ B × A' as the concluding statement for the final 0.5 mark.",
                marks: "2 Marks"
              },
              {
                question: "Q2. A relation 'f' is defined by f(x) = 3x - 2. Find x such that f(x) = f(1-x).",
                answer: "3x - 2 = 3(1 - x) - 2 ⇒ 3x - 2 = 3 - 3x - 2 ⇒ 6x = 3 ⇒ x = 1/2.",
                examTip: "⚡ Examiner Tip: Don't forget minus sign inside the bracket.",
                marks: "2 Marks"
              }
            ]
          },
          {
            heading: "Chapter 2: Numbers and Sequences (AP & GP Golden Models)",
            items: [
              {
                formula: "Sum to n terms of an AP: S_n = n/2 [2a + (n - 1)d] OR S_n = n/2 [a + l]",
                examTip: "Use a + l when last term is already given to save 2 minutes!"
              },
              {
                question: "Q3. Find the sum of first 28 terms of an AP whose nth term is t_n = 4n - 3.",
                answer: "For n=1, a = 4(1)-3 = 1. For n=28, l = 4(28)-3 = 109. S_28 = 28/2 [1 + 109] = 14 × 110 = 1540.",
                marks: "2 Marks"
              }
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: "Section B: 5-Mark Heavyweight Models (Coordinate & Geometry)",
        sections: [
          {
            heading: "Chapter 5: Coordinate Geometry (Area of Quadrilateral & Collinear)",
            items: [
              {
                formula: "Area of Quadrilateral = 1/2 [ (x1y2 + x2y3 + x3y4 + x4y1) - (x2y1 + x3y2 + x4y3 + x1y4) ]",
                examTip: "Crucial: Plot vertices roughly on a rough graph to confirm counter-clockwise order! Negative area means wrong vertex order."
              },
              {
                question: "Q4. Find the area of the quadrilateral whose vertices are (-9, -2), (-8, -4), (2, 2) and (1, -3).",
                answer: "Arrange counter-clockwise: A(-9, -2), B(-8, -4), C(1, -3), D(2, 2). Area = 1/2 [(-9)(-4) + (-8)(-3) + (1)(2) + (2)(-2)] - ... = 34 sq. units.",
                marks: "5 Marks"
              }
            ]
          },
          {
            heading: "Chapter 4: Geometry Proof Shortcut",
            items: [
              {
                question: "Q5. State and Prove Thales (Basic Proportionality) Theorem.",
                answer: "Statement: A straight line drawn parallel to a side of triangle intersecting the other two sides, divides the sides in the same ratio. [Proof using ratio of area of triangles ΔADE and ΔBDE].",
                examTip: "⚡ Examiner Tip: Drawing clear diagram with pencil gets 1.5 marks immediately.",
                marks: "5 Marks"
              }
            ]
          }
        ]
      },
      {
        pageNumber: 3,
        title: "Sneak Peek: Hidden Twist Questions (Available in ₹49 Centum Booster)",
        sections: [
          {
            heading: "The 3 Questions Where 90% Students Lose Centum",
            items: [
              {
                question: "Twist Model #1: Trigonometry double angle height problem where the observer moves 'd' distance away from the tower.",
                examTip: "Unlocked in Full ₹49 Pack with step-by-step diagram & algebraic proof!"
              },
              {
                question: "Twist Model #2: Mensuration melting sphere into hollow cylinder with wall thickness 2cm.",
                examTip: "Unlocked in Full ₹49 Pack with direct subtraction formula."
              }
            ]
          }
        ]
      }
    ]
  },
  'res-p12': {
    resourceId: 'res-p12',
    title: "12th Physics: 35 Sure-Shot 5-Mark Derivations Master PDF",
    subtitle: "Ravi's Tuition Centre, Madurai • 26 Years Board Exam Special",
    headerTag: "CONFIDENTIAL REEL RESOURCE (P12)",
    pages: [
      {
        pageNumber: 1,
        title: "Unit 1: Electrostatics - Derivation 1 & 2",
        sections: [
          {
            heading: "Electric Field due to an Electric Dipole on its Axial Line",
            items: [
              {
                question: "Derive an expression for the electric field due to an electric dipole at points on the axial line.",
                formula: "E_total = (1 / 4πε₀) * (2p / r³) along the direction of dipole moment p.",
                answer: "Let AB be an electric dipole of length 2a. Electric field at point P: E₊ = q / [4πε₀ (r - a)²] and E₋ = -q / [4πε₀ (r + a)²]. Taking common terms and applying r >> a approximation yields the result.",
                examTip: "Remember: Do not forget the vector arrow on dipole moment vector p!",
                marks: "5 Marks"
              }
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: "Unit 3: Magnetism & Magnetic Effects - Cyclotron",
        sections: [
          {
            heading: "Principle and Construction of Cyclotron",
            items: [
              {
                question: "Explain the principle, construction and working of a Cyclotron. Derive the expression for Cyclotron frequency.",
                formula: "Frequency f = qB / (2πm); Kinetic Energy E_k = (q² B² R²) / (2m)",
                answer: "Principle: A charged particle moves in a circular path in a transverse magnetic field and gains energy each time it crosses an oscillating electric field in resonance.",
                examTip: "Mention the limitation: Electrons cannot be accelerated due to relativistic mass increase.",
                marks: "5 Marks"
              }
            ]
          }
        ]
      }
    ]
  },
  'res-eco12': {
    resourceId: 'res-eco12',
    title: "12th Economics: Top 25 Important Questions (Quarterly Exam)",
    subtitle: "Ravi's Tuition Centre, Madurai • 26 Years Board Exam Special",
    headerTag: "CONFIDENTIAL REEL RESOURCE (ECO12)",
    pages: [
      {
        pageNumber: 1,
        title: "Chapter 1 & 2: National Income & Circular Flow of Income",
        sections: [
          {
            heading: "National Income Calculation: 3 Methods Presentation (5 Marks)",
            items: [
              {
                question: "Q1. Explain the methods of calculating National Income: (i) Product Method, (ii) Income Method, (iii) Expenditure Method.",
                formula: "GNP = GDP + Net Factor Income from Abroad (NFIA)",
                answer: "1. Product Method (Output Method): Value added at each stage of production. Avoid double counting.\n2. Income Method: Sum of factor payments: Wages + Rent + Interest + Profits.\n3. Expenditure Method: Total domestic expenditure: C + I + G + (X - M).",
                examTip: "⚡ Examiner Tip: Draw the 3-column table with precautions for full 5 marks.",
                marks: "5 Marks"
              }
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: "Chapter 3: Theories of Employment & Income (Keynesian Model)",
        sections: [
          {
            heading: "Effective Demand & Aggregate Demand Function (ADF)",
            items: [
              {
                question: "Q2. State the concept of Effective Demand according to J.M. Keynes. Draw the Aggregate Demand / Supply curve.",
                formula: "Effective Demand = Aggregate Demand (AD) = Aggregate Supply (AS)",
                answer: "Effective demand manifests at the point where ADF intersects ASF. ADF = C + I + G + (X - M). Diagram with employment on X-axis and expected proceeds on Y-axis.",
                examTip: "⚡ Examiner Tip: Clearly mark Point 'E' where ADF = ASF; this point decides equilibrium employment.",
                marks: "5 Marks"
              }
            ]
          }
        ]
      },
      {
        pageNumber: 3,
        title: "Chapter 5: Monetary Economics & Central Bank (RBI)",
        sections: [
          {
            heading: "Functions of Central Bank (RBI) - Key 5-Mark Points",
            items: [
              {
                question: "Q3. Describe the main quantitative credit control measures adopted by the Reserve Bank of India.",
                formula: "CRR, SLR, Repo Rate, Reverse Repo Rate, Open Market Operations (OMO)",
                answer: "1. Bank Rate Policy: Minimum lending rate of RBI.\n2. Cash Reserve Ratio (CRR): Percentage of deposits commercial banks must keep with RBI.\n3. Statutory Liquidity Ratio (SLR): Liquid assets ratio maintained by banks.\n4. Open Market Operations: Buying/selling government securities.",
                examTip: "⚡ Examiner Tip: Underline quantitative vs qualitative tools to score top band marks.",
                marks: "5 Marks"
              }
            ]
          }
        ]
      }
    ]
  },
  'bundle-12-economics-centum': {
    resourceId: 'bundle-12-economics-centum',
    title: "12th Economics Centum Booster (Sneak-Peek Preview)",
    subtitle: "Ravi's Tuition Centre, Madurai • 26 Years Board Exam Special",
    headerTag: "PRO PACK 3-PAGE SAMPLE (₹49)",
    pages: [
      {
        pageNumber: 1,
        title: "Page 1: National Income & Examiner Step-Marking Blueprint",
        sections: [
          {
            heading: "Full Mark Answer Template for National Income",
            items: [
              {
                question: "Difference between Microeconomics and Macroeconomics (Examiner 3-Mark Table)",
                answer: "Micro: Studies individual units (consumer, firm), Price mechanism theory, Partial equilibrium.\nMacro: Studies aggregate economy (National income, inflation), Income and employment theory, General equilibrium.",
                examTip: "⚡ Examiner Tip: Use minimum 4 comparison points for full 3 marks.",
                marks: "3 Marks"
              }
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: "Page 2: Keynesian Multiplier & Accelerator Interaction",
        sections: [
          {
            heading: "Multiplier Theory with Numerical Steps",
            items: [
              {
                question: "Derive the formula for Investment Multiplier (K) and show relation with MPC and MPS.",
                formula: "K = ΔY / ΔI = 1 / (1 - MPC) = 1 / MPS",
                answer: "When MPC = 0.8, MPS = 0.2, Multiplier K = 1 / 0.2 = 5. An initial investment of ₹100 crores generates ₹500 crores income.",
                examTip: "⚡ Examiner Tip: Include this numerical example to get 100% full marks.",
                marks: "5 Marks"
              }
            ]
          }
        ]
      },
      {
        pageNumber: 3,
        title: "Page 3: Fiscal Policy & Budget Deficits Presentation",
        sections: [
          {
            heading: "Revenue Deficit vs Fiscal Deficit vs Primary Deficit",
            items: [
              {
                formula: "Fiscal Deficit = Total Expenditure - (Revenue Receipts + Non-debt Capital Receipts)\nPrimary Deficit = Fiscal Deficit - Interest Payments",
                examTip: "⚡ Examiner Tip: 100% guaranteed compulsory question model in Quarterly & Board exams.",
                marks: "3 Marks"
              }
            ]
          }
        ]
      }
    ]
  }
};
