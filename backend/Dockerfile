# backend/Dockerfile
FROM python:3.11

WORKDIR /workspace

# RUN pip install fastapi uvicorn[standard] --no-cache-dir

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]