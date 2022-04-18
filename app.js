require('colors');

//const {mostrarMenu, pausa} = require('./helpers/mensajes');
const {mostrarMenu, pausa, leerInput, mostrarMenuBorrado, confirmar,mostrarMenuCheckList } = require('./helpers/inquirer');
const Tareas=require('./models/tareas');
const {guardarDatos, leerDatos} = require('./helpers/archivos');

console.clear();
const main=async()=>{
    let opcion = '';
    const tareas=new Tareas();
    const tareasDB=leerDatos();
    await pausa();
    if(tareasDB){
        //Establecer tareas desde archivo
        tareas.crearTareas(tareasDB);
    }
    do{
        opcion = await mostrarMenu();
        console.log(opcion);
        switch(opcion){
            case '1': //Create
                const desc=await leerInput("Introduzca tarea");
                tareas.crearTarea(desc);
                
            break;
            case '2': //Listado
                console.log(tareas.listadoCompleto()); 
                
            break;
            case '3': 
                console.log(tareas.listadoPendientesCompletadas());
            break;
            case '4': 
                console.log(tareas.listadoPendientesCompletadas(false));
            break;
            case '5':  //completar  
                const ids=await mostrarMenuCheckList(tareas.listado);                
                tareas.completarTareas(ids);
                console.log(ids);
            break;
            case '6': //Borrado
                const idABorrar= await mostrarMenuBorrado(tareas.listado);
                if(idABorrar!=='0'){
                    const confirma=await confirmar("Está seguro?");
                    console.log(confirma, idABorrar);
                    if(confirma){
                        tareas.borrarTarea(idABorrar);
                    }
                }
                
            break;

            default:
                break;
        }
        guardarDatos(tareas.listado);
        if (opcion!=='0') await pausa();

    }while(opcion!=='0')
    

}

main();