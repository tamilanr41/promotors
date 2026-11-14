import { Outlet } from "react-router-dom";
import ImprovedHeader from "./ImprovedHeader";
import ImprovedFooter from "./ImprovedFooter";

export default function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ImprovedHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <ImprovedFooter />
    </div>
  );
}
