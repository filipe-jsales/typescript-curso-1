export function domInjector(seletor:string){
    return function(target: any, propertyKey: string){

        const getter = function() {
            const elemento = document.querySelector(seletor);
            console.log(`buscando elemento do dom com o seletor ${seletor} para inetar em ${propertyKey}`)
            return elemento;
        }

        Object.defineProperty(
            target,
            propertyKey, 
            {get: getter}
            );
    }
}