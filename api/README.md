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
    (venv) pip install -r backend/requirements.txt
 
3. Navega hacia Backend
    ```bash
    cd backend
    
4. Para ejecutar la API, utiliza el siguiente comando:
    ```bash
    (venv) python manage.py runserver
    
## Comandos útiles para manejo del Backend
### Asegúrate de estar en el entorno virtual

1. Hacer migraciones
    ```bash
    (venv) python manage.py makemigrations
    
2. Hacer push de las migraciones hacia la DB
    ```bash
    (venv) python manage.py migrate
