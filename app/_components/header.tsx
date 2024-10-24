import { Icons } from "@/components/common/icons";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
      <div className="flex"></div>

      <div className="flex items-center gap-3">
          生成卡片
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="https://github.com/Kiasma1/Ez2Card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.gitHub className="w-6 h-6" />
        </Link>

        {/* <Link
          href="https://www.buymeacoffee.com/tonyliang6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="bmc-logo.svg" className="w-6 h-6" alt="Buy me a coffee" />
        </Link> */}
      </div>
    </header>
  );
}
