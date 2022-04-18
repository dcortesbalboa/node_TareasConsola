const fse=require('fs-extra');

const ruta='./db/data.json';
const guardarDatos= (data)=>{
    //debe existir;
    fse.outputJsonSync(ruta, data);
}

const leerDatos=()=>{
    let data=null;
    if(fse.existsSync(ruta)){
        data=fse.readJSONSync(ruta, { encoding: 'utf-8'});
    }
    //console.log(data);
    return data;
}

module.exports={
    guardarDatos,
    leerDatos
};