# Python BackEnd Set up


1. Creación del entorno virtual

   ```bash
    cd api
    python -m venv venv
    
2. Activación del entorno virtual
    ### En MacOS o Linux
    ```bash
    source venv/bin/activate
    ```
    ### En Windows en terminal bash
    ```bash
    source venv/Scripts/activate
    
2. Instalar dependencias:
    ```bash
    (venv) pip install -r requirements.txt
    
3. Para ejecutar la API, utiliza el siguiente comando:
    ```bash
    (venv) uvicorn main:app --reload
    
## Comandos útiles para manejo del Backend
### Asegúrate de estar en el entorno virtual

1. Si se agrega una nueva dependencia correr el siguiente comando

    ```bash
    (venv) pip freeze > requirements.txt
    