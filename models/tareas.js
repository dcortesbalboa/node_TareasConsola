const Tarea=require('./tarea');
require('colors');

class Tareas{
    _listado={};

    constuctor(){
        this._listado={};
    }

    get listado(){
        const lista=[];
        Object.keys(this._listado).forEach( key =>{
            //console.log(key);
            const tarea=this._listado[key];
            lista.push(tarea);
        })
        return lista;
    }

    crearTarea(desc = ''){
        const tarea=new Tarea(desc);
        this._listado[tarea.id]=tarea;
    }

    crearTareas(data){
        data.forEach((item)=>{
            const tarea=new Tarea();
            tarea.id=item.id;
            tarea.desc=item.desc;
            tarea.completadoEn=item.completadoEn;
            this._listado[tarea.id]=tarea;
        })
    }

    listadoCompleto(){

        const data=this.listado;
        data.forEach( (item, idx) =>{

            let salida=`${idx}: `.green;
            salida += ` ${item.desc}`;
            salida+=(item.completadoEn) 
                ? ` Completado `.green
                : ` Pendiente`.red;
            
            console.log(salida);
        })
    }

    listadoPendientesCompletadas(copletadas=true){

        
        const data=(copletadas)
            ? this.listado.filter(item=> item.completadoEn!=null)
            : this.listado.filter(item=> item.completadoEn===null)
        
            data.forEach( (item, idx) =>{
            
            let salida=`${idx}: `.green;
            salida += ` ${item.desc}`;
            salida+=(item.completadoEn) 
                ? ` Completado en ${new Date(item.completadoEn)}`.green  
                : ` Pendiente`.red;
            
            console.log(salida);
        })
    }

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    completarTareas(tareas=[]){
        //Completar tareas
        tareas.forEach(item=>{
            if(!this._listado[item].completadoEn){
                this._listado[item].completadoEn=new Date().toISOString();
            }
            
        })

        //No completadas
        this.listado.forEach(tarea=>{
            if(!tareas.includes(tarea.id)){
                tarea.completadoEn=null;
            }
        });
    }
}

module.exports= Tareas;