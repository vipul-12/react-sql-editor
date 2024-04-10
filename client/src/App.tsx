import styled from "styled-components";
import Results from "./components/Results";
import { useEffect, useState } from "react";
import axios from "axios";
import SqlEditor from "./components/SqlEditor";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  .title {
    display: flex;
    justify-content: center;
    margin: 1rem;
    background-color: #31bbdd;
  }

  .editor {
    display: flex;    
    justify-content: center;   
    border: 2px solid #7bafc9; 
    box-sizing: border-box;
    padding: 2px;
  }

  .executeButton {
    margin: 8px 8px;
    border-radius: 5px;
    height: 40px;
    width: 200px;
    font-size: 16px;
    background-color: #cceeff;
    color: #333333;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #99ddff;
    }
  }

  .metaInfo {
    display: flex;
    flex-direction: column;
    align-items: center;    
    box-sizing: border-box;
    height: 300px;
    overflow: auto;
    padding; 15px;
    margin: 5px;
  }

  .meta-table{
    font-weight: bold;
  }

  .response-true{
    color: #16aa3b;
  }

  .response-false{
    color: #ff0000;
  }
`;
type MetaData = {
  column: string;
  description: string[];
};
type AppState = {
  sqlData: any[];
  theQuery: string;
  responseMessage: string;
  responseStatus: boolean;
  metaData: MetaData[];
};

const App = () => {
  const [state, setState] = useState<AppState>({
    sqlData: [],
    theQuery: "",
    responseMessage: "",
    responseStatus: false,
    metaData: [],
  });

  const getMetaData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/sendQuery", {
        sqlQuery:
          "SELECT name AS table_name, sql AS table_description FROM sqlite_master WHERE type='table'",
      });

      const rows = response.data.result.rows;

      let metaData: any[] = [];
      rows.map((item: any) => {
        const regex = /\((.*)\)/g;
        let column = item.table_name;
        let description: any[] = [];

        let match;
        while ((match = regex.exec(item.table_description)) !== null) {
          description = match[1].split(",");
        }
        metaData.push({
          column,
          description,
        });
      });

      setState((state: AppState) => ({
        ...state,
        metaData: metaData,
      }));
    } catch (error: any) {
      setState((state: AppState) => ({
        ...state,
        responseMessage: error.response.data.message,
        sqlData: [],
        responseStatus: error.response.data.success,
      }));
    }
  };

  const getData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/sendQuery", {
        sqlQuery: state.theQuery.replace(/\s+/g, ' '),
      });

      if (
        response.data.result.message.toUpperCase() === "SELECT" ||
        response.data.result.message.toUpperCase() === "PRAGMA"
      ) {
        let resultMessage = response.data.result.message;
        if (
          resultMessage.toUpperCase() === "SELECT" &&
          response.data.result.rows.length === 0
        )
          resultMessage = "Table Is Empty";
        setState((state: AppState) => ({
          ...state,
          sqlData: response.data.result.rows,
          responseMessage: resultMessage,
          responseStatus: response.data.success,
          theQuery: "",
        }));
      } else {
        setState((state: AppState) => ({
          ...state,
          responseMessage: response.data.result.message,
          sqlData: [],
          responseStatus: response.data.success,
          theQuery: "",
        }));
      }
    } catch (error: any) {
      setState((state: AppState) => ({
        ...state,
        responseMessage: error.response.data.message,
        sqlData: [],
        responseStatus: error.response.data.success,
      }));
    }

    getMetaData();
  };

  const onTextChange = (change: string) => {
    setState((state: AppState) => ({
      ...state,
      theQuery: change,
    }));
  };

  useEffect(() => {
    getMetaData();
  }, []);

  return (
    <StyledApp>
      <div className="title">
        <h1>SQL - EDITOR</h1>
      </div>
      <div className="body">
        <div className="editor">
          <div className="metaInfo">
            <h3>Table Descriptions</h3>
            {state.metaData.length > 0 ? (
              <>
                <ul>
                  {state.metaData.map((item: MetaData, index: number) => (
                    <li key={index}>
                      <div className="meta-table">{item.column}</div>
                      <ul>
                        {item.description.map((column: string, id: number) => (
                          <li key={id}>{column}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>No Tables in your Database</>
            )}
          </div>

          <SqlEditor theQuery={state.theQuery} onTextChange={onTextChange} />
        </div>
        <button onClick={getData} className="executeButton">
          Execute Query
        </button>

        <div className="table">
          {state.sqlData.length > 0 ? (
            <Results
              data={state.sqlData}
              headers={Object.keys(state.sqlData[0])}
            />
          ) : (
            <h3 className={`response-${state.responseStatus}`}>
              {state.responseMessage}
            </h3>
          )}
        </div>
      </div>
    </StyledApp>
  );
};

export default App;
