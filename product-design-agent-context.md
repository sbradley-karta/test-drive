# Product Design Context Brief

## Anaplan Mockup Generator Accelerator

## 1. Purpose of This Brief

This brief provides product context for a product design AI agent supporting the continued design and enhancement of the **Anaplan Mockup Generator Accelerator**.

The goal is to help the design partner understand:

* The vision for the solution
* The current state of the tool
* The intended user experience
* The consulting problem it solves
* The phased release roadmap
* The design principles and constraints that should guide future enhancements

This is not intended to define every technical requirement. It should serve as a working product charter to guide discovery, UX design, feature prioritization, and release planning.

---

# 2. Product Vision

## Vision Statement

The Anaplan Mockup Generator Accelerator is a lightweight, visual-first workshop tool that helps consultants rapidly translate client requirements discussions into structured, Anaplan-aware concept sketches.

The tool is designed to support client foundations workshops, requirements alignment sessions, and early solution design by producing low-fidelity mockups that make page concepts easier to understand, review, and validate.

## Strategic Intent

The accelerator should help consulting teams move faster from conversation to alignment.

In traditional Anaplan delivery, teams often start with written requirements, user stories, or process narratives. While those artifacts are useful, they can be interpreted differently by business stakeholders, solution architects, model builders, and delivery leads.

This tool is based on the belief that **pictures often create stronger alignment than words alone**.

The mockup should become the primary artifact for alignment, while structured metadata, page details, and validation checks provide the delivery rigor behind the visual.

## Future-State Product Positioning

The product should evolve from a simple mockup generator into a:

> Visual-first Anaplan foundations workshop accelerator that standardizes how teams capture, validate, and translate page concepts into aligned build direction.

---

# 3. Core Product Hypothesis

## Primary Hypothesis

In Anaplan foundations workshops, visual artifacts create faster and stronger stakeholder alignment than written requirements alone.

## Supporting Hypotheses

* Business stakeholders react more effectively to a visual concept than to abstract written requirements.
* SAs and MBs can better interpret intent when page structure, selectors, grids, KPIs, and user actions are shown visually.
* A consistent pattern library can reduce variation in page design quality across consulting teams.
* Lightweight structured intake can improve output quality without creating a heavy requirements process.
* Anaplan-specific validation can reduce scope risk, feasibility risk, and downstream rework.

---

# 4. Current State of the Tool

## Current Tool Description

The current tool is a lightweight generator that produces Anaplan-style mockups for use in requirements and design workshops.

The current emphasis is on:

* Rapid mockup creation
* Low-fidelity concept sketches
* Anaplan-aware structure
* Workshop usability
* Visual alignment
* Avoiding polished UI design expectations

## Current Output Standard

The mockups should be rendered as:

* Black-and-white or grayscale
* Sharpie-style / hand-drawn
* Structured and readable
* Workshop-ready
* Low fidelity
* Not polished UI
* Not final design
* Not branded
* Not color-heavy
* Not overly stylized

## Current Layout Contract

Every mockup should follow a consistent structure:

1. Global Anaplan shell
2. Page header row
3. Page toolbar row
4. Main content canvas
5. Optional Additional Insights right rail
6. External disclaimer overlay

The fixed layout structure matters because the tool should not generate generic web app dashboards. It should generate concepts that feel plausible within the Anaplan UX environment.

## Current Design Constraint

Only the main content canvas and optional Additional Insights content should vary by mockup.

The shell, page header, selector placement, toolbar placement, and disclaimer behavior should remain consistent.

---

# 5. Product Philosophy

## Visual-First, Not Text-First

The product should not recreate a traditional user-story-first requirements process.

Instead:

* The visual mockup is the primary alignment artifact.
* The structured intake captures the context.
* The page pattern provides consistency.
* The page details explain the visual.
* The validation layer protects feasibility.
* The output supports downstream delivery.

## Better Framing

Use this product principle:

> The visual mockup is the alignment artifact. The structured metadata is the delivery bridge.

## What This Means in Practice

The tool should help teams:

* See the page concept
* React to the visual
* Align on structure and intent
* Capture enough page detail to inform build
* Flag obvious Anaplan UX risks
* Preserve open questions
* Avoid ambiguity across stakeholder groups

