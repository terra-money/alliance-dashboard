"use client";

import { useState } from "react";
import styles from "@/styles/Dropdown.module.css";
import { supportedChains, defaultChain } from "@/const/Variables";
import { useRouter, useSearchParams } from "next/navigation";

export default function Dropdown() {
  const params = useSearchParams();
  const [show, setShow] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>(supportedChains[params.get("selected") ?? defaultChain]);
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
          {Object.keys(supportedChains).map((chain) => (
            <li
              key={chain}
              className="flex gap-3 p-3 items-center"
              onClick={() => {
                setSelected(supportedChains[chain]);
                router.push(`?selected=${supportedChains[chain].id.toLocaleLowerCase()}`);
              }}
            >
              <img src={supportedChains[chain].icon} alt={chain} width={30} height={30} />
              <span>{supportedChains[chain].name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
