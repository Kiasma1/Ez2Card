import SvgGenerator from "@/components/svg-generator";

// import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <div className="p-6 md:p-8">
      {/* flex flex-col items-center justify-center min-h-[85vh] px-8 font-sans */}
      <main className="w-full max-w-6xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold text-center">Ez2Card</h1>
        <h2 className="text-lg text-center font-sans font-semibold flex flex-col sm:flex-row gap-2 items-center justify-center mx-auto w-full">
          <span>输入你的内容，选择不同Prompt，获取一个卡片</span>
        </h2>
        <SvgGenerator />
      </main>
    </div>
  );
}
