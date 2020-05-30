import React, { useEffect, useState } from 'react';

import './dashboard.css'
import { ChangeURI, debounce } from '../../../Utils/Util';
import { GetData } from '../../../Utils/HTTPmethods';
import Table from '../../Tools/Table/Table';

function Dashboard(props){ 
    const [usuario, setUsuario] = useState();
    const [calls, setCalls] = useState([]);
    const [dstFilter, setDstFilter] = useState("");
    // const [filteredCalls, setFilteredCalls ] = useState([]);
    useEffect(()=> {
        const user = localStorage.getItem("user");
        if(user){
            setUsuario(JSON.parse(user));
        }else{
            ChangeURI("/");
        }

        GetCallsofServer();
    }, [])

    async function GetCallsofServer(){
        const get_calls = "http://localhost:3001/call/get";
        const getService = await GetData(get_calls);
        console.log("llamadas:", getService);
        if(getService){ 
            
            setCalls(getService);
        }
    }

    function Logout(){ 
        localStorage.removeItem("user");
        ChangeURI("/");
    }

    // function ChangeData(e){ 
    //     const value= e.target.value.toUpperCase();
    //     if(value === ""){ 
    //         setFilteredCalls([]);
    //         return;
    //     }
    //     const data = calls.filter(res => { 
    //         if(!res.dst){ 
    //             return false;
    //         }
    //         const filteredItem = res.dst.toString().toUpperCase();
    //         const bufferValue = filteredItem.slice(0,value.length);
    //         console.log(value, bufferValue);
    //         if(bufferValue === value){ 
    //             return true;
    //         }
    //         return false;

    //     });
    //     console.log(filteredCalls);
    //     setFilteredCalls([...data]);
    //     // console.log("entro",e.target.value);
    // }



    return(
        <div className="dashboard-wrapper">
            <div className="contenido">
                <nav>
                    <h1>SELACOM</h1>
                    <div className="row-text">
                        { 
                            usuario &&
                            <span className="username">{usuario.username}</span>

                        }
                        <div className="dropdown-logout">
                            <span class="material-icons">
                            keyboard_arrow_down
                            </span>
                            <div>
                                <div className="row-text" onClick={Logout}>
                                    <span class="material-icons">
                                    exit_to_app
                                    </span>
                                    <p>Logout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="filters">
                    <span class="material-icons">search</span>
                    <label className="input-general">
                        <input type="text" name="filtro" onChange={(e) => setDstFilter(e.target.value)} id="username" autoComplete="false" required/>
                        <span className="input-placeholder">Busqueda por Destino</span>
                    </label>        

                </div>
                { 
                    calls.length != 0 &&
                    <Table data={calls}
                        filters={{ 
                            dst: dstFilter
                        }} 
                        headers={ {
                            src:"Fuente",
                            dst: "Destino",
                            calldate: "Fecha de llamada",
                            duration: "Duración"
                        } } />
                }
            </div>
        </div>
    )
}

export default Dashboard;