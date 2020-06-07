import React, { useEffect, useState } from 'react';

import './dashboard.css'
import { ChangeURI, debounce } from '../../../Utils/Util';
import { GetData } from '../../../Utils/HTTPmethods';
import Table from '../../Tools/Table/Table';
import DropdownList from '../../Tools/SelectBox/DropdownSelect';

function Dashboard(props){ 
    const [usuario, setUsuario] = useState();
    const [calls, setCalls] = useState([]);
    const [dstFilter, setDstFilter] = useState("");
    const [sucursales, setSucursales] = useState([]);
    const [getSucursales, setGetSucursales] = useState([]);
    const dropDownListDatos = [
        {name: "Sucursal 1 (1, 668)", value:["1", "668"] },
        {name: "Sucursal 2 (2, 667)", value:["2", "667"] },
        {name: "Sucursal 3 (3, 687)", value:["3", "687"] },
    ]

    const dropDownPeticiones = [ 
        {name: "Sucursal 1 (1, 668)", value:"1" },
        {name: "Sucursal 2 (2, 667)", value:"2" },
        {name: "Sucursal 3 (3, 687)", value:"3" },
    ]

    useEffect(()=> {
        const user = localStorage.getItem("user");
        if(user){
            setUsuario(JSON.parse(user));
        }else{
            ChangeURI("/");
        }

        GetCallsofServer();
    }, [])

    useEffect(() => { 
        GetCallsofServer(getSucursales[0]);
    }, [getSucursales]);

    async function GetCallsofServer(num_server = 1){
        const get_calls = "http://localhost:3001/call/get/"+num_server;
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

                    {/* <span class="material-icons">search</span> */}
                    {/* <DropdownList datos={dropDownListDatos} callback={setSucursales} state={sucursales} placeholder="Filtro Sucursales" value="sucursales" /> */}
                    <DropdownList datos={dropDownPeticiones} type="one" callback={setGetSucursales} state={getSucursales} placeholder="Sucursales" value="sucursales" />

                </div>
                { 
                    calls.length != 0 &&
                    <Table data={calls} 
                        filters={{ 
                            dst: dstFilter,
                            src: sucursales
                        }} 
                        headers={ {
                            src:"Fuente",
                            dst: "Destino",
                            calldate: "Fecha de llamada",
                            duration: "Duración"
                        } } />
                }

                { 
                
                    calls.length == 0 &&
                    <div className="nohay-wrapper">
                        <span class="material-icons">
                        bug_report
                        </span>
                        <p className="nohay">No trajo nada el servidor :(</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dashboard;