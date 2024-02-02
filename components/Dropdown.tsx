"use client";

import { useState } from "react";
import styles from "../styles/Dropdown.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from "../const/chains";

export default function Dropdown() {
  const params = useSearchParams();
  const [show, setShow] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>(SUPPORTED_CHAINS[params.get("selected") ?? DEFAULT_CHAIN]);
  const router = useRouter();

  return (
    <div
      className={styles.select}
      onClick={() => {
        const curShow = !show;
        setShow(curShow);
        setTimeout(
          () => {
            const dropdown = document.getElementById("dropdown");
            if (dropdown) dropdown.style.display = curShow ? "block" : "none";
          },
          curShow ? 0 : 350
        );
      }}
    >
      {selected && (
        <div className={styles.selected}>
          <img src={selected.icon} alt={"selected"} width={30} height={30} />
          <span>{selected.name}</span>
          <img src="/images/arrow-down.svg" alt="arrow" width={24} height={24} />
        </div>
      )}
      <div id={"dropdown"} className={`${show ? "" : styles.reversed} hidden`}>
        <ul>
          {Object.keys(SUPPORTED_CHAINS).map((chain) => (
            <li
              key={chain}
              className="flex gap-3 p-3 items-center"
              onClick={() => {
                setSelected(SUPPORTED_CHAINS[chain]);
                router.push(`?selected=${SUPPORTED_CHAINS[chain].id}`);
              }}
            >
              <img src={SUPPORTED_CHAINS[chain].icon} alt={chain} width={30} height={30} />
              <span>{SUPPORTED_CHAINS[chain].name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
