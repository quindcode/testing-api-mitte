## Documentación de pruebas automatizadas parqueadero Mite

## Introducción
En estas pruebas se está validando el correcto funcionamiento del parqueadero Mite. Se están creando diferentes escenarios como entradas, salidas con entrada, salidas sin entrada y salidas con cobro cero del parqueadero.


## Escenarios de prueba
###  Crear Entrada
*  Validar la entrada exitosa de un vehículo a un parqueadero mite con el servicio de Flypass
```
Dado que un vehículo se encuentra en la talanquera
Cuando desea ingresar a un parqueadero de mite
Entonces el vehículo ingresa correctamente al parqueadero con el servicio de Flypass
```

* Validar la entrada no exitosa de un vehículo a un parqueadero MITE con el servicio de Flypass, cuando ya existe una entrada con datos exactamente iguales registrada en el sistema.
```
Dado que un vehículo se encuentra en la talanquera
Cuando desea ingresar a un parqueadero de mite
Entonces el vehículo no puede ingresar al parqueadero con el servicio de Flypass
```

### Salida sin entrada
* Validar la salida exitosa de un vehículo de un parqueadero MITE con el servicio de Flypass sin haber registrado una entrada
```
Dado que un vehículo no realizó una entrada con el servicio de flypass a un parqueadero de mite
Cuando desea realizar una salida de un parqueadero de mite con el servicio de Flypass
Entonces el vehículo sale correctamente de parqueadero con el servicio de Flypass sin entrada
```

### Salida con entrada
* Validar la salida exitosa de un vehículo que tuvo una entrada exitosa a un parqueadero MITE con el servicio de Flypass
```
Dado que un vehículo realizó un entrada exitosamente a un parqueadero de mite
Cuando  desea realizar una salida de un parqueadero de mite
Entonces el vehículo sale correctamente de parqueadero con el servicio de Flypass
```
### Salida con cobro cero
* Validar la salida sin entrada de un vehículo con cobro igual a 0 de un parqueadero mite con el servicio de Flypass
```
Dado que un vehículo realizó una entrada con el servicio de flypass a un parqueadero de mite
Cuando  desea realizar una salida de un parqueadero de mite y el cobro es 0
Entonces el vehículo sale correctamente de parqueadero
```