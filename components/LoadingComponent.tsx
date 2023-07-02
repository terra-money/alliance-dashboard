import { Loading } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function LoadingComponent({
  isLoading,
  values,
  children,
}: {
  isLoading: boolean,
  values: any,
  children: React.ReactNode
}) {
  const [component, setComponent] = useState<React.ReactNode>(<Loading />);

  useEffect(() => {
    if (isLoading) setComponent(<Loading />)
    else if (values.length === 0) setComponent(<p className="p-3 text-center font-bold font-inter">This chain has not whitelisted any Alliance assets yet</p>)
    else setComponent(children);
  }, [values, isLoading]);

  return component;
}