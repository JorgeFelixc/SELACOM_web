import React from "react";

import "./Table.css";
import { isArray } from "util";
// {actionName: '', method: () => {}, class: ''/undefined }
function Table({ data, dataIgnored, actions, headers, filters }) {
  function DataExist() {
    if (data) {
      if (isArray(data)) {
        if (data.length === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  function ChangeHeader(propName){ 
    const propHeader = Object.entries(headers);
    // const objectSchema = Object.entries(data[0]);
    const filtered = propHeader.filter(res => res[0] === propName);
    if(filtered.length > 0){
      return filtered[0][1];
    }

    return propName;
  }

  // Avisa si el campo que esta filtrado, es decir si regresa falso
  // quiere decir que no esta filtrado y necesita renderizarse 
  // Que hago? comparo los filtros con cada campo de la tabla, y si coiniden
  // los filtro
  function filteredRow(propName, value){ 
    // console.log("algo?", propName, value);
    if(!filters){ 
      return true;
    }

    

    const entriesData = Object.entries(filters);
    const isFill = entriesData.filter(item => { 
      if( isArray(item[1])){ 
        
        if(item[1].length === 0){ 
          return false;
        }
        return true;
      }
      
      if(item[1] === ""){ 
        return false;
      }
      return true;
    })
    if(isFill.length === 0){ 
      return true;
    }


    const data = entriesData.filter(item => {
      if(!propName[item[0]]){ 
        return false;
      }

      if(item[1] === ""){ 
        return true;
      }

      // Si la propiedad es un array de lugar de un string este filtra todos los strs
      if(Array.isArray(item[1])){ 
        if(item[1].length === 0){ 
          return true;
        }

        // Si encuentra una coincidencia dentor del array
        const isSomething = item[1].filter(res => {
          const recortedValue = propName[item[0]].slice(0, res.toString().length).toUpperCase();
          // console.log("filtro=?", recortedValue, res.toUpperCase())
          if(res.toUpperCase() === recortedValue){ 
            return true;
          }
          return false;
        });

        // console.log("hayAlgo=?",isSomething);
        if(isSomething.length > 0){ 
          return false;
        }

        return true;
      }


      const filterValue = item[1].toUpperCase();
      const recortedValue = propName[item[0]].slice(0, filterValue.length).toUpperCase();
      
      if(filterValue === recortedValue){ 
        return false;
      }
  
      return true;
    });

    console.log("data:", data, entriesData.length);
    if(data.length >= 0 && data.length < entriesData.length){ 
      return true;
    }

    return false;

  }




  return (
    <>
      {DataExist(data) && <p className="no-data">:( No existen datos</p>}
      <div className="table">

        <div className="table-header">
          {data &&
            Object.entries(data[0]).map((item,index) => {
              if (dataIgnored) {
                if (dataIgnored.indexOf(item[0]) === -1) {
                  return <p key={index}>{item[0]}</p>;
                }
              } else {
                return <p key={index}>{ChangeHeader(item[0])}</p>;

                // return <p key={index}>{item[0]}</p>;
              }
            })}

          {Array.isArray(actions) && <p>Actions</p>}
        </div>

        {data &&
          data.filter(filteredRow).map((item,index) => {
            return (
              <div className="table-row" key={index}>
                {Object.entries(item).map((i,k) => {
                  if (dataIgnored) {
                    if (dataIgnored.indexOf(i[0]) === -1) {
                      return <p key={k}> {i[1]} </p>;
                    }
                  } 

                  
                  return <p key={k}> {i[1]} </p>;
                })}

                {Array.isArray(actions) && (
                  <p>
                    {
                    actions.map((actionItem, k) => {
                      if (actionItem.class) {
                        return (
                          <button key={k}
                            onClick={() => actionItem.method(data[index])}
                            className={actionItem.class}
                          >
                            {actionItem.actionName}
                          </button>
                        );
                      } 
                      else {
                        return (
                          <button key={k}
                            onClick={ () => actionItem.method(data[index])}
                            className="action-btn"
                          >
                            {actionItem.actionName}
                          </button>
                        );
                      }
                    })
                    }
                  </p>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Table;
