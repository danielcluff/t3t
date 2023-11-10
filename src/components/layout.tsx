import { PropsWithChildren } from "react";
import Header from "./header";

export const PageLayout = (props: PropsWithChildren<{}>) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="overscroll-y-scroll h-full w-full border-x border-slate-400 md:max-w-2xl">
        <Header />
        {props.children}
      </div>
    </main>
  );
};
