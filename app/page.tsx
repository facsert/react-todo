import List from "@/components/List";
import Summary from "@/components/Summary";

export default function HomePage() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-1/4">
        <Summary />
      </div>
      <div className="w-full h-3/4">
        <List />
      </div>
    </div>
  )
}