import Table from "./components/Table";
import { GET_PROJECTS } from "./constants/url";
import { PAGE_SIZE } from "./constants/project";
import Project from "./models/Project";
import { ColumnConfig } from "./models/Table";

const columns: ColumnConfig<Project>[] = [
  { header: "S.No.", accessor: "s.no" },
  { header: "Percentage Funded", accessor: "percentage.funded" },
  { header: "Amount Pledged", accessor: "amt.pledged" },
];

const App = () => {
  return (
    <div>
      <h1>Highly-Rated Kickstarter Projects</h1>
      <Table<Project>
        apiUrl={GET_PROJECTS}
        pageSize={PAGE_SIZE}
        columns={columns}
      />
    </div>
  );
};

export default App;