---

# 6. Target Users

## Primary Users

| User                            | Role in Workflow                             | Needs                                                              |
| ------------------------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| Solution Architect              | Facilitates design and validates feasibility | Quickly visualize page concepts and identify design risks          |
| Engagement Lead / Delivery Lead | Drives alignment and manages scope           | Create client-ready artifacts that support decisions               |
| Model Builder                   | Translates design into Anaplan build         | Understand layout intent, dimensionality, editability, and actions |
| Business SME                    | Provides requirements and feedback           | React to a concrete visual rather than abstract wording            |
| Product Owner / Process Owner   | Approves direction                           | Confirm that the page supports the intended task or decision       |
| Executive Sponsor               | Reviews higher-level concepts                | Understand solution direction quickly                              |

## Secondary Users

| User                          | Role                                                  |
| ----------------------------- | ----------------------------------------------------- |
| Internal QA / Design Reviewer | Reviews consistency and feasibility                   |
| Project Manager               | Tracks decisions, open questions, and follow-ups      |
| Client Enablement Lead        | Uses visuals for training or playback                 |
| Sales / Presales              | May use controlled examples for solution storytelling |

---

# 7. Core Use Cases

## Use Case 1: Foundations Workshop Page Design

A consultant is facilitating a client workshop and needs to quickly visualize a future-state Anaplan page.

The tool should help them capture page context, select a pattern, generate a visual, and use it to guide stakeholder discussion.

## Use Case 2: Requirements Alignment

A team has discussed a planning process but needs to confirm whether all stakeholders share the same understanding of the page experience.

The tool generates a mockup that stakeholders can review and react to.

## Use Case 3: Solution Architect to Model Builder Handoff

After a workshop, the SA needs to communicate the page intent to the model builder.

The mockup and associated page details provide a practical bridge between workshop discussion and build planning.

## Use Case 4: Client Playback

The project team needs to show the client what was heard during a workshop.

The mockup provides a lightweight, visual artifact that can be included in recap materials or design playback sessions.

## Use Case 5: Pattern-Based Page Standardization

A consulting team wants consistent Anaplan page patterns across projects.

The tool provides reusable design patterns for common Anaplan page types such as planner input, executive summary, variance review, workflow approval, and data validation.

---

# 8. Product Value Proposition

## For Consultants

* Accelerates workshop facilitation
* Reduces blank-page design effort
* Improves consistency across teams
* Helps communicate design intent
* Creates reusable artifacts from workshops

## For Clients

* Makes abstract requirements easier to understand
* Encourages better feedback
* Reduces interpretation gaps
* Helps stakeholders align faster
* Creates confidence in solution direction

## For Delivery Teams

* Improves handoff from workshop to build
* Captures page intent and assumptions
* Highlights open questions
* Reduces rework caused by misunderstood requirements
* Supports more consistent Anaplan UX design

---

# 9. Key Product Principles

## 1. Lightweight by Default

The app should not become a heavyweight requirements management platform.

It should remain fast enough to use during or immediately after workshops.

## 2. Visual First

The picture should lead the conversation.

Structured details should support the mockup, not replace it.

## 3. Anaplan-Aware

Outputs should reflect realistic Anaplan UX constructs, including:

* Pages
* Boards
* Worksheets
* Cards
* Grids
* KPIs
* Charts
* Selectors
* Actions
* Additional Insights
* Page links
* Context selectors
* Read-only and editable content areas

## 4. Low Fidelity by Design

The mockup should look intentionally rough.

This avoids the risk that clients interpret the artifact as a final UI design.

## 5. Pattern-Driven Consistency

The tool should eventually guide users through reusable page patterns rather than fully open-ended prompting.

## 6. Delivery-Aware, Not Delivery-Heavy

The app should capture enough information to support downstream delivery, but should not force a full formal requirements process.

## 7. Guardrails Over Hard Blocks

Validation should guide the user, not stop them unnecessarily.

Use warnings, suggestions, and design checks.

---

# 10. Current and Target Product Evolution

## Current State

