import React, { useState } from 'react';

function DropdownList({datos, value, callback,state, placeholder, type}){ 
    const [currentData, setCurrentData] = useState(datos[0].name);
    function ChangeInputText(e){
        setCurrentData(e.target.getAttribute("data"));
        const data = e.target.id.split(',');
        const exist = data.filter(res => {
            if(state.indexOf(res) === -1){ 
                return false;
            }
            return true;
        });

        if(type==='one'){
            callback(data);
            return;
        }

        if(exist.length === 0 && e.target.checked){ 
            callback([...state, ...data])
            return;
        }

        if(exist.length === 0 && !e.target.checked){ 
            return;
        }


        let buffer = [...state];
        buffer = buffer.filter(item => { 
            if(data.indexOf(item) === -1){ 
                return true;
            }
            return false;
        });

        

        callback([...buffer]);

    }

    return(
        <label className="input-select" tabIndex="0"> 

            <span className="input-placeholder">
            {placeholder} { currentData }
            <span class="material-icons">
                keyboard_arrow_down
                </span>
            </span>

            <div className="dropdown-list" tabIndex="5">
                { 
                    Array.isArray(datos) &&
                    datos.map(item => { 
                        return(
                            <label className="chekbox-list" tabIndex="5">
                                <input radioGroup={value} type={type === 'one' ? "radio" : "checkbox"}  autoFocus="false" data={item.name}  onChange={ChangeInputText} name={value}  id={item.value}/>
                                <span className="checkbox-text">{item.name}</span>
                            </label>
                        )

                    })
                }
            </div>
        </label>    
    )
}

export default DropdownList;