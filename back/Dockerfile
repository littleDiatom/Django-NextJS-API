FROM python:3.12.2

ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y default-mysql-client
RUN pip install mysql-connector-python

COPY . /app

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["./start.sh"]
