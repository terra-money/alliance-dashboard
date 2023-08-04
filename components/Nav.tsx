import Link from "next/link";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { Suspense } from 'react';

export default function Nav() {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src='https://station-assets.terra.money/img/chains/Terra.svg'
          alt='logo'
          width={30}
          height={30}
        />
        <p className="logo_text">Alliance Dashboard</p>
      </Link>

      <div className="flex gap-3 md:gap-5">
        <Suspense fallback={<div>Loading...</div>}>
          <Dropdown />
        </Suspense>
      </div>
    </nav>
  )
}