1. Encender el entorno virtual
2. Instalar las dependencias
```
pip install -r requirements.txt
```
3. Crear la base de datos
```
CREATE DATABASE mindsoft;
```
4. Ejecutar el servidor
```
uvicorn src.app:app --host 0.0.0.0 --port 5432 --reload
```