| Current Capability          | Description                                     |
| --------------------------- | ----------------------------------------------- |
| Prompt-based generation     | User describes desired mockup                   |
| Sharpie-style output        | Low-fidelity sketch style                       |
| Fixed Anaplan shell concept | Uses a consistent Anaplan-like frame            |
| Workshop orientation        | Designed for client-facing design conversations |
| Visual output focus         | Main value is the generated mockup              |

## Target Future State

| Future Capability        | Description                                  |
| ------------------------ | -------------------------------------------- |
| Guided intake            | Structured form to capture page context      |
| Pattern selection        | User selects common Anaplan page type        |
| Pattern library          | Reusable Anaplan layout standards            |
| Page Design Record       | Structured details attached to each mockup   |
| Validation layer         | Anaplan-specific design checks               |
| Export package           | Mockup plus details for workshop recap       |
| Workshop operating model | Repeatable process for broader team adoption |

---

# 11. Recommended Release Roadmap

## Phase 0: Stabilize Current Generator

### Objective

Make the existing tool reliable enough for internal use.

### Key Outcomes

* Consistent mockup structure
* Consistent visual style
* Clear disclaimer
* No generic web app layouts
* Repeatable output quality

### Features

| Feature                           | Description                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------ |
| Fixed layout contract enforcement | Ensure every mockup follows the required shell/header/toolbar/canvas structure |
| Style guardrails                  | Ensure black-and-white, sharpie-style, low-fidelity output                     |
| Disclaimer enforcement            | Always show “Concept sketch for alignment only - not final UI design”          |
| Basic prompt hygiene              | Prevent polished UI, brand colors, shadows, or unsupported custom UI patterns  |
| Regenerate/refine                 | Allow quick iteration from the same input                                      |
| Output preview                    | Allow user to inspect generated mockup before saving or exporting              |

### Success Criteria

* A user can generate a consistent mockup from a simple prompt.
* The output clearly appears low fidelity.
* The page frame remains consistent.
* The tool does not generate unrealistic generic dashboards.

---

## Phase 1: Guided Intake MVP

### Objective

Improve the quality of generated mockups by improving the quality and consistency of user input.

### Design Intent

The guided intake should feel like workshop facilitation, not requirements documentation.

It should ask for the minimum useful context required to generate a strong mockup.

### Suggested Intake Fields

| Field                   | Type                 | Required | Purpose                                                 |
| ----------------------- | -------------------- | -------: | ------------------------------------------------------- |
| Page Name               | Text                 |      Yes | Names the mockup                                        |
| Process Area            | Dropdown or text     |      Yes | Connects the page to the planning process               |
| Primary Persona         | Dropdown or text     |      Yes | Identifies who uses the page                            |
| Page Purpose            | Short text           |      Yes | Defines the task or decision supported                  |
| Page Pattern            | Dropdown             |      Yes | Selects the layout family                               |
| Key Selectors           | Multi-select or text |      Yes | Captures page context controls                          |
| Main Content Components | Multi-select         |      Yes | Defines grids, KPIs, charts, action buttons, commentary |
| Additional Insights     | Toggle plus text     |       No | Adds optional right rail                                |
| Open Questions          | Text                 |       No | Captures unresolved workshop items                      |

### Initial Page Pattern Options

Start with a small set:

1. Executive Summary
2. Planner Input Worksheet
3. Variance Review
4. Workflow Approval
5. Data Validation

### Success Criteria

* Users no longer need to write perfect prompts.
* Generated mockups are more consistent.
* Workshop facilitators can complete intake quickly.
* The intake does not feel too heavy.
* The app remains fast and lightweight.

---

## Phase 2: Pattern Library v1

### Objective

Standardize the most common Anaplan page layouts.

### Pattern Library v1

| Pattern                 | Best Used For                          | Default Layout                                                          |
| ----------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| Executive Summary       | Leadership review, read-only reporting | KPI row, trend or variance chart, insights/actions, optional right rail |
| Planner Input Worksheet | Forecast entry, planning assumptions   | Selectors, editable grid, supporting KPIs, validation or notes panel    |
| Variance Review         | Actuals vs forecast/budget review      | KPI cards, variance chart, detail grid, commentary                      |
| Workflow Approval       | Submission and approval process        | Status cards, approval grid, action buttons, comments                   |
| Data Validation         | Error review and readiness checks      | Error KPIs, validation grid, exception details, action links            |

