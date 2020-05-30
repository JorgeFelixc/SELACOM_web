

//Son los metodos para realizar peticiones al servidores.
//->
//<-


var newHeaders = {
    "Content-Type":"application/json",
    Authorization: `${sessionStorage.getItem("auth")}`
  };
  
  var imgHeaders = {
    // "Content-Type":"application/json",
    Authorization: `${sessionStorage.getItem("auth")}`
  
  }
  
  //Hace un post al servidor con un objeto anonimo y con un endpoint.
  //Regresa un null o la respuesta del servidor
  export async function PostData(data, endpoint) {
    
    console.log("DATA:",data);
    const request = await fetch(endpoint, {
      body: JSON.stringify(data),
      headers: newHeaders,
      method: "POST",
    });
  
    const response = await request;
    
    if (response.status != 200) {
      console.error(`Error en la respuesta del servidor ${response.status}`);
      return false;
    }
  
    try {
      return response.json();
    } catch (error) {
      console.warn("Error en respuesta del servidor.", response.text());
      return false;
      return response.text();
    }
  }
  
  //Solo trae datos del servidor por la URL
  export async function GetData(endpoint) {
    const request = await fetch(endpoint, { headers: newHeaders });
    const response = await request;
    if (response.status != 200) {
      console.error(`Error en la respuesta del servidor ${response.status}`);
      return false;
    }
  
    try {
      return response.json();
    } catch (error) {
      console.warn("Error en respuesta del servidor.", response.text());
      return false;
  
      return response.text();
    }
  }
  
  //Este hace un post pero tambien envia una imagen al servidor.
  export async function PostDataPintura(data, imagen, endpoint){
    const objectEntries = Object.entries(data);
    var formData = new FormData();
  
    //llena el formdata con el objeto
    for(var i=0;i<objectEntries.length;i++){ 
      formData.append(objectEntries[i][0], objectEntries[i][1]);
    }
  
    formData.append('imagen',imagen);
    formData.forEach((i) =>{
      console.log("form data ->", i);
    });
    
    const request = await fetch(endpoint, { 
      method:'POST', body:formData, headers:imgHeaders
    });
  
    const response = await request;
    
    if (response.status != 200) {
      console.error(`Error en la respuesta del servidor ${response.status}`);
      return false;
    }
  
    try {
      return response.json();
    } catch (error) {
      console.warn("Error en respuesta del servidor.", response.text());
      return false;
      return response.text();
    }
  }
  
  export async function DeleteData(data, endpoint) {
    
    console.log("DATA:",data);
    const request = await fetch(endpoint, {
      body: JSON.stringify(data),
      headers: newHeaders,
      method: "DELETE",
    });
  
    const response = await request;
    
    if (response.status != 200) {
      console.error(`Error en la respuesta del servidor ${response.status}`);
      return false;
    }
  
    try {
      return response.json();
    } catch (error) {
      console.warn("Error en respuesta del servidor.", response.text());
      return false;
      return response.text();
    }
  }
  
  
  export async function GetDataNoCredentials(endpoint){
    const request = await fetch(endpoint);
    const response = await request;
    if (response.status != 200) {
      console.error(`Error en la respuesta del servidor ${response.status}`);
      return false;
    }
  
    try {
      return response.json();
    } catch (error) {
      console.warn("Error en respuesta del servidor.", response.text());
      return false;
  
      return response.text();
    }
  }