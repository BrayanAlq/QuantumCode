1. Crear el entorno virtual

```
python -m venv venv
```

2. Activar entorno virtual

```
venv\Scripts\activate
```

3. Instalar las dependencias

```
pip install -r requirements.txt
```

4. Crear la base de datos

```
CREATE DATABASE mindsoft;
```

5. Crear .env segun .envexample

6. Ejecutar el servidor

```
uvicorn src.app:app --host 0.0.0.0 --port 5432 --reload
```
