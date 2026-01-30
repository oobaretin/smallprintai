# 🔍 SmallPrintAI

> **Transform complex legal documents into clear, actionable insights.**

SmallPrintAI uses professional-grade LLMs to strip away legalese and highlight the risks that actually matter. Built for speed, accuracy, and technical excellence.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **AI Engine:** Vercel AI SDK + Claude 3.5 Sonnet / GPT-4o (Anthropic or OpenAI)
- **Styling:** Tailwind CSS + shadcn-style components (CVA, cn)
- **Animations:** Framer Motion (60fps transitions)
- **Data Viz:** Recharts (real-time risk analytics)
- **Parsing:** officeparser & pdf-parse
- **UX:** Sonner (toast notifications)

## ✨ Key Features

- **Professional-Grade Analysis:** AI trained on legal frameworks to identify "Hidden Gotchas."
- **Risk Assessment:** Color-coded severity indicators with plain-English summaries.
- **Lightning Fast:** Document processing and analysis in &lt; 60 seconds.
- **Technical Excellence:** Optimized with code splitting, error boundaries, and mobile-first responsive design.

## 🚀 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/smallprint-ai
   cd smallprint-ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment**

   Add your API key to `.env.local`:

   - **Anthropic (default):** `ANTHROPIC_API_KEY=your_key` — [console.anthropic.com](https://console.anthropic.com/)
   - **OpenAI (optional):** `OPENAI_API_KEY=your_key` — use with `@ai-sdk/openai` in API routes

4. **Run development**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

5. **Build for production**

   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

- `src/app/` — App Router: landing, dashboard, about, signin, API routes (analyze, completion, analyze-object)
- `src/components/` — UI: Navbar, Hero, dropzone, AnalyticsDashboard, ProfessionalInsights, RiskAssessmentCard, LegalReport, etc.
- `src/lib/` — prompts, analytics, milestones, analysis-types, performance

See [FEATURES.md](./FEATURES.md) for feature status and implementation details.

## 📄 License

Private / All rights reserved.