### Each Pattern Should Define

| Element                            | Purpose                             |
| ---------------------------------- | ----------------------------------- |
| Default layout structure           | Controls consistency                |
| Required intake fields             | Captures necessary details          |
| Recommended components             | Guides useful mockup creation       |
| Anti-patterns                      | Prevents bad or unrealistic designs |
| Example prompt                     | Supports testing and training       |
| Example output                     | Provides a reference design         |
| Pattern-specific validation checks | Supports future validation layer    |

### Success Criteria

* Users can choose a pattern instead of inventing a layout.
* Similar pages produce similar structures.
* The tool begins to encode internal Anaplan design standards.
* Outputs are easier for SAs and MBs to interpret.

---

## Phase 3: Page Design Record

### Objective

Make the mockup useful after the workshop.

### Product Framing

Avoid calling this a formal requirements document.

Preferred naming options:

* Page Design Record
* Mockup Details
* Details Behind the Mockup
* Workshop Output
* Page Notes

### Recommended Sections

| Section              | Purpose                                             |
| -------------------- | --------------------------------------------------- |
| Page Name            | Identifies page                                     |
| Process Area         | Ties to business process                            |
| Primary Persona      | Clarifies user                                      |
| Page Purpose         | Captures task or decision supported                 |
| Page Pattern         | Shows layout standard used                          |
| Selectors            | Captures page context                               |
| Main Components      | Lists grids, KPIs, charts, actions, comments        |
| Primary Grid Grain   | Captures dimensional expectation                    |
| Editable Areas       | Clarifies user input areas                          |
| Read-only Areas      | Clarifies calculated/reference areas                |
| User Actions         | Captures submit, approve, comment, navigate, export |
| Assumptions          | Captures design assumptions                         |
| Open Questions       | Captures unresolved items                           |
| Build Considerations | Captures internal SA/MB notes                       |

### Export Needs

| Export Type | Purpose                                                    |
| ----------- | ---------------------------------------------------------- |
| PNG         | Paste into decks or recap documents                        |
| Markdown    | Paste into design docs, Jira, Asana, Confluence, or Notion |
| PDF         | Client-friendly workshop package                           |

### Success Criteria

* A mockup can stand on its own after the workshop.
* SAs and MBs can understand page intent.
* Open questions are preserved.
* The output supports backlog creation without becoming a heavy backlog tool.

---

## Phase 4: Anaplan Validation Layer

### Objective

Reduce feasibility, scope, and usability risk.

### Design Intent

The validation layer should act as a design reviewer, not a blocker.

It should provide:

* Build readiness indicators
* Feasibility warnings
* Missing information checks
* Pattern compliance feedback
* Scope risk flags
* Suggested fixes

### Validation Categories

| Category            | Example Question                                   | Example Warning                                                 |
| ------------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| Structure           | Does the page follow the required layout contract? | Selectors appear in the canvas instead of the header            |
| Pattern Fit         | Does the pattern match the page purpose?           | Workflow Approval pattern selected for executive reporting page |
| Grid Density        | Is the grid trying to show too many dimensions?    | Grid includes product, customer, entity, account, and month     |
| Editability         | Are editable and read-only areas clear?            | Actuals appear editable                                         |
| Workflow            | Is approval tied to a clear process grain?         | Approval status shown without entity or planning unit grain     |
| Additional Insights | Is the right rail used appropriately?              | Design notes appear inside Additional Insights                  |
| Scope Risk          | Does the mockup imply undefined automation or AI?  | Auto-generated recommendation shown without logic definition    |
| Performance Risk    | Could page density create performance concerns?    | Multiple high-dimensional grids shown on one page               |
| Build Readiness     | Are key details complete?                          | Missing persona, selectors, or primary grid grain               |

### Recommended Output

| Validation Output | Example                                     |
| ----------------- | ------------------------------------------- |
| Build Readiness   | Medium                                      |
| High-Risk Flags   | 2                                           |
| Medium-Risk Flags | 3                                           |
| Missing Details   | Primary grid grain not defined              |
| Suggested Fixes   | Define input grain before workshop approval |

