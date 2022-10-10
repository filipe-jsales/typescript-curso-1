export function domInjector(seletor) {
    return function (target, propertyKey) {
        const getter = function () {
            const elemento = document.querySelector(seletor);
            console.log(`buscando elemento do dom com o seletor ${seletor} para inetar em ${propertyKey}`);
            return elemento;
        };
        Object.defineProperty(target, propertyKey, { get: getter });
    };
}
