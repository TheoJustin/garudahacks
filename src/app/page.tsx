import CtaButton from "./_components/cta-button";
import Test from "./_components/test";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col">
      {/* Heading */}
      <Test />
      <header>
        <h1>Land Your Dream Job with Ease and Confidence</h1>
        <h3>
          With AI-driven insights and personalized recommendations to guide your
          career journey
        </h3>
      </header>

      {/* CTA Button */}
      <CtaButton />
    </main>
  );
}