### Success Criteria

* The tool catches obvious design and feasibility risks.
* Feedback is understandable to consultants.
* Validation improves facilitation and handoff.
* The tool does not become overly technical or obstructive.

---

## Phase 5: Workshop Operating Model

### Objective

Package the accelerator for repeatable consulting team adoption.

### Supporting Assets

| Asset                     | Purpose                             |
| ------------------------- | ----------------------------------- |
| Facilitator Guide         | How to use the app during workshops |
| Pattern Catalog           | When to use each pattern            |
| Intake Cheat Sheet        | What information to capture         |
| Example Mockup Pack       | Shows strong examples               |
| Validation Guide          | Explains common warnings            |
| Client Playback Template  | Standard recap format               |
| Internal Review Checklist | SA/MB quality review before build   |

### Recommended Workflow

#### Before Workshop

* Identify process areas.
* Identify priority pages.
* Preselect likely patterns.
* Gather known dimensions and planning context.
* Prepare starter mockups if useful.

#### During Workshop

* Confirm page objective.
* Select pattern.
* Complete guided intake.
* Generate mockup.
* Review the visual first.
* Capture assumptions and open questions.
* Refine as needed.

#### After Workshop

* Export mockup and Page Design Record.
* Run validation.
* Review with SA and MB.
* Convert approved outputs into build workplan or backlog items.
* Preserve decisions and open questions.

### Success Criteria

* Multiple consultants can use the tool consistently.
* Workshop outputs are easier to review and hand off.
* Delivery teams trust the artifact.
* Clients understand the mockup as alignment material, not final UI.

---

# 12. Initial MVP Recommendation

## Best Next Release

The next release should focus on:

> Guided Intake + Pattern Selection

This is the highest-value near-term enhancement because it improves generation quality without turning the tool into a heavy platform.

## MVP Scope

### Include

* Page name
* Process area
* Primary persona
* Page purpose
* Page pattern selector
* Key selectors
* Main content components
* Additional Insights toggle
* Open questions
* Basic metadata attached to output

### Exclude for Now

* Full Page Design Record
* Complex validation
* Deep version control
* Jira / Asana integrations
* Role-based permissions
* Large pattern library
* Formal requirements workflow
* Polished UI design mode

## MVP Design Goal

A consultant should be able to:

1. Select a common Anaplan page pattern.
2. Complete a lightweight guided intake.
3. Generate a consistent Anaplan-aware concept sketch.
4. Use the sketch to align with stakeholders.
5. Retain enough context to understand the page later.

---

# 13. Design Risks to Watch

## Risk 1: The Tool Becomes Too Heavy

If the intake becomes too detailed, consultants will stop using it during workshops.

### Mitigation

Use progressive disclosure. Ask only required questions first, then allow optional details.

## Risk 2: Mockups Look Too Final

If the output becomes polished, clients may treat it as final UI.

### Mitigation

Preserve low-fidelity sharpie style and external disclaimer.

## Risk 3: The Tool Produces Unrealistic Anaplan Designs

If the tool generates generic web app concepts, it may mislead clients.

### Mitigation

Use fixed layout contracts, pattern templates, and validation checks.

## Risk 4: Structured Details Compete with the Visual

If metadata becomes the main artifact, the tool loses its visual-first advantage.

### Mitigation

Keep the mockup central. Treat details as supporting context.

## Risk 5: Too Many Patterns Too Soon

A large pattern library can create complexity and uneven quality.

### Mitigation

Start with five high-value patterns and expand only after testing.

## Risk 6: Validation Becomes Too Technical

If validation is overly technical, consultants may ignore it.

### Mitigation

Use plain-language warnings and practical suggested fixes.

---

# 14. Suggested Product Design Questions

The design partner should explore the following:

## Workflow Questions

* Should the user start from a prompt, a pattern, or both?
* How much intake can be captured live in a workshop without slowing the conversation?
* Should the generated mockup be editable after generation?
* How should users refine the mockup without starting over?
* How should open questions be captured and displayed?

## Information Architecture Questions

