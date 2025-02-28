import Table from "./components/Table";
import { GET_PROJECTS } from "./constants/url";
import { PAGE_SIZE } from "./constants/project";
import Project from "./models/Project";
import { ColumnConfig } from "./models/Table";
import "./App.css";

const columns: ColumnConfig<Project>[] = [
  { header: "S.No.", accessor: "s.no" },
  { header: "Percentage Funded", accessor: "percentage.funded" },
  { header: "Amount Pledged", accessor: "amt.pledged" },
];

const App = () => {
  return (
    <main>
      <h1 id="page-title" className="appTitle">
        Highly-Rated Kickstarter Projects
      </h1>

      <section aria-labelledby="page-title">
        <Table<Project>
          apiUrl={GET_PROJECTS}
          pageSize={PAGE_SIZE}
          columns={columns}
        />
      </section>
    </main>
  );
};

export default App;
