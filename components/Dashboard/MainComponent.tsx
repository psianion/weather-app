import { SearchBar } from "../SearchBar";
import SelectedCity from "./SelectedCity";

const MainComponent = () => {
  return (
    <div className="flex flex-col gap-4  w-full xl:w-[600px]">
      <SearchBar />
      <SelectedCity />
      {/**MAP SECTION */}
      {/* <div className="w-full h-full border border-solid rounded-md"></div> */}
    </div>
  );
};

export default MainComponent;