* Where should the intake live?
* Should pattern selection happen before or after page purpose?
* Should Page Design Record details be shown beside the mockup or below it?
* Should validation checks be visible immediately or only on demand?
* How should metadata be attached to each mockup?

## Output Questions

* What export formats are needed first?
* Should the app export one page at a time or a workshop package?
* Should the disclaimer be embedded in every output?
* Should users be able to hide internal build considerations for client export?
* Should outputs have a version number or timestamp?

## Adoption Questions

* What is the minimum workflow that consultants would actually use?
* What fields are required versus optional?
* What examples are needed to train users?
* How much guidance should the tool provide to non-SAs?
* What review step is needed before client playback?

---

# 15. Suggested UX Structure

## Primary App Flow

### Step 1: Start New Mockup

User chooses:

* Start from guided intake
* Start from prompt
* Start from existing mockup

For the next release, prioritize guided intake.

### Step 2: Select Page Pattern

User selects one of the initial five page patterns.

### Step 3: Complete Guided Intake

User fills out lightweight required fields.

### Step 4: Generate Mockup

App generates a sharpie-style Anaplan-aware mockup.

### Step 5: Refine

User can adjust:

* Page purpose
* Selectors
* Components
* Additional Insights
* Layout emphasis
* Open questions

### Step 6: Save / Export

User can retain or export the visual artifact.

Later releases can include Page Design Record and validation.

---

# 16. Feature Prioritization Framework

Use this prioritization lens:

| Question                                               | Priority Signal |
| ------------------------------------------------------ | --------------- |
| Does it improve workshop speed?                        | High            |
| Does it improve visual alignment?                      | High            |
| Does it improve Anaplan feasibility?                   | High            |
| Does it reduce interpretation risk?                    | High            |
| Does it help SAs and MBs after the workshop?           | Medium/High     |
| Does it add administrative overhead?                   | Low             |
| Does it make the tool feel like a requirements system? | Be careful      |
| Does it make mockups look too final?                   | Be careful      |
| Does it require major integrations?                    | Defer           |

---

# 17. Recommended Design North Star

The product design partner should optimize for this experience:

> A consultant in a live foundations workshop can quickly capture page context, select a common Anaplan pattern, generate a rough but structured page sketch, and use that visual to align stakeholders without slowing down the conversation.

---

# 18. Definition of Success

## Near-Term Success

* The tool produces more consistent mockups.
* Consultants need less prompt engineering.
* Users can generate useful visuals quickly.
* The visual output supports real workshop discussion.
* The app remains lightweight.

## Medium-Term Success

* Mockups are paired with structured page details.
* SAs and MBs can use the output after the workshop.
* Teams start reusing standard page patterns.
* Open questions and assumptions are preserved.
* Client playback becomes easier.

## Long-Term Success

* The accelerator becomes a standard part of foundations workshops.
* Page design quality becomes more consistent across projects.
* Delivery teams experience less rework from misunderstood requirements.
* The tool helps bridge discovery, solution design, and build planning.
* The firm develops a reusable library of Anaplan design patterns.

---

# 19. Clear Product Boundaries

## The Tool Is

* A visual-first workshop accelerator
* A low-fidelity Anaplan mockup generator
* A structured page concepting tool
* A facilitator aid
* A delivery handoff support tool
* A pattern-driven design accelerator

## The Tool Is Not

* A Figma replacement
* A production UI builder
* A full requirements management platform
* A complete Anaplan model design tool
* A Jira or Asana replacement
* A polished client UI prototype
* An official Anaplan product
* A substitute for SA review

---

# 20. Immediate Instruction to Product Design Agent

Use this brief to help design the next release of the Anaplan Mockup Generator Accelerator.

The recommended next release is:

## Release v0.2: Guided Intake + Pattern Selection

Focus on designing a lightweight workflow where a consultant can:

1. Start a new mockup.
2. Select a page pattern.
3. Complete a short guided intake.
4. Generate a consistent Anaplan-aware concept sketch.
5. Refine the output.
6. Retain the mockup as a visual alignment artifact.

Keep the experience fast, visual-first, and workshop-friendly.

Do not over-design requirements management, complex validation, or integrations in this release. Those are future phases.
